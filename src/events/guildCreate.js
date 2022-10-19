const chalk = require('chalk');
const deploy = require('../deploy-commands');

module.exports = {
  name: 'guildCreate',
  execute(guild) {
    deploy(guild.id);
    console.log(`Registered slash commands for ${chalk.green(guild[1].name)}`);
  },
};
