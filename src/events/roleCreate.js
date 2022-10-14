const chalk = require('chalk');
const firestoreAdd = require('../util/firestoreAdd');

module.exports = {
  name: 'roleCreate',
  execute(role) {
    const { guild, name } = role;
    console.log(
      `Role created: ${chalk.green(name)} in ${chalk.green(guild.name)}`
    );

    firestoreAdd('roles', role.id, {
      guild: guild.name,
      name: name,
      color: role.color,
      createdAt: role.createdAt,
    });
  },
};
