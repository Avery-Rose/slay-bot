const chalk = require('chalk');
const { deploy } = require('../deploy-commands');
const printDivider = require('../util/printDivider');

module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    // Set status
    client.user.setActivity('Meow', { type: 'LISTENING' });
    console.log(`Logged in as ${chalk.green(client.user.tag)}`);
    printDivider();

    // Get all guilds the bot is in
    const guilds = client.guilds.cache;
    // Register slash commands for all guilds
    for (guild of guilds) {
      console.log(guild[1].name, guild[1].id);
      deploy(guild[1].id)
        .then(() => {
          console.log(
            `Registered slash commands for ${chalk.green(guild[1].name)}`
          );
        })
        .catch((err) => {
          console.log(
            `Error registering slash commands for ${chalk.green(guild[1].name)}`
          );
          console.log(err);
        });
    }
  },
};
