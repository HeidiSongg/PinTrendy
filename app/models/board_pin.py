from .db import db, environment, SCHEMA, add_prefix_for_prod
board_pins = db.Table(
    "board_pins",
    db.Column(
        "board_id", 
        db.Integer, 
        db.ForeignKey("boards.id"), 
        primary_key=True
    ),
    db.Column(
        "pin_id", 
        db.Integer, 
        db.ForeignKey("pins.id"), 
        primary_key=True
    )
)