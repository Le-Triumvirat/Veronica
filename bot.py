import discord

client = discord.Client()
try:
    '''As soon as the bot is ready'''
    @client.event
    async def on_ready():
        print(f'I am {client.user}')

    '''If it receives a message'''
    @client.event
    async def on_message(message):
        if(message.author == client.user):
            return
        if(message.content.startswith('$hello')):
            await message.channel.send(f'Hello {message.author}')

    f = open('./token.txt','r')
    token = f.read()
    client.run(token)

except KeyboardInterrupt:
    print('Exception handled')