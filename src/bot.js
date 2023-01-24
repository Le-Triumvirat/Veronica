
require('dotenv').config()
const {Client, IntentsBitField} = require('discord.js')
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
})

client.on('ready', (e) => {
    console.log(`Logged in as ${client.user.tag}!`);
})

client.on('messageCreate', (msg) => {
    console.log(msg)
    if(msg.content === "hello") {
        msg.reply("hey!")
    }
})

client.login(process.env.TOKEN);