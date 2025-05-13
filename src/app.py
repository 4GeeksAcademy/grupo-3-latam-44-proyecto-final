import os
from flask import Flask, request, jsonify, url_for, send_from_directory, render_template
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap, send_email
from flask_cors import CORS
from api.models import db, User, BlackListToken, Empresa
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt, get_jti, verify_jwt_in_request
import random
from datetime import datetime, timezone, timedelta
from flask import Flask
from flask_bcrypt import Bcrypt


# from models import Person


# Configuración inicial
ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../public/')

app = Flask(__name__)
app.config["JWT_ACCES_TOKEN_EXPIRES"] = timedelta(hours=1)  # expiracion global

# ✅ CORS solo para orígenes permitidos
CORS(app, origins=[
    "http://localhost:3000",
    "https://ideal-cod-v7zppv66zpxhpwv-3000.app.github.dev"
])

# ✅ Seguridad y utilidades
bcrypt = Bcrypt(app)
app.config["JWT_SECRET_KEY"] = "nuestra_clave_secreta"
jwt = JWTManager(app)

app.url_map.strict_slashes = False

# ✅ Base de datos
db_url = os.getenv("DATABASE_URL")
if db_url:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# ✅ Admin, comandos y rutas
setup_admin(app)
setup_commands(app)
app.register_blueprint(api, url_prefix='/api')

# ✅ JWT blacklist
@jwt.token_in_blocklist_loader
def handle_revoked_token(jwt_header, jwt_payload):
    jti = jwt_payload['jti']

    token = db.session.execute(
        db.select(BlackListToken).filter_by(jti=jti)).scalar()
    return token is not None


# Handle/serialize errors like a JSON object


#def check_if_token_in_blacklist(jwt_header, jwt_payload):
 #   jti = jwt_payload['jti']
  #  token = db.session.execute(db.select(BlackListToken).filter_by(jti=jti)).scalar()
   # return token is not None

# ✅ Manejo de errores

@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# ✅ Sitemap
@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# ✅ Archivos estáticos (React)
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0
    return response



# ✅ Iniciar servidor

# Creacion de user trabajador

# ✅ Registro de usuario
@app.route("/users", methods=["POST"])
def create_user():
    data = request.get_json(silent=True)
    if not data or not data.get("email") or not data.get("password"):
        return jsonify({"error": "Datos inválidos"}), 400

    if db.session.execute(db.select(User).filter_by(email=data["email"])).scalar_one_or_none():
        return jsonify({"error": "Usuario ya existe"}), 409

    pw_hash = bcrypt.generate_password_hash(data["password"]).decode('utf8')
    date = datetime.now(timezone.utc)

    user = User(
        nombre=data["nombre"],
        apellido=data["apellido"],
        numero=data["numero"],
        email=data["email"],
        password=pw_hash,
        created_at=date
    )

    db.session.add(user)
    db.session.commit()
    return jsonify({"message": "Usuario registrado"}), 201


# Creacion de user empresa


@app.route("/empresa", methods=["POST"])
def create_user_empresa():
    data = request.get_json(silent=True)
    if not data or not data.get("email") or not data.get("password"):
        return jsonify({"error": "Datos inválidos"}), 400

    if db.session.execute(db.select(Empresa).filter_by(email=data["email"])).scalar_one_or_none():
        return jsonify({"error": "Empresa ya existe"}), 409

    pw_hash = bcrypt.generate_password_hash(data["password"]).decode('utf8')
    date = datetime.now(timezone.utc)

    empresa = Empresa(
        nombrerp=data["nombre_rp"],
        apellidorp=data["apellido_rp"],
        telefono=data["telefono"],
        nombre=data["nombreEmpresa"],
        razon_social=data["razonSocial"],
        email=data["email"],
        password=pw_hash,
        created_at=date
    )

    db.session.add(empresa)
    db.session.commit()
    return jsonify({"message": "Empresa registrada"}), 201


# login usario trabajador

@app.route('/login/user', methods=['POST'])
def handle_login_trabajador():
    try:
        data = request.get_json(silent=True)

        user = db.session.execute(db.select(User).filter_by(email=data["email"])).scalar_one_or_none()
        if not user or not bcrypt.check_password_hash(user.password, data["password"]):
            return jsonify({"msg": "Credenciales incorrectas"}), 401

        access_token = create_access_token(identity=str(user.id))
        return jsonify({
            "ok": True,
            "msg": "Login exitoso",
            "access_token": access_token,
            "user_id": user.id
        }), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"ok": False, "msg": str(e)}), 500


# ✅ Login empresa
@app.route('/login/empresa', methods=['POST'])
def handle_login_empresa():
    try:
        data = request.get_json(silent=True)

        empresa = db.session.execute(db.select(Empresa).filter_by(email=data["email"])).scalar_one_or_none()
        if not empresa or not bcrypt.check_password_hash(empresa.password, data["password"]):
            return jsonify({"msg": "Credenciales incorrectas"}), 401

        access_token = create_access_token(identity=str(empresa.id))
        return jsonify({
            "ok": True,
            "msg": "Login exitoso",
            "access_token": access_token,
            "user_id": empresa.id
        }), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"ok": False, "msg": str(e)}), 500


# logout user empresa y user trabajador


@app.route('/logout', methods=['POST'])
@jwt_required()
def handle_logout():
    jti = get_jwt()['jti']
    date = datetime.now(timezone.utc)
    db.session.add(BlackListToken(jti=jti, created_at=date))
    db.session.commit()
    return jsonify(msg='JWT revoked'), 200



@app.route("/enviar", methods=["POST"])
def handle_send_email():
    data = request.get_json(silent=True)
    to = data.get("to")
    subject = data.get("subject")
    message = data.get("message")
    name = data.get("name")

    # send_email(to, subject, message, is_html=False)
    html_body = render_template("eamil_template.html", name=name,)
    send_email(to, subject, html_body, is_html=True)
    return jsonify({"msg": "Correo enviado con html"})

# generacion de token de verificación


def generate_verification_token(user_id):
    additional_claims = {"user_id": user_id}

    token = create_access_token(
        identity=str(user_id),
        additional_claims=additional_claims,
        expires_delta=timedelta(hours=5)

    )
    return


def send_verification_email(user_mail, user_id):
    token = generate_verification_token(user_id)
    verification_url = f""

# this only runs if `$ python src/main.py` is executed

# ✅ Ejecutar servidor

if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
