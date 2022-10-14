const chalk = require('chalk');
const firestoreDelete = require('../util/firestoreDelete');
module.exports = {
  name: 'inviteDelete',
  execute(invite) {
    const { guild } = invite;
    console.log(`Invite Deleted: ${chalk.red(guild.name)}`);

    firestoreDelete('invites', invite.code);
  },
};
