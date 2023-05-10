from app.models import db, Pin, environment, SCHEMA

# Adds a demo user, you can add other users here if you want
def seed_pins():
    pin1 = Pin(
        title='Tulips', description='flower market', image_URL="https://i.pinimg.com/564x/46/cd/a9/46cda9d4c7f775f96eea8c2b8525e2d1.jpg", user_id=1)
    pin2 = Pin(
        title='Picnic', description='pastel color', image_URL="https://i.pinimg.com/564x/3e/92/fd/3e92fd5b585f8b1aa0c3e6708f2f1f97.jpg", user_id=2)
    pin3 = Pin(
        title='Interior', description='home design', image_URL="https://i.pinimg.com/564x/c6/2f/1f/c62f1f7927f8fa0f7dfdd57ee1db293e.jpg", user_id=3)
    pin4 = Pin(
        title='Santorini', description='vacation', image_URL="https://i.pinimg.com/564x/e3/46/9e/e3469eebf832cafe322a637a8474e57d.jpg", user_id=2)
    pin5 = Pin(
        title='Fruit tray', description='healthy snack ideas', image_URL="https://i.pinimg.com/474x/80/8b/6c/808b6cb9a493148443e39d38ccd233c5.jpg", user_id=3)
    pin6 = Pin(
        title='Breakfast', description='Avocado toast', image_URL="https://i.pinimg.com/564x/a1/c5/d4/a1c5d40a42c7c070707423dbdafa8f8a.jpg", user_id=1)
    pin7 = Pin(
        title='Dream Car', description='G-Wagon', image_URL="https://i.pinimg.com/564x/49/6a/ad/496aad6753e634854e03ed350d31b72a.jpg", user_id=2)
    pin8 = Pin(
        title='Places to go', description='Thailand', image_URL="https://i.pinimg.com/564x/7e/44/e6/7e44e6933645b3fe4b421ab2363cc7db.jpg", user_id=2)
    pin9 = Pin(
        title='Bedside table', description='interior', image_URL="https://i.pinimg.com/564x/a4/70/48/a47048d6b4aa282f2538ed2ff879115c.jpg", user_id=3)
    pin10 = Pin(
        title='A street in Mykonos', description='Greece', image_URL="https://i.pinimg.com/564x/00/9f/32/009f32dd597191f6b8dc8c18f8f4fcfc.jpg", user_id=3)
    pin11 = Pin(
        title='Spring', description='flowers', image_URL="https://i.pinimg.com/564x/ce/74/d3/ce74d370f9a24ec86d55c4eaa21294bb.jpg", user_id=3)

    pins = [pin1, pin2, pin3, pin4, pin5, pin6, pin7, pin8, pin9, pin10, pin11]
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
