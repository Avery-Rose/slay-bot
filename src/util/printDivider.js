const chalk = require('chalk');
const printDivider = () => {
  const width = process.stdout.columns;
  const divider = '\u2500';
  console.log(chalk.gray(divider.repeat(width / divider.length)));
};

module.exports = printDivider;
