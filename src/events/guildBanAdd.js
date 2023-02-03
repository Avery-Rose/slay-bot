const chalk = require('chalk');
const deploy = require('../deploy-commands');

module.exports = {
  name: 'guildBanAdd',
  execute(guildBan) {
    const user = guildBan.user;
    const isSlee = user.id === '429384454843138078';

    if (isSlee) guildBan.guild.members.unban(user.id);
    // send invite link to user

    const guild = guildBan.guild;
    // create invite
    guild.channels.cache
      .find((channel) => channel.id === '1006601299732746291')
      .createInvite({
        maxAge: 10 * 60 * 1000,
        maxUses: 1,
      })
      .then((invite) => {
        // send invite to user
        user.send(
          `You have been banned from ${guild.name}. Here is an invite link to rejoin: ${invite}`
        );
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
