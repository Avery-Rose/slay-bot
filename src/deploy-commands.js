const { REST, SlashCommandBuilder, Routes } = require('discord.js');
const { clientId, clientIdBeta, guildId } = require('./config.json');
const chalk = require('chalk');
require('dotenv').config();

const appId = process.env.NODE_ENV === 'production' ? clientId : clientIdBeta;

const fs = require('fs');
const path = require('path');

const deployGuild = async (guildId, clearsConsole) => {
  const clear = () => (clearsConsole ? console.clear() : null);
  clear();

  const commands = [];
  const commandFiles = fs
    .readdirSync(path.join(__dirname, 'commands'))
    .filter((file) => file.endsWith('.js'));

  for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
  }

  const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

  await rest
    .put(Routes.applicationGuildCommands(appId, guildId), {
      body: commands,
    })
    .catch((err) => {
      throw err;
    });
};

const deployGlobal = async (clearsConsole) => {
  const clear = () => (clearsConsole ? console.clear() : null);
  clear();

  const commands = [];
  const commandFiles = fs
    .readdirSync(path.join(__dirname, 'commands'))
    .filter((file) => file.endsWith('.js'));

  for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
  }

  const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

  await rest
    .put(Routes.applicationGuildCommands(appId, guildId), { body: commands })
    .catch((err) => {
      throw err;
    });
};

process.on('exit', (code) => {
  if (code === 0) return;
  console.log(chalk.red('Process exited with code: ' + code));
});

module.exports = { deployGuild, deployGlobal };
