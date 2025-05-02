from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Trabajo, Postulacion, Empresa, CreditoEmpresa, ConsumoCredito
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime, timedelta
import random, re

api = Blueprint('api', __name__)
CORS(api)

# ------------------ UTILIDADES CRÉDITOS ------------------
def generar_folio():
    return ''.join(random.choices('ABCDEFGHJKLMNPQRSTUVWXYZ23456789', k=12))

def obtener_numero_consecutivo():
    ultimo = db.session.query(CreditoEmpresa).order_by(CreditoEmpresa.numero_consecutivo.desc()).first()
    return (ultimo.numero_consecutivo + 1) if ultimo else 1

# ------------------ CRÉDITOS ------------------
@api.route('/api/creditos/comprar', methods=['POST'])
@jwt_required()
def comprar_creditos():
    data = request.get_json()
    user_id = get_jwt_identity()
    empresa = Empresa.query.get(user_id)
    if not empresa:
        return jsonify({"msg": "Empresa no encontrada"}), 404

    paquete = data.get("paquete")
    folio = generar_folio()
    consecutivo = obtener_numero_consecutivo()

    if paquete == "Básico": total, duracion = 2, 60
    elif paquete == "Pro": total, duracion = 6, 60
    elif paquete == "Premium": total, duracion = 9999, 60
    else: return jsonify({"msg": "Paquete inválido"}), 400

    hoy = datetime.utcnow()
    nuevo_credito = CreditoEmpresa(
        empresa_id=empresa.id,
        paquete=paquete,
        total_creditos=total,
        creditos_usados=0,
        fecha_compra=hoy,
        vigencia_inicio=hoy,
        vigencia_fin=hoy + timedelta(days=duracion),
        numero_consecutivo=consecutivo,
        folio_aleatorio=folio
    )

    db.session.add(nuevo_credito)
    db.session.commit()
    return jsonify({"msg": "Créditos comprados correctamente", "folio": folio}), 201

@api.route('/api/creditos/empresa/<int:id>', methods=['GET'])
def ver_creditos(id):
    creditos = CreditoEmpresa.query.filter_by(empresa_id=id).order_by(CreditoEmpresa.fecha_compra.desc()).all()
    resultado = [{
        "id": c.id,
        "paquete": c.paquete,
        "total": c.total_creditos,
        "usados": c.creditos_usados,
        "disponibles": c.creditos_disponibles,
        "vigencia_inicio": c.vigencia_inicio,
        "vigencia_fin": c.vigencia_fin,
        "folio": c.folio_aleatorio
    } for c in creditos]
    return jsonify(resultado), 200

@api.route('/api/creditos/usar', methods=['PUT'])
@jwt_required()
def usar_credito():
    data = request.get_json()
    user_id = get_jwt_identity()
    empresa = Empresa.query.get(user_id)
    if not empresa:
        return jsonify({"msg": "Empresa no encontrada"}), 404

    hoy = datetime.utcnow()
    credito = CreditoEmpresa.query.filter(
        CreditoEmpresa.empresa_id == empresa.id,
        CreditoEmpresa.vigencia_inicio <= hoy,
        CreditoEmpresa.vigencia_fin >= hoy,
        CreditoEmpresa.creditos_usados < CreditoEmpresa.total_creditos
    ).order_by(CreditoEmpresa.fecha_compra.asc()).first()

    if not credito:
        return jsonify({"msg": "No hay créditos disponibles o están vencidos"}), 403

    credito.creditos_usados += 1
    consumo = ConsumoCredito(
        empresa_id=empresa.id,
        postulante_id=data.get("postulante_id"),
        vacante_id=data.get("vacante_id"),
        tipo_accion=data.get("accion", "ver_contacto")
    )

    db.session.add(consumo)
    db.session.commit()
    return jsonify({"msg": "Crédito consumido correctamente"}), 200

@api.route('/api/creditos/consumos/<int:empresa_id>', methods=['GET'])
def historial_creditos(empresa_id):
    consumos = ConsumoCredito.query.filter_by(empresa_id=empresa_id).order_by(ConsumoCredito.fecha_consumo.desc()).all()
    resultado = [{
        "fecha": c.fecha_consumo,
        "postulante_id": c.postulante_id,
        "vacante_id": c.vacante_id,
        "accion": c.tipo_accion
    } for c in consumos]
    return jsonify(resultado), 200

# ------------------ ENDPOINTS EXISTENTES ------------------

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200

@api.route('/api/vacantes/<int:vacante_id>/postulados', methods=['GET'])
@jwt_required()
def get_postulados_por_vacante(vacante_id):
    try:
        current_user_id = get_jwt_identity()
        trabajo = Trabajo.query.get(vacante_id)

        if not trabajo or trabajo.empresa_id != current_user_id:
            return jsonify({"msg": "No autorizado para ver los postulantes de esta vacante"}), 403

        postulaciones = Postulacion.query.filter_by(id_trabajo=vacante_id).all()
        if not postulaciones:
            return jsonify({"msg": "No hay trabajadores postulados a esta vacante"}), 404

        trabajadores = []
        for post in postulaciones:
            trabajador = User.query.get(post.id_trabajador)
            if trabajador:
                trabajadores.append({
                    "id": trabajador.id,
                    "nombre": getattr(trabajador, "nombre", "N/A"),
                    "apellido": getattr(trabajador, "apellido", "N/A"),
                    "correo": trabajador.email,
                    "numero": getattr(trabajador, "numero", "N/A"),
                    "vacante_id": vacante_id
                })

        return jsonify(trabajadores), 200
    except Exception as e:
        return jsonify({"msg": "Error al obtener postulados", "error": str(e)}), 500

