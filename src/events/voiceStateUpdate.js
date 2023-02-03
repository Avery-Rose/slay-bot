const chalk = require('chalk');
const deploy = require('../deploy-commands');

module.exports = {
  name: 'voiceStateUpdate',
  execute(oldState, newState) {
    const user = newState.member.user;
    const isSlee = user.id === '429384454843138078';
    if (!isSlee) return;
    const isMute = newState.serverMute,
      isDeaf = newState.serverDeaf;

    if (isMute) newState.setMute(false);
    if (isDeaf) newState.setDeaf(false);
  },
};
