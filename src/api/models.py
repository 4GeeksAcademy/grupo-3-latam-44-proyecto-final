from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, DateTime, ForeignKey, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime, timezone

# Inicializa la instancia de la base de datos

db = SQLAlchemy()

# ------------------ MODELO EMPRESA ------------------
class Empresa(db.Model):
    __tablename__ = "empresa"

    id: Mapped[int] = mapped_column(primary_key=True)
    nombre: Mapped[str] = mapped_column(String(120), nullable=True)
    razon_social: Mapped[str] = mapped_column(String(120), nullable=True)
    nombrerp: Mapped[str] = mapped_column(String(120), nullable=True)
    apellidorp: Mapped[str] = mapped_column(String(120), nullable=True)
    descripcion: Mapped[str] = mapped_column(String(250), nullable=True)
    direccion: Mapped[str] = mapped_column(String(120), nullable=True)
    sitio_web: Mapped[str] = mapped_column(String(220), nullable=True)
    password: Mapped[str] = mapped_column(nullable=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False, index=True)
    telefono: Mapped[str] = mapped_column(String(120), nullable=True)
    rfc: Mapped[str] = mapped_column(String(13), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now(timezone.utc), nullable=False)

    trabajos = relationship("Trabajo", back_populates="empresa")
    postulaciones = relationship("Postulacion", back_populates="empresa")
    creditos = relationship("CreditoEmpresa", back_populates="empresa", cascade="all, delete-orphan")
    consumos = relationship("ConsumoCredito", back_populates="empresa", cascade="all, delete-orphan")

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "razon_social": self.razon_social,
            "email": self.email,
            "nombrerp": self.nombrerp,
            "apellidorp": self.apellidorp,
            "descripcion": self.descripcion,
            "direccion": self.direccion,
            "sitio_web": self.sitio_web,
            "telefono": self.telefono,
            "rfc": self.rfc
        }

# ------------------ USUARIO ------------------
class User(db.Model):
    __tablename__ = "usuarios"

    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=True, index=True)
    password: Mapped[str] = mapped_column(nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=True)
    nombre: Mapped[str] = mapped_column(String(120), nullable=True)
    apellido: Mapped[str] = mapped_column(String(120), nullable=True)
    numero: Mapped[str] = mapped_column(String(120), unique=True, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now(timezone.utc), nullable=True)

    perfil = relationship("Perfil", back_populates="usuario", uselist=False, cascade="all, delete-orphan")
    cv = relationship("CV", back_populates="usuario", uselist=False, cascade="all, delete-orphan")
    postulaciones = relationship("Postulacion", back_populates="trabajador")
    favoritos = relationship("Favorites", back_populates="trabajador")

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "nombre": self.nombre,
            "apellido": self.apellido,
            "numero": self.numero
        }

# ------------------ PERFIL ------------------
class Perfil(db.Model):
    __tablename__ = "perfiles"

    id: Mapped[int] = mapped_column(primary_key=True)
    fecha_nacimiento: Mapped[str] = mapped_column(String(120), nullable=True)
    lugar: Mapped[str] = mapped_column(String(220), nullable=True)
    acerca: Mapped[str] = mapped_column(String(220), nullable=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("usuarios.id"), nullable=True)

    usuario = relationship("User", back_populates="perfil")

    def serialize(self):
        return {
            "id": self.id,
            "fecha_nacimiento": self.fecha_nacimiento,
            "lugar": self.lugar,
            "acerca": self.acerca
        }

# ------------------ CV ------------------
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

    def serialize(self):
        return {
            "id": self.id,
            "portafolio": self.portafolio,
            "experiencia": self.experiencia,
            "cursos": self.cursos,
            "capacitaciones": self.capacitaciones,
            "estudios": self.estudios,
            "idiomas": self.idiomas,
            "tecnologia": self.tecnologia,
            "user_id": self.user_id
        }

