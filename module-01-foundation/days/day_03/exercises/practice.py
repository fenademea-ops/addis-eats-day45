# ==========================================
# Day 03: Practice Exercises
# ==========================================

# ------------------------------------------
# 1. Unique cities
# ------------------------------------------
print("--- Exercise 1: Unique Cities ---")
cities = ["Addis Ababa", "Hawassa", "Addis Ababa", "Bahir Dar", "Hawassa", "Gondar"]
distinct_cities = set(cities)
print("Distinct cities:", distinct_cities)
print("Count:", len(distinct_cities))
print()


# ------------------------------------------
# 2. Price report
# ------------------------------------------
print("--- Exercise 2: Price Report ---")
groceries = {
    "Teff (kg)": 120,
    "Shola Milk": 45,
    "Coffee (cups)": 35,
    "Bananas (kg)": 80,
    "Onions (kg)": 90
}
for item, price in groceries.items():
    print(f"{item}: {price} ETB")
print()


# ------------------------------------------
# 3. Tax comprehension
# ------------------------------------------
print("--- Exercise 3: Tax Comprehension ---")
prices = [100, 250, 400, 80]
tax_prices = [price * 1.15 for price in prices]
print("Prices with 15% tax:", tax_prices)
print()


# ------------------------------------------
# 4. Cheap items
# ------------------------------------------
print("--- Exercise 4: Cheap Items ---")
cheap_prices = [price for price in prices if price < 200]
print("Prices under 200 ETB:", cheap_prices)
print()


# ------------------------------------------
# 5. Write & read
# ------------------------------------------
print("--- Exercise 5: Write & Read ---")
# Writing to names.txt
with open("names.txt", "w") as file:
    file.write("Fena\n")
    file.write("Abdi\n")
    file.write("Selam\n")

# Reading back from names.txt
with open("names.txt", "r") as file:
    for line in file:
        print(line.strip())
print()


# ------------------------------------------
# 6. Safe division
# ------------------------------------------
print("--- Exercise 6: Safe Division ---")
try:
    user_input = input("Enter a number to divide 1000 by: ")
    number = float(user_input)
    result = 1000 / number
    print(f"Result: {result}")
except ValueError:
    print("Error: Please enter a valid numerical value.")
except ZeroDivisionError:
    print("Error: You cannot divide by zero.")