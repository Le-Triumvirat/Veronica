require('dotenv').config()
const {Client, IntentsBitField} = require('discord.js')
const {Player, QueryType} = require("discord-player");

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildVoiceStates
    ]
})

// Create a new Player (you don't need any API Key)
const player = new Player(client, {
    ytdlOptions: {
        quality: "highestaudio",
        highWaterMark: 1<<25
    }
});

// add the trackStart event so when a song will be played this message will be sent
player.on("trackStart", (queue, track) => queue.metadata.channel.send(`🎧 Playing **${track.title}**`))

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
                    break;
                case 'ping':
                    // interaction.reply(`Websocket heartbeat: ${client.ws.ping}ms.`)
                    interaction.reply('PONG!')
                    break;
                case 'worthy':
                    interaction.reply('oh yes, you are the bot master!')
            }
        }
        else{
            interaction.reply('You are not worthy. BotMaster role is required for executing bot commands')
            return;
        }
    } catch (error) {
        console.log(error)
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

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "play") {
        if (!interaction.member.voice.channelId){
            return await interaction.reply({ content: "You are not in a voice channel!", ephemeral: true });
        }
        if (interaction.guild.members.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId){
            return await interaction.reply({ content: "You are not in my voice channel!", ephemeral: true });
        }
        const query = interaction.options.getString("query");
        const queue = player.createQueue(interaction.guild, {
            metadata: {
                channel: interaction.channel
            }
        });
        
        // verify vc connection
        try {
            if (!queue.connection) await queue.connect(interaction.member.voice.channel);
        } catch {
            queue.destroy();
            return await interaction.reply({ content: "Could not join your voice channel!", ephemeral: true });
        }

        await interaction.deferReply();
        const track = await player.search(query, {
            requestedBy: interaction.user,
            searchEngine: QueryType.YOUTUBE_VIDEO
        }).then(x => x.tracks[0]);
        if (!track) return await interaction.followUp({ content: `Track **${query}** not found!` });

        queue.play(track);

        return await interaction.followUp({ content: `🔃 Loading track **${track.title}**!` });
    }
});

// logs in
client.login(process.env.TOKEN);