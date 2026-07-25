import random
from abc import ABC, abstractmethod
from datetime import datetime


# =====================================
# Singleton Configuration
# =====================================

class BankConfig:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.interest_rate = 0.05
            cls._instance.overdraft_limit = 1000
        return cls._instance


# =====================================
# Abstract Observer Pattern
# =====================================

class Observer(ABC):
    """Abstract Base Class defining the contract for all bank notification observers."""
    
    @abstractmethod
    def notify(self, account, action: str, amount: float):
        """Must be implemented by concrete observer classes."""
        pass


class SMSAlert(Observer):
    def notify(self, account, action: str, amount: float):
        print(
            f"[SMS ALERT] {account.owner}: "
            f"{action.upper()} {amount:.2f} ETB | "
            f"Balance: {account.balance:.2f} ETB"
        )


class AuditLog(Observer):
    def notify(self, account, action: str, amount: float):
        print(
            f"[AUDIT LOG] {account.account_number} | "
            f"{action.upper()} | "
            f"{amount:.2f} ETB"
        )


# =====================================
# Binary Search Algorithm
# =====================================

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


# =====================================
# Abstract Account Class
# =====================================

class Account(ABC):
    def __init__(self, owner: str, number: str, balance: float = 0):
        self.owner = owner
        self.account_number = number

        if balance < 0:
            raise ValueError("Balance cannot be negative")

        self.balance = balance
        self.observers = []
        self.history = []  # Stores tuples: (action, amount, timestamp, running_balance)

    @abstractmethod
    def account_type(self):
        pass

    def get_balance(self):
        return self.balance

    def subscribe(self, observer: Observer):
        """Enforces that only valid Observer instances are subscribed."""
        if isinstance(observer, Observer) and observer not in self.observers:
            self.observers.append(observer)

    def _notify(self, action: str, amount: float):
        for observer in self.observers:
            observer.notify(self, action, amount)

    def deposit(self, amount: float):
        if amount <= 0:
            raise ValueError("Amount must be positive")

        self.balance += amount
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        self.history.append(("deposit", amount, timestamp, self.balance))
        self._notify("deposit", amount)

    def withdraw(self, amount: float):
        if amount <= 0:
            raise ValueError("Amount must be positive")

        if amount > self.balance:
            raise ValueError("Insufficient funds")

        self.balance -= amount
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        self.history.append(("withdrawal", amount, timestamp, self.balance))
        self._notify("withdrawal", amount)

    def undo_last(self):
        if not self.history:
            return False, "No transaction to undo"

        action, amount, timestamp, _ = self.history.pop()

        if action == "deposit":
            if self.balance < amount:
                # Re-insert history if undo would cause negative balance without overdraft
                self.history.append((action, amount, timestamp, self.balance))
                return False, "Cannot undo deposit: balance too low"
            self.balance -= amount
        elif action == "withdrawal":
            self.balance += amount

        return True, f"Successfully reversed last {action} of {amount:.2f} ETB"


# =====================================
# Concrete Account Types
# =====================================

class StandardAccount(Account):
    def account_type(self):
        return "Standard"


class SavingsAccount(Account):
    def __init__(self, owner: str, number: str, balance: float = 0, rate=None):
        super().__init__(owner, number, balance)
        config = BankConfig()
        self.rate = config.interest_rate if rate is None else rate

    def account_type(self):
        return "Savings"

    def add_interest(self):
        interest = self.balance * self.rate
        if interest > 0:
            self.deposit(interest)
        return interest


class CurrentAccount(Account):
    def __init__(self, owner: str, number: str, balance: float = 0, overdraft=None):
        super().__init__(owner, number, balance)
        config = BankConfig()
        self.overdraft = config.overdraft_limit if overdraft is None else overdraft

    def account_type(self):
        return "Current"

    def withdraw(self, amount: float):
        if amount <= 0:
            raise ValueError("Amount must be positive")

        if self.balance - amount < -self.overdraft:
            raise ValueError("Overdraft limit reached")

        self.balance -= amount
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        self.history.append(("withdrawal", amount, timestamp, self.balance))
        self._notify("withdrawal", amount)


# =====================================
# Factory Pattern
# =====================================

