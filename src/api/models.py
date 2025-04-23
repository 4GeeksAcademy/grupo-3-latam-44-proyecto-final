from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, DateTime, Integer, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "user"
    
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False)
    contactos_disponibles: Mapped[int] = mapped_column(Integer, default=0)

    # Relación con postulaciones
    postulaciones = relationship("Postulacion", back_populates="trabajador")

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "contactos_disponibles": self.contactos_disponibles
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

    # Relación con postulaciones
    postulaciones = relationship("Postulacion", back_populates="vacante")

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

class Postulacion(db.Model):
    __tablename__ = "postulaciones"

    id: Mapped[int] = mapped_column(primary_key=True)
    id_trabajo: Mapped[int] = mapped_column(ForeignKey('trabajos.id'), nullable=False)
    id_trabajador: Mapped[int] = mapped_column(ForeignKey('user.id'), nullable=False)

    vacante = relationship("Trabajo", back_populates="postulaciones")
    trabajador = relationship("User", back_populates="postulaciones")

    def serialize(self):
        return {
            "id": self.id,
            "id_trabajo": self.id_trabajo,
            "id_trabajador": self.id_trabajador
        }

