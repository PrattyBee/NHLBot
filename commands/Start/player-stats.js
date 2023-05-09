const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("player-stats")
    .setDescription("Gets the player's stats from this season.")
    .addStringOption((option) => {
      return option
        .setName("player")
        .setDescription("Enter the player's name")
        .setRequired(true); // Optionally, set the option as required
    }),
  async execute(interaction) {
    await interaction.reply("Cannot find the player's stats.");
  },
};
