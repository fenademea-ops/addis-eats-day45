# Day 07 - Account Registry and Undo stack implementation
# Added this to my Day 06 core base classes

class BankConfig:
    _instance = None
    def __new__(cls):
        if not cls._instance:
            cls._instance = super().__new__(cls)
            cls._instance.interest_rate = 0.05
            cls._instance.overdraft_limit = 1000
        return cls._instance


# --- Observers ---
class SMSAlert:
    def notify(self, account, action, amount):
        print(f"[SMS ALERT] Message sent to {account.owner}: {action} of {amount:.2f} ETB occurred. Current Balance: {account.get_balance():.2f} ETB.")
 
class AuditLog:
    def notify(self, account, action, amount):
        print(f"[AUDIT LOG] System log for {account.account_number} | Action: {action.upper()} | Amount: {amount:.2f} ETB.")


# Base Account class with built-in list stack for undo history
class Account:
    def __init__(self, owner, number, balance=0):
        self.owner = owner
        self.account_number = number
        if balance < 0:
            raise ValueError("Initial balance cannot be negative")
        self.balance = balance
        self.observers = []
        
        # Day 7: stack stores tuples -> (type, amount)
        self.history = []
 
    def get_balance(self):
        return self.balance
 
    def subscribe(self, observer_obj):
        if observer_obj not in self.observers:
            self.observers.append(observer_obj)
 
    def _notify(self, action, amount):
        for obs in self.observers:
            obs.notify(self, action, amount)
 
    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        self.balance += amount
        
        # push to stack
        self.history.append(('deposit', amount))
        self._notify("deposit", amount)
 
    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        if amount > self.balance:
            raise ValueError("Overdraft prevented: Insufficient funds")
        self.balance -= amount
        
        # push to stack
        self.history.append(('withdrawal', amount))
        self._notify("withdrawal", amount)

    def undo_last(self):
        # check if history has records
        if len(self.history) == 0:
            print(f"[UNDO] No actions to undo for {self.account_number}")
            return False
            
        # pop the last transaction (LIFO)
        last_action, amt = self.history.pop()
        print(f"[UNDO] Reversing {last_action} of {amt:.2f} ETB...")
        
        if last_action == 'deposit':
            self.balance -= amt
        elif 'withdrawal' in last_action:
            self.balance += amt
        return True
 
    def statement(self):
        print("--- Standard Account Statement ---")
        print(f"Account Owner: {self.owner}\nAccount Number: {self.account_number}")
        print(f"Balance: {self.get_balance():.2f} ETB\n")


class SavingsAccount(Account):
    def __init__(self, owner, number, balance=0, rate=None):
        super().__init__(owner, number, balance)
        config = BankConfig()
        self.rate = config.interest_rate if rate is None else rate
 
    def add_interest(self):
        self.deposit(self.balance * self.rate)
 
    def statement(self):
        print("--- Savings Account Statement ---")
        print(f"Account Owner: {self.owner}\nAccount Number: {self.account_number}")
        print(f"Balance: {self.get_balance():.2f} ETB (Interest Rate: {self.rate * 100:.1f}%)")
        print("-" * 40 + "\n")


class CurrentAccount(Account):
    def __init__(self, owner, number, balance=0, overdraft=None):
        super().__init__(owner, number, balance)
        config = BankConfig()
        self.overdraft = config.overdraft_limit if overdraft is None else overdraft
 
    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        if self.balance - amount < -self.overdraft:
            raise ValueError(f"Overdraft limit of {self.overdraft:.2f} ETB exceeded!")
        
        self.balance -= amount
        self.history.append(('withdrawal (overdraft)', amount))
        self._notify("withdrawal (overdraft)", amount)
 
    def statement(self):
        print("--- Current Account Statement ---")
        print(f"Account Owner: {self.owner}\nAccount Number: {self.account_number}")
        print(f"Balance: {self.get_balance():.2f} ETB (Overdraft Limit: {self.overdraft:.2f} ETB)")
        print("-" * 40 + "\n")


# Factory class
class AccountFactory:
    @staticmethod
    def create(kind, owner, number, balance=0, **kwargs):
        k = kind.lower().strip()
        if k == "standard":
            return Account(owner, number, balance)
        elif k == "savings":
            return SavingsAccount(owner, number, balance, kwargs.get("rate", None))
        elif k == "current":
            return CurrentAccount(owner, number, balance, kwargs.get("overdraft", None))
        else:
            raise ValueError(f"Unknown account type: '{kind}'")


# --- Day 07 AccountRegistry Container ---
class AccountRegistry:
    def __init__(self):
        self.by_number = {}    # fast dict lookup O(1)
        self.order = []        # preserves insertion order tracking
        
    def add(self, acc):
        num = acc.account_number
        if num not in self.by_number:
            self.by_number[num] = acc
            self.order.append(num)
            
    def find(self, number):
        # simple single-line dict lookup
        return self.by_number.get(number)
        
    def list_all(self):
        # loops through list keys to pull out real objects
        all_accs = []
        for key in self.order:
            all_accs.append(self.by_number[key])
        return all_accs


# Testing script block
if __name__ == "__main__":
    sms = SMSAlert()
    audit = AuditLog()
 
    registry = AccountRegistry()

    # Load data rows using the factory pattern
    registry.add(AccountFactory.create("standard", "Feneti Demissie", "AB-1001", 5000))
    registry.add(AccountFactory.create("savings", "Abdi Kebede", "AB-2002", 10000, rate=0.06))
    registry.add(AccountFactory.create("current", "Chala Bekele", "AB-3003", 500, overdraft=1000))
 
    a1 = registry.find("AB-1001")
    a2 = registry.find("AB-2002")
    a3 = registry.find("AB-3003")

    a2.subscribe(sms)
    a2.subscribe(audit)
    a3.subscribe(audit)
 
    print("Testing interest processing:")
    a2.add_interest() 
    print()
 
    print("Testing overdraft use cases:")
    try:
       a3.withdraw(1200)
    except ValueError as err:
       print(f"Error: {err}")
    print()
 
    print("Testing transaction history rollback:")
    print(f"Starting balance: {a1.get_balance():.2f}")
    a1.deposit(2500.00)
    a1.withdraw(1000.00)
    
    # run double undo sequence
    a1.undo_last()  
    print(f"After undo 1: {a1.get_balance():.2f}")
    a1.undo_last()  
    print(f"After undo 2: {a1.get_balance():.2f}\n")

    print("printing registry database rows polymorphic style:")
    for account in registry.list_all():
        account.statement()