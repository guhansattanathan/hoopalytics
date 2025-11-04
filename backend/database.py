import sqlite3
import os
import pandas as pd

csv_path = os.path.join(os.path.dirname(__file__), "../data/archive/PlayerStatistics.csv")

def get_averages(stat='points', season_start='2025-10-01'):
    try:
        df = pd.read_csv(csv_path, usecols=['firstName', 'lastName', 'gameDate', 'points', 'reboundsTotal','assists', 
                                            'blocks', 'steals', 'fieldGoalsPercentage', 'threePointersPercentage', 
                                            'freeThrowsPercentage', 'plusMinusPoints'])
        df['gameDate'] = pd.to_datetime(df['gameDate'], errors='coerce')
        df = df[df['gameDate'] >= pd.Timestamp(season_start)]
        df['Player'] = df['firstName'] + ' ' + df['lastName']

        averages = (
            df.groupby('Player', as_index=False)
            .agg({'points': 'mean', 'assists': 'mean', 'blocks': 'mean'})
            .round(1)
        )

        averages.rename(columns={'points': 'PPG', 'assists': 'APG', 'blocks': 'BPG'}, inplace=True)

        sort_col = {'points': 'PPG', 'assists': 'APG', 'blocks': 'BPG'}[stat]
        averages = averages.sort_values(sort_col, ascending=False)

        return averages

    except Exception as e:
        print(f"Error loading data: {e}")
        return pd.DataFrame()



if __name__ == "__main__":
    with sqlite3.connect(db_path) as conn:
        cur = conn.cursor()
        cur.execute("SELECT name FROM sqlite_master WHERE type='table';")
        print("Tables in this database:")
        for table in cur.fetchall():
            print(" -", table[0])

    print("\nTop players by PPG:")
    df = get_player_data("PTS", season_start="2025-10-15")
    print(df.head(10))