# =====================================================================
# Mini-Project: Pharmacy Inventory Tracker
# =====================================================================
import os

# 1. Initial Stock (Dictionary of dictionaries: {Item: {Price, Quantity}})
inventory = {
    "Paracetamol": {"price": 5.50, "quantity": 100},
    "Amoxicillin": {"price": 12.00, "quantity": 50},
    "Ibuprofen": {"price": 8.25, "quantity": 75},
}

FILE_PATH = "inventory_report.txt"

def display_inventory():
    print("\n--- Current Pharmacy Inventory ---")
    print(f"{'Medicine':<15} | {'Price (ETB)':<12} | {'Quantity':<8}")
    print("-" * 42)
    for med, details in inventory.items():
        print(f"{med:<15} | {details['price']:<12.2f} | {details['quantity']:<8}")
    print("-" * 42)

def update_stock():
    print("\n--- Update Stock ---")
    med_name = input("Enter medicine name: ").strip().capitalize()
    
    if med_name in inventory:
        try:
            qty_change = int(input(f"Enter quantity to add (positive) or subtract (negative) for {med_name}: "))
            new_qty = inventory[med_name]["quantity"] + qty_change
            
            if new_qty < 0:
                print("Error: Stock quantity cannot drop below zero!")
            else:
                inventory[med_name]["quantity"] = new_qty
                print(f"Successfully updated! New quantity of {med_name}: {new_qty}")
        except ValueError:
            print("Error: Please enter a valid whole number for the quantity.")
    else:
        print(f"Medicine '{med_name}' not found in inventory. Would you like to add it as a new item?")
        add_new = input("Type 'yes' to add or 'no' to cancel: ").strip().lower()
        if add_new == 'yes':
            try:
                price = float(input(f"Enter price for {med_name}: "))
                qty = int(input(f"Enter starting quantity: "))
                if price < 0 or qty < 0:
                    raise ValueError("Price and quantity must be positive numbers.")
                inventory[med_name] = {"price": price, "quantity": qty}
                print(f"Added {med_name} to the inventory!")
            except ValueError as e:
                print(f"Error: Invalid input. {e}")

def save_report():
    try:
        with open(FILE_PATH, "w") as file:
            file.write("=== PHARMACY INVENTORY REPORT ===\n")
            file.write(f"{'Medicine':<15} | {'Price':<10} | {'Quantity':<10}\n")
            file.write("-" * 42 + "\n")
            for med, details in inventory.items():
                file.write(f"{med:<15} | {details['price']:<10.2f} | {details['quantity']:<10}\n")
        print(f"\nReport successfully saved to '{FILE_PATH}'!")
    except Exception as e:
        print(f"An error occurred while saving the report: {e}")

def main():
    while True:
        print("\n===== PHARMACY INVENTORY SYSTEM =====")
        print("1. View Inventory")
        print("2. Update/Add Stock")
        print("3. Export Inventory Report (File Write)")
        print("4. Exit")
        
        choice = input("Select an option (1-4): ").strip()
        
        if choice == "1":
            display_inventory()
        elif choice == "2":
            update_stock()
        elif choice == "3":
            save_report()
        elif choice == "4":
            print("Thank you for using the Pharmacy Inventory Tracker. Goodbye!")
            break
        else:
            print("Invalid choice. Please select a number between 1 and 4.")

if __name__ == "__main__":
    main()