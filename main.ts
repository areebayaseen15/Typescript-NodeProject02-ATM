#!/usr/bin/env node
                //Project 02: Atm
import inquirer from "inquirer";
import chalk from "chalk";
import figlet from "figlet";

console.log(chalk.yellow(figlet.textSync(`
                                  My  ATM
 `)));


let myBalance = 20000;
let pincode = 112233;

let pinAnswer = await inquirer.prompt({
  name: "pin",
  message: chalk.bgGray("Enter your pincode"),
  type: "number",
});
if (pinAnswer.pin === pincode) {
  console.log(chalk.blue("Correct pin code"));

  let operationAns = await inquirer.prompt({
    name: "operation",
    message:chalk.bgCyan("What do you want to do?"),
    type: "list",
    choices: ["withdraw", "check balance"],
  });

  if (operationAns.operation === "withdraw") {
    let selectAnswer = await inquirer.prompt([
      {
        name: "select",
        message:chalk.bgGray("enter the amount to withdraw or select fast cash option"),
        type: "list",
        choices: ["Enter amount", "Fast cash"],
      },
    ]);
    if (selectAnswer.select === "Enter amount") {
      let amountAnswer = await inquirer.prompt([
        {
          name: "amount",
          message: "enter the amount",
          type: "number",
        },
      ]);

      if (amountAnswer.amount <= myBalance) {
        myBalance -= amountAnswer.amount;
        console.log(chalk.magentaBright(
          `Successfuly withdrew ${amountAnswer.amount}.Your remaining balance is: ${myBalance}`
        ));
      } else {
        console.log(`insufficient balance`);
      }
    } else if (selectAnswer.select === "Fast cash") {
      let cashAnswer = await inquirer.prompt({
        name: "cash",
        message:chalk.bgCyanBright("select the amount to withdraw"),
        type: "list",
        choices: [
          { name: "100", value: 100 },
          { name: "200", value: 200 },
          { name: "500", value: 500 },
          { name: "1000", value: 1000 },
        ],
      });
      if (cashAnswer.cash <= myBalance) {
        myBalance -= cashAnswer.cash;
        console.log(chalk.yellow(
          `Successfuly withdrew ${cashAnswer.cash}.Your remaining balance is: ${myBalance}`
        ));
      }
    }
  } else if (operationAns.operation === "check balance") {
    console.log(chalk.bgMagenta(`your balance is: ${myBalance}`));
  }
} else {
  console.log(chalk.red("invalid pincode"));
}
