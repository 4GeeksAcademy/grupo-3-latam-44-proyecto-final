from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, DateTime
from sqlalchemy.orm import Mapped, mapped_column
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }

class Trabajo(db.Model):
    __tablename__ = "trabajos"

    id: Mapped[int] = mapped_column(primary_key=True)
    modalidad: Mapped[str] = mapped_column(String(120), nullable=False)
    nombre_puesto: Mapped[str] = mapped_column(String(120), nullable=False)
    remuneracion: Mapped[int] = mapped_column(nullable=True)
    condiciones: Mapped[str] = mapped_column(String(250), nullable=False)
    responsabilidades: Mapped[str] = mapped_column(String(250), nullable=False)
    requerimientos: Mapped[str] = mapped_column(String(250), nullable=False)
    activo: Mapped[bool] = mapped_column(Boolean(), default=True)
    fecha_inicio: Mapped[datetime] = mapped_column(DateTime, nullable=True)
    fecha_vencimiento: Mapped[datetime] = mapped_column(DateTime, nullable=True)

    def serialize(self):
        return {
            "id": self.id,
            "modalidad": self.modalidad,
            "nombre_puesto": self.nombre_puesto,
            "remuneracion": self.remuneracion,
            "condiciones": self.condiciones,
            "responsabilidades": self.responsabilidades,
            "requerimientos": self.requerimientos,
            "activo": self.activo,
            "fecha_inicio": self.fecha_inicio.isoformat() if self.fecha_inicio else None,
            "fecha_vencimiento": self.fecha_vencimiento.isoformat() if self.fecha_vencimiento else None
        }
    
