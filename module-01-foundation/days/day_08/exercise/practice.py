import random

# =====================================================================
# Exercise 1: Recursive Functions
# =====================================================================
def total(nums):
    """Recursively sums all numbers in a list."""
    if not nums:  # Base case: empty list
        return 0
    return nums[0] + total(nums[1:])  # Recursive step

def count_down(n):
    """Recursively prints n down to 1."""
    if n <= 0:  # Base case
        return
    print(n, end=" " if n > 1 else "\n")
    count_down(n - 1)  # Recursive step


# =====================================================================
# Exercise 2: Binary Search
# =====================================================================
def binary_search(items, target):
    """Performs binary search on a sorted list. Returns index or -1."""
    low = 0
    high = len(items) - 1

    while low <= high:
        mid = (low + high) // 2
        if items[mid] == target:
            return mid
        elif items[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
            
    return -1


# =====================================================================
# Exercise 3: Merge Sort
# =====================================================================
def merge(left, right):
    """Helper function to merge two sorted lists."""
    result = []
    i = j = 0

    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1

    # Append any remaining elements
    result.extend(left[i:])
    result.extend(right[j:])
    return result

def merge_sort(items):
    """Recursively sorts a list using Merge Sort."""
    if len(items) <= 1:
        return items

    mid = len(items) // 2
    left_half = merge_sort(items[:mid])
    right_half = merge_sort(items[mid:])

    return merge(left_half, right_half)


# =====================================================================
# Exercise 4: Sort with a Key
# =====================================================================
def sort_balances_descending(accounts):
    """Sorts a list of (name, balance) tuples by balance in descending order."""
    return sorted(accounts, key=lambda acc: acc[1], reverse=True)


# =====================================================================
# Exercise 5: Two Pointers
# =====================================================================
def has_pair(nums, target):
    """Checks if two values in a sorted list sum up to target using two pointers."""
    left = 0
    right = len(nums) - 1

    while left < right:
        current_sum = nums[left] + nums[right]
        if current_sum == target:
            return True
        elif current_sum < target:
            left += 1
        else:
            right -= 1

    return False


# =====================================================================
# Verification & Test Suite
# =====================================================================
if __name__ == "__main__":
    print("=== Exercise 1: Recursion ===")
    sample_nums = [10, 20, 30, 40]
    print(f"total({sample_nums}) -> {total(sample_nums)}")
    print("count_down(5):", end=" ")
    count_down(5)
    print()

    print("=== Exercise 2: Binary Search ===")
    balances = [500.0, 1000.0, 2500.0, 5000.0, 10600.0]
    target_balance = 2500.0
    idx = binary_search(balances, target_balance)
    print(f"Balances: {balances}")
    print(f"Search for {target_balance}: Index {idx}")
    print(f"Search for 9999.0: Index {binary_search(balances, 9999.0)}")
    print()

    print("=== Exercise 3: Merge Sort ===")
    random_list = [random.randint(1, 100) for _ in range(10)]
    custom_sorted = merge_sort(random_list)
    builtin_sorted = sorted(random_list)
    print(f"Original: {random_list}")
    print(f"Merge Sort Result: {custom_sorted}")
    print(f"Matches sorted()? {custom_sorted == builtin_sorted}")
    print()

    print("=== Exercise 4: Sort with a Key ===")
    account_tuples = [
        ("Feneti", 5000.0),
        ("Abdi", 10600.0),
        ("Chala", 500.0),
        ("Saba", 8500.0)
    ]
    sorted_accounts = sort_balances_descending(account_tuples)
    print("Accounts sorted by balance (descending):")
    for name, bal in sorted_accounts:
        print(f" - {name}: {bal:.2f} ETB")
    print()

    print("=== Exercise 5: Two Pointers ===")
    sorted_arr = [10, 20, 35, 50, 75, 100]
    target_val = 70
    print(f"List: {sorted_arr}")
    print(f"Has pair summing to {target_val}? {has_pair(sorted_arr, target_val)}") # 20 + 50 = 70
    print(f"Has pair summing to 99? {has_pair(sorted_arr, 99)}")