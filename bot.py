import discord
import requests
import json

# import os

def req_info():
    response = requests.get("https://zenquotes.io/api/random")
    quote = response.json()[0]['q']
    author = response.json()[0]['a']
    final = quote+' - '+author
    return final

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
        elif(message.content == '$hello'):
            await message.channel.send(f'Hello {message.author}')
        elif(message.content == '$quote'):
            await message.channel.send(f'{req_info()}')
        # elif(message.content):
        #     await message.channel.send(message.content)

    f = open('./token.txt','r')
    token = f.read()
    client.run(token)
    # client.run(os.getenv('TOKEN'))

except KeyboardInterrupt:
    print('Exception handled')