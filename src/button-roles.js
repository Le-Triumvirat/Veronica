require('dotenv').config()
const { ActionRowBuilder, ButtonBuilder } = require('@discordjs/builders')
const {Client, IntentsBitField, ButtonStyle} = require('discord.js')
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
})

const roles = [
    {
        'id': '1068757880074944593',
        'label': 'BotMaster'
    }
]

// To notify the bot has logged into the server
client.on('ready', async (e) => {
    try{
        const channel = await client.channels.cache.get('1068526211791327382')
        if(!channel) return;
        const row = new ActionRowBuilder()
        roles.forEach((role)=>{
            row.components.push(
                new ButtonBuilder().setCustomId(role.id).setLabel(role.label).setStyle(ButtonStyle.Primary)
            )
        })
    await channel.send({
        content:'Click the button to claim or remove the role',
        components:[row]
    })
    process.exit()
    }
    catch(err){
        console.log(err)
    }
})

// logs in
client.login(process.env.TOKEN);