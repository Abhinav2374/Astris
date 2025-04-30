const { MessageFlags } = require("discord.js");

async function clearHistory(interaction, conversationHistory) {
  conversationHistory.delete(interaction.user.id);
  await interaction.reply({
    content: "Successfully cleared your chat history with Astris.",
    flags: MessageFlags.Ephemeral,
  });
}

module.exports = clearHistory;
