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
    try {
        if(!interaction.isChatInputCommand()) return;
        if(interaction.member.roles.cache.some(role=>role.name == 'BotMaster')){
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
                    interaction.reply('PONG!')
                    // interaction.reply(`Websocket heartbeat: ${client.ws.ping}ms.`)
                case 'worthy':
                    interaction.reply('oh yes, you are the bot master!')
            }
        }
        else{
            interaction.reply('You are not worthy. BotMaster role is required for executing bot commands')
            return;
        }
    } catch (error) {
        if(error!=InteractionAlreadyReplied){
            console.log(error)
        }
    }
})

client.on('interactionCreate', async (interaction) => {
    if(interaction.isButton()){
        // listener for role button click
        const role = interaction.guild.roles.cache.get(interaction.customId)
        await interaction.deferReply({ephemeral:true})
        if(!role){
            await interaction.editReply({
                content: 'Role not found :('
            })
            return;
        }
        const hasRole = interaction.member.roles.cache.has(role.id)
        if(hasRole){
            await interaction.member.roles.remove(role)
            await interaction.editReply(`The role ${role} has been removed `)
            return;
        }
        await interaction.member.roles.add(role)
        await interaction.editReply(`The role ${role} has been added `)
    }
})

// logs in
client.login(process.env.TOKEN);