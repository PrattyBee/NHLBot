const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName("team-stats")
    .setDescription("Gets the team's stats from this season.")
    .addStringOption((option) => {
      return option
        .setName("team")
        .setDescription("Enter the team's name")
        .setRequired(true); // Optionally, set the option as required
    }),
  async execute(interaction) {
    teamName = interaction.options.getString("team");
    teamStats = await getTeamStats(teamName);
    team = teamStats.teams[0];
    previousGame = team.previousGameSchedule.dates[0].games[0].teams;
    nextGame = team.nextGameSchedule.dates[0].games[0].teams;
    await interaction.reply(
      `
      Team: ${team.name}
Record: ${team.teamStats[0].splits[0].stat.wins}-${team.teamStats[0].splits[0].stat.losses}-${team.teamStats[0].splits[0].stat.ot}
Points: ${team.teamStats[0].splits[0].stat.pts}
Previous Game: ${previousGame.away.team.name} (${previousGame.away.score}-${previousGame.home.score}) ${previousGame.home.team.name} on ${team.previousGameSchedule.dates[0].date}
Next Game: ${nextGame.away.team.name} at ${nextGame.home.team.name} on ${team.nextGameSchedule.dates[0].date}
      `
    );
  },
};

async function getTeamId(teamName) {
  const apiUrl = "https://statsapi.web.nhl.com/api/v1/teams";

  try {
    // Make API call to retrieve all teams
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Find the team with the matching name
    const team = data.teams.find(
      (t) => t.name.toLowerCase() === teamName.toLowerCase()
    );

    if (team) {
      return team.id;
    } else {
      throw new Error("Team not found.");
    }
  } catch (error) {
    console.error("Error:", error.message);
    // Handle error appropriately
  }
}

async function getTeamStats(teamName) {
  const teamID = await getTeamId(teamName);
  const apiUrl = `https://statsapi.web.nhl.com/api/v1/teams/${teamID}?expand=team.roster,team.schedule.next,team.schedule.previous,team.stats`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error: Could not get stats for team");
  }
}
