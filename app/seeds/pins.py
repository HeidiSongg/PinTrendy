from app.models import db, Pin, environment, SCHEMA

# Adds a demo user, you can add other users here if you want
def seed_pins():
    pin1 = Pin(
        title='Tulips', description='flower market', image_URL="https://i.pinimg.com/564x/46/cd/a9/46cda9d4c7f775f96eea8c2b8525e2d1.jpg", user_id=1)
    pin2 = Pin(
        title='Picnic', description='pastel color', image_URL="https://i.pinimg.com/564x/3e/92/fd/3e92fd5b585f8b1aa0c3e6708f2f1f97.jpg", user_id=2)
    pin3 = Pin(
        title='Interior', description='home design', image_URL="https://i.pinimg.com/564x/c6/2f/1f/c62f1f7927f8fa0f7dfdd57ee1db293e.jpg", user_id=3)
   

    pins = [pin1, pin2, pin3]
    for pin in pins:
        db.session.add(pin)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_pins():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.pins RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM pins")

    db.session.commit()
