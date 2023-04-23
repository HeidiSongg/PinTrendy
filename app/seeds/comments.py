from app.models import db, Comment, environment, SCHEMA

# Adds a demo user, you can add other users here if you want
def seed_comments():
    comment1 = Comment(
        body='Lovely!', pin_id=1, user_id=2)
    comment2 = Comment(
        body='Dream date goal', pin_id=2, user_id=1)
    comment3 = Comment(
        body='Where is the mirror from?', pin_id=3, user_id=1)
   

    comments = [comment1, comment2, comment3]
    for comment in comments:
        db.session.add(comment)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM comments")

    db.session.commit()
