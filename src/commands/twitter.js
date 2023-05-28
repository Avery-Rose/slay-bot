const { SlashCommandBuilder } = require('discord.js');
const fakeEmbed = require('../util/fakeEmbed');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('twitter')
    .setDescription('Formats a twitter link to a vxtwitter link')
    .addStringOption((option) =>
      option
        .setName('link')
        .setDescription('The link to the tweet')
        .setRequired(true)
    ),

  async execute(interaction) {
    const link = interaction.options.getString('link');
    console.log(link);
    if (link.includes('https://twitter.com/')) {
      const replacedValue = link.replace(
        'https://twitter.com/',
        'https://vxtwitter.com/'
      );

      const msg = fakeEmbed(
        replacedValue,
        'Requested by `' +
          interaction.user.username +
          '#' +
          interaction.user.discriminator +
          '`'
      );

      interaction.reply(msg);
    } else {
      interaction.reply('Please provide a valid twitter link', {
        ephemeral: true,
      });
    }
  },
};
