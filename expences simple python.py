def expense_tracker():
    print("------------------------EXPENSES----------------------------\n")
    print("menu--------------------------------------------------------")
    
    expenses = []
    
    while True:
        print("1- Add expense")
        print("2- View expenses")
        print("3- Exit\n")
        
        choice = input("Write down your number of choice: ")
        
        if choice == '1':
            amount = float(input("Enter the amount of the expense: "))
            expenses.append(amount)
        
        elif choice == '2':
            print("\nYour expenses are:")
            for expense in expenses:
                print(expense)
            print()  # blank line
        
        elif choice == '3':
            break
        
        else:
            print("Invalid choice, try again.\n")