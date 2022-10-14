const chalk = require('chalk');
const firestoreAdd = require('../util/firestoreAdd');

module.exports = {
  name: 'inviteCreate',
  execute(invite) {
    const { guild, inviter } = invite;
    const { username } = inviter;
    console.log(
      `Invite Created: ${chalk.green(username)} in ${chalk.green(guild.name)}`
    );

    // Insert invite data into database
    firestoreAdd('invites', invite.code, {
      guild: guild.name,
      inviter: username,
      uses: invite.uses,
      maxUses: invite.maxUses,
      maxAge: invite.maxAge,
      createdAt: invite.createdAt,
      expiresAt: invite.expiresAt,
    });
  },
};
