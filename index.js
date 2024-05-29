const { Client, GatewayIntentBits, Partials, Collection ,REST,Routes,EmbedBuilder,ActionRowBuilder, ButtonBuilder, ButtonStyle,  StringSelectMenuBuilder, StringSelectMenuOptionBuilder,Events, Emoji} = require('discord.js');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.MessageContent,
  ],
  shards: "auto",
  partials: [
    Partials.Message,
    Partials.Channel,
    Partials.GuildMember,
    Partials.Reaction,
    Partials.GuildScheduledEvent,
    Partials.User,
    Partials.ThreadMember,
  ],
});

const config = require('./config.json');
const fs = require("fs")
const path = require('path');
client.commands = new Collection()
client.aliases = new Collection()
client.folder = new Collection()
client.buttons = new Collection()
client.config = config;
client.functions = require("./functions.js");
client.prefix = config.prefix;

const { getTable } = require('./db.js');


(async () => {
  const ticket = await getTable("ticket");
  if (ticket) {
    const userInfo = await ticket.all();
    console.log(userInfo); // Output: { difficulty: 'Easy' }
  } else {
    console.error("Failed to get 'ticket' table.");
  }
})();



// client.words_db = new QuickDB({ filePath: "db/words.sqlite" });
// client.vip_db = new QuickDB({ filePath: "db/vip_db.sqlite" });
// client.auto_line = new QuickDB({ filePath: "db/auto_line.sqlite" });
// client.suggest = new QuickDB({ filePath: "db/suggest.sqlite" });



 

client.scommands = new Collection();


const commands = [];
const foldersPath = path.join(__dirname, 'scommands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders)  {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			commands.push(command.data.toJSON());
			client.scommands.set(command.data.name, command);

		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
} 

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(config.token);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationGuildCommands(config.bot_id, config.guild_id),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();




 





client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.scommands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
    
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});




























module.exports = client;

fs.readdirSync('./handlers').forEach((handler) => {
  require(`./handlers/${handler}`)(client)
});


client.login(config.token)


