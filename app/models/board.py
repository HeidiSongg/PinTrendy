from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from .board_pin import board_pins


class Board(db.Model):
    __tablename__ = 'boards'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String,nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    user = db.relationship("User", back_populates="board")
    pins = db.relationship(
        "Pin", 
        secondary=board_pins, 
        back_populates="boards"
    )

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'user': self.user.to_dict()
        }