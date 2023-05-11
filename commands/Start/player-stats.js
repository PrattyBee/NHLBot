const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("player-stats")
    .setDescription("Gets the player's stats from this season")
    .addStringOption((option) => {
      return option
        .setName("player")
        .setDescription("Enter the player's name.")
        .setRequired(true);
    }),

  async execute(interaction) {
    await interaction.reply("Command is not avaliable");
  },
};
