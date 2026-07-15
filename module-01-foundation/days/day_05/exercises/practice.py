# =====================================================================
# Day 5 Practice: Vehicle Hierarchy, Abstract Classes & Polymorphism
# File Location: day_05/exercises/practice.py
# =====================================================================

from abc import ABC, abstractmethod

# Exercise 5: Make Vehicle an abstract base class (inheriting from ABC)
class Vehicle(ABC):
    # Exercise 1: Base class with make and model
    def __init__(self, make, model):
        self.make = make
        self.model = model

    # A standard method that subclasses can use or override
    def describe(self):
        print(f"Vehicle: {self.make} {self.model}")

    # Exercise 5: Abstract method wheels() that subclasses MUST implement
    @abstractmethod
    def wheels(self):
        pass


class Car(Vehicle):
    # Standard subclass setup using super()
    def __init__(self, make, model):
        super().__init__(make, model)

    # Exercise 5: Car must implement the abstract wheels() method
    def wheels(self):
        return 4


# Exercise 1 & 2: Truck subclass extending Vehicle with super()
class Truck(Vehicle):
    # Exercise 2: Give Truck a capacity attribute, setting make/model via super()
    def __init__(self, make, model, capacity):
        super().__init__(make, model)
        self.capacity = capacity  # Capacity in pounds

    # Exercise 3: Override describe() in Truck to mention the capacity
    def describe(self):
        print(f"Truck: {self.make} {self.model} (Towing Capacity: {self.capacity} lbs)")

    # Exercise 5: Truck must implement the abstract wheels() method
    def wheels(self):
        return 6


# =====================================================================
# Execution & Test Block
# =====================================================================
if __name__ == "__main__":
    print("=== Day 5 Practice: Vehicle Hierarchy Output ===\n")

    # Create instances of our subclasses
    car_1 = Car("Toyota", "Corolla")
    truck_1 = Truck("Ford", "F-150", 14000)
    car_2 = Car("Tesla", "Model 3")
    truck_2 = Truck("Volvo", "VNL 860", 80000)

    # Exercise 4: Polymorphism Loop
    # Put several vehicles in a list and loop over them
    fleet = [car_1, truck_1, car_2, truck_2]

    print("--- Running Polymorphic Fleet Check ---")
    for vehicle in fleet:
        # Each vehicle calls its respective describe() and wheels() output
        vehicle.describe()
        print(f"Wheels: {vehicle.wheels()}")
        print("-" * 35)