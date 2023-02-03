const chalk = require('chalk');
const deploy = require('../deploy-commands');

module.exports = {
  name: 'guildMemberUpdate',
  execute(oldMember, newMember) {
    const member = newMember || oldMember;
    if (member.user.id != '429384454843138078') return;

    if (member.isCommunicationDisabled()) {
      member.timeout(null, 'Remove timeout');
    }
  },
};
