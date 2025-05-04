from api.models import db, User  # Asegúrate de que la ruta sea correcta
from werkzeug.security import generate_password_hash
from flask import Flask
from flask_migrate import Migrate
import os

# ⚙️ Configuración básica para inicializar Flask + DB (ajusta si usas otra config)
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv(
    "DATABASE_URL") or "sqlite:///development.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
Migrate(app, db)

# 👤 Datos del admin a crear
admin_email = "admin@jobfinder.com"
admin_password = "admin1234"
admin_hashed = generate_password_hash(admin_password)

with app.app_context():
    # ¿Ya existe?
    existing = User.query.filter_by(email=admin_email).first()
    if existing:
        print("⚠️ El administrador ya existe:", existing.email)
    else:
        admin = User(
            email=admin_email,
            password=admin_hashed,
            nombre="Administrador",
            apellido="Master",
            numero="0000000000",
            is_admin=True  # ← Si tienes ese campo en tu modelo
        )
        db.session.add(admin)
        db.session.commit()
        print("✅ Administrador creado con éxito:")
        print("📧 Email:", admin_email)
        print("🔐 Password:", admin_password)
