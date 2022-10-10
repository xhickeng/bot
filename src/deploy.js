const fs = require('node:fs');
const path = require('node:path');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken('MTAyNjY2MDMzMTQ4Mjc3OTcxMg.GTcJ6j.426Zpgg44E2X5TdhLRSmg6sA0atZWwlAZMyRf8');

rest.put(Routes.applicationGuildCommands('1026660331482779712', '1024851474238419004'), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);