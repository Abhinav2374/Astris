const fs = require('fs').promises
const {EmbedBuilder, embedLength} = require("discord.js");
const path = require('path')
async function removeChannel(interaction,channel) {
    try{
    const configPath = path.join(__dirname,"../../config.json");
    const rawData = await fs.readFile( configPath, "utf-8");
    const data = JSON.parse(rawData);
    const delChannelId = channel.id;
    if(!data.channelId.includes(delChannelId)){
        const channelEmbed = new EmbedBuilder()
        .setColor(0x2f3136)
        .setAuthor({
            name: interaction.user.username,
            iconURL: interaction.user.displayAvatarURL()
        })
        .setDescription(
            `Astris is not already added in  ${channel}.`
        );
    return await interaction.reply({embeds : [channelEmbed]});
    }
    else{
    data.channelId = data.channelId.filter(id => id!== delChannelId)
    await fs.writeFile(configPath , JSON.stringify(data , null ,2));
    const channelEmbed = new EmbedBuilder()
        .setColor(0x2f3136)
        .setAuthor({
            name: interaction.user.username,
            iconURL: interaction.user.displayAvatarURL()
        })
        .setDescription(
            `${channel} has been removed successfully ✅.`
        );
    return await interaction.reply({embeds : [channelEmbed]});}
    }
    catch(err){
        console.error(err);
        await interaction.reply({ content: "Something went wrong ❌", ephemeral: true });
    }
}

module.exports = {removeChannel};