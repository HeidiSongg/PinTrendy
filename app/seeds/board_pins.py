from app.models import db, Board, Pin,  environment, SCHEMA


def seed_board_pins():
    board4 = Board(
        name='Inspirations', user_id=1)
    pin12 =  Pin(
        title= 'Quotes', description='positive energy', image_URL="https://i.pinimg.com/564x/96/51/04/965104b3f041f4a50b829388964e2a18.jpg", user_id=1)
    
    db.session.add(board4)
    db.session.add(pin12)
    board4.pins.append(pin12)

    db.session.commit()