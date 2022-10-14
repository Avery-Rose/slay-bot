const chalk = require('chalk');
const firestoreAdd = require('../util/firestoreAdd');

module.exports = {
  name: 'roleUpdate',
  execute(role) {
    const { guild, name } = role;
    console.log(
      `Role updated: ${chalk.yellow(name)} in ${chalk.yellow(guild.name)}`
    );

    firestoreAdd('roles', role.id, {
      guild: guild.name,
      name: name,
      color: role.color,
      createdAt: role.createdAt,
    });
  },
};
