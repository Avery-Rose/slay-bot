const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');
const { getAverageColor  } = require('fast-average-color-node');

const catEmojis = ['🐱', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾', '🐈'];
getRandomCatEmoji = () => {
  return catEmojis[Math.floor(Math.random() * catEmojis.length)];
}

const query = (...query) => {
  let string = 'https://api.thecatapi.com/v1/images/search';
  for (let i = 0; i < query.length; i++) {
    const { key, value } = query[i];
    string += `${i === 0 ? '?' : '&'}${key}=${value}`;
  }
  return string;
}


module.exports = {
  data: new SlashCommandBuilder()
    .setName('cat')
    .setDescription(`Get a random cat picture ${getRandomCatEmoji()}`)
    .addStringOption(option =>
      option.setName('breed')
      .setDescription('The breed of the cat')
      .setAutocomplete(true)
    )
    .addStringOption(option =>
      option.setName('category')
      .setDescription('The category of the cat')
      .setAutocomplete(true)
    ),
  async execute(interaction) {
    const version = fetch('https://api.thecatapi.com/').then(res => res.json()).then(json => json.version);
    // Get the breed option
    const breed = interaction.options.getString('breed');
    const getBreed = async () => {
      const res = await fetch(`https://api.thecatapi.com/v1/breeds/${breed}`);
      const data = await res.json();
      return data;
    }
    const category = interaction.options.getString('category');
    const getCategory = async (id) => {
      const response = await fetch(`https://api.thecatapi.com/v1/categories`);
      const categories = await response.json();
      return categories.find(i => i.id == id).name;
    }
    const querys = [];
    const fields = [];

    if (category) {
      querys.push({ key: 'category_ids', value: category });
      fields.push({ name: 'Category', value: `\`${(await getCategory(category))}\`` });
    }

    if (breed) {
      querys.push({ name: 'breed', key: 'breed_id', value: breed });
      if (breed) {
        const breed = await getBreed();
        fields.push({
          name: 'Breed',
          value: `\`${breed.name}\``,
          inline: true
        });
        fields.push({
          name: 'Origin',
          value: `\`${breed.origin}\``,
          inline: true
        });
        fields.push({
          name: 'Description',
          value: breed.description
        });
      }
    }

    // Get the cat image
    const res = await fetch(query(...querys));
    const data = await res.json();
    if (!data[0]) return await interaction.reply({ content: 'No cat found! 😿', ephemeral: true });
    // Get data buffer from the image
    const buffer = await fetch(data[0].url).then(res => res.buffer());

    // Get average color from image
    const color = await getAverageColor(buffer);
    const embed = new EmbedBuilder()
      .setTitle(`${getRandomCatEmoji()} Meowwwww`)
      .addFields(fields)
      .setImage(data[0].url)
      .setColor(color.hex)
      .setFooter({ text: `Powered by thecatapi.com | v${await version}` });

    await interaction.reply({ embeds: [embed], iconURL: 'https://thecatapi.com/favicon.ico' });
  },
};
