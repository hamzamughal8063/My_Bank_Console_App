#! /usr/bin/env node

import inquirer from "inquirer"

//Bank Account interface

interface BankAccount{
    accountNumber: number;
    Balance: number;
    withdraw(amount: number): void
    deposit(amount: number): void
    checkBalance(): void
}

//Bank Account Class

class BankAccount implements BankAccount{
    accountNumber: number;
    Balance: number;

    constructor(accountNumber: number, balance: number){
        this.accountNumber = accountNumber;
        this.Balance = balance;
    }

    // Debit money
    withdraw(amount: number): void {
        if(this.Balance >= amount){
            this.Balance -= amount;
            console.log(`withdrawal of $${amount} successful. Remaining balance: $${this.Balance}`);
            
        }else{
            console.log("insufficient balance");
            
        }
    }

    // Creadit money

    deposit(amount: number): void {
        if(amount > 100){
            amount -= 1; //$1 fee charged if more then $100 is deposit
        } this.Balance += amount
        console.log(`Deposit of $${amount} successful. Remaining balance: $${this.Balance}`);   
    }

    // Check Balance

    checkBalance(): void {
        console.log(`Currunt balance $${this.Balance}`);
        
    }
}

// Customer class

class Customer{
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    mobileNumber: number;
    account: BankAccount;

    constructor(firstName: string, lastName: string, gender: string, age: number, mobileNumber: number, account: BankAccount)
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}

// Create bank account

const accounts: BankAccount[] = [
    new BankAccount (1111, 1000),
    new BankAccount (2222, 2000),
    new BankAccount (3333, 3000)
];

// Create Custumers

const Customers: Customer[] = [
    new Customer ("Hamza", "Mughal", "Male", 25, 3901234567, accounts[0]),
    new Customer ("Ahmed", "Mughal", "Male", 14, 3801234567, accounts[1]),
    new Customer ("Arham", "Mughal", "Male", 5, 3701234567, accounts[2])
]


// Function to interact with bank account

async function service(){
    do{
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: "Enter your acccount number:"
        })

        const Customer = Customers.find(Customer => Customer.account.accountNumber === accountNumberInput.accountNumber)
        if(Customer){
            console.log(`Wellcome, ${Customer.firstName} ${Customer.lastName}!\n`)
            const ans = await inquirer.prompt([{
                name: "Select",
                type: "list",
                message: "",
                choices: ["Deposit", "Withdraw", "Check Balance", "Exit"]
            }])

            switch (ans.Select) {
                case "Deposit":
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount tp deposit:"
                    })
                    Customer.account.deposit(depositAmount.amount)
                    break;

                    case "Withdraw":
                    const withdrawAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount tp deposit:"
                    })
                    Customer.account.withdraw(withdrawAmount.amount)
                    break;

                    case "Check Balance":
                        Customer.account.checkBalance();
                        break;
                    case "Exit":
                        console.log("Exiting bank program...");
                        console.log("\n Thank you for using our bank services. Have a great day!");
                        return; 
                        }
            
        }else{
            console.log("Invalid Account Number. Please try again.");
            
        }
    } while(true)
}

service()