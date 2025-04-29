  
import os
from flask_admin import Admin
from .models import db, User, Favorites,Perfil, CV, Empresa,Trabajo, Postulacion
from flask_admin.contrib.sqla import ModelView

class FavoriteAdmin(ModelView):
    column_list = ('id', 'id_trabajo', 'id_trabajador')



def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    # Add your models here, for example this is how we add the User model to the admin
    admin.add_view(ModelView(User, db.session))
    admin.add_view(FavoriteAdmin(Favorites, db.session))
    admin.add_view(ModelView(Perfil, db.session))
    admin.add_view(ModelView(CV, db.session))
    admin.add_view(ModelView(Empresa, db.session))
    admin.add_view(ModelView(Trabajo, db.session))
    admin.add_view(ModelView(Postulacion, db.session))
    # You can duplicate that line to add new models
    # admin.add_view(ModelView(YourModelName, db.session))
