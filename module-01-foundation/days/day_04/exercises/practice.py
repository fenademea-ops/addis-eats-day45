# ==========================================
# Day 04: Practice Exercises
# ==========================================

# ------------------------------------------
# 1. Book Class
# ------------------------------------------
print("--- Exercise 1: Book Class ---")

class Book:
    def __init__(self, title: str, author: str, pages: int):
        self.title = title
        self.author = author
        self.pages = pages

    def describe(self):
        print(f"'{self.title}' by {self.author} ({self.pages} pages).")

# Create two books
book1 = Book("Fikir Eske Mekabir", "Hadis Alemayehu", 512)
book2 = Book("The Alchemist", "Paulo Coelho", 208)

# Print descriptions
book1.describe()
book2.describe()
print()


# ------------------------------------------
# 2, 3 & 4. Product Class (with Private Quantity and Validation)
# ------------------------------------------
print("--- Exercises 2, 3 & 4: Product Class & Validation ---")

class Product:
    def __init__(self, name: str, price: float, initial_qty: int):
        self.name = name
        self.price = price
        # Step 3: Make quantity private
        if initial_qty < 0:
            print(f"Warning: Initial quantity for {self.name} cannot be negative. Setting to 0.")
            self.__quantity = 0
        else:
            self.__quantity = initial_qty

    # Step 3: @property getter for private quantity
    @property
    def quantity(self) -> int:
        return self.__quantity

    # Step 2: Restock method
    def restock(self, n: int):
        if n <= 0:
            print(f"[{self.name}] Error: Restock amount must be positive.")
            return
        self.__quantity += n
        print(f"[{self.name}] Successfully added {n} units. New quantity: {self.quantity}")

    # Step 2 & 4: Sell method with below-zero prevention guard
    def sell(self, n: int):
        if n <= 0:
            print(f"[{self.name}] Error: Sale amount must be positive.")
            return
            
        if n > self.__quantity:
            print(f"[{self.name}] Sale Rejected: Not enough stock! Attempted to sell {n}, only {self.quantity} left.")
            return
            
        self.__quantity -= n
        print(f"[{self.name}] Successfully sold {n} units. New quantity: {self.quantity}")


# Let's test the Product operations:
prod_test = Product("Shola Milk", 45.0, 10)
print(f"Product: {prod_test.name} | Stock: {prod_test.quantity}")

prod_test.restock(5)    # Should go up to 15
prod_test.sell(18)      # Should reject (out of stock prevention)
prod_test.sell(8)       # Should succeed (leaving 7)
print()


# ------------------------------------------
# 5. Prove Independence
# ------------------------------------------
print("--- Exercise 5: Prove Independence ---")

# Create three distinct Product objects
p1 = Product("Teff (kg)", 120.0, 50)
p2 = Product("Coffee (cups)", 35.0, 100)
p3 = Product("Sugar (kg)", 95.0, 30)

print(f"Starting Stock -> {p1.name}: {p1.quantity} | {p2.name}: {p2.quantity} | {p3.name}: {p3.quantity}")

# Change one (sell 20 Teff)
p1.sell(20)

print("\n--- After changing only the first product's stock ---")
print(f"{p1.name}: {p1.quantity} (Changed!)")
print(f"{p2.name}: {p2.quantity} (Unaffected!)")
print(f"{p3.name}: {p3.quantity} (Unaffected!)")