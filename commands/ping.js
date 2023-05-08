const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: newSlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with pong!'),
    async execute(interaction) {
        await interaction.reply('Pong!');
    }
}