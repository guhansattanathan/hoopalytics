#build the heap
def heapify(players, size, root, reverse=False):
    #initialize the largest
    largest = root

    #children
    left_child = 2 * root + 1
    right_child = 2 * root + 2

    #see if left child is bigger than root
    if left_child < size and players[root] < players[left_child]:
        largest = left_child

    #see if right child is bigger than root
    if right_child < size and players[root] < players[right_child]:
        largest = right_child

    #swap places a child is bigger than root, heapify root
    if largest != root:
        (players[root], players[largest]) = (players[largest], players[root])
        heapify(players, size, largest)


def build_heap(players):
    size = len(players)
    for i in range(size // 2 - 1, -1, -1):
        heapify(players, size, i)


def heap_sort(players):
    players = players.copy()
    build_heap(players)