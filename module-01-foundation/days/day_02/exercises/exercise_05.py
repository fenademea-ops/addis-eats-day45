# Exercise 5 — Comprehensive: Mini Billing Program

# 14. Create a list of tuples with customer names and balances
customers = [
    ("Almaz", 1500),
    ("Dawit", 750),
    ("Tigist", 400),
    ("Bereket", 1200)
]

# 15. Function to determine the tier based on balance
def get_tier(balance):
    if balance >= 1000:
        return "Premium"
    elif balance >= 500:
        return "Standard"
    else:
        return "Basic"

# 16. Function to calculate balance plus tax (15% default)
def apply_tax(balance, rate=0.15):
    return balance + (balance * rate)

# 18. Initialize running totals before the loop starts
total_customers = 0
combined_balance = 0.0

print("--- Customer Billing Summary ---")

# 17. Loop through each customer in the list
for name, balance in customers:
    # Find their tier and balance with tax
    tier = get_tier(balance)
    total_with_tax = apply_tax(balance)
    
    # Update running totals for tracking
    total_customers += 1
    combined_balance += balance
    
    # Print the required summary line
    print(f"{name}: {tier} | Balance: {balance} ETB | With tax: {total_with_tax:.1f} ETB")
    
    # Check if the tier is Premium to print an extra congratulatory message
    if tier == "Premium":
        print(f"   🎉 Congratulations {name} on being a Premium customer!")

print("--------------------------------")
# 18. Print final summary details after the loop finishes
print(f"Total customers processed: {total_customers}")
print(f"Combined balance of all customers: {combined_balance:.1f} ETB")