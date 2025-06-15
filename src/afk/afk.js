const { EmbedBuilder } = require("discord.js");
const afkmap = new Map();

async function afk(interraction, reason) {
  afkmap.set(interraction.user.id, {
    reason: reason,
  });
  const afkEmbed = new EmbedBuilder()
    .setColor(0x2f3136)
    .setAuthor({
      name: interraction.user.username,
      iconURL: interraction.user.displayAvatarURL(),
    })
    .setDescription(
      `I have set your status as AFK for this server, with reason : ${reason}`
    );
  return await interraction.reply({ embeds: [afkEmbed] });
}

module.exports = { afk, afkmap };
