from app.models import db, Board, environment, SCHEMA

# Adds a demo user, you can add other users here if you want
def seed_boards():
    board1 = Board(
        name='My first board', user_id=1)
    board2 = Board(
        name='healthy eating ideas', user_id=2)
    board3 = Board(
        name='Goals', user_id=3)
   

    boards = [board1, board2, board3]
    for board in boards:
        db.session.add(board)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_boards():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.boards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM boards")

    db.session.commit()
