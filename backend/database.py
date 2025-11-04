import sqlite3
import os
import pandas as pd
from heapsort import heap_sort
import time

csv_path = os.path.join(os.path.dirname(__file__), "../data/archive/PlayerStatistics.csv")

def get_averages(season_start='2025-10-20'):
    try:
        df = pd.read_csv(csv_path, usecols=['firstName', 'lastName', 'gameDate', 
                                            'points', 'reboundsTotal','assists', 
                                            'blocks', 'steals', 
                                            'fieldGoalsMade', 'fieldGoalsAttempted',
                                            'threePointersMade', 'threePointersAttempted', 
                                            'freeThrowsMade', 'freeThrowsAttempted', 
                                            'plusMinusPoints', 'gameType'])
        
        df['gameDate'] = pd.to_datetime(df['gameDate'], errors='coerce', utc=True)


        start = pd.Timestamp(season_start, tz="UTC")
        df = df[
            (df['gameDate'] >= start)]
        df['Player'] = df['firstName'] + ' ' + df['lastName']

        averages = (
            df.groupby('Player', as_index=False)
            .agg({'points': 'mean', 
                  'reboundsTotal': 'mean', 
                  'assists': 'mean',
                  'blocks': 'mean', 
                  'steals': 'mean', 
                  'fieldGoalsMade' : 'sum', 
                  'fieldGoalsAttempted' : 'sum',
                  'threePointersMade' : 'sum', 
                  'threePointersAttempted' : 'sum', 
                  'freeThrowsMade' : 'sum', 
                  'freeThrowsAttempted' : 'sum', 
                  'plusMinusPoints': 'mean'})
        )
        averages['fieldGoalsPercentage'] = 100 * averages['fieldGoalsMade'] / averages['fieldGoalsAttempted']
        averages['threePointersPercentage'] = 100 * averages['threePointersMade'] / averages['threePointersAttempted']
        averages['freeThrowsPercentage'] = 100 * averages['freeThrowsMade'] / averages['freeThrowsAttempted']

        averages = averages.round(1)

        averages.rename(columns={'points': 'PPG', 
                                 'assists': 'APG', 
                                 'reboundsTotal': 'RPG',
                                 'steals': 'STL', 
                                 'blocks': 'BLK', 
                                 'fieldGoalsPercentage': 'FG%',
                                 'threePointersPercentage': '3P%', 
                                 'freeThrowsPercentage': 'FT%', 
                                 'plusMinusPoints': '+/-'}, inplace=True)
        
        averages[['FG%', '3P%', 'FT%']] = averages[['FG%', '3P%', 'FT%']].fillna(0.0)

        return averages

    except Exception as e:
        print(f"Error loading data: {e}")
        return pd.DataFrame()



if __name__ == "__main__":
    print("\nTop players:")

    df = get_averages(season_start="2025-10-20")

    players = df.to_dict(orient='records')

    stat = 'APG'

    #see how long heap takes
    start_time = time.time()

    heap_sorted = heap_sort(players, key=stat, reverse=True)

    #end heap timer
    end_time = time.time()
    elapsed = end_time - start_time

    print(f"Top 10 players by {stat} (Heap Sort):")
    for p in heap_sorted[:10]:
        print(f"{p['Player']:25s} {p[stat]:6.1f}")

    print(f"\nHeap sort completed in {elapsed:.6f} seconds.")

