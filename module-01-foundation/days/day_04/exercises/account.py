# =====================================================================
# In-Class Exercise: The Account Class (Addis Bank)
# =====================================================================

class Account:
    def __init__(self, owner: str, account_number: str, initial_balance: float = 0.0):
        self.owner = owner
        self.account_number = account_number
        # Step 1: Private attribute __balance (Encapsulation)
        if initial_balance < 0:
            print("Warning: Initial balance cannot be negative. Setting balance to 0.0 ETB.")
            self.__balance = 0.0
        else:
            self.__balance = initial_balance

    # Step 2: Read-only @property for balance (no direct writes allowed)
    @property
    def balance(self) -> float:
        return self.__balance

    # Step 3 & 4: Validate deposits (no negative deposits)
    def deposit(self, amount: float):
        if amount <= 0:
            print(f"[{self.owner}] Transaction Rejected: Deposit amount must be positive. Attempted: {amount} ETB")
            return False
        
        self.__balance += amount
        print(f"[{self.owner}] Successfully deposited: {amount:,.2f} ETB. New Balance: {self.balance:,.2f} ETB")
        return True

    # Step 3 & 4: Validate withdrawals (no negative withdrawals or overdrafts)
    def withdraw(self, amount: float):
        if amount <= 0:
            print(f"[{self.owner}] Transaction Rejected: Withdrawal amount must be positive.")
            return False
        
        if amount > self.__balance:
            print(f"[{self.owner}] Transaction Rejected: Insufficient funds (Overdraft prevented). Attempted withdrawal of {amount:,.2f} ETB. Available: {self.balance:,.2f} ETB")
            return False
            
        self.__balance -= amount
        print(f"[{self.owner}] Successfully withdrew: {amount:,.2f} ETB. New Balance: {self.balance:,.2f} ETB")
        return True

    def display_details(self):
        print(f"\nAccount Owner: {self.owner}")
        print(f"Account Number: {self.account_number}")
        print(f"Current Balance: {self.balance:,.2f} ETB")
        print("-" * 40)


# =====================================================================
# Step 5: Create two accounts and run transactions
# =====================================================================
if __name__ == "__main__":
    print("=== Welcome to Addis Bank System ===")

    # 1. Create Account 1
    acc1 = Account(owner="Feneti Demissie", account_number="AB-1001", initial_balance=5000.0)
    acc1.display_details()

    # 2. Create Account 2
    acc2 = Account(owner="Abdi Kebede", account_number="AB-1002", initial_balance=250.0)
    acc2.display_details()

    # --- Run Transactions ---
    print("\n--- Running Transactions ---")
    
    # Successful operations
    acc1.deposit(1500.0)
    acc1.withdraw(2000.0)
    
    # Validating reject cases (negative deposit & overdraft)
    acc2.deposit(-50.0)       # Should reject
    acc2.withdraw(500.0)      # Should reject (overdraft)
    acc2.withdraw(150.0)      # Should succeed
    
    # Display final status
    print("\n=== Final Account Status ===")
    acc1.display_details()
    acc2.display_details()