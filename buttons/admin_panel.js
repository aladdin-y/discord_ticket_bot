const client = require("../.")
const config = client.config;
const { getTable, createEmbed} = require('.././functions.js');
const { Client, GatewayIntentBits, Partials,EmbedBuilder,TextInputStyle,TextInputBuilder,ModalBuilder,PermissionsBitField,ChannelType,WebhookClient,ActivityType, Collection , StringSelectMenuOptionBuilder, ButtonBuilder, ActionRowBuilder,ButtonStyle, SlashCommandBuilder,StringSelectMenuBuilder} = require('discord.js');

module.exports = {
	id: 'admin_panel',
	permissions: [],
	run: async (client, interaction) => {
		await interaction.reply({})	
	}
};