@api.route('/empresa/<int:empresa_id>', methods=['GET'])
@jwt_required()
def get_empresa_by_id(empresa_id):
    empresa = Empresa.query.get(empresa_id)
    if not empresa:
        return jsonify({"msg": "Empresa no encontrada"}), 404

    current_user_id = get_jwt_identity()
    if empresa.id != current_user_id:
        return jsonify({"msg": "No autorizado para ver este perfil"}), 403

    return jsonify(empresa.serialize()), 200

@api.route('/vacantes/<int:vacante_id>', methods=['GET'])
def get_vacante_by_id(vacante_id):
    vacante = Trabajo.query.get(vacante_id)
    return jsonify(vacante.serialize()), 200

@api.route('/vacantes', methods=['GET'])
def handle_vacantes():
    try:
        vacante_list = []
        vacante = db.session.execute(db.select(Trabajo)).scalars().all()
        for p in vacante:
            vacante_list.append(p.serialize())
        return jsonify(vacante_list)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@api.route('/empresa/<int:empresa_id>', methods=['PUT'])
@jwt_required()
def update_empresa_by_id(empresa_id):
    empresa = Empresa.query.get(empresa_id)
    if not empresa:
        return jsonify({"msg": "Empresa no encontrada"}), 404

    current_user_id = get_jwt_identity()
    if empresa.id != current_user_id:
        return jsonify({"msg": "No autorizado para editar esta empresa"}), 403

    data = request.json

    if 'sitio_web' in data and not re.match(r'^https://', data['sitio_web']):
        return jsonify({"msg": "El sitio web debe comenzar con https://"}), 400

    campos_obligatorios = ['nombre_comercial', 'razon_social']
    for campo in campos_obligatorios:
        if campo in data and not data[campo].strip():
            return jsonify({"msg": f"El campo {campo} no puede estar vacío"}), 400

    for key in data:
        if hasattr(empresa, key):
            setattr(empresa, key, data[key])

    db.session.commit()
    return jsonify({"msg": "Perfil de empresa actualizado con éxito"}), 200

@api.route('/empresa/<int:empresa_id>/vacantes', methods=['POST'])
@jwt_required()
def crear_vacante(empresa_id):
    empresa = Empresa.query.get(empresa_id)
    if not empresa:
        return jsonify({"msg": "Empresa no encontrada"}), 404

    current_user_id = get_jwt_identity()
    if empresa.id != current_user_id:
        return jsonify({"msg": "No autorizado para publicar vacantes"}), 403

    data = request.json
    nueva = Trabajo(
        empresa_id=empresa_id,
        modalidad=data.get("modalidad"),
        nombre_puesto=data.get("nombre_puesto"),
        remuneracion=data.get("remuneracion"),
        condiciones=data.get("condiciones"),
        responsabilidades=data.get("responsabilidades"),
        requerimientos=data.get("requerimientos"),
        activo=True,
        fecha_inicio=datetime.utcnow(),
        fecha_vencimiento=data.get("fecha_vencimiento")
    )

    db.session.add(nueva)
    db.session.commit()
    return jsonify({"msg": "Vacante publicada con éxito"}), 201

@api.route('/empresa/<int:empresa_id>/postulantes', methods=['GET'])
@jwt_required()
def listar_postulantes(empresa_id):
    current_user_id = get_jwt_identity()
    if empresa_id != current_user_id:
        return jsonify({"msg": "No autorizado"}), 403

    postulaciones = Postulacion.query.filter_by(id_empresa=empresa_id).all()
    resultado = []
    for p in postulaciones:
        trabajador = User.query.get(p.id_trabajador)
        if trabajador:
            resultado.append({
                "nombre": trabajador.nombre,
                "correo": trabajador.email,
                "numero": trabajador.numero,
                "vacante": p.id_trabajo
            })

    return jsonify(resultado), 200

@api.route('/empresa/<int:empresa_id>/vacante/<int:vacante_id>/estado', methods=['PUT'])
@jwt_required()
def cambiar_estado_vacante(empresa_id, vacante_id):
    current_user_id = get_jwt_identity()
    if empresa_id != current_user_id:
        return jsonify({"msg": "No autorizado"}), 403

    trabajo = Trabajo.query.get(vacante_id)
    if not trabajo or trabajo.empresa_id != empresa_id:
        return jsonify({"msg": "Vacante no encontrada"}), 404

    data = request.json
    trabajo.activo = data.get("activo", trabajo.activo)
    db.session.commit()
    return jsonify({"msg": "Estado de vacante actualizado"}), 200
