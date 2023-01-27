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

// To notify the bot has logged into the server
client.on('ready', (e) => {
    console.log(`Logged in as ${client.user.tag}!`);
})

// Just for testing connectivity and response
client.on('messageCreate', (msg) => {
    if(msg.content === "ping") {
        msg.reply("pong!")
    }
})

// listener for (/) commands
client.on('interactionCreate', (interaction) => {
    if(!interaction.isChatInputCommand()) return;
    let command = interaction.commandName
    switch(command) {
        case 'greet':
            let hours = new Date().getHours();
            if(hours<12){
                interaction.reply('Good morning!')
            }
            else if(hours>12 && hours<17){
                interaction.reply('Good afternoon!')
            }
            else{
                interaction.reply('Good evening!')
            }
        case 'ping':
            interaction.reply('pong!')
    }
})

// logs in
client.login(process.env.TOKEN);