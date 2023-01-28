require('dotenv').config()
const {REST, Routes} = require('discord.js')

const commands = [
    {
        name: 'greet',
        description: 'replies with a greeting according to the time'
    },
    {
        name: 'whoami',
        description: 'outputs the username/user-id of the user executing the command'
    },
    {
        name: 'ping',
        description: 'outputs pong'
    },
    {
        name: 'worthy',
        description: 'checks if the user executing the bot command has the BotMaster role'
    },
]

const rest = new REST({'version':10}).setToken(process.env.TOKEN);

(async ()=>{
    console.log('Registering (/) commands')
    try{
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), {body:commands}
        )
        console.log('(/) commands were registered successfully')
    }
    catch(error){
        console.log(`Error : ${error}`)
    }
})();