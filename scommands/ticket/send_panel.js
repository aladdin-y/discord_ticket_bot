const { SlashCommandBuilder,EmbedBuilder ,StringSelectMenuBuilder, StringSelectMenuOptionBuilder,ActionRowBuilder} = require('discord.js');
const config = require("../../config.json")

let panels = config.panels.map(panel => { return {name:panel.name,value:panel.name}})
module.exports = {
	data: new SlashCommandBuilder()
		.setName('send_panel')
		.setDescription('لأرسال بانل بروم معين')
        .addStringOption(option =>
            option.setName('test')
                .setDescription('The gif category')
                .setRequired(true)
                .addChoices(panels
                )),
	async execute(interaction) {
        const functions = interaction.client.functions;
        const value = ( interaction.options.getString('test')  )
        const ticket = config.panels.find((element) => element.name == value)
        if(!ticket)return await interaction.reply({ content: 'حدث خطأ غير متوقع. يرجى إعادة المحاولة لاحقًا', ephemeral: true });
        const embed = await functions.createEmbed(ticket.name,ticket.description,interaction);
        if(ticket.img != ""){
            embed.setImage(ticket.img)
        }
        const select = new StringSelectMenuBuilder()
			.setCustomId('open_ticket')
			.setPlaceholder('الرجاء اختيار التكت المناسب لك');
            ticket.tickets.forEach((tt) => {
                const option = new StringSelectMenuOptionBuilder()
                    .setLabel(tt.ticket_name)
                    .setDescription(tt.ticket_description)
                    .setValue(`${tt.ticket_name}-${ticket.name}`);
                
                // تحقق مما إذا كان هناك إيموجي وأضفه إذا كان موجودًا
                if (tt.emoji && tt.emoji != "") {
                    option.setEmoji(tt.emoji);
                }
                
                select.addOptions(option);
            });
            
		const row = new ActionRowBuilder()
        .addComponents(select);

            // config.panels.forEach
        await interaction.reply({ embeds:[embed],	components: [row] });
	},
};