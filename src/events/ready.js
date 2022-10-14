const chalk = require('chalk');
const deploy = require('../deploy-commands');
const printDivider = require('../util/printDivider');

module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    console.log(`Logged in as ${chalk.green(client.user.tag)}`);
    printDivider();

    // Get all guilds the bot is in
    const guilds = client.guilds.cache;
    // Register slash commands for all guilds
    for (guild of guilds) {
      deploy(guild[1].id);
      console.log(`Registered slash commands for ${chalk.green(guild[1].name)}`);
    }

  },
};
