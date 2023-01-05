const chalk = require('chalk');
const { deployGlobal, deployGuild } = require('../deploy-commands');
const printDivider = require('../util/printDivider');

module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    // Set status
    client.user.setActivity('Meow', { type: 'LISTENING' });
    console.log(`Logged in as ${chalk.green(client.user.tag)}`);
    printDivider();

    deployGlobal()
      .then(() => {
        console.log(`Registered slash commands globally`);
      })
      .catch((err) => {
        console.log(
          `Error registering slash commands globally: ${chalk.red(err)}`
        );
      });

    // // Get all guilds the bot is in
    // const guilds = client.guilds.cache;
    // // Register slash commands for all guilds
    // for (guild of guilds) {
    //   const guildId = guild[1].id;
    //   const guildName = guild[1].name;
    //   console.log(guildId, guildName);

    //   deploy(guildId)
    //     .then(() => {
    //       console.log(
    //         `Registered slash commands for ${chalk.green(guildName)}`
    //       );
    //     })
    //     .catch((err) => {
    //       console.log(
    //         `Error registering slash commands for ${chalk.green(guildName)}`
    //       );
    //     });
    // }
  },
};
