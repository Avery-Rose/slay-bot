const chalk = require('chalk');

module.exports = {
  name: 'messageCreate',
  execute(message) {
    // Regex match domain is https://twitter.com/*
    
    if (message.content.includes('https://twitter.com/')) {
      // replace it
      const replacedValue = message.content.replace(
        'https://twitter.com/',
        'https://vxtwitter.com/'
      );

        // send the message
        message.channel.send(replacedValue);
    }
},
};
