# ✅ routes.py - Código completo y corregido con endpoint de postulados y empresa
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Trabajo, Postulacion, Empresa
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200

# ✅ Endpoint corregido para obtener trabajadores postulados por vacante
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

# ✅ Endpoint 1: Obtener perfil de empresa
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

# ✅ Endpoint 2: Actualizar perfil de empresa (PUT)
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

    for key in data:
        if hasattr(empresa, key):
            setattr(empresa, key, data[key])

    db.session.commit()
    return jsonify({"msg": "Perfil de empresa actualizado con éxito"}), 200

# ✅ Endpoint 3: Publicar nueva vacante (POST)
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

# ✅ Endpoint 4: Listado de postulantes por empresa
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

# ✅ Endpoint 5: Cambiar estado de vacante
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

