# ✅ routes.py - Código completo y corregido con endpoint de postulados
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Trabajo, Postulacion
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

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
def get_postulados_por_vacante(vacante_id):
    try:
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