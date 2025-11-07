
# part for merge sort
def merge_sort(players: list[dict], key: str, reverse: bool = False) -> list[dict]:
    # base
    if (len(players)) <= 1:
        return players
    
    mid = len(players) // 2
    left = players[:mid]  # pyton slicing
    right = players[mid:]
    sortedLeft = merge_sort(left, key, reverse)
    sortedRight = merge_sort(right, key, reverse)  # divide and conquer
    return merge(sortedLeft, sortedRight, key, reverse)  # this is the key. call helper

#merge . ork with the other function
# get 2 compare one by one and put in.
#base case of 1 is implied to be sorted
def merge(left: list[dict], right: list[dict], key: str, reverse: bool = False) -> list[dict]:
    res = []
    i, j = 0, 0

    while i < len(left) and j < len(right):
        if reverse:
            if reverse:
            # descending order (like top PPG)
                if left[i][key] > right[j][key]:
                    res.append(left[i])
                    i += 1
                else:
                    res.append(right[j])
                    j += 1
            else:
            # ascending order
                if left[i][key] < right[j][key]:
                    res.append(left[i])
                    i += 1
                else:
                    res.append(right[j])
                    j += 1

    res.extend(left[i:])
    res.extend(right[j:])
    return res
