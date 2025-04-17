from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean
from sqlalchemy.orm import Mapped, mapped_column

db = SQLAlchemy()

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
            # do not serialize the password, its a security breach
        }
      
      
class Favorites(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    id_trabajo: Mapped[int] = mapped_column(nullable=False)
      
    def serialize(self):
        return {
            "id_trabajo": self.id_trabajor,
            "id_trabajador": self.id_trabajador,
        }