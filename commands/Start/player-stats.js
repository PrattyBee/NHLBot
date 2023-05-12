const { SlashCommandBuilder } = require("discord.js");

const teams = [
  "Anaheim Ducks",
  "Arizona Coyotes",
  "Boston Bruins",
  "Buffalo Sabres",
  "Calgary Flames",
  "Carolina Hurricanes",
  "Chicago Blackhawks",
  "Colorado Avalanche",
  "Columbus Blue Jackets",
  "Dallas Stars",
  "Detroit Red Wings",
  "Edmonton Oilers",
  "Florida Panthers",
  "Los Angeles Kings",
  "Minnesota Wild",
  "Montréal Canadiens",
  "Nashville Predators",
  "New Jersey Devils",
  "New York Islanders",
  "New York Rangers",
  "Ottawa Senators",
  "Philadelphia Flyers",
  "Pittsburgh Penguins",
  "San Jose Sharks",
  "Seattle Kraken",
  "St. Louis Blues",
  "Tampa Bay Lightning",
  "Toronto Maple Leafs",
  "Vancouver Canucks",
  "Vegas Golden Knights",
  "Washington Capitals",
  "Winnipeg Jets",
];

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
    await interaction.deferReply();
    playername = interaction.options.getString("player");
    try {
      playerID = await findPlayerID(playername);
    } catch (error) {
      await interaction.editReply("Could not find player");
      return;
    }

    await interaction.editReply(`player ID is: ${playerID}`);
  },
};

async function findPlayerID(playername) {
  for (let i = 0; i < teams.length; i++) {
    const teamID = await getTeamId(teams[i]);
    const apiUrl = `https://statsapi.web.nhl.com/api/v1/teams/${teamID}?expand=team.roster`;

    const response = await fetch(apiUrl);
    const data = await response.json(response);

    roster = data.teams[0].roster.roster;

    for (let j = 0; j < roster.length; j++) {
      person = roster[j].person;
      if (person.fullName.toLowerCase() == playername.toLowerCase()) {
        return person.id;
      }
    }
  }
  console.log("Could not find player's id");
  throw new Error("Could not find player");
}

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
      console.log("Team not found");
      throw new Error("Could not find the team");
    }
  } catch (error) {
    console.error("Error:", error.message);
    throw new Error("Could not find team ID");
  }
}

async function testFunction() {
  apiUrl = "https://statsapi.web.nhl.com/api/v1/teams/10?expand=team.roster";

  const response = await fetch(apiUrl);
  const data = await response.json();

  console.log(data.teams[0].roster.roster[0].person.fullName);
}
