require('dotenv').config();
const { REST,Routes, SlashCommandBuilder} = require('discord.js');

const commands = [
    new SlashCommandBuilder().setName('ping').setDescription('replies with pong').toJSON(),
    new SlashCommandBuilder().setName('vault-store').setDescription('saves your passwords in a secret vault').toJSON(),
    new SlashCommandBuilder().setName('vault-fetch').setDescription('fetch the items saved in the vault').toJSON(),
]

const rest = new REST({version:10}).setToken(process.env.DISCORD_TOKEN)
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

(async ()=>{
    try{
        console.log('Refreshing slash commands...')
        await rest.put(
            Routes.applicationGuildCommands(clientId,guildId),
            {body: commands}
        );
        console.log('slash commands registered succesfully')
    }catch(error) {
        console.error(error);
    }
})();