# day 7 exercises - complexity and structures practice
import time
from collections import deque

# ---------------------------------------------------------
# ex 1 - big-o comments
# ---------------------------------------------------------
# 1. list index lookup (eg lst[3]):
#    O(1) constant time. python knows array memory positions 
#    directly so it calculates the index instantly without checking others.
#
# 2. single loop (eg checking every item):
#    O(n) linear time. execution drops or climbs exactly with
#    how many items are inside the collection.
#
# 3. nested loops (loop inside another loop):
#    O(n^2) quadratic time. for every single cycle of the top loop,
#    the inner loop has to reset and spin all over again.
#
# 4. dict value lookup (eg dct['my_key']):
#    O(1) constant time average. dict uses a hash mapping index
#    to jump straight to data location without scanning.
#
# 5. binary search tree/array split:
#    O(log n) logarithmic time. every round narrows down the 
#    remaining sorted array choices exactly in half.

# ---------------------------------------------------------
# ex 2 - matching timing performance lists vs dicts
# ---------------------------------------------------------
print("=== EXERCISE 2: RUNNING TIMING CHECKS ===")

n = 100000
my_lst = []
my_dct = {}

# populating using plain student loops instead of complex line comps
for i in range(n):
    val = f"ACC-{i}"
    my_lst.append(val)
    my_dct[val] = i

# looking up an item sitting way down at the back edge
target_id = f"ACC-{n - 4}"

# tracking list time
start1 = time.perf_counter()
chk1 = target_id in my_lst
end1 = time.perf_counter()
t1 = end1 - start1

# tracking dict time
start2 = time.perf_counter()
chk2 = target_id in my_dct
end2 = time.perf_counter()
t2 = end2 - start2

print(f"list find took: {t1:.6f} s")
print(f"dict find took: {t2:.6f} s")
print(f"speed check dict faster: {t2 < t1}")
print()

# ---------------------------------------------------------
# ex 3 - simple lifo stack to flip string entries
# ---------------------------------------------------------
print("=== EXERCISE 3: POPPING STACK STRINGS ===")

class Stack:
    def __init__(self):
        self.arr = []

    def push(self, item):
        self.arr.append(item)

    def pop(self):
        if not self.arr:
            return None
        return self.arr.pop()

    def peek(self):
        if not self.arr:
            return None
        return self.arr[-1]


names_list = ["Feneti", "Abdi", "Chala", "Aster"]
print(f"normal: {names_list}")

stk = Stack()
for name in names_list:
    stk.push(name)

backwards = []
while len(stk.arr) > 0:
    backwards.append(stk.pop())

print(f"flipped: {backwards}")
print()

# ---------------------------------------------------------
# ex 4 - fifo system handling line using deque
# ---------------------------------------------------------
print("=== EXERCISE 4: DEQUE LINE QUEUE ===")

# setting up customer queue lineup
q = deque()

q.append("customer_1")
q.append("customer_2")
q.append("customer_3")
q.append("customer_4")
q.append("customer_5")
print(f"queue length: {len(q)}")

# empty out from the left slot
while len(q) > 0:
    current_person = q.popleft()
    print(f"serving -> {current_person}")
print()

# ---------------------------------------------------------
# ex 5 - standard custom single linked list node sequence
# ---------------------------------------------------------
print("=== EXERCISE 5: LINKED LIST TRAVERSAL ===")

class Node:
    def __init__(self, data):
        self.data = data
        self.next = None


class LinkedList:
    def __init__(self):
        self.head = None

    def push_front(self, data):
        node = Node(data)
        node.next = self.head
        self.head = node

    def print_all(self):
        runner = self.head
        if runner is None:
            print("empty node chain")
            return
            
        while runner is not None:
            print(f"[{runner.data}] -> ", end="")
            runner = runner.next
        print("None")


chain = LinkedList()
chain.push_front("node_c")
chain.push_front("node_b")
chain.push_front("node_a")

chain.print_all()