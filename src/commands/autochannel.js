const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require('discord.js');

const firestoreAdd = require('../util/firestoreAdd');
const firestoreDelete = require('../util/firestoreDelete');
const firestoreGet = require('../util/firestoreGet');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('auto-channel')
    .setDescription(`Allow your users to dynamically create voice channels`)
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
    .addSubcommand((subcommand) =>
      subcommand
        .setName('add')
        .setDescription(
          'Select a hub channel and a category to create an auto-channel'
        )
        .addChannelOption((option) =>
          option
            .setName('channel')
            .setDescription('The hub channel for the auto-channels')
            .setRequired(true)
        )
        .addChannelOption((option) =>
          option
            .setName('category')
            .setDescription('The category to place the auto-channels in')
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName('remove')
        .setDescription('Remove an auto-channel')
        .addChannelOption((option) =>
          option
            .setName('channel')
            .setDescription('The hub channel for the auto-channels')
            .setRequired(true)
        )
    ),

  async execute(interaction) {
    const subcommand = interaction.options.getSubcommand();

    switch (subcommand) {
      case 'remove':
        // TODO: Iplement a way to remove an auto-channel
        return await interaction.reply({
          content: `This command is not yet implemented!`,
          ephemeral: true,
        });
      case 'add':
        // TODO: Implement a way to add a channel to an auto-channel

        const sendErrors = async (errors) => {
          let content = ``;

          errors.forEach((error, i) => {
            content += `${i + 1}. ${error}\n`;
          });

          const errorEmbed = new EmbedBuilder()
            .setColor('#ff0000')
            .setTitle('❌ Error ❌')
            .setDescription(content);

          return await interaction.reply({
            embeds: [errorEmbed],
            ephemeral: true,
          });
        };

        let errors = [];
        const category = interaction.options.getChannel('category');
        const channel = interaction.options.getChannel('channel');

        if (channel.type !== 2) {
          errors.push('Please select a valid channel.');
        }
        if (category.type !== 4) {
          errors.push('Please select a valid category.');
        }

        if (errors.length > 0) return sendErrors(errors);
        errors = [];

        const data = {
          guildId: interaction.guild.id,
          channelId: channel.id,
          categoryId: category.id,
        };

        const doc = await firestoreGet('autoChannels', channel.id);

        if (doc) {
          errors.push('This channel is already an auto-channel.');
        }

        if (errors.length > 0) return sendErrors(errors);

        firestoreAdd('autoChannels', channel.id, data);

        return await interaction.reply({
          content: `Successfully saved an auto-channel to db!\r\n‼ The command is not yet implemented`,
          ephemeral: true,
        });
      default:
        return await interaction.reply({
          content: `Invalid subcommand!`,
          ephemeral: true,
        });
    }
  },
};
