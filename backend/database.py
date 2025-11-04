import sqlite3
import os
import pandas as pd

csv_path = os.path.join(os.path.dirname(__file__), "../data/archive/PlayerStatistics.csv")

def get_averages(stat='points', season_start='2025-10-20'):
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
    print("\nFirst players:")

    df = get_averages(stat="points", season_start="2025-10-20")

    if not df.empty:
        print(df[['Player', 'PPG', 'RPG', 'APG', 'STL', 'BLK', 'FG%', '3P%', 'FT%', '+/-']].head(10))
    else:
        print("No data loaded — check your CSV path or column names.")

