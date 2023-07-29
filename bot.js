require('dotenv').config();
require('./fetch-polyfill.js');
const fs = require('fs');
const Discord = require('discord.js');
const options = require('./bot-options.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.debug(`Bot: ${client.user.tag}!`);
    console.debug(`Was ready at: ${client.readyAt}`);
});

client.on('message', msg => {
    console.debug('message.on: ', msg.content);
    if (msg.content.substring(0, options.BOT_PREFIX.length) === options.BOT_PREFIX) {
        let args = msg.content.substring(options.BOT_PREFIX.length + 1).split(' ');

        let commandName = args.shift().toLowerCase();

        if (!client.commands.has(commandName)) {
            msg.reply(`Could not find the command ${commandName}.`);
            return;
        }
        
        const command = client.commands.get(commandName);
        
        try {
            command.execute(msg, args);
        } catch (e) {
            console.debug(e);
            msg.reply(`There was an error trying to execute ${command}.`);
        }   
    };
});

client.login(process.env.DISCORD_TOKEN);
