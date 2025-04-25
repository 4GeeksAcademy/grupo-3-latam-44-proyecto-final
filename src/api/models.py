from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime, timezone

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "usuarios"

    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=True, index=True)
    password: Mapped[str] = mapped_column(nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True ,nullable=True)
    nombre: Mapped[str] = mapped_column(String(120), nullable=True)
    apellido: Mapped[str] = mapped_column(String(120), nullable=True)
    numero: Mapped[str] = mapped_column(String(120), unique=True, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now(timezone.utc), nullable=True)

    perfil = relationship("Perfil", back_populates="usuario", uselist=False, cascade="all, delete-orphan")
    cv = relationship("CV", back_populates="usuario", uselist=False, cascade="all, delete-orphan")
    postulaciones = relationship("Postulaciones", back_populates="trabajador")
    favoritos = relationship("Favorites", back_populates="trabajador")

class Perfil(db.Model):
    __tablename__ = "perfiles"

    id: Mapped[int] = mapped_column(primary_key=True)
    fecha_nacimiento: Mapped[str] = mapped_column(String(120), nullable=True)
    lugar: Mapped[str] = mapped_column(String(220), nullable=True)
    acerca: Mapped[str] = mapped_column(String(220), nullable=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("usuarios.id"), nullable=True)

    usuario = relationship("User", back_populates="perfil")

class CV(db.Model):
    __tablename__ = "cv"

    id: Mapped[int] = mapped_column(primary_key=True)
    portafolio: Mapped[str] = mapped_column(String(220), nullable=True)
    experiencia: Mapped[str] = mapped_column(String(220), nullable=True)
    cursos: Mapped[str] = mapped_column(String(220), nullable=True)
    capacitaciones: Mapped[str] = mapped_column(String(220), nullable=True)
    estudios: Mapped[str] = mapped_column(String(220), nullable=True)
    idiomas: Mapped[str] = mapped_column(String(220), nullable=True)
    tecnologia: Mapped[str] = mapped_column(String(220), nullable=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("usuarios.id"), nullable=True)

    usuario = relationship("User", back_populates="cv")

class Empresa(db.Model):
    __tablename__ = "empresa"

    id: Mapped[int] = mapped_column(primary_key=True)
    nombre: Mapped[str] = mapped_column(String(120), nullable=True)
    descripcion: Mapped[str] = mapped_column(String(250), nullable=True)
    ubicacion: Mapped[str] = mapped_column(String(120), nullable=True)
    sitio_web: Mapped[str] = mapped_column(String(220), nullable=True)

    correo: Mapped[str] = mapped_column(String(120), unique=True, nullable=False, index=True)
    telefono: Mapped[str] = mapped_column(String(120), nullable=False)
    rfc: Mapped[str] = mapped_column(String(13), nullable=False)


    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now(timezone.utc), nullable=False)


    trabajos = relationship("Trabajo", back_populates="empresa")
    postulaciones = relationship("Postulaciones", back_populates="empresa")



    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "contactos_disponibles": self.contactos_disponibles
            "nombre": self.nombre,
            "descripcion": self.descripcion,
            "ubicacion": self.ubicacion,
            "sitio_web": self.sitio_web,
            "correo": self.correo,
            "telefono": self.telefono
            "rfc": self.rfc

        }


class Trabajo(db.Model):
    __tablename__ = "trabajos"

    id: Mapped[int] = mapped_column(primary_key=True)
    empresa_id: Mapped[int] = mapped_column(ForeignKey("empresa.id"), nullable=True)
    modalidad: Mapped[str] = mapped_column(String(120), nullable=True)
    nombre_puesto: Mapped[str] = mapped_column(String(120), nullable=True)
    remuneracion: Mapped[int] = mapped_column(nullable=True)
    condiciones: Mapped[str] = mapped_column(String(250), nullable=True)
    responsabilidades: Mapped[str] = mapped_column(String(250), nullable=True)
    requerimientos: Mapped[str] = mapped_column(String(250), nullable=True)
    activo: Mapped[bool] = mapped_column(Boolean(), default=True, nullable=True)
    fecha_inicio: Mapped[datetime] = mapped_column(DateTime, nullable=True)
    fecha_vencimiento: Mapped[datetime] = mapped_column(DateTime, nullable=True)

    empresa = relationship("Empresa", back_populates="trabajos")
    postulaciones = relationship("Postulaciones", back_populates="trabajo")
    favoritos = relationship("Favorites", back_populates="trabajo")

class Postulaciones(db.Model):
    __tablename__ = "postulaciones"

    id: Mapped[int] = mapped_column(primary_key=True)
    id_trabajo: Mapped[int] = mapped_column(ForeignKey("trabajos.id"), nullable=True)
    id_empresa: Mapped[int] = mapped_column(ForeignKey("empresa.id"), nullable=True)
    id_trabajador: Mapped[int] = mapped_column(ForeignKey("usuarios.id"), nullable=True)

    trabajo = relationship("Trabajo", back_populates="postulaciones")
    empresa = relationship("Empresa", back_populates="postulaciones")
    trabajador = relationship("User", back_populates="postulaciones")

class Favorites(db.Model):
    __tablename__ = "favoritos"

    id: Mapped[int] = mapped_column(primary_key=True)
    id_trabajo: Mapped[int] = mapped_column(ForeignKey("trabajos.id"), nullable=False)
    id_trabajador: Mapped[int] = mapped_column(ForeignKey("usuarios.id"), nullable=False)

    trabajo = relationship("Trabajo", back_populates="favoritos")
    trabajador = relationship("User", back_populates="favoritos")

    def serialize(self):
        return {
            "id_trabajo": self.id_trabajo,
            "id_trabajador": self.id_trabajador
        }

    def __str__(self):
        return f"{self.id}, {self.id_trabajo}, {self.id_trabajador}"

class BlackListToken(db.Model):
    __tablename__ = "blacklist_tokens"

    id: Mapped[int] = mapped_column(primary_key=True)
    jti: Mapped[str] = mapped_column(String(40), nullable=True, index=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now(timezone.utc), nullable=True)
