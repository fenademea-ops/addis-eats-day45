# Exercise 2 - Conditionals
score = 78  # You can test with 95, 78, or 40 to check each branch

# If/elif/else chain to assign a grade
if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
elif score >= 60:
    grade = "D"
else:
    grade = "F"

# Print using an f-string
print(f"Score: {score} -> Grade: {grade}")

# Independent check using 'and'
if score >= 70 and score < 80:
    print("You're in the C range - close to a B!")