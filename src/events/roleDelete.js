const chalk = require('chalk');
const firestoreDelete = require('../util/firestoreDelete');

module.exports = {
  name: 'roleDelete',
  execute(role) {
    const { guild, name } = role;
    console.log(`Role Deleted: ${chalk.red(name)} in ${chalk.red(guild.name)}`);

    firestoreDelete('roles', role.id);
  },
};
