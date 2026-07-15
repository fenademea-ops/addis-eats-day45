# =====================================================================
# Larger Project: Addis Bank System (Version 1 - Account Base)
# =====================================================================

class Account:
    # Step 1: Define Account with owner, account_number, and private __balance
    def __init__(self, owner: str, account_number: str, initial_balance: float = 0.0):
        self.owner = owner
        self.account_number = account_number
        
        if initial_balance < 0:
            print(f"Warning: Initial balance for {self.owner} cannot be negative. Setting to 0.0 ETB.")
            self.__balance = 0.0
        else:
            self.__balance = initial_balance

    # Step 2: @property to read-only access the private balance (no direct edits allowed)
    @property
    def balance(self) -> float:
        return self.__balance

    # Step 3 & 4: deposit() that validates and rejects negative amounts
    def deposit(self, amount: float) -> bool:
        if amount <= 0:
            print(f"[{self.owner}] Deposit Rejected: Amount must be positive. Attempted: {amount} ETB")
            return False
            
        self.__balance += amount
        print(f"[{self.owner}] Successfully deposited: {amount:,.2f} ETB. New Balance: {self.balance:,.2f} ETB")
        return True

    # Step 3 & 4: withdraw() that validates and rejects negative/overdraft amounts
    def withdraw(self, amount: float) -> bool:
        if amount <= 0:
            print(f"[{self.owner}] Withdrawal Rejected: Amount must be positive.")
            return False
            
        if amount > self.__balance:
            print(f"[{self.owner}] Withdrawal Rejected: Overdraft prevented. Attempted: {amount:,.2f} ETB. Available: {self.balance:,.2f} ETB")
            return False
            
        self.__balance -= amount
        print(f"[{self.owner}] Successfully withdrew: {amount:,.2f} ETB. New Balance: {self.balance:,.2f} ETB")
        return True

    def display_details(self):
        """Prints the current state of the account."""
        print(f"\nAccount Owner: {self.owner}")
        print(f"Account Number: {self.account_number}")
        print(f"Current Balance: {self.balance:,.2f} ETB")
        print("-" * 40)


# Step 5: Create two accounts and run transactions
if __name__ == "__main__":
    print("=== Addis Bank System V1 ===")
    
    # 1. Create two separate accounts
    acc1 = Account("Feneti Demissie", "AB-1001", 5000.0)
    acc2 = Account("Abdi Kebede", "AB-1002", 250.0)
    
    # Display starting details
    acc1.display_details()
    acc2.display_details()

    # 2. Run transactions
    print("\n--- Running Transactions ---")
    acc1.deposit(1500.0)
    acc1.withdraw(2000.0)
    
    # Rejected cases
    acc2.deposit(-50.0)       # Rejected: Negative deposit
    acc2.withdraw(500.0)      # Rejected: Overdraft
    acc2.withdraw(150.0)      # Allowed
    
    # Display final state
    print("\n=== Final Account Status ===")
    acc1.display_details()
    acc2.display_details()