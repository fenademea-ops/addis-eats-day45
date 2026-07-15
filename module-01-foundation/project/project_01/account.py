# =====================================================================
# Day 5 Project: Inherited Accounts & Polymorphism (Addis Bank)
# =====================================================================

class Account:
    # Day 04 Base Account Class
    def __init__(self, owner, number, balance=0):
        self.owner = owner
        self.account_number = number
        
        if balance < 0:
            raise ValueError("Initial balance cannot be negative")
        self.__balance = balance

    # Read-only @property for external access
    @property
    def balance(self):
        return self.__balance

    # Internal helper setter allowing subclasses to modify the balance safely
    @balance.setter
    def _balance(self, value):
        self.__balance = value

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        self.__balance += amount

    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        if amount > self.__balance:
            raise ValueError("Overdraft prevented: Insufficient funds")
        self.__balance -= amount

    def statement(self):
        print("--- Standard Account Statement ---")
        print(f"Account Owner: {self.owner}")
        print(f"Account Number: {self.account_number}")
        print(f"Balance: {self.balance:.2f} ETB\n")


# Requirement 1: SavingsAccount inherits from Account
class SavingsAccount(Account):
    def __init__(self, owner, number, balance=0, rate=0.05):
        # Uses super() to setup parent details
        super().__init__(owner, number, balance)
        self.rate = rate

    def add_interest(self):
        # Reuses parent's deposit method to add computed interest
        interest = self.balance * self.rate
        self.deposit(interest)

    # Requirement 3: Override statement() to label the account type
    def statement(self):
        print("--- Savings Account Statement ---")
        print(f"Account Owner: {self.owner}")
        print(f"Account Number: {self.account_number}")
        print(f"Balance: {self.balance:.2f} ETB (Interest Rate: {self.rate * 100:.1f}%)")
        print("-" * 40 + "\n")


# Requirement 2: CurrentAccount inherits from Account
class CurrentAccount(Account):
    def __init__(self, owner, number, balance=0, overdraft=1000):
        super().__init__(owner, number, balance)
        self.overdraft = overdraft

    # Overridden withdraw method to allow balance to go negative down to overdraft limit
    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        
        # Balance can drop down to -overdraft (e.g. if overdraft is 1000, min balance is -1000)
        if self.balance - amount < -self.overdraft:
            raise ValueError(f"Overdraft limit of {self.overdraft:.2f} ETB exceeded!")
        
        # Modify the private balance via our safe internal helper
        self._balance -= amount

    # Requirement 3: Override statement() to label the account type
    def statement(self):
        print("--- Current Account Statement ---")
        print(f"Account Owner: {self.owner}")
        print(f"Account Number: {self.account_number}")
        print(f"Balance: {self.balance:.2f} ETB (Overdraft Limit: {self.overdraft:.2f} ETB)")
        print("-" * 40 + "\n")


# Demonstration & Polymorphic Loop
if __name__ == "__main__":
    print("=== Day 5: Addis Bank Account Types ===\n")

    # 1. Create a mixed list of different account objects
    accounts_list = [
        Account("Feneti Demissie", "AB-1001", 5000),
        SavingsAccount("Abdi Kebede", "AB-2002", 10000, rate=0.06),
        CurrentAccount("Chala Bekele", "AB-3003", 500, overdraft=1000)
    ]

    # 2. Test Savings Account interest
    print("Applying interest to savings account...")
    # accounts_list[1] is our SavingsAccount
    accounts_list[1].add_interest()  # 10000 * 0.06 = 600 ETB interest added

    # 3. Test Current Account overdraft allowance
    print("Withdrawing past 0 on current account...")
    try:
        # accounts_list[2] has 500. We withdraw 1200. New balance should be -700.
        accounts_list[2].withdraw(1200)
        print("Successfully used overdraft!")
    except ValueError as e:
        print(f"Error: {e}")

    # 4. Test Current Account Overdraft Guard limit
    print("Attempting to exceed overdraft limit...")
    try:
        accounts_list[2].withdraw(1000)  # Trying to withdraw another 1000 will fail
    except ValueError as e:
        print(f"Caught Expected Guard: {e}\n")

    # Requirement 4: Polymorphic Loop (one single loop calling statement() on all types)
    print("=== Running Polymorphic Statements ===\n")
    for acc in accounts_list:
        acc.statement()