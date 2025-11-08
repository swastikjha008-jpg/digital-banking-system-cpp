#include<iostream>
#include<iomanip>
#include<fstream>
#include<ctime>
#include<string>

void showBalance(double balance);
double deposit();
double withdraw(double balance);
void saveTransaction(const char* type, double amount, double newBalance);

int main()
{
    double balance = 1000.07;
    int choice = 0; 

    const std::string correctPIN = "8896";
    std::string enterdPIN;
    int attempts = 0;

    std::cout << "==================\n";
    std::cout <<" Welcome to Bank\n";
    std::cout << "==================\n";

    do{
        std::cout << "Enter your 4-digit PIN: ";
        std::cin >> enterdPIN;

        if (enterdPIN == correctPIN){
            std::cout << "✅ Access granted!\n\n";
            break;
        } else {
            std::cout << "❌ incorrect PIN. Try again.\n";
            attempts++;
        }

        if(attempts >= 3){
            std::cout << "🚫 Too many failed attempts. Exiting...\n";
            return 0;

        }
    } while (enterdPIN != correctPIN);

    do{
        std::cout <<"******************\n";
        std::cout <<"Enter your choice:\n";
        std::cout <<"******************\n";
        std::cout <<"1.Show Balance\n";
        std::cout <<"2.Deposit money\n";
        std::cout <<"3.Withdraw money\n";
        std::cout <<"4.Exit\n";
        std::cout << "Enter choice: ";
        std::cin >> choice;

        std::cin.clear();

        switch(choice){
            case 1:
                showBalance(balance);
                break;

            case 2: {
                double amt = deposit();
                balance += amt;
                if(amt > 0)
                    saveTransaction("Deposit", amt, balance);
                showBalance(balance);
                break;
            }

            case 3: {
                double amt = withdraw(balance);
                balance -= amt;
                if(amt > 0)
                    saveTransaction("Withdraw", amt, balance);
                showBalance(balance);
                break;
            }

            case 4:
                std::cout << "Thanks for visiting!\n";
                break;

            default:
                std::cout << "Invalid choice\n";
        }

    } while(choice != 4);

    return 0;
}

void showBalance(double balance){
    std::cout << "Your balance is: $" 
              << std::setprecision(2) << std::fixed << balance << '\n';
}

double deposit(){
    double amount = 0;
    std::cout << "Enter amount to be deposited: ";
    std::cin >> amount;

    if(amount > 0){
        return amount;
    }
    else{
        std::cout << "That's not a valid amount\n";
        return 0;
    }
}

double withdraw(double balance){
    double amount = 0;
    std::cout << "Enter amount to be withdrawn: ";
    std::cin >> amount;

    if(amount > balance){
        std::cout << "Insufficient funds\n";
        return 0;
    }
    else if(amount <= 0){
        std::cout << "That's not a valid amount\n";
        return 0;
    }
    else {
        return amount;
    }
}

void saveTransaction(const char* type, double amount, double newBalance){
   std::ofstream file("C:\\c++ course\\transactions.txt", std::ios::app); // ✅ full path
   if(!file) return;
   
   std::time_t now = std::time(nullptr);
   char* dt = std::ctime(&now);

   file << type
        << " | Amount: $" << std::fixed << std::setprecision(2) << amount
        << " | Balance: $" << newBalance
        << " | Date: " << dt;
        
   file.close();

   std::cout << "✅ Transaction saved to: C:\\c++ course\\transactions.txt\n"; // confirmation message
}