class AccountFactory:
    @staticmethod
    def create(account_type: str, owner: str, number: str, balance: float = 0, **kwargs):
        account_type = account_type.lower()

        if account_type in ("standard", "basic"):
            return StandardAccount(owner, number, balance)
        elif account_type == "savings":
            return SavingsAccount(owner, number, balance, kwargs.get("rate"))
        elif account_type == "current":
            return CurrentAccount(owner, number, balance, kwargs.get("overdraft"))
        else:
            raise ValueError("Invalid account type")


# =====================================
# Account Registry
# =====================================

class AccountRegistry:
    def __init__(self):
        self.accounts = {}

    def add(self, account: Account):
        self.accounts[account.account_number] = account

    def find_by_number(self, number: str):
        numbers = sorted(self.accounts.keys())
        index = binary_search(numbers, number)

        if index >= 0:
            return self.accounts[numbers[index]]
        return None

    def top_by_balance(self, n: int = 5):
        return sorted(
            self.accounts.values(),
            key=lambda a: a.balance,
            reverse=True
        )[:n]


# =====================================
# Branch Tree (Composite Pattern)
# =====================================

class Branch:
    def __init__(self, name: str):
        self.name = name
        self.children = []
        self.accounts = []

    def add_child(self, branch):
        self.children.append(branch)

    def add_account(self, account: Account):
        self.accounts.append(account)

    def total_balance(self):
        total = sum(account.balance for account in self.accounts)
        for child in self.children:
            total += child.total_balance()
        return total


# =====================================
# Main Application Class: AddisBank
# =====================================

