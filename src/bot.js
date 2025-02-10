require('dotenv').config()
const {Client,GatewayIntentBits} = require('discord.js');
const axios = require('axios');

const client = new Client({
    intents:[
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

function splitMessage(text, maxLength = 2000){
    const chunks = [];
    for(let i =0;i< text.length ;i += maxLength){
        chunks.push(text.slice(i,i+maxLength));
    }
    return chunks;
}


client.once('ready',()=>{
    console.log(`logged in as ${client.user.tag}`);
})

client.on('messageCreate',async (message)=>{
    if(message.author.bot) return;
    const userInput = message.content.trim();
    try {
        const response = await axios.post(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                model: "llama3-8b-8192",
                messages: [{role:"user",content: userInput }]
            },
            {
                headers:{
                    "Authorization": `Bearer ${process.env.GORQ_API}`,
                    "Content-Type": 'application/json'
                }
            }
        );
        const botReply = response.data.choices?.[0]?.message?.content || 'Sorry but i couldnt generate an answer for this.';
        const reply = splitMessage(botReply);
        for (const replies of reply){
            await message.reply(replies);
        }
    }catch(error){
        console.error("Error with Groq api",error);
        message.reply("Oops! something went wrong");
    }
})

client.login(process.env.DISCORD_TOKEN);
