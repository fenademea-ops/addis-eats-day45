# =====================================================================
# Day 09 Practice: Trees, Graphs, and Priority Queues
# =====================================================================

import heapq
from collections import deque


# --- Exercise 1: Build a Binary Search Tree (BST) & In-Order Traversal ---
class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None


def insert(root, value):
    # If tree is empty, create the root node
    if root is None:
        return Node(value)

    # Standard BST insertion rules
    if value < root.value:
        root.left = insert(root.left, value)
    elif value > root.value:
        root.right = insert(root.right, value)

    return root


def in_order_traversal(root):
    """Left -> Root -> Right (Produces sorted values for a BST)"""
    if root is None:
        return []

    return (
        in_order_traversal(root.left)
        + [root.value]
        + in_order_traversal(root.right)
    )


# --- Exercise 2: Tree Depth / Height ---
def height(node):
    """Recursively calculates the maximum depth of a binary tree."""
    # Base case: Empty tree/leaf child has height 0
    if node is None:
        return 0

    left_height = height(node.left)
    right_height = height(node.right)

    # 1 + maximum height between left and right subtrees
    return 1 + max(left_height, right_height)


# --- Exercise 3: Graph BFS (Breadth-First Search) ---
def bfs(graph, start):
    """Explores the graph level-by-level using a FIFO queue."""
    visited = set([start])
    queue = deque([start])

    while queue:
        vertex = queue.popleft()
        for neighbor in graph.get(vertex, []):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)

    return visited


# --- Exercise 4: Graph DFS (Depth-First Search) ---
def dfs(graph, start, visited=None, visit_order=None):
    """Recursively explores as deep as possible along each branch."""
    if visited is None:
        visited = set()
    if visit_order is None:
        visit_order = []

    visited.add(start)
    visit_order.append(start)

    for neighbor in graph.get(start, []):
        if neighbor not in visited:
            dfs(graph, neighbor, visited, visit_order)

    return visit_order


# =====================================================================
# Main Execution & Verification
# =====================================================================
if __name__ == "__main__":
    print("=== Exercise 1: BST In-Order Traversal ===")
    balances = [5000, 2000, 10000, 1500, 3500, 8000, 12000]
    root = None

    for b in balances:
        root = insert(root, b)

    sorted_balances = in_order_traversal(root)
    print(f"Inserted balances: {balances}")
    print(f"In-order result:   {sorted_balances}\n")

    print("=== Exercise 2: Tree Depth ===")
    tree_height = height(root)
    print(f"Tree depth/height: {tree_height}\n")

    print("=== Exercise 3 & 4: Graph BFS vs. DFS ===")
    # Adjacency list representation of a bank network/graph
    bank_graph = {
        "Branch_A": ["Branch_B", "Branch_C"],
        "Branch_B": ["Branch_A", "Branch_D", "Branch_E"],
        "Branch_C": ["Branch_A", "Branch_F"],
        "Branch_D": ["Branch_B"],
        "Branch_E": ["Branch_B", "Branch_F"],
        "Branch_F": ["Branch_C", "Branch_E"],
    }

    start_node = "Branch_A"

    reachable_bfs = bfs(bank_graph, start_node)
    dfs_order = dfs(bank_graph, start_node)

    print(f"BFS Reachable Vertices from '{start_node}': {reachable_bfs}")
    print(f"DFS Visit Order starting from '{start_node}':  {dfs_order}\n")

    print("=== Exercise 5: Priority Queue with heapq ===")
    tasks = [
        (3, "Audit account transactions"),
        (1, "Process critical fraud alert"),
        (4, "Generate end-of-month statements"),
        (2, "Approve loan application"),
        (5, "Clean database temp logs"),
    ]

    # Create empty min-heap list
    pq = []

    # Push all tuples into the priority queue
    for task in tasks:
        heapq.heappush(pq, task)

    print("Popping tasks in priority order (lowest priority number first):")
    while pq:
        priority, task_description = heapq.heappop(pq)
        print(f" [Priority {priority}] {task_description}")