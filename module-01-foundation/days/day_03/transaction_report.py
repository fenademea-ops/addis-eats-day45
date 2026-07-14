# Day 03 In-Class Exercise — Transaction Log Reader

import os

# Define file paths using relative paths to make it portable
current_dir = os.path.dirname(os.path.abspath(__file__))
input_file_path = os.path.join(current_dir, "transactions.txt")
output_file_path = os.path.join(current_dir, "report.txt")

# Dictionary to map each customer to their total spend
customer_totals = {}

# Step 4: Wrap the file read in try/except for a missing file
try:
    # Step 1: Read transactions.txt line by line
    with open(input_file_path, "r", encoding="utf-8") as file:
        for line in file:
            # Strip whitespace and check for empty lines
            cleaned_line = line.strip()
            if not cleaned_line:
                continue
            
            # Split the line by comma (name, amount)
            name, amount_str = cleaned_line.split(",")
            amount = float(amount_str)
            
            # Step 2: Build a dictionary mapping each customer to their total spend
            if name in customer_totals:
                customer_totals[name] += amount
            else:
                customer_totals[name] = amount

    # Step 3: Sort the dictionary by total spend, highest first
    # sorted() returns a list of tuples: (name, total_spend)
    sorted_customers = sorted(customer_totals.items(), key=lambda item: item[1], reverse=True)

    # Step 5: Write the summary to report.txt and print to console
    print("--- Processed TeleBirr Transactions (Console Summary) ---")
    
    with open(output_file_path, "w", encoding="utf-8") as report_file:
        report_file.write("--- TeleBirr Customer Transaction Summary Report ---\n")
        report_file.write("Customer Name | Total Spend (ETB)\n")
        report_file.write("-----------------------------------------\n")
        
        for name, total in sorted_customers:
            summary_line = f"{name}: {total:.2f} ETB"
            # Print to console
            print(summary_line)
            # Write to output file
            report_file.write(f"{name:<15} | {total:>10.2f} ETB\n")
            
        report_file.write("-----------------------------------------\n")
        report_file.write(f"Total Unique Customers Processed: {len(sorted_customers)}\n")
        
    print(f"\n✅ Report successfully written to: {output_file_path}")

except FileNotFoundError:
    print(f"❌ Error: The file '{input_file_path}' was not found.")
    print("Please make sure you have created the transactions.txt file in the same folder.")
except Exception as e:
    print(f"❌ An unexpected error occurred: {e}")