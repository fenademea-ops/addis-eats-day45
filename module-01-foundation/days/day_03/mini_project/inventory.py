# =====================================================================
# Mini-Project: Pharmacy Inventory Tracker (Addis Ababa Pharmacy)
# =====================================================================
import os

# File name must strictly match the worksheet specification
STOCK_FILE = "stock.txt"
stock = {}

# Requirement 1: Read stock.txt (item,quantity per line) inside a try/except
try:
    with open(STOCK_FILE, "r") as f:
        for line in f:
            if line.strip():  # Skip empty lines
                item, qty = line.strip().split(",")
                stock[item] = int(qty)
    print("--- Stock Loaded Successfully ---")
except FileNotFoundError:
    print("No stock file yet — starting empty")
    # Set up some default items if file doesn't exist yet
    stock = {
        "Paracetamol": 100,
        "Amoxicillin": 5,
        "Ibuprofen": 12
    }


# Requirement 2: Function that increases or decreases an item's quantity 
# Uses stock.get() to safely avoid raising a KeyError for new items
def adjust(item, amount):
    stock[item] = stock.get(item, 0) + amount
    if stock[item] < 0:
        stock[item] = 0
    print(f"Adjusted {item} by {amount:+.0f}. New quantity: {stock[item]}")


# Requirement 4: Write the updated dictionary back to stock.txt so changes persist
def save_stock():
    try:
        with open(STOCK_FILE, "w") as file:
            for item, qty in stock.items():
                file.write(f"{item},{qty}\n")
        print(f"Inventory saved successfully to '{STOCK_FILE}'!")
    except Exception as e:
        print(f"An error occurred while saving: {e}")


def display_inventory():
    print("\n--- Current Pharmacy Inventory ---")
    print(f"{'Medicine':<15} | {'Quantity':<8}")
    print("-" * 30)
    for med, qty in stock.items():
        print(f"{med:<15} | {qty:<8}")
    print("-" * 30)


def update_stock_menu():
    print("\n--- Update Stock ---")
    med_name = input("Enter medicine name: ").strip().capitalize()
    try:
        qty_change = int(input(f"Enter quantity to add (positive) or subtract (negative) for {med_name}: "))
        # Run the official adjust function (Requirement 2)
        adjust(med_name, qty_change)
    except ValueError:
        print("Error: Please enter a valid whole number for the quantity.")


def check_low_stock():
    # Requirement 3: Use a list comprehension to print items with quantity below 10
    low = [item for item, qty in stock.items() if qty < 10]
    print("\n--- Low Stock Alert (< 10) ---")
    if low:
        print("Low stock items:", low)
    else:
        print("All items are sufficiently stocked!")


def main():
    while True:
        print("\n===== PHARMACY INVENTORY SYSTEM =====")
        print("1. View Inventory")
        print("2. Update/Add Stock")
        print("3. Check Low Stock Items")
        print("4. Save and Exit")
        
        choice = input("Select an option (1-4): ").strip()
        
        if choice == "1":
            display_inventory()
        elif choice == "2":
            update_stock_menu()
        elif choice == "3":
            check_low_stock()
        elif choice == "4":
            save_stock()
            print("Thank you for using the Pharmacy Inventory Tracker. Goodbye!")
            break
        else:
            print("Invalid choice. Please select a number between 1 and 4.")


if __name__ == "__main__":
    main()