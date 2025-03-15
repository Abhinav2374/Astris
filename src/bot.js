require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const axios = require("axios");
const {personalityPrompt} = require("./prompt")
const {startBattle, attackPlayer,quitBattle} = require("./game/battleGame");
const { ping } = require("./commands/ping");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const conversationHistory = new Map();

function splitMessage(text, maxLength = 2000) {
  const chunks = [];
  for (let i = 0; i < text.length; i += maxLength) {
    chunks.push(text.slice(i, i + maxLength));
  }
  return chunks;
}

const bannedWords = ["nigg"];

client.once("ready", () => {
  console.log(`logged in as ${client.user.tag}`);
});

client.on('interactionCreate',async interaction =>{
  if(!interaction.isCommand()) return;
  const {commandName} = interaction;
  if(commandName === "ping") {
    ping();
  }
})

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
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

  if (message.channelId !== process.env.CHANNEL_ID) return;
  const userId = message.author.id;
  const userInput = message.content.trim();

  if(userInput.toLowerCase()==="!battle"){
    startBattle(message.channel);
    return;
  }else if(userInput.toLowerCase()==="attack"){
    attackPlayer(message.author);
    return;
  }else if(userInput.toLowerCase()==="!quitbattle") {
    quitBattle(message.channel);
    return;
  }
  
  if (!conversationHistory.has(userId)) {
    conversationHistory.set(userId, []);
  }

  const userHistory = conversationHistory.get(userId);
  userHistory.push({ role: "user", content: userInput });

  const messagesToSend = [personalityPrompt, ...userHistory];

  if (userHistory.length > 10) userHistory.shift();

  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama3-8b-8192",
        messages: messagesToSend ,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API}`,
          "Content-Type": "application/json",
        },
      }
    );
    const botReply =
      response.data.choices?.[0]?.message?.content ||
      "Sorry but i couldnt generate an answer for this.";

    userHistory.push({ role: "assistant", content: botReply });
    const reply = splitMessage(botReply);
    for (const replies of reply) {
      await message.reply(replies);
    }
  } catch (error) {
    console.error("Error with Groq api", error);
    message.reply("Oops! something went wrong");
  }
});

client.login(process.env.DISCORD_TOKEN);
