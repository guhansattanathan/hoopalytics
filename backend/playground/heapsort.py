#build the heap
def heapify(players, size, root, key, reverse=False):
    #initialize the largest
    largest = root

    #children
    left_child = 2 * root + 1
    right_child = 2 * root + 2

    def compare(i, j):
        if reverse:
            return players[i][key] > players[j][key]
        else:
            return players[i][key] < players[j][key]

    #see if left child is bigger than root
    if left_child < size and compare(largest, left_child):
        largest = left_child

    #see if right child is bigger than root
    if right_child < size and compare(largest, right_child):
        largest = right_child

    #swap places a child is bigger than root, heapify root
    if largest != root:
        players[root], players[largest] = players[largest], players[root]
        heapify(players, size, largest, key, reverse)

# build heap from the bottom to top
def build_heap(players, key, reverse=False):
    size = len(players)
    # last non-leaf to upward
    for i in range(size // 2 - 1, -1, -1):
        #each subtree satisfies heap
        heapify(players, size, i, key, reverse)

# heap sort on players list
def heap_sort(players, key, reverse=False):
    # copy so original not modified
    players = players.copy()
    size = len(players)
    #build heap structure
    build_heap(players, key, reverse)

    #get heap elements one at a time
    for i in range(size-1, 0, -1):
        #move current largest elem to end and restore
        players[i], players[0] = players[0], players[i]
        heapify(players, i , 0, key, reverse)

    return players

