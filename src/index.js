const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');

const {Guilds, GuildMembers, GuildMessages} = GatewayIntentBits;
const {User, Message, GuildMember, ThreadMember, Channel} = Partials;

const {loadEvents} = require('./handlers/eventHandler')
const {loadCommands} = require('./handlers/commandHandler');

const client = new Client({
	intents: [Guilds, GuildMembers, GuildMessages],
	partials: [User, Message, GuildMember, ThreadMember, Channel]
});

client.commands = new Collection()

client.once("ready", () => {
	console.log("Ready");
})

client.config = require("./json/config.json")

client.login(client.config.TOKEN).then(() => {
	loadEvents(client)
	loadCommands(client)
});

