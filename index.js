// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits, Guild, Routes } = require('discord.js');
const { TOKEN, CLIENT_ID, GUILD_ID} = require('./config.json');
const { REST } = require('@discordjs/rest')

// Create a new client instance
const client = new Client({ intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent] });

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

// Log in to Discord with your client's token

client.on('ready', () => {
    console.log(`${client.user.tag}) has logged in`);
})

const commands = [
    {
        name: 'player-stat',
        description: 'Gets the player\'s stats of the regular season and playoffs'
    },
];

const rest = new REST({version: '10'}).setToken(TOKEN);

client.on('interactionCreate', (interaction) => {
    if (interaction.isChatInputCommand()) {
        interaction.reply({content : 'Stat command is currently unavailable.'});
    }
})

async function main() {
try {
        client.login(TOKEN);
        console.log('Started refreshing application (/) commands.');
        await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
            body: commands,
        })
    } catch (err)
    {
        console.log(err);
    }
}
main();