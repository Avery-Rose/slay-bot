const chalk = require('chalk');

module.exports = {
  name: 'messageCreate',
  execute(message) {
    // Regex match domain is https://twitter.com/*
    const regex = /https:\/\/twitter.com\/\w+/g;

    if (message.content.match(regex)) {
        const url = message.content.match(regex)[0];
        const domain = url.split('/')[2];

        // Check if the domain is a twitter link and not a vxtwitter link
        if (domain === 'twitter.com' && !url.includes('vxtwitter')) {
            message.channel.send(`https://vxtwitter.com/${url.split('/')[3]}`);
        }
    }
},
};
