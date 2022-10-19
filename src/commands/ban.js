const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .setDescription('🔨 Bans a member from the server')
    .addUserOption((option) =>
      option.setName('user').setDescription('The user to ban').setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName('reason')
        .setDescription('The reason for the ban')
        .setRequired(false)
    ),
  async execute(interaction) {
    const target = interaction.options.getUser('user');
    let reason = interaction.options.getString('reason');
    const member = interaction.guild.members.cache.get(target.id);

    if (member) {
      member
        .ban({
          reason: reason.trim()
            ? `🔨 Banned by ${interaction.user.tag} for ${reason.trim()}`
            : `🔨 Banned by ${interaction.user.tag}`,
        })
        .then(() => {
          interaction.reply({
            content: `🔨 Banned ${target.tag} from the server`,
            ephemeral: true,
          });
        })
        .catch((err) => {
          console.error(err);
          interaction.reply({
            content: 'There was an error trying to ban that member',
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