class AddisBank:
    def __init__(self):
        self.registry = AccountRegistry()
        self.transactions = []  # Central global log
        self.config = BankConfig()
        self._setup_branches()

    def _setup_branches(self):
        """Initializes default bank hierarchy structure."""
        self.head_office = Branch("Head Office")
        self.addis_region = Branch("Addis Region")
        self.bole_branch = Branch("Bole Branch")

        self.head_office.add_child(self.addis_region)
        self.addis_region.add_child(self.bole_branch)

    def _generate_account_number(self):
        """Generates a unique 4-digit account number with prefix AB-."""
        while True:
            num = f"AB-{random.randint(1000, 9999)}"
            if self.registry.find_by_number(num) is None:
                return num

    def get_input(self, prompt: str, input_type=str, validation=None):
        """Generic input handler with validation and cancel capability."""
        while True:
            raw = input(prompt).strip()
            if raw.lower() == 'cancel':
                return None

            try:
                val = input_type(raw)
                if validation and not validation(val):
                    print(" Invalid input value. Try again (or type 'cancel').")
                    continue
                return val
            except ValueError:
                print(f" Invalid format. Please enter a valid {input_type.__name__}.")

    def show_menu(self):
        print("\n" + "=" * 45)
        print(" WELCOME TO ADDIS BANK ")
        print("=" * 45)
        print(" 1. Create Account")
        print(" 2. View All Accounts")
        print(" 3. Find Account")
        print(" 4. Deposit Money")
        print(" 5. Withdraw Money")
        print(" 6. Transfer Money")
        print(" 7. Check Balance")
        print(" 8. View Account History")
        print(" 9. Top Accounts Leaderboard")
        print("10. Add Interest (Savings Accounts)")
        print("11. Undo Last Transaction")
        print("12. View Bank Statistics")
        print("13. Branch Structure Overview")
        print(" 0. Exit Application")
        print("=" * 45)

    def create_account(self):
        print("\n--- Create Account ---")
        print("Types: Standard, Savings, Current")
        acc_type = self.get_input(
            "Enter Account Type: ",
            str,
            lambda t: t.lower() in ("standard", "basic", "savings", "current")
        )
        if not acc_type: return

        owner = self.get_input("Enter Owner Full Name: ", str, lambda s: len(s) > 0)
        if not owner: return

        initial_bal = self.get_input("Enter Initial Balance (ETB): ", float, lambda v: v >= 0)
        if initial_bal is None: return

        acc_num = self._generate_account_number()
        account = AccountFactory.create(acc_type, owner, acc_num, initial_bal)

        # Attach concrete observers derived from Observer base class
        account.subscribe(SMSAlert())
        account.subscribe(AuditLog())

        self.registry.add(account)
        self.bole_branch.add_account(account)

        print(f"\n Account Created Successfully!")
        print(f"   Account Number: {account.account_number}")
        print(f"   Owner:          {account.owner}")
        print(f"   Type:           {account.account_type()}")
        print(f"   Balance:        {account.balance:.2f} ETB")

    def view_all_accounts(self):
        print("\n--- All Registered Accounts ---")
        accounts = self.registry.accounts.values()
        if not accounts:
            print("No accounts available.")
            return

        total_bal = 0
        for acc in accounts:
            print(f"[{acc.account_number}] {acc.owner:<20} | Type: {acc.account_type():<10} | Balance: {acc.balance:.2f} ETB")
            total_bal += acc.balance

        print("-" * 60)
        print(f"Total Combined Balance: {total_bal:.2f} ETB")

    def find_account(self):
        print("\n--- Find Account ---")
        acc_num = self.get_input("Enter Account Number (e.g., AB-1001): ", str)
        if not acc_num: return

        acc = self.registry.find_by_number(acc_num)
        if acc:
            print(f"\nAccount Found:")
            print(f"   Number:  {acc.account_number}")
            print(f"   Owner:   {acc.owner}")
            print(f"   Type:    {acc.account_type()}")
            print(f"   Balance: {acc.balance:.2f} ETB")
        else:
            print(" Account not found.")

    def deposit_money(self):
        print("\n--- Deposit Money ---")
        acc_num = self.get_input("Enter Account Number: ", str)
        if not acc_num: return

        acc = self.registry.find_by_number(acc_num)
        if not acc:
            print(" Account not found.")
            return

        amount = self.get_input("Enter Deposit Amount (ETB): ", float, lambda a: a > 0)
        if amount is None: return

        try:
            acc.deposit(amount)
            self.transactions.append(("DEPOSIT", acc_num, amount, datetime.now()))
            print(" Deposit executed successfully.")
        except ValueError as e:
            print(f" Error: {e}")

    def withdraw_money(self):
        print("\n--- Withdraw Money ---")
        acc_num = self.get_input("Enter Account Number: ", str)
        if not acc_num: return

        acc = self.registry.find_by_number(acc_num)
        if not acc:
            print(" Account not found.")
            return

        amount = self.get_input("Enter Withdrawal Amount (ETB): ", float, lambda a: a > 0)
        if amount is None: return

        try:
            acc.withdraw(amount)
            self.transactions.append(("WITHDRAWAL", acc_num, amount, datetime.now()))
            print(" Withdrawal executed successfully.")
        except ValueError as e:
            print(f" Error: {e}")

    def check_balance(self):
        print("\n--- Check Balance ---")
        acc_num = self.get_input("Enter Account Number: ", str)
        if not acc_num: return

        acc = self.registry.find_by_number(acc_num)
        if acc:
            print(f"Balance for {acc.owner} [{acc.account_number}]: {acc.get_balance():.2f} ETB")
        else:
            print(" Account not found.")

    def transfer_money(self):
        print("\n--- Transfer Money ---")
        from_num = self.get_input("Enter Sender Account Number: ", str)
        if not from_num: return
        sender = self.registry.find_by_number(from_num)
        if not sender:
            print(" Sender account not found.")
            return

        to_num = self.get_input("Enter Receiver Account Number: ", str)
        if not to_num: return
        receiver = self.registry.find_by_number(to_num)
        if not receiver:
            print(" Receiver account not found.")
            return

        if sender == receiver:
            print(" Cannot transfer to the same account.")
            return

        amount = self.get_input("Enter Transfer Amount (ETB): ", float, lambda a: a > 0)
        if amount is None: return

        try:
            sender.withdraw(amount)
            receiver.deposit(amount)
            self.transactions.append(("TRANSFER", f"{from_num}->{to_num}", amount, datetime.now()))
            print(f"Transferred {amount:.2f} ETB from {sender.owner} to {receiver.owner}.")
        except ValueError as e:
            print(f" Transfer Failed: {e}")

    def view_transactions(self):
        print("\n--- Account Transaction History ---")
        acc_num = self.get_input("Enter Account Number: ", str)
        if not acc_num: return

        acc = self.registry.find_by_number(acc_num)
        if not acc:
            print("Account not found.")
            return

        if not acc.history:
            print("No transaction history available for this account.")
            return

        print(f"\nHistory for {acc.owner} ({acc.account_number}):")
        print(f"{'Timestamp':<20} | {'Action':<12} | {'Amount (ETB)':<12} | {'Balance (ETB)':<12}")
        print("-" * 62)
        for action, amount, timestamp, running_bal in acc.history:
            print(f"{timestamp:<20} | {action.capitalize():<12} | {amount:<12.2f} | {running_bal:<12.2f}")

    def top_accounts(self):
        print("\n--- Top Accounts Leaderboard ---")
        n = self.get_input("How many top accounts to display? ", int, lambda x: x > 0)
        if n is None: return

        leaders = self.registry.top_by_balance(n)
        if not leaders:
            print("No accounts available.")
            return

        for idx, acc in enumerate(leaders, start=1):
            print(f"{idx}. {acc.owner:<20} [{acc.account_number}] - {acc.balance:.2f} ETB ({acc.account_type()})")

    def add_interest(self):
        print("\n--- Add Interest ---")
        acc_num = self.get_input("Enter Savings Account Number: ", str)
        if not acc_num: return

        acc = self.registry.find_by_number(acc_num)
        if not acc:
            print(" Account not found.")
            return

        if not isinstance(acc, SavingsAccount):
            print(" Interest can only be applied to Savings Accounts.")
            return

        interest_added = acc.add_interest()
        print(f" Added {interest_added:.2f} ETB interest to {acc.owner}'s account.")

    def undo_transaction(self):
        print("\n--- Undo Last Transaction ---")
        acc_num = self.get_input("Enter Account Number: ", str)
        if not acc_num: return

        acc = self.registry.find_by_number(acc_num)
        if not acc:
            print(" Account not found.")
            return

        success, msg = acc.undo_last()
        if success:
            print(f" Added {msg}")
        else:
            print(f" Undo Failed: {msg}")

    def view_statistics(self):
        print("\n--- Bank Statistics Overview ---")
        accounts = list(self.registry.accounts.values())
        total_accounts = len(accounts)

        if total_accounts == 0:
            print("No accounts in system.")
            return

        total_balance = sum(a.balance for a in accounts)
        avg_balance = total_balance / total_accounts

        breakdown = {}
        for a in accounts:
            t = a.account_type()
            breakdown[t] = breakdown.get(t, 0) + 1

        print(f"Total Registered Accounts : {total_accounts}")
        print(f"Total Assets Managed      : {total_balance:.2f} ETB")
        print(f"Average Account Balance   : {avg_balance:.2f} ETB")
        print("\nAccount Type Breakdown:")
        for acc_type, count in breakdown.items():
            print(f"  • {acc_type:<10}: {count}")

    def branch_tree_overview(self):
        print("\n--- Branch Hierarchy Overview ---")
        print(f" {self.head_office.name}")
        print(f"  {self.addis_region.name}")
        print(f"  {self.bole_branch.name}")
        print("-" * 40)
        print(f"Total Balance across Branch Network: {self.head_office.total_balance():.2f} ETB")

    def run(self):
        """Main application execution loop."""
        while True:
            self.show_menu()
            choice = self.get_input("Select an option (0-13): ", int, lambda c: 0 <= c <= 13)

            if choice == 0:
                print("\nThank you for choosing Addis Bank. Goodbye!")
                break
            elif choice == 1:
                self.create_account()
            elif choice == 2:
                self.view_all_accounts()
            elif choice == 3:
                self.find_account()
            elif choice == 4:
                self.deposit_money()
            elif choice == 5:
                self.withdraw_money()
            elif choice == 6:
                self.transfer_money()
            elif choice == 7:
                self.check_balance()
            elif choice == 8:
                self.view_transactions()
            elif choice == 9:
                self.top_accounts()
            elif choice == 10:
                self.add_interest()
            elif choice == 11:
                self.undo_transaction()
            elif choice == 12:
                self.view_statistics()
            elif choice == 13:
                self.branch_tree_overview()

            input("\nPress Enter to return to main menu...")


# =====================================
# Application Entry Point
# =====================================

if __name__ == "__main__":
    app = AddisBank()
    app.run()
