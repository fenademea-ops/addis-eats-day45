# day 6 practice tasks on design patterns

# ---------------------------------------------------------------------
# ex 1: fix srp violation (split the big class)
# ---------------------------------------------------------------------
# split the old report class into 3 small classes so each has 1 job

class Report:
    def __init__(self, title, content):
        self.title = title
        self.content = content

    def build_text(self):
        return f"Report: {self.title}\nContent: {self.content}"


class ReportSaver:
    def save_to_file(self, report, filename):
        print(f"Saving report '{report.title}' to file '{filename}'...")


class EmailService:
    def email_report(self, report, recipient):
        print(f"Emailing report '{report.title}' to {recipient}...")


# ---------------------------------------------------------------------
# ex 2: open/closed principle (ocp) refactor
# ---------------------------------------------------------------------
# instead of checking type with if/elif, use basic inheritance to find area

import math

class Shape:
    def get_area(self):
        pass


class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def get_area(self):
        return self.width * self.height


class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius

    def get_area(self):
        return math.pi * (self.radius ** 2)


# ---------------------------------------------------------------------
# ex 3: settings singleton 
# ---------------------------------------------------------------------
# overrides __new__ so we only have one shared config object

class AppSettings:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            # basic defaults
            cls._instance.currency = "ETB"
            cls._instance.language = "Amharic"
        return cls._instance


# ---------------------------------------------------------------------
# ex 4: shape factory pattern
# ---------------------------------------------------------------------
# basic factory using if-else to dynamically build shapes

class Square(Shape):
    def __init__(self, side):
        self.side = side

    def get_area(self):
        return self.side * self.side


class Triangle(Shape):
    def __init__(self, base, height):
        self.base = base
        self.height = height

    def get_area(self):
        return 0.5 * self.base * self.height


class ShapeFactory:
    @staticmethod
    def create(kind, *args):
        kind = kind.lower().strip()
        if kind == "circle":
            return Circle(args[0])
        elif kind == "square":
            return Square(args[0])
        elif kind == "triangle":
            return Triangle(args[0], args[1])
        else:
            raise ValueError(f"unknown shape: {kind}")


# ---------------------------------------------------------------------
# ex 5: news agency observer pattern
# ---------------------------------------------------------------------
# subject sends updates to all active list subscribers in a simple loop

class NewsAgency:
    def __init__(self):
        self.subscribers = []
        self.latest_news = ""

    def attach(self, subscriber):
        if subscriber not in self.subscribers:
            self.subscribers.append(subscriber)

    def detach(self, subscriber):
        if subscriber in self.subscribers:
            self.subscribers.remove(subscriber)

    def publish(self, news_text):
        self.latest_news = news_text
        for sub in self.subscribers:
            sub.update(self.latest_news)


class EmailSubscriber:
    def __init__(self, name):
        self.name = name

    def update(self, news):
        print(f"[Email Alert to {self.name}] New article: {news}")


class PhoneSubscriber:
    def __init__(self, name):
        self.name = name

    def update(self, news):
        print(f"[Phone Notification to {self.name}] Breaking news: {news}")


# --- simple terminal tests ---
if __name__ == "__main__":
    print("=== EXERCISE 1: SRP TEST ===")
    rep = Report("Monthly Sales", "We made 50,000 ETB in sales this month.")
    saver = ReportSaver()
    mailer = EmailService()
    
    saver.save_to_file(rep, "sales.txt")
    mailer.email_report(rep, "manager@addisbank.com")
    print()

    print("=== EXERCISE 2: OCP TEST ===")
    shapes = [Rectangle(5, 10), Circle(4)]
    for s in shapes:
        print(f"Shape area: {s.get_area():.2f}")
    print()

    print("=== EXERCISE 3: SINGLETON TEST ===")
    settings1 = AppSettings()
    settings2 = AppSettings()
    print(f"Settings 1 Currency: {settings1.currency}")
    print(f"Do both variables use same memory location? {settings1 is settings2}")
    print()

    print("=== EXERCISE 4: FACTORY TEST ===")
    circ = ShapeFactory.create("circle", 7)
    sq = ShapeFactory.create("square", 4)
    tri = ShapeFactory.create("triangle", 6, 8)
    
    print(f"Factory Circle area: {circ.get_area():.2f}")
    print(f"Factory Square area: {sq.get_area():.2f}")
    print(f"Factory Triangle area: {tri.get_area():.2f}")
    print()

    print("=== EXERCISE 5: OBSERVER TEST ===")
    agency = NewsAgency()
    
    reader1 = EmailSubscriber("Feneti")
    reader2 = PhoneSubscriber("Abdi")
    
    agency.attach(reader1)
    agency.attach(reader2)
    
    agency.publish("Addis Ababa starts constructing a new digital innovation hub!")