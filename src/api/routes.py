# ✅ routes.py - Código completo y corregido con endpoint de postulados y empresa
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Trabajo, Postulacion, Empresa
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime
import re
import uuid
from flask import request, jsonify
from api.models import db, User  # Ajusta el modelo según tu estructura
from api.utils import send_reset_email
from datetime import datetime, timedelta

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




@api.route('/vacantes/<int:vacante_id>', methods=['GET'])
##@jwt_required()
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

    # Validaciones adicionales
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

@api.route("/api/forgot-password", methods=["POST"])
def forgot_password():
    body = request.get_json()
    email = body.get("email")

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404

    token = generate_reset_token(email)
    reset_link = f"{os.getenv('FRONTEND_URL')}/reset-password/{token}"

    msg = Message("Recupera tu contraseña", sender="noreply@trabajolatam.com", recipients=[email])
    msg.body = f"Para recuperar tu contraseña haz clic aquí: {reset_link}"
    mail.send(msg)

    return jsonify({"message": "Correo enviado con el enlace de recuperación."}), 200

@app.route('/api/forgot-password', methods=['POST'])
def forgot_password():
    data = request.get_json()
    email = data.get('email')

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"message": "Correo no registrado"}), 404

    token = str(uuid.uuid4())
    user.reset_token = token
    user.token_expires = datetime.utcnow() + timedelta(hours=1)
    db.session.commit()

    send_reset_email(email, token)
    return jsonify({"message": "Correo de recuperación enviado"})

@app.route('/api/reset-password/<token>', methods=['POST'])
def reset_password(token):
    data = request.get_json()
    new_password = data.get('password')

    user = User.query.filter_by(reset_token=token).first()
    if not user or user.token_expires < datetime.utcnow():
        return jsonify({"message": "Token inválido o expirado"}), 400

    user.password = new_password  # Recuerda encriptarla si usas hashing
    user.reset_token = None
    user.token_expires = None
    db.session.commit()

    return jsonify({"message": "Contraseña actualizada correctamente"})


@app.route('/api/forgot-password', methods=['POST'])
def forgot_password():
    data = request.get_json()
    email = data.get('email')

    if not email:
        return jsonify({'message': 'Correo requerido'}), 400

    # Aquí puedes verificar si el email existe en tu base de datos
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({'message': 'Correo no registrado'}), 404

    # Generar token y link de recuperación
    token = s.dumps(email, salt='reset-password')
    link = f"{os.getenv('FRONTEND_URL')}/reset-password/{token}"

    # Enviar correo
    try:
        msg = Message('Restablece tu contraseña',
                      sender=os.getenv('GMAIL_SENDER'),
                      recipients=[email])
        msg.body = f"Usa este enlace para restablecer tu contraseña: {link}"
        mail.send(msg)
        return jsonify({'message': 'Correo de recuperación enviado'}), 200
    except Exception as e:
        print("Error al enviar correo:", e)
        return jsonify({'message': 'No se pudo enviar el correo'}), 500
