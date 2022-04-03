import chalk from "chalk";

export function printMessage(message: string, color: string) {
  console.log(chalk.bgHex(color).bold(`Status:`), chalk.hex(color)(message));
}
