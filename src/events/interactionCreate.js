const chalk = require('chalk');
const fetch = require('node-fetch');

const getBreedsList = async () => {
  const response = await fetch('https://api.thecatapi.com/v1/breeds');
  const breeds = await response.json();

  return breeds.map(breed => {
    return {
      name: breed.name,
      id: breed.id
    };
  });
};

const getCategoriesList = async () => {
  const response = await fetch('https://api.thecatapi.com/v1/categories');
  const categories = await response.json();

  return categories.map(category => {
    return {
      name: category.name,
      id: category.id.toString()
    };
  });
};

module.exports = {
  name: 'interactionCreate',
  async execute(interaction) {

    // Auto complete
    if (interaction.isAutocomplete()) {

      const cmdName = interaction.commandName;

      if (cmdName === 'cat') {
        const focusedOption = interaction.options.getFocused(true);
        let choices;

        if (focusedOption.name === 'breed') {
          choices = await getBreedsList();
        }

        if (focusedOption.name === 'category') {
          choices = await getCategoriesList();
        }


        let filtered = choices.filter(choice => {
          return choice.name.toLowerCase().includes(focusedOption.value.toLowerCase());
        });

        // Limit the number of choices to 25
        if (filtered.length > 25) {
          filtered = filtered.slice(0, 25);
        }

        // if no choices are found, don't send any
        if (filtered.length === 0) return;

        await interaction.respond(
          filtered.map(choice => ({name: choice.name, value: choice.id}))
        );
      }
    }

    // if the interaction is a slash command
    if (interaction.isChatInputCommand()) {
      const client = interaction.client;
      const command = client.commands.get(interaction.commandName);

      if (!command) return;

      try {
        await command.execute(interaction);
        console.log(
          `Executed command ${chalk.green(
            interaction.commandName
          )} by ${chalk.green(interaction.user.tag)}`
        );
      } catch (error) {
        console.log(
          chalk.red(`Error executing command ${interaction.commandName}`)
        );
        console.error(error);
        await interaction.reply({
          content: 'There was an error while executing this command!',
          ephemeral: true,
        });
      }
    }
  },
};
