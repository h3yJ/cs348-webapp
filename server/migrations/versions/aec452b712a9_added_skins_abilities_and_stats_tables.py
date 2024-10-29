"""Added skins, abilities, and stats tables

Revision ID: aec452b712a9
Revises: 3a55831d399e
Create Date: 2024-10-28 18:41:24.868756

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'aec452b712a9'
down_revision = '3a55831d399e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('abilities',
    sa.Column('ability_id', sa.Integer(), nullable=False),
    sa.Column('champion_id', sa.Integer(), nullable=False),
    sa.Column('ability_name', sa.String(length=50), nullable=False),
    sa.Column('ability_type', sa.String(length=50), nullable=False),
    sa.Column('description', sa.Text(), nullable=True),
    sa.ForeignKeyConstraint(['champion_id'], ['champions.champion_id'], ),
    sa.PrimaryKeyConstraint('ability_id')
    )
    op.create_table('champion_stats',
    sa.Column('stat_id', sa.Integer(), nullable=False),
    sa.Column('champion_id', sa.Integer(), nullable=False),
    sa.Column('health', sa.Float(), nullable=False),
    sa.Column('health_growth', sa.Float(), nullable=False),
    sa.Column('attack_damage', sa.Float(), nullable=False),
    sa.Column('attack_growth', sa.Float(), nullable=False),
    sa.Column('armor', sa.Float(), nullable=False),
    sa.Column('armor_growth', sa.Float(), nullable=False),
    sa.Column('magic_resist', sa.Float(), nullable=False),
    sa.Column('magic_resist_growth', sa.Float(), nullable=False),
    sa.Column('movement_speed', sa.Float(), nullable=False),
    sa.Column('attack_range', sa.Float(), nullable=False),
    sa.ForeignKeyConstraint(['champion_id'], ['champions.champion_id'], ),
    sa.PrimaryKeyConstraint('stat_id')
    )
    op.create_table('skins',
    sa.Column('skin_id', sa.Integer(), nullable=False),
    sa.Column('champion_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.Column('rarity', sa.String(length=50), nullable=False),
    sa.Column('price', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['champion_id'], ['champions.champion_id'], ),
    sa.PrimaryKeyConstraint('skin_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('skins')
    op.drop_table('champion_stats')
    op.drop_table('abilities')
    # ### end Alembic commands ###