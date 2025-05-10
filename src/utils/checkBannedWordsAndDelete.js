const config = require("../../config.json");

const bannedWords = config.offensiveWords;

async function checkBannedWordsAndDelete(message) {
  if (
    bannedWords.some((word) => message.content.toLowerCase().includes(word))
  ) {
    try {
      await message.author.send(
        `🚨 your msg was deleted from <#${message.channel.id}> because it contained offensive words`
      );
      await message.delete();
      return;
    } catch (error) {
      console.log("failed to delete message", error);
    }
  }
}

module.exports = checkBannedWordsAndDelete;
