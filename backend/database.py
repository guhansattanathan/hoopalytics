import sqlite3
import os

db_path = os.path.join(os.path.dirname(__file__), "../data/nba.sqlite")

db = sqlite3.connect(db_path)
cursor = db.cursor()

cursor.execute("SELECT * FROM game WHERE team_name_home = 'Toronto Huskies';")
print(cursor.fetchall())
