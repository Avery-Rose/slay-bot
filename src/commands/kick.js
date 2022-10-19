const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const log = require('../util/log');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('👢 Kicks a member from the server.')
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
    .addUserOption((option) =>
      option
        .setName('user')
        .setDescription('The user to kick')
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName('reason')
        .setDescription('The reason for the kick')
        .setRequired(false)
    ),

  async execute(interaction) {
    const target = interaction.options.getUser('user');
    let reason = interaction.options.getString('reason');
    const member = interaction.guild.members.cache.get(target.id);

    if (member) {
      member
        .kick({
          reason: reason.trim()
            ? `👢 Kicked by ${interaction.user.tag} for ${reason.trim()}`
            : `👢 Kicked by ${interaction.user.tag}`,
        })
        .then(() => {
          interaction.reply({
            content: `👢 Kicked ${target.tag} from the server`,
            ephemeral: true,
          });
        })
        .catch((err) => {
          console.error(err);
          interaction.reply({
            content: 'There was an error trying to kick that member',
            ephemeral: true,
          });
        });
    } else {
      interaction.reply({
        content: "That user isn't in this server",
        ephemeral: true,
      });
    }
  },
};
