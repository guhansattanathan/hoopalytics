from django.http import JsonResponse
import os, pandas as pd, time
from .heapsort import heap_sort
from .mergesort import merge_sort

csv_path = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "../../data/archive/PlayerStatistics.csv")
)

def get_averages(season_start='2025-10-20'):
    try:
        df = pd.read_csv(csv_path, usecols=[
            'firstName', 'lastName', 'gameDate',
            'points', 'reboundsTotal','assists',
            'blocks', 'steals',
            'fieldGoalsMade','fieldGoalsAttempted',
            'threePointersMade','threePointersAttempted',
            'freeThrowsMade','freeThrowsAttempted',
            'plusMinusPoints','gameType'
        ])
        df.columns = df.columns.str.strip().str.replace(' ', '', regex=False).str.replace('±', '+/-', regex=False)
        df['gameDate'] = pd.to_datetime(df['gameDate'], errors='coerce', utc=True)
        df = df[df['gameDate'] >= pd.Timestamp(season_start, tz="UTC")]
        df['Player'] = df['firstName'] + ' ' + df['lastName']
        averages = (
            df.groupby('Player', as_index=False)
            .agg({'points':'mean','reboundsTotal':'mean','assists':'mean',
                  'blocks':'mean','steals':'mean',
                  'fieldGoalsMade':'sum','fieldGoalsAttempted':'sum',
                  'threePointersMade':'sum','threePointersAttempted':'sum',
                  'freeThrowsMade':'sum','freeThrowsAttempted':'sum',
                  'plusMinusPoints':'mean'})
        )
        averages['FG%'] = 100 * averages['fieldGoalsMade'] / averages['fieldGoalsAttempted']
        averages['3P%'] = 100 * averages['threePointersMade'] / averages['threePointersAttempted']
        averages['FT%'] = 100 * averages['freeThrowsMade'] / averages['freeThrowsAttempted']
        averages = averages.round(1)
        averages[['FG%','3P%','FT%']] = averages[['FG%','3P%','FT%']].fillna(0)
        averages.rename(columns={'points':'PPG','assists':'APG','reboundsTotal':'RPG',
                                 'blocks':'BLK','steals':'STL','plusMinusPoints':'+/-'}, inplace=True)
        return averages
    except Exception as e:
        print(e)
        return pd.DataFrame()

def top_players_view(request):
    stat = request.GET.get('stat','APG')
    df = get_averages()
    if df.empty:
        return JsonResponse({'error':'Failed to load data.'}, status=500)

    players = df.to_dict(orient='records')

    start_heap = time.time()
    heap_sorted = heap_sort(players, key=stat, reverse=True)
    heap_time = round(time.time() - start_heap, 6)

    start_merge = time.time()
    merge_sorted = merge_sort(players, key=stat, reverse=True)
    merge_time = round(time.time() - start_merge, 6)

    return JsonResponse({
        'stat': stat,
        'top_heap_sorted': heap_sorted[:10],
        'top_merge_sorted': merge_sorted[:10],
        'heap_sort_time': heap_time,
        'merge_sort_time': merge_time
    }, safe=False)
