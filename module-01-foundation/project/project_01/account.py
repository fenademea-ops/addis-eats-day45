# Bank system configuration
class BankConfig:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.interest_rate = 0.05
            cls._instance.overdraft_limit = 1000
        return cls._instance


# Notification classes
class SMSAlert:
    def notify(self, account, action, amount):
        print(
            f"[SMS ALERT] Sent to {account.owner}: {action} of {amount:.2f} ETB."
            f" Balance: {account.get_balance():.2f} ETB."
        )


class AuditLog:
    def notify(self, account, action, amount):
        print(
            f"[AUDIT LOG] Account {account.account_number} | Action: {action} |"
            f" Amount: {amount:.2f} ETB"
        )


# Binary search helper function (No 'in' operator or loops used outside binary search)
def binary_search(items, target):
    low = 0
    high = len(items) - 1

    while low <= high:
        mid = (low + high) // 2
        if items[mid] == target:
            return mid
        elif items[mid] < target:
            low = mid + 1
        else:
            high = mid - 1

    return -1


# Base class for bank accounts
class Account:
    def __init__(self, owner, number, balance=0):
        self.owner = owner
        self.account_number = number
        if balance < 0:
            raise ValueError("Initial balance cannot be negative")
        self.balance = balance
        self.observers = []
        self.history = []

    def get_balance(self):
        return self.balance

    def subscribe(self, observer):
        if observer not in self.observers:
            self.observers.append(observer)

    def _notify(self, action, amount):
        for observer in self.observers:
            observer.notify(self, action, amount)

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        self.balance += amount
        self.history.append(("deposit", amount))
        self._notify("deposit", amount)

    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        if amount > self.balance:
            raise ValueError("Insufficient funds")
        self.balance -= amount
        self.history.append(("withdrawal", amount))
        self._notify("withdrawal", amount)

    def undo_last(self):
        if len(self.history) == 0:
            print("No transactions to undo.")
            return False

        action, amount = self.history.pop()
        print(f"Undoing {action} of {amount:.2f} ETB...")

        if action == "deposit":
            self.balance -= amount
        else:
            self.balance += amount
        return True


# Subclasses for specific account types
class SavingsAccount(Account):
    def __init__(self, owner, number, balance=0, rate=None):
        super().__init__(owner, number, balance)
        config = BankConfig()
        self.rate = config.interest_rate if rate is None else rate

    def add_interest(self):
        interest_amount = self.balance * self.rate
        self.deposit(interest_amount)


class CurrentAccount(Account):
    def __init__(self, owner, number, balance=0, overdraft=None):
        super().__init__(owner, number, balance)
        config = BankConfig()
        self.overdraft = (
            config.overdraft_limit if overdraft is None else overdraft
        )

    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        if self.balance - amount < -self.overdraft:
            raise ValueError("Overdraft limit reached")

        self.balance -= amount
        self.history.append(("withdrawal", amount))
        self._notify("withdrawal", amount)


# Factory to create accounts easily
class AccountFactory:
    @staticmethod
    def create(account_type, owner, number, balance=0, **kwargs):
        account_type = account_type.lower()
        if account_type == "standard":
            return Account(owner, number, balance)
        elif account_type == "savings":
            rate = kwargs.get("rate", None)
            return SavingsAccount(owner, number, balance, rate)
        elif account_type == "current":
            overdraft = kwargs.get("overdraft", None)
            return CurrentAccount(owner, number, balance, overdraft)
        else:
            raise ValueError("Invalid account type")


# Main registry class implementing requested features
class AccountRegistry:
    def __init__(self):
        self.by_number = {}

    def add(self, account):
        self.by_number[account.account_number] = account

    # 1. Leaderboard: Get top accounts by balance using sorted() with key lambda
    def top_by_balance(self, n=5):
        accts = sorted(
            self.by_number.values(), key=lambda a: a.balance, reverse=True
        )
        return accts[:n]

    # 2. Binary search lookup over sorted account numbers
    def find_by_number(self, number):
        nums = sorted(self.by_number)  # sorted keys
        i = binary_search(nums, number)
        return self.by_number[nums[i]] if i >= 0 else None

    # 3. Recursive function to calculate total transaction amounts
    def total_transactions(self, number):
        account = self.find_by_number(number)
        if account is None:
            return 0.0

        def calc_sum(history):
            # Base case: no more items in history
            if not history:
                return 0.0
            # Recursive step: head amount + sum of tail
            return history[0][1] + calc_sum(history[1:])

        return calc_sum(account.history)


# Verification & Testing
if __name__ == "__main__":
    sms = SMSAlert()
    audit = AuditLog()

    registry = AccountRegistry()

    # Add test accounts
    registry.add(
        AccountFactory.create("standard", "Feneti Demissie", "AB-1001", 5000)
    )
    registry.add(
        AccountFactory.create(
            "savings", "Abdi Kebede", "AB-2002", 10000, rate=0.06
        )
    )
    registry.add(
        AccountFactory.create(
            "current", "Chala Bekele", "AB-3003", 500, overdraft=1000
        )
    )

    a1 = registry.find_by_number("AB-1001")
    a2 = registry.find_by_number("AB-2002")
    a3 = registry.find_by_number("AB-3003")

    a2.subscribe(sms)
    a2.subscribe(audit)

    print("--- 1. Leaderboard Test (top_by_balance) ---")
    for acc in registry.top_by_balance(2):
        print(f"- {acc.owner} ({acc.account_number}): {acc.balance:.2f} ETB")
    print()

    print("--- 2. Binary Search Test (find_by_number) ---")
    found_acc = registry.find_by_number("AB-2002")
    missing_acc = registry.find_by_number("AB-9999")
    print("Found target:", found_acc.owner if found_acc else "None")
    print("Missing target:", missing_acc)
    print()

    print("--- 3. Recursive Transaction Sum Test ---")
    a1.deposit(2500)
    a1.withdraw(1000)
    total = registry.total_transactions("AB-1001")
    print(f"Total transaction volume for AB-1001: {total:.2f} ETB")