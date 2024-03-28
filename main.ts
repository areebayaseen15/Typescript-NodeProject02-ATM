#!/usr/bin/env node
import inquirer from "inquirer"

let myBalance = 20000;
let pincode = 112233;

let pinAnswer = await inquirer.prompt(
    {
    name: "pin",
    message: "Enter your pincode",
    type: "number"
    }
);
if (pinAnswer.pin=== pincode){
    console.log("Correct pin code");

let operationAns = await inquirer.prompt( 
    {
    name: "operation",
    message: "What do you want to do?",
    type: "list",
    choices:["withdraw","check balance"],
}
);
     
     
if (operationAns.operation === "withdraw"){
    let selectAnswer = await inquirer.prompt(
        [
            {
                name: "select",
                message: "enter the amount to withdraw or select fast cash option",
                type: "list",
                choices: ["Enter amount" , "Fast cash"]

             }
            ]
        );  
         if (selectAnswer.select === "Enter amount"){
            let amountAnswer = await inquirer.prompt([{
                name: "amount",
                message: "enter the amount",
                type: "number"
            }]);

         if (amountAnswer.amount <= myBalance) {
        myBalance -= amountAnswer.amount;
        console.log(`Successfuly withdrew ${amountAnswer.amount}.Your remaining balance is: ${myBalance}`)
    }
else { console.log(`insufficient balance`);
}
}
else if (selectAnswer.select === "Fast cash") {
    let cashAnswer = await inquirer.prompt({
        name: "cash",
        message: "select the amount to withdraw",
        type: "list",
        choices:[
            { name: "100", value: 100 },
            { name: "200", value: 200 },
            { name: "500", value: 500 },
            { name: "1000", value: 1000 }
]
    });
    if (cashAnswer.cash <= myBalance) {
        myBalance -= cashAnswer.cash;
        console.log(`Successfuly withdrew ${cashAnswer.cash}.Your remaining balance is: ${myBalance}`)
    }

}
}

else if (operationAns.operation === "check balance") {
    console.log(`your balance is: ${myBalance}`)
}
}

else {
    console.log("invalid pincode");
}
