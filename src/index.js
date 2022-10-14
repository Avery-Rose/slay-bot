const {
  Client,
  GatewayIntentBits,
  Collection,
  IntentsBitField,
} = require('discord.js');
const config = require('./config.json');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const deploy = require('./deploy-commands.js');
const emoji = require('node-emoji');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildBans,
  ],
});
const printDivider = require('./util/printDivider');
require('dotenv').config();

const admin = require('firebase-admin');
const serviceAccount = require('../firebase-admin.json');
let db;

const initFirebase = () => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log(`🔥: Firebase initialized`);
  db = admin.firestore();
};

// Command Handler
const loadCommands = () => {
  console.log('Loading commands...');
  client.commands = new Collection();
  const commandsPath = path.join(__dirname, 'commands');
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith('.js'));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    client.commands.set(command.data.name, command);
    console.log(`\u2022 Loaded command ${chalk.green(command.data.name)}`);
  }
};

// Event Handler
const loadEvents = () => {
  console.log('Loading events...');
  const eventsPath = path.join(__dirname, 'events');
  const eventFiles = fs
    .readdirSync(eventsPath)
    .filter((file) => file.endsWith('.js'));

  for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    console.log(`\u2022 Loaded event ${chalk.green(event.name)}`);
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      client.on(event.name, (...args) => event.execute(...args));
    }
  }
};

const init = () => {
  loadCommands();
  loadEvents();
  console.log('Logging in...');
  client.login(process.env.TOKEN);
};

initFirebase();
init();
