const { QuickDB , MySQLDriver } = require("quick.db");
const { EmbedBuilder } = require('discord.js');

async function getTable(tableName) {
  try {
    const mysqlDriver = new MySQLDriver({
      host: "localhost",
      user: "root",
      password: "aladdin112233",
      database: "all",
    });

    await mysqlDriver.connect(); 

    const db = new QuickDB({ driver: mysqlDriver });

    // Return the table object
    return db.table(tableName);
  } catch (error) {
    console.error("Error getting table:", error);
    throw error;
  }
}

async function createEmbed(title,text,interaction ) {
  try {
    const embed = new EmbedBuilder()
    .setTitle(title)
    	.setColor(0x0099FF)

    .setDescription(text)

    .setTimestamp();


    const extension = (interaction.guild.icon && interaction.guild.icon.endsWith(".gif")) ? "gif" : "png";
    const iconUrl = `https://cdn.discordapp.com/icons/${interaction.guild.id}/${interaction.guild.icon}.${extension}`;
    if(extension){
      embed.setThumbnail(iconUrl);

    }


    return embed;

  } catch (error) {
    console.error("Error :", error);
    throw error;
  }
}


module.exports = { getTable , createEmbed};
