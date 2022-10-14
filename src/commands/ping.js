const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),
  async execute(interaction) {
    const ping = interaction.client.ws.ping;
    return await interaction.reply({
      content: `Pong! \`${ping}ms\``,
      ephemeral: true,
    });
  },
};
