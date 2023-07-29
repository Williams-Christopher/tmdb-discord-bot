module.exports = {
    name: 'ping',
    description: 'A simple ping command to check if the bot is still connected and functional.',
    execute (message, args) {
        message.reply('Yes. I am _still_ here...');
    },
};
