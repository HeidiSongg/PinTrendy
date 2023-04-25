from app.models import db, Board, Pin,  environment, SCHEMA


def seed_board_pins():
    board4 = Board(
        name='My first board', user_id=1)
    pin4 =  Pin(
        title= 'Test', description='flower market', image_URL="https://i.pinimg.com/564x/46/cd/a9/46cda9d4c7f775f96eea8c2b8525e2d1.jpg", user_id=1)
    
    db.session.add(board4)
    db.session.add(pin4)
    board4.pins.append(pin4)

    db.session.commit()