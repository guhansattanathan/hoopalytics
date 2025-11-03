import sqlite3
import os

db_path = os.path.join(os.path.dirname(__file__), "../data/nba.sqlite")

db = sqlite3.connect(db_path)
cursor = db.cursor()

cursor.execute("SELECT * FROM game WHERE team_name_home = 'Toronto Huskies';")
print(cursor.fetchall())

def get_player_data(stat):

    query = f"""
        SELECT player_name, {stat}
        FROM PlayerStats
        WHERE {stat} IS NOT NULL
        ORDER BY {stat} DESC
    """

    try:
        with sqlite3.connect(db_path) as conn:
            cursor.execute(query)
            cursor.execute(query)
            rows = cursor.fetchall()
            return rows
    except Exception:
        print(f"Error: {Exception}")
        return []
