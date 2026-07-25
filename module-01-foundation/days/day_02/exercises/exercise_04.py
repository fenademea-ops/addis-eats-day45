# Exercise 4 — Functions & Scope

# 9. Function to check if a number is even
def is_even(number):
    return number % 2 == 0

# 10. Function to add tax with a default parameter
def add_tax(price, rate=0.15):
    return price + (price * rate)

# 11. Call add_tax with default and keyword arguments, then print
print("--- Question 11: Tax Calculator ---")
result_default = add_tax(1000)
result_keyword = add_tax(1000, rate=0.10)
print(f"Default tax (15%): {result_default} ETB")
print(f"Keyword tax (10%): {result_keyword} ETB")

# 12 & 13. Function with local scope tracking tiers
def describe_balance(balance):
    if balance >= 1000:
        tier = "Premium"
    elif balance >= 500:
        tier = "Standard"
    else:
        tier = "Basic"
    return tier

print("\n--- Question 12 & 13: Scope Test ---")
print(f"Balance 1200 Tier: {describe_balance(1200)}")

# 13. Trying to print tier outside the function causes an error:
# print(tier) 
# ERROR COMMENT: 'tier' is a local variable inside describe_balance() and cannot be accessed outside of it.