# =====================================================================
# Day 06 Project: Bank Refactoring with Patterns
# =====================================================================

# --- Singleton Config (Shared bank settings) ---
class BankConfig:
    _instance = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            # Default fallback rates and limits
            cls._instance.interest_rate = 0.05
            cls._instance.overdraft_limit = 1000
        return cls._instance


# --- Observers (Alert systems) ---
class SMSAlert:
    def notify(self, account, action, amount):
        print(f"[SMS ALERT] Message sent to {account.owner}: {action} of {amount:.2f} ETB occurred. Current Balance: {account.get_balance():.2f} ETB.")

class AuditLog:
    def notify(self, account, action, amount):
        print(f"[AUDIT LOG] System log for {account.account_number} | Action: {action.upper()} | Amount: {amount:.2f} ETB.")


# --- Base Account Class (Single Responsibility) ---
class Account:
    def __init__(self, owner, number, balance=0):
        self.owner = owner
        self.account_number = number
        
        if balance < 0:
            raise ValueError("Initial balance cannot be negative")
        self.balance = balance  # kept public/simple so subclasses can change it easily
        
        # List of subscribed alert systems
        self.observers = []

    def get_balance(self):
        return self.balance

    # Methods to handle adding/removing observers
    def subscribe(self, observer_obj):
        if observer_obj not in self.observers:
            self.observers.append(observer_obj)

    def _notify(self, action, amount):
        for obs in self.observers:
            obs.notify(self, action, amount)

    # Simple deposit/withdraw logic with observer triggers
    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        self.balance += amount
        self._notify("deposit", amount)

    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        if amount > self.balance:
            raise ValueError("Overdraft prevented: Insufficient funds")
        self.balance -= amount
        self._notify("withdrawal", amount)

    def statement(self):
        print("--- Standard Account Statement ---")
        print(f"Account Owner: {self.owner}")
        print(f"Account Number: {self.account_number}")
        print(f"Balance: {self.get_balance():.2f} ETB\n")


# --- SavingsAccount (Inherits from Account) ---
class SavingsAccount(Account):
    def __init__(self, owner, number, balance=0, rate=None):
        super().__init__(owner, number, balance)
        
        # read default interest rate from Singleton config if not given
        config = BankConfig()
        if rate is None:
            self.rate = config.interest_rate
        else:
            self.rate = rate

    def add_interest(self):
        interest = self.balance * self.rate
        self.deposit(interest)

    def statement(self):
        print("--- Savings Account Statement ---")
        print(f"Account Owner: {self.owner}")
        print(f"Account Number: {self.account_number}")
        print(f"Balance: {self.get_balance():.2f} ETB (Interest Rate: {self.rate * 100:.1f}%)")
        print("-" * 40 + "\n")


# --- CurrentAccount (Inherits from Account) ---
class CurrentAccount(Account):
    def __init__(self, owner, number, balance=0, overdraft=None):
        super().__init__(owner, number, balance)
        
        # read default overdraft limit from Singleton config if not given
        config = BankConfig()
        if overdraft is None:
            self.overdraft = config.overdraft_limit
        else:
            self.overdraft = overdraft

    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        
        # check if transaction goes past the allowed negative limit
        if self.balance - amount < -self.overdraft:
            raise ValueError(f"Overdraft limit of {self.overdraft:.2f} ETB exceeded!")
        
        self.balance -= amount
        self._notify("withdrawal (overdraft)", amount)

    def statement(self):
        print("--- Current Account Statement ---")
        print(f"Account Owner: {self.owner}")
        print(f"Account Number: {self.account_number}")
        print(f"Balance: {self.get_balance():.2f} ETB (Overdraft Limit: {self.overdraft:.2f} ETB)")
        print("-" * 40 + "\n")


# --- Account Factory (Creates accounts dynamically) ---
class AccountFactory:
    @staticmethod
    def create(kind, owner, number, balance=0, **kwargs):
        kind = kind.lower().strip()
        if kind == "standard":
            return Account(owner, number, balance)
        elif kind == "savings":
            # pull interest rate if it is passed in as an argument
            custom_rate = kwargs.get("rate", None)
            return SavingsAccount(owner, number, balance, custom_rate)
        elif kind == "current":
            # pull overdraft limit if passed in as an argument
            custom_overdraft = kwargs.get("overdraft", None)
            return CurrentAccount(owner, number, balance, custom_overdraft)
        else:
            raise ValueError(f"Unknown account type: '{kind}'")


# --- Demonstration & Verification ---
if __name__ == "__main__":
    print("=== Day 6: Addis Bank Account Types (With Design Patterns) ===\n")

    # Set up our observers
    sms = SMSAlert()
    audit = AuditLog()

    # 1. Create accounts using our Factory
    accounts_list = [
        AccountFactory.create("standard", "Feneti Demissie", "AB-1001", 5000),
        AccountFactory.create("savings", "Abdi Kebede", "AB-2002", 10000, rate=0.06),
        AccountFactory.create("current", "Chala Bekele", "AB-3003", 500, overdraft=1000)
    ]

    # Subscribe observers to show alerts in action
    accounts_list[1].subscribe(sms)
    accounts_list[1].subscribe(audit)
    accounts_list[2].subscribe(audit)

    # 2. Test Savings Account interest
    print("Applying interest to savings account...")
    accounts_list[1].add_interest() 
    print()

    # 3. Test Current Account overdraft usage
    print("Withdrawing past 0 on current account...")
    try:
        # starts at 500. withdrawing 1200 should drop balance to -700.
        accounts_list[2].withdraw(1200)
        print("Successfully used overdraft!")
    except ValueError as e:
        print(f"Error: {e}")
    print()

    # 4. Test Overdraft block guard
    print("Attempting to exceed overdraft limit...")
    try:
        accounts_list[2].withdraw(1000)  # attempting to drop below -1000 should trigger exception
    except ValueError as e:
        print(f"Caught Expected Guard: {e}\n")

    # Requirement 4: Polymorphic Loop (one single loop printing statement on all types)
    print("=== Running Polymorphic Statements ===\n")
    for acc in accounts_list:
        acc.statement()