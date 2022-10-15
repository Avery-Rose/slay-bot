const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .setDescription('Bans a user')
    .setDescriptionLocalizations({
      'en-US': '🔨 Bans a member from the server',
      'es-ES': '🔨 Banea a un miembro del servidor',
      fr: '🔨 Bannit un membre du serveur',
    })
    .addUserOption((option) =>
      option
        .setName('user')
        .setDescription('The user to ban')
        .setDescriptionLocalizations({
          'en-US': 'The user to ban',
          'es-ES': 'El usuario a banear',
          fr: "L'utilisateur à bannir",
        })
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName('reason')
        .setDescription('The reason for the ban')
        .setDescriptionLocalizations({
          'en-US': 'The reason for the ban',
          'es-ES': 'La razón del baneo',
          fr: 'La raison du bannissement',
        })
        .setRequired(false)
    ),
  async execute(interaction) {
    const target = interaction.options.getUser('user');
    let reason = interaction.options.getString('reason');
    const member = interaction.guild.members.cache.get(target.id);

    if (reason) {
      reason = reason.trim();
      // prefix reason with Banned by <user> for ...
      reason = `Banned by ${interaction.user.tag} for ${reason}`;
    } else {
      reason = `Banned by ${interaction.user.tag}`;
    }

    if (member) {
      member
        .ban({ reason })
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
