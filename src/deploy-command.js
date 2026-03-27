require("dotenv").config();
const { REST, Routes, SlashCommandBuilder } = require("discord.js");

const config = require("../config.json");

const commands = [
  new SlashCommandBuilder()
    .setName("ping")
    .setDescription("replies with pong")
    .toJSON(),

  new SlashCommandBuilder()
    .setName("clearhistory")
    .setDescription("Clears your chat history with Astris")
    .toJSON(),

  new SlashCommandBuilder()
    .setName("afk")
    .setDescription("set your status as afk")
    .addStringOption((Option) =>
      Option.setName("reason")
        .setDescription("reason for afk")
        .setRequired(false)
    )
    .toJSON(),

  new SlashCommandBuilder()
    .setName("add-channel")
    .setDescription("Add the channel in which you want astris to chat")
    .addChannelOption((Option)=>
      Option.setName("channel-id")
      .setDescription("the channel")
      .setRequired(true)
    )
    .toJSON(),

  new SlashCommandBuilder()
    .setName("remove-channel")
    .setDescription("Remove astris from a channel")
    .addChannelOption((Option)=>
      Option.setName("channel")
      .setDescription("the channel")
      .setRequired(true)
    )
    .toJSON(),
];

const rest = new REST({ version: 10 }).setToken(process.env.DISCORD_TOKEN);
const clientId = process.env.CLIENT_ID;
const guildId = config.guildId;

if ((!rest, !clientId, !guildId)) {
  throw new Error("Env variables not provided.");
}
(async () => {
  try {
    console.log("Refreshing slash commands...");
    await rest.put(Routes.applicationCommands(clientId), {
      body: commands,
    });
    console.log("slash commands registered succesfully");
  } catch (error) {
    console.error(error);
  }
})();
