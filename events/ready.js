const client = require('..');

const config = client.config;
const colors = require('colors');
const { Client, GatewayIntentBits, Partials,EmbedBuilder,WebhookClient,ActivityType, Collection , StringSelectMenuOptionBuilder, ButtonBuilder, ActionRowBuilder,ButtonStyle, SlashCommandBuilder,StringSelectMenuBuilder} = require('discord.js');
client.on("ready", async() => {







	console.log(colors.gray(`
░█████╗░██╗░░░░░░█████╗░██████╗░██████╗░██╗███╗░░██╗
██╔══██╗██║░░░░░██╔══██╗██╔══██╗██╔══██╗██║████╗░██║
███████║██║░░░░░███████║██║░░██║██║░░██║██║██╔██╗██║
██╔══██║██║░░░░░██╔══██║██║░░██║██║░░██║██║██║╚████║
██║░░██║███████╗██║░░██║██████╔╝██████╔╝██║██║░╚███║
╚═╝░░╚═╝╚══════╝╚═╝░░╚═╝╚═════╝░╚═════╝░╚═╝╚═╝░░╚══╝`))
	const activities = [
		{ name: `${client.guilds.cache.size} Servers`, type: ActivityType.Listening },
		{ name: `${client.channels.cache.size} Channels`, type: ActivityType.Playing },
		{ name: `${client.users.cache.size} Users`, type: ActivityType.Watching },
		{ name: `Discord.js v14`, type: ActivityType.Competing }
	];

	const status =  [
		'online',
		'dnd',
		'idle'
	];
	let i = 0;
	setInterval(() => {
		if(i >= activities.length) i = 0
		client.user.setActivity(activities[i])
		i++;
	}, 10 * 1000);

	let s = 0;
	setInterval(() => {
		if(s >= status.length) s = 0
		client.user.setStatus(status[s])
		s++;
	}, 10 * 1000);
	console.log(colors.red(`Logged in as ${client.user.tag}!`))





});




