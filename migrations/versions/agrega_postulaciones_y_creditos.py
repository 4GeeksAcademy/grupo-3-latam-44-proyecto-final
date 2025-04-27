"""Agrega tabla postulaciones y campo contactos_disponibles a User

Revision ID: agrega_postulaciones_y_creditos
Revises: 53efd8b854af
Create Date: 2025-04-23 10:00:00.000000
"""

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = 'agrega_postulaciones_y_creditos'
down_revision = '53efd8b854af'
branch_labels = None
depends_on = None

def upgrade():
    # 👉 Agrega campo a la tabla user
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('contactos_disponibles', sa.Integer(), nullable=False, server_default='0'))

    # 👉 Crea la tabla postulaciones
    op.create_table(
        'postulaciones',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('id_trabajo', sa.Integer(), sa.ForeignKey('trabajos.id'), nullable=False),
        sa.Column('id_trabajador', sa.Integer(), sa.ForeignKey('user.id'), nullable=False)
    )

def downgrade():
    # 👈 Elimina la tabla postulaciones
    op.drop_table('postulaciones')

    # 👈 Elimina el campo de la tabla user
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.drop_column('contactos_disponibles')
