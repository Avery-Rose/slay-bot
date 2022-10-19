const {
  SlashCommandBuilder,
  EmbedBuilder,
  AttachmentBuilder,
} = require('discord.js');
const tiktok = require('tiktok-down');
const fetch = require('node-fetch');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('tiktok')
    .setDescription('Sends Embeded TikTok Video')
    .addStringOption((option) =>
      option.setName('url').setDescription('TikTok Video URL').setRequired(true)
    ),

  async execute(interaction) {
    let url = interaction.options.getString('url');
    url = url.split('?')[0]; // Remove query string from URL

    // Validate URL contains string 'tiktok.com'
    if (!url.includes('tiktok.com')) {
      interaction.reply({
        content: 'Invalid TikTok URL',
        ephemeral: true,
      });
      return;
    }
    const option = {
      url: url,
      noWaterMark: true,
      userAgent:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36 Edg/105.0.1343.33',
    };

    interaction.reply({ content: 'Loading TikTok...' });

    tiktok(option)
      .then(async (data) => {
        const embed = new EmbedBuilder()
          .setAuthor({
            name: `${data.owner.verified == 'true' ? '✅ ' : ''}@${
              data.owner?.uniqueID
            }`,
            url: data.owner?.ProfilePage,
            iconURL: data.owner?.avatar,
          })
          .setTitle(data.video?.signature)
          .setURL(`${data.owner.ProfilePage}/video/${data.video?.id}`)
          .setFooter({
            text: `♥ ${data.video.heartCount} | 💬 ${data.video.commentCount} | 📥 ${data.video.shareCount} | 👀 ${data.video.viewCount}`,
          })
          .setColor(0x00ff00);
        const video = await fetch(data.video.url);
        const buffer = await video.buffer();
        const attachment = new AttachmentBuilder(buffer, {
          name: `slay.mp4`,
        });

        interaction.editReply({
          embeds: [embed],
          content: '',
          files: [attachment],
          ephemeral: false,
        });
        return;
      })
      .catch(async (err) => {
        console.error(err.message);
        interaction.editReply({
          content: `Error: ${err.message}`,
          ephemeral: true,
        });
        return;
      });
  },
};
