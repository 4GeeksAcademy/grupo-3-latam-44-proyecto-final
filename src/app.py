"""This module takes care of starting the API Server, Loading the DB and Adding the endpoints"""
import os
from flask import Flask, request, jsonify, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db, User, BlackListToken, Empresa
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from datetime import datetime, timezone

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../public/')

app = Flask(__name__)

# CORS solo permite peticiones desde el frontend autorizado
CORS(app, resources={r"/api/*": {"origins": os.getenv("FRONTEND_URL")}})

# Seguridad y configs
app.config["JWT_SECRET_KEY"] = "nuestra_clave_secreta"
app.url_map.strict_slashes = False

# Bcrypt y DB
bcrypt = Bcrypt(app)

# Configuración DB
db_url = os.getenv("DATABASE_URL")
if db_url:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# Admin y rutas
setup_admin(app)
setup_commands(app)
app.register_blueprint(api, url_prefix='/api')

# JWT
jwt = JWTManager(app)

@jwt.token_in_blocklist_loader
def handle_revoked_token(jwt_header, jwt_payload):
    jti = jwt_payload['jti']
    token = db.session.execute(db.select(BlackListToken).filter_by(jti=jti)).scalar()
    return token is not None

@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0
    return response

# ------------------ ENDPOINTS ------------------

@app.route("/users", methods=["POST"])
def create_user():
    data = request.get_json(silent=True)
    if not data or not data.get("email") or not data.get("password"):
        return jsonify({"error": "Datos inválidos"}), 400

    if db.session.execute(db.select(User).filter_by(email=data["email"])).scalar_one_or_none():
        return jsonify({"error": "Usuario ya existe"}), 409

    pw_hash = bcrypt.generate_password_hash(data["password"]).decode('utf8')
    user = User(
        nombre=data.get("nombre"),
        apellido=data.get("apellido"),
        numero=data.get("numero"),
        email=data["email"],
        password=pw_hash,
        created_at=datetime.now(timezone.utc)
    )
    db.session.add(user)
    db.session.commit()
    return jsonify({"message": "Usuario registrado"}), 201

@app.route("/empresa", methods=["POST"])
def create_user_empresa():
    data = request.get_json(silent=True)
    if not data or not data.get("email") or not data.get("password"):
        return jsonify({"error": "Datos inválidos"}), 400

    if db.session.execute(db.select(Empresa).filter_by(email=data["email"])).scalar_one_or_none():
        return jsonify({"error": "Empresa ya existe"}), 409

    pw_hash = bcrypt.generate_password_hash(data["password"]).decode('utf8')
    empresa = Empresa(
        nombrerp=data.get("nombre_rp"),
        apellidorp=data.get("apellido_rp"),
        telefono=data.get("telefono"),
        nombre=data.get("nombreEmpresa"),
        razon_social=data.get("razonSocial"),
        email=data["email"],
        password=pw_hash,
        created_at=datetime.now(timezone.utc)
    )
    db.session.add(empresa)
    db.session.commit()
    return jsonify({"message": "Empresa registrada"}), 201

@app.route('/login/user', methods=['POST'])
def handle_login_trabajador():
    try:
        data = request.get_json(silent=True)
        user = db.session.execute(db.select(User).filter_by(email=data["email"])).scalar_one_or_none()
        if not user or not bcrypt.check_password_hash(user.password, data["password"]):
            return jsonify({"msg": "Credenciales incorrectas"}), 401

        access_token = create_access_token(identity=str(user.id))
        
        return jsonify({"ok":True, "msg": "Login exitoso", "access_token":access_token, "user_id":user.id}),200
    
    except Exception as e:
        db.session.rollback()
        return jsonify({"ok": False, "msg": str(e)}), 500

@app.route('/login/empresa', methods=['POST'])
def handle_login_empresa():
    try:
        data = request.get_json(silent=True)
        empresa = db.session.execute(db.select(Empresa).filter_by(email=data["email"])).scalar_one_or_none()
        if not empresa or not bcrypt.check_password_hash(empresa.password, data["password"]):
            return jsonify({"msg": "Credenciales incorrectas"}), 401

        access_token = create_access_token(identity=str(empresa.id))
        return jsonify({"ok": True, "msg": "Login exitoso", "access_token": access_token}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"ok": False, "msg": str(e)}), 500

@app.route('/logout', methods=['POST'])
@jwt_required()
def handle_logout():
    jti = get_jwt()['jti']
    db.session.add(BlackListToken(jti=jti, created_at=datetime.now(timezone.utc)))
    db.session.commit()
    return jsonify(msg='JWT revocado correctamente'), 200

@app.route('/empresa/<int:id>', methods=['GET'])
@jwt_required()
def get_empresa_by_id(id):
    try:
        empresa = db.session.execute(db.select(Empresa).filter_by(id=id)).scalar_one_or_none()
        if not empresa:
            return jsonify({"msg": "Empresa no encontrada"}), 404

        return jsonify({
            "id": empresa.id,
            "nombre_comercial": empresa.nombre,
            "razon_social": empresa.razon_social,
            "telefono": empresa.telefono,
            "correo": empresa.email,
            "descripcion": empresa.descripcion,
            "direccion": empresa.direccion,
            "sitio_web": empresa.sitio_web,
            "rfc": empresa.rfc,
            "creditos": empresa.creditos_disponibles,
            "vigencia_inicio": empresa.vigencia_inicio.strftime("%Y-%m-%d") if empresa.vigencia_inicio else None,
            "vigencia_fin": empresa.vigencia_fin.strftime("%Y-%m-%d") if empresa.vigencia_fin else None
        }), 200

    except Exception as e:
        print("❌ Error al obtener empresa:", str(e))
        return jsonify({"msg": "Error interno del servidor"}), 500

# 🔥 EJECUTAR SERVIDOR
if __name__ == '__main__':
    PORT = int(os.getenv("PORT", 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
