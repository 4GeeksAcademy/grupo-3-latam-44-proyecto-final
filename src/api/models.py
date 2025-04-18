from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, DateTime
from sqlalchemy.orm import Mapped, mapped_column
from datetime import datetime, timezone

db = SQLAlchemy()


class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True ,nullable=False)
    nombre: Mapped[str] = mapped_column(String(120), nullable=False)
    apellido: Mapped[str] = mapped_column(String(120), nullable=False)
    numero: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    acerca: Mapped[str] = mapped_column(String(220), nullable=False)
    portafolio: Mapped[str] = mapped_column(String(220), nullable=False)
    acerca: Mapped[str] = mapped_column(String(220), nullable=False)
    experiencia: Mapped[str] = mapped_column(String(220), nullable=False)
    cursos: Mapped[str] = mapped_column(String(220), nullable=False)
    capacitaciones: Mapped[str] = mapped_column(String(220), nullable=False)
    estudios: Mapped[str] = mapped_column(String(220), nullable=False)
    idiomas: Mapped[str] = mapped_column(String(220), nullable=False)
    tecnologia: Mapped[str] = mapped_column(String(220), nullable=False)
    lugar: Mapped[str] = mapped_column(String(220), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, nullable=False)
      
    def serialize(self):
        return {
            "nombre": self.nombre,
            "apellido": self.apellido,
            "numero": self.numero,
            "acerca": self.acerca,
            "experiencia": self.experiencia,
            "cursos": self.cursos,
            "capacitaciones": self.capacitaciones,
            "estudios": self.estudios,
            "idiomas": self.idiomas,
            "tecnologia": self.tecnologia,
            "lugar": self.lugar,
            "cursos": self.cursos,
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
    
class Postulaciones(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    id_trabajo: Mapped[int] = mapped_column(nullable=False)
    id_empresa: Mapped[int] = mapped_column(nullable=False)
    id_trabajador: Mapped[int] = mapped_column(nullable=False)
    def serialize(self):
        return {
            "id_trabajo": self.id_trabajo,
            "id_empresa": self.id_empresa,
            "id_trabajador": self.id_trabajador,
        }


class BlackListToken(db.Model):
        id: Mapped[int] = mapped_column(primary_key=True)
        jti: Mapped[str]= mapped_column(String(40), nullable=False, index=True)
        created_at: Mapped[datetime] = mapped_column(DateTime, nullable=False)
      
      
class Favorites(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    id_trabajo: Mapped[int] = mapped_column(nullable=False)
      
    def serialize(self):
        return {
            "id_trabajo": self.id_trabajor,
            "id_trabajador": self.id_trabajador,
        }



class Empresa(db.Model):
    __tablename__ = "empresas"

    id: Mapped[int] = mapped_column(primary_key=True)
    nombre: Mapped[str] = mapped_column(String(120), nullable=False)
    descripcion: Mapped[str] = mapped_column(String(250), nullable=False)
    ubicacion: Mapped[str] = mapped_column(String(120), nullable=False)
    sitio_web: Mapped[str] = mapped_column(String(220), nullable=True)
    correo: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    telefono: Mapped[str] = mapped_column(String(120), nullable=False)

    #trabajos = relationship("Trabajo", backref="empresa", lazy=True)

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "descripcion": self.descripcion,
            "ubicacion": self.ubicacion,
            "sitio_web": self.sitio_web,
            "correo": self.correo,
            "telefono": self.telefono
        }