# ------------------ TRABAJO ------------------
class Trabajo(db.Model):
    __tablename__ = "trabajos"

    id: Mapped[int] = mapped_column(primary_key=True)
    empresa_id: Mapped[int] = mapped_column(ForeignKey("empresa.id"), nullable=True)
    nombre_puesto: Mapped[str] = mapped_column(String(120), nullable=True)
    modalidad: Mapped[str] = mapped_column(String(120), nullable=True)
    remuneracion: Mapped[int] = mapped_column(nullable=True)
    moneda: Mapped[str] = mapped_column(String(10), default="MXN", nullable=True)
    descripcion_puesto: Mapped[str] = mapped_column(String(500), nullable=True)
    requerimientos: Mapped[str] = mapped_column(String(250), nullable=True)
    responsabilidades: Mapped[str] = mapped_column(String(250), nullable=True)
    jornada: Mapped[str] = mapped_column(String(100), nullable=True)
    dias_laborales: Mapped[str] = mapped_column(String(100), nullable=True)
    turnos: Mapped[str] = mapped_column(String(150), nullable=True)
    equipo_utilizado: Mapped[str] = mapped_column(String(200), nullable=True)
    peligros: Mapped[str] = mapped_column(String(250), nullable=True)
    demandas_fisicas: Mapped[str] = mapped_column(String(250), nullable=True)
    estado: Mapped[str] = mapped_column(String(30), default="Activa", nullable=True)
    activo: Mapped[bool] = mapped_column(Boolean(), default=True, nullable=True)
    fecha_publicacion: Mapped[datetime] = mapped_column(DateTime, nullable=True)
    fecha_vencimiento: Mapped[datetime] = mapped_column(DateTime, nullable=True)

    empresa = relationship("Empresa", back_populates="trabajos")
    postulaciones = relationship("Postulacion", back_populates="trabajo")
    favoritos = relationship("Favorites", back_populates="trabajo")

    def serialize(self):
        return {
            "id": self.id,
            "empresa_id": self.empresa_id,
            "nombre_puesto": self.nombre_puesto,
            "modalidad": self.modalidad,
            "remuneracion": self.remuneracion,
            "moneda": self.moneda,
            "descripcion_puesto": self.descripcion_puesto,
            "requerimientos": self.requerimientos,
            "responsabilidades": self.responsabilidades,
            "jornada": self.jornada,
            "dias_laborales": self.dias_laborales,
            "turnos": self.turnos,
            "equipo_utilizado": self.equipo_utilizado,
            "peligros": self.peligros,
            "demandas_fisicas": self.demandas_fisicas,
            "estado": self.estado,
            "activo": self.activo,
            "fecha_publicacion": self.fecha_publicacion,
            "fecha_vencimiento": self.fecha_vencimiento
        }

# ------------------ POSTULACION ------------------
class Postulacion(db.Model):
    __tablename__ = "postulacion"

    id: Mapped[int] = mapped_column(primary_key=True)
    id_trabajo: Mapped[int] = mapped_column(ForeignKey("trabajos.id"), nullable=True)
    id_empresa: Mapped[int] = mapped_column(ForeignKey("empresa.id"), nullable=True)
    id_trabajador: Mapped[int] = mapped_column(ForeignKey("usuarios.id"), nullable=True)

    trabajo = relationship("Trabajo", back_populates="postulaciones")
    empresa = relationship("Empresa", back_populates="postulaciones")
    trabajador = relationship("User", back_populates="postulaciones")

    def serialize(self):
        return {
            "id": self.id,
            "id_trabajo": self.id_trabajo,
            "id_empresa": self.id_empresa,
            "id_trabajador": self.id_trabajador
        }

# ------------------ FAVORITOS ------------------
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

# ------------------ CRÉDITOS ------------------
class CreditoEmpresa(db.Model):
    __tablename__ = 'creditos_empresa'

    id: Mapped[int] = mapped_column(primary_key=True)
    empresa_id: Mapped[int] = mapped_column(ForeignKey("empresa.id"))
    paquete: Mapped[str] = mapped_column(String(50))
    total_creditos: Mapped[int] = mapped_column(Integer, nullable=False)
    creditos_usados: Mapped[int] = mapped_column(Integer, default=0)
    fecha_compra: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    vigencia_inicio: Mapped[datetime] = mapped_column(DateTime)
    vigencia_fin: Mapped[datetime] = mapped_column(DateTime)
    numero_consecutivo: Mapped[int] = mapped_column(Integer, nullable=False)
    folio_aleatorio: Mapped[str] = mapped_column(String(12), nullable=False, unique=True)

    empresa = relationship("Empresa", back_populates="creditos")

    @property
    def creditos_disponibles(self):
        return self.total_creditos - self.creditos_usados

# ------------------ CONSUMO CRÉDITOS ------------------
class ConsumoCredito(db.Model):
    __tablename__ = 'consumos_credito'

    id: Mapped[int] = mapped_column(primary_key=True)
    empresa_id: Mapped[int] = mapped_column(ForeignKey("empresa.id"))
    postulante_id: Mapped[int] = mapped_column(Integer)
    vacante_id: Mapped[int] = mapped_column(Integer)
    tipo_accion: Mapped[str] = mapped_column(String(50))
    fecha_consumo: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    empresa = relationship("Empresa", back_populates="consumos")

# ------------------ TOKEN ------------------
class BlackListToken(db.Model):
    __tablename__ = "blacklist_tokens"

    id: Mapped[int] = mapped_column(primary_key=True)
    jti: Mapped[str] = mapped_column(String(40), nullable=True, index=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now(timezone.utc), nullable=True)
