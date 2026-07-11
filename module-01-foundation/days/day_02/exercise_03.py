# Exercise 3 - Loops

print("--- Part A: while loop ---")
balance = 500
while balance > 0:
    print(f"Current balance: {balance} ETB")
    balance -= 100

print("\n--- Part B: for loop + range ---")
for i in range(1, 11):
    print(f"5 x {i} = {5 * i}")

print("\n--- Part C: for loop + list + continue ---")
names = ["Almaz", "Dawit", "Tigist", "Bereket"]
for name in names:
    if name == "Tigist":
        continue  # Skip Tigist
    print(f"Hello, {name}!")

print("\n--- Part D: break ---")
for num in range(1, 21):
    if num % 7 == 0:
        print(f"First number divisible by 7 is: {num}")
        break  # Stop the loop immediately