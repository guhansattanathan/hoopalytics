# part for custom coefficient to covert to scores
def calculateOne(coefficients: list[float], player_data: list[int]) -> float:
    # only for one player
    temp = min(len(coefficients), len(player_data))
    score = 0.0
    for i in range(temp):
        score = score + coefficients[i] * player_data[i]
    return score


def calculateAll(
    coefficients: list[float], all_player_data: list[list[int]]
) -> list[float]:
    """
    Calculates the scores for a list of players
    """
    res = []
    for data in all_player_data:
        res.append(calculateOne(coefficients, data))

    return res

#original merge sort
# part for merge sort
def mergeSort(arr: list[float]) -> list[float]:
    # base
    if (len(arr)) <= 1:
        return arr
    mid = len(arr) // 2
    left = arr[:mid]  # pyton slicing
    right = arr[mid:]
    sortedLeft = mergeSort(left)
    sortedRight = mergeSort(right)  # divide and conquer
    return merge(sortedLeft, sortedRight)  # this is the key. call helper


def merge(left: list[float], right: list[float]) -> list[float]:
    res = []
    i, j = 0, 0
    while i < len(left) and j < len(right):
        if left[i] > right[i]:
            res.append(right[j])
            j += 1
        else:
            res.append(left[i])
            i += 1
    for a in left[i:]:
        res.append(a)
    for b in right[j:]:
        res.append(b)
    return res
