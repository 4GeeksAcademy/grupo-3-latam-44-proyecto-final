from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Trabajo, Postulacion, Empresa, CreditoEmpresa, ConsumoCredito, Favorites
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime, timedelta
import random
import re

api = Blueprint('api', __name__)
CORS(api)

# ------------------ UTILIDADES ------------------

def generar_folio():
    return ''.join(random.choices('ABCDEFGHJKLMNPQRSTUVWXYZ23456789', k=12))

def obtener_numero_consecutivo():
    ultimo = db.session.query(CreditoEmpresa).order_by(CreditoEmpresa.numero_consecutivo.desc()).first()
    return (ultimo.numero_consecutivo + 1) if ultimo else 1

# ------------------ VACANTES: CRUD COMPLETO ------------------

@api.route('/api/vacantes', methods=['POST'])
@jwt_required()
def crear_vacante_completa():
    data = request.get_json()
    try:
        nueva = Trabajo(
            empresa_id=data.get("empresa_id"),
            nombre_puesto=data.get("nombre_puesto"),
            modalidad=data.get("modalidad"),
            remuneracion=data.get("remuneracion"),
            moneda=data.get("moneda", "MXN"),
            descripcion_puesto=data.get("descripcion_puesto"),
            requerimientos=data.get("requerimientos"),
            responsabilidades=data.get("responsabilidades"),
            jornada=data.get("jornada"),
            dias_laborales=data.get("dias_laborales"),
            turnos=data.get("turnos"),
            equipo_utilizado=data.get("equipo_utilizado"),
            peligros=data.get("peligros"),
            demandas_fisicas=data.get("demandas_fisicas"),
            estado=data.get("estado", "Activa"),
            activo=data.get("activo", True),
            fecha_publicacion=data.get("fecha_publicacion"),
            fecha_vencimiento=data.get("fecha_vencimiento")
        )
        db.session.add(nueva)
        db.session.commit()
        return jsonify({"msg": "Vacante creada correctamente", "id": nueva.id}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": "Error al crear vacante", "error": str(e)}), 500

@api.route('/api/vacantes/<int:id>', methods=['PUT'])
@jwt_required()
def actualizar_vacante(id):
    vacante = Trabajo.query.get(id)
    if not vacante:
        return jsonify({"msg": "Vacante no encontrada"}), 404

    data = request.get_json()
    try:
        for field in data:
            if hasattr(vacante, field):
                setattr(vacante, field, data[field])
        db.session.commit()
        return jsonify({"msg": "Vacante actualizada correctamente"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": "Error al actualizar vacante", "error": str(e)}), 500

@api.route('/api/vacantes', methods=['GET'])
def listar_vacantes():
    vacantes = Trabajo.query.all()
    return jsonify([v.serialize() for v in vacantes]), 200

@api.route('/api/vacantes/<int:id>', methods=['GET'])
def obtener_vacante(id):
    vacante = Trabajo.query.get(id)
    if not vacante:
        return jsonify({"msg": "Vacante no encontrada"}), 404
    return jsonify(vacante.serialize()), 200

@api.route('/api/vacantes/<int:id>/postulados', methods=['GET'])
@jwt_required()
def postulados_por_vacante(id):
    vacante = Trabajo.query.get(id)
    if not vacante:
        return jsonify({"msg": "Vacante no encontrada"}), 404
    return jsonify([p.trabajador.serialize() for p in vacante.postulaciones]), 200

@api.route('/api/vacantes/<int:id>/postularme', methods=['POST'])
@jwt_required()
def postularme(id):
    user_id = get_jwt_identity()
    existe = Postulacion.query.filter_by(id_trabajo=id, id_trabajador=user_id).first()
    if existe:
        return jsonify({"msg": "Ya estás postulado"}), 409

    trabajo = Trabajo.query.get(id)
    if not trabajo:
        return jsonify({"msg": "Vacante no encontrada"}), 404

    nueva = Postulacion(
        id_trabajo=id,
        id_empresa=trabajo.empresa_id,
        id_trabajador=user_id
    )
    db.session.add(nueva)
    db.session.commit()
    return jsonify({"msg": "Postulación exitosa"}), 201

@api.route('/api/trabajador/<int:id>/postulaciones', methods=['GET'])
@jwt_required()
def ver_postulaciones(id):
    postulaciones = Postulacion.query.filter_by(id_trabajador=id).all()
    resultado = []
    for p in postulaciones:
        trabajo = Trabajo.query.get(p.id_trabajo)
        if trabajo:
            resultado.append(trabajo.serialize())
    return jsonify(resultado), 200

@api.route('/api/favoritos/<int:trabajador_id>', methods=['GET'])
@jwt_required()
def ver_favoritos(trabajador_id):
    favoritos = Trabajo.query.join(Favorites).filter(Favorites.id_trabajador == trabajador_id).all()
    return jsonify([v.serialize() for v in favoritos]), 200

@api.route('/api/creditos/empresa/<int:id>', methods=['GET'])
@jwt_required()
def ver_creditos_empresa(id):
    creditos = CreditoEmpresa.query.filter_by(empresa_id=id).order_by(CreditoEmpresa.fecha_compra.desc()).all()
    resultado = [{
        "id": c.id,
        "paquete": c.paquete,
        "creditos": c.total_creditos,
        "usados": c.creditos_usados,
        "disponibles": c.total_creditos - c.creditos_usados,
        "fecha_compra": c.fecha_compra.strftime("%Y-%m-%d"),
        "vigencia_inicio": c.vigencia_inicio.strftime("%Y-%m-%d"),
        "vigencia_fin": c.vigencia_fin.strftime("%Y-%m-%d"),
        "folio": c.folio_aleatorio,
        "monto_pagado": c.monto_pagado  # 👈 Ya lo traemos para el frontend de empresa
    } for c in creditos]
    return jsonify(resultado), 200

@api.route('/api/admin/pagos', methods=['GET'])
@jwt_required()
def obtener_todos_los_pagos():
    try:
        fecha_inicio = request.args.get("inicio")
        fecha_fin = request.args.get("fin")

        query = db.session.query(CreditoEmpresa, Empresa).join(Empresa)

        if fecha_inicio:
            query = query.filter(CreditoEmpresa.fecha_compra >= fecha_inicio)
        if fecha_fin:
            query = query.filter(CreditoEmpresa.fecha_compra <= fecha_fin)

        resultados = query.order_by(CreditoEmpresa.fecha_compra.desc()).all()

        pagos = []
        for credito, empresa in resultados:
            pagos.append({
                "empresa_id": empresa.id,
                "empresa_nombre": empresa.nombre_comercial,
                "fecha_compra": credito.fecha_compra.strftime("%Y-%m-%d"),
                "monto_pagado": credito.monto_pagado,  # ✅ agregado monto real
                "paquete": credito.paquete,
                "creditos": credito.total_creditos,
                "folio": credito.folio_aleatorio
            })

        return jsonify(pagos), 200

    except Exception as e:
        return jsonify({"msg": "Error al obtener historial de pagos", "error": str(e)}), 500
