# =====================================================================
# Larger Project: Addis Bank System (Version 1 - Account Base)
# =====================================================================

class Account:
    # Requirement: Define Account with owner, number, and private __balance (default 0)
    def __init__(self, owner, number, balance=0):
        self.owner = owner
        self.account_number = number
        
        if balance < 0:
            raise ValueError("Initial balance cannot be negative")
        self.__balance = balance

    # Requirement: Read-only @property for the balance
    @property
    def balance(self):
        return self.__balance

    # Requirement: deposit() that rejects non-positive amounts with ValueError
    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        self.__balance += amount

    # Requirement: withdraw() that rejects non-positive amounts and overdrafts
    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        if amount > self.__balance:
            raise ValueError("Overdraft prevented: Insufficient funds")
        self.__balance -= amount

    # Requirement: statement() method to print owner, number, and balance
    def statement(self):
        print(f"Account Owner: {self.owner}")
        print(f"Account Number: {self.account_number}")
        print(f"Balance: {self.balance:.2f} ETB\n")


# Testing block to prove it satisfies all curriculum checks
if __name__ == "__main__":
    print("=== Addis Bank System V1 (Curriculum Test) ===\n")
    
    # 1. Test separate balances
    acc1 = Account("Feneti Demissie", "AB-1001", 5000)
    acc2 = Account("Abdi Kebede", "AB-1002", 250)
    
    acc1.statement()
    acc2.statement()

    print("--- Running Normal Transactions ---")
    acc1.deposit(1500)
    acc1.withdraw(2000)
    acc1.statement()
    
    # 2. Test read-only balance property (cannot set balance directly)
    print("--- Testing Read-Only Property ---")
    try:
        acc1.balance = 1000000 
    except AttributeError as e:
        print(f"Success: Direct setting blocked! ({e})")

    # 3. Test negative deposit error handling
    print("\n--- Testing Negative Deposit Validation ---")
    try:
        acc2.deposit(-50)
    except ValueError as e:
        print(f"Success: Negative deposit raised error! ({e})")
        
    # 4. Test overdraft error handling
    print("\n--- Testing Overdraft Validation ---")
    try:
        acc2.withdraw(500)
    except ValueError as e:
        print(f"Success: Overdraft raised error! ({e})")