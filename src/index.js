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
let db;

const initFirebase = () => {
  admin.initializeApp({
    credential: admin.credential.cert({
      type: process.env.FIREBASE_TYPE,
      project_id: process.env.FIREBASE_PROJECT_ID,
      private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
      private_key: process.env.FIREBASE_PRIVATE_KEY
        ? Buffer.from(process.env.FIREBASE_PRIVATE_KEY).toString()
        : undefined,
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      client_id: process.env.FIREBASE_CLIENT_ID,
      auth_uri: process.env.FIREBASE_AUTH_URI,
      token_uri: process.env.FIREBASE_TOKEN_URI,
      auth_provider_x509_cert_url:
        process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
      client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
    }),
  });
  console.log(`🔥 Firebase initialized`);
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
