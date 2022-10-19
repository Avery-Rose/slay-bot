const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require('discord.js');
const parseTime = require('../util/parseTime');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('mute')
    .setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers)
    .setDescription('🤐 Mutes a member in the server')
    .addUserOption((option) =>
      option
        .setName('user')
        .setDescription('The user to mute')
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName('time')
        .setDescription(
          '⌚ How long to mute the user for (e.g. 3m, 1h, 1d, 1w)'
        )
        .setMinLength(2)
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName('reason')
        .setDescription('📝 The reason for the mute')
        .setRequired(false)
    ),
  async execute(interaction) {
    const target = interaction.options.getUser('user');
    const time = interaction.options.getString('time');
    const reason =
      (interaction.options.getString('reason') || 'No reason given') +
      ` (Muted by ${interaction.user.tag})`;
    const member = interaction.guild.members.cache.get(target.id);

    const responseEmbed = new EmbedBuilder().setTitle('Mute').setTimestamp();

    // add button to embed
    const unmuteBtn = new ButtonBuilder()
      .setStyle(ButtonStyle.Success)
      .setLabel('Unmute')
      .setCustomId('unmute ' + target.id)
      .setEmoji('🔊');

    const parsedTime = parseTime(time);

    if (!parsedTime) {
      responseEmbed
        .setColor('Yellow')
        .setDescription('⚠️ Please provide a valid time (e.g. 3m, 1h, 1d, 1w)');
      return interaction.reply({ embeds: [responseEmbed], ephemeral: true });
    }

    member
      .timeout(parsedTime, reason)
      .then(() => {
        responseEmbed
          .setDescription(`🤐 ${target} has been muted for ${time}`)
          .setFooter({
            text: `Muted by ${interaction.user.tag}`,
          })
          .setColor('Green');
        interaction.reply({
          embeds: [responseEmbed],
          components: [new ActionRowBuilder().addComponents(unmuteBtn)],
        });
      })
      .catch((err) => {
        responseEmbed
          .setDescription(`❌ Failed to mute ${target}`)
          .addFields({
            name: 'Error',
            value: err.message,
          })
          .setColor('Red');
        interaction.reply({ embeds: [responseEmbed], ephemeral: true });
      });
  },
};
