require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");

const { personalityPrompt } = require("./prompt");
const { startBattle, attackPlayer, quitBattle } = require("./game/battleGame");
const { ping } = require("./commands/ping");
const clearHistory = require("./commands/clearhistory");

const config = require("../config.json");

const generateResponse = require("./utils/groq");
const splitMessage = require("./utils/splitMessages");

if (!process.env.DISCORD_TOKEN || !process.env.GROQ_API)
  throw new Error("Environment variables are not provided.");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const conversationHistory = new Map();

const bannedWords = config.offensiveWords;

client.once("ready", () => {
  console.log(`logged in as ${client.user.tag}`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  const { commandName } = interaction;
  if (commandName === "ping") {
    ping();
  }

  if (commandName === "clearhistory") {
    clearHistory(interaction, conversationHistory);
  }
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  // Delete and message the user about a offensive message being deleted.
  if (
    bannedWords.some((word) => message.content.toLowerCase().includes(word))
  ) {
    try {
      await message.author.send(
        `🚨 your msg was deleted from **#${message.channel.name}** because it contained offensive words`
      );
      await message.delete();
      return;
    } catch (error) {
      console.log("failed to delete message", error);
    }
  }

  if (!config.channelId.includes(message.channelId)) return;

  const userId = message.author.id;
  const userInput = message.content.trim();

  if (userInput.toLowerCase() === "!battle") {
    startBattle(message.channel);
    return;
  } else if (userInput.toLowerCase() === "attack") {
    attackPlayer(message.author);
    return;
  } else if (userInput.toLowerCase() === "!quitbattle") {
    quitBattle(message.channel);
    return;
  }

  if (!conversationHistory.has(userId)) {
    conversationHistory.set(userId, []);
  }

  const userHistory = conversationHistory.get(userId);
  userHistory.push({ role: "user", content: userInput });

  const messagesToSend = [personalityPrompt, ...userHistory];

  if (userHistory.length > config.messageMemory) userHistory.shift();

  try {
    const botReply = await generateResponse(messagesToSend);

    userHistory.push({ role: "assistant", content: botReply });
    const reply = splitMessage(botReply);
    for (const replies of reply) {
      await message.reply(replies);
    }
  } catch (err) {
    console.error("Failed to generate response by GROQ: ", err);
    message.reply("Failed to generate response.");
  }
});

client.login(process.env.DISCORD_TOKEN);
