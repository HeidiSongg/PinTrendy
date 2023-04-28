from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from .board_pin import board_pins

class Pin(db.Model):
    __tablename__ = 'pins'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    image_URL = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    user = db.relationship("User", back_populates="pin")
    comment = db.relationship("Comment", back_populates="pin")
    boards = db.relationship(
        "Board", 
        secondary=board_pins, 
        back_populates="pins"
    )

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'image_URL': self.image_URL,
            'user': self.user.to_dict(),
            'comments': { comment.id: comment.to_dict() for comment in self.comment }
        }

    def to_dict_flat_pin(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'image_URL': self.image_URL,
            'user': self.user.to_dict()
        }
