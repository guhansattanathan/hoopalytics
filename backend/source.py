
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

#merge . ork with the other function
# get 2 compare one by one and put in.
#base case of 1 is implied to be sorted
def merge(left: list[float], right: list[float]) -> list[float]:
    res = []
    i, j = 0, 0
    while i < len(left) and j < len(right):
        if left[i] >= right[j]:
            res.append(left[i])
            i += 1
        else:
            res.append(right[j])
            j += 1
    for a in left[i:]:
        res.append(a)
    for b in right[j:]:
        res.append(b)
    return res
