const client = require("../.")
const config = client.config;
const { getTable, createEmbed} = require('.././functions.js');
const { Client, GatewayIntentBits, Partials,EmbedBuilder,TextInputStyle,TextInputBuilder,ModalBuilder,PermissionsBitField,ChannelType,WebhookClient,ActivityType, Collection , StringSelectMenuOptionBuilder, ButtonBuilder, ActionRowBuilder,ButtonStyle, SlashCommandBuilder,StringSelectMenuBuilder} = require('discord.js');

module.exports = {
	id: 'open_ticket',
	permissions: [],
	run: async (client, interaction) => {
        const [ticket, panel] = interaction.values[0].split('-');
        const db = await getTable("ticket");
        let temp = false;
		await interaction.deferReply({ephemeral:true})	
        // if(await db.has(`${interaction.member.id}-${interaction.guild.id}`)){
        //     const user = await db.get(`${interaction.member.id}-${interaction.guild.id}`);
        //     console.log(user)
        // }
        const tickett = (await config.panels.find((element) => element.name == panel)).tickets.find((element) => element.ticket_name == ticket);
        const all = (await db.all()).filter((data) => data.id.startsWith("tickets_"));
        const ticketsOpened = all.filter((data) => data.value.creator === interaction.user.id && data.value.closed === false && data.value.ticket == tickett.ticket_name && data.value.panel == panel && data.value.guild == interaction.guild.id).length;
        // db.set("tickets_12423535",{creator: "1242363457"})
        if(tickett.limit != 0){
            if(ticketsOpened >= tickett.limit)return interaction.followUp( `${interaction.user} لقد تعديت عدد التكتات المسموح به: وهو ${tickett.limit}`)
        }

        const permissionsOverwrites = [{
            id: interaction.user.id,
            allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ReadMessageHistory],
        },
        {
            id: interaction.guild.id,
            deny: [PermissionsBitField.Flags.ViewChannel],
        },];

        tickett.admin_roles.forEach((roleId) => {
            const role = interaction.guild.roles.cache.get(roleId);
            if (role) {
              permissionsOverwrites.push({
                id: role.id,
                allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ReadMessageHistory],
            });
            }
          });

        const ticket_count = all.filter((data) =>  data.value.ticket == tickett.ticket_name &&  data.value.panel == panel && data.value.guild == interaction.guild.id).length;
        
        interaction.guild.channels.create({
            name:`ticket-${ticket_count}`,
            type: ChannelType.GuildText, // يمكن تغيير هذا إلى نوع القناة الذي تريد إنشاءه
            parent: tickett.catagory, 
            permissionOverwrites:permissionsOverwrites ,
            // إذا كنت تستخدم تصنيفًا
          }).then(async (channel) =>{
            await db.set(`tickets_${channel.id}`, {
                id: ticket_count,
                ticket: tickett.ticket_name,
                panel: panel,
                guild: interaction.guild.id,
				creator: interaction.user.id,
				invited: [],
				createdAt: Date.now(),
				lastMsg: Date.now(),
				warn: false,
				claimed: false,
				claimedBy: null,
				claimedAt: null,
				closed: false,
				closedBy: null,
				closedAt: null,
				voice: null,
				MvoiceAt: null,
            });


            
		const close = new ButtonBuilder()
        .setCustomId('close')
        .setLabel('close')
        .setEmoji('🔒')
        .setStyle(ButtonStyle.Danger);

    const admin_panel = new ButtonBuilder()
        .setCustomId('admin_panel')
        .setLabel('لوحة تحكم الأدارة')
        .setEmoji("⚙")
        .setStyle(ButtonStyle.Secondary);

        
    const user_panel = new ButtonBuilder()
        .setCustomId('user_panel')
        .setLabel('لوحة تحكم العضو')
        .setEmoji('🧾')
        .setStyle(ButtonStyle.Secondary);

    const row = new ActionRowBuilder()
        .addComponents(close,admin_panel, user_panel);
        // const timestamp = Math.floor(Date.now() / 1000);
        const msg = await createEmbed(`ticket-${ticket_count}`,tickett.open_msg,interaction);
            let text = "";
            
            text += (`${interaction.user}`)

            tickett.admin_roles.forEach((roleId) => {
                const role = interaction.guild.roles.cache.get(roleId);
                if (role) {
            text += (`<@&${roleId}>`)

                }
              });
        channel.send({content: text ,embeds:[msg], components: [row] ,})
            return interaction.followUp(`تم فتح التذكرة بنجاح ${channel}`)
          });

        
	}
};
