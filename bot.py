import discord
import requests
import json
import os
from discord.ext import commands

# commands.Bot class is a sub-class of discord.Client()
# client = discord.Client()

bot = commands.Bot(command_prefix='$')

# As soon as the bot is ready
@bot.event
async def on_ready():
    print(f'I am {bot.user}')

@bot.command()
async def test(ctx):
    if(str(ctx.channel)=="bot-commands"):
        await ctx.send(ctx.channel)
    else:
        await ctx.send('Kindly perform the commmand in #bot-commands channel')

@bot.command()
async def test1(ctx):
    await ctx.send(ctx.channel)

@bot.command()
async def quote(ctx):
    if(str(ctx.channel)=="bot-commands"):
        response = requests.get("https://zenquotes.io/api/random")
        quote = response.json()[0]['q']
        author = response.json()[0]['a']
        final = quote+' - '+author
        await ctx.send(final)
    else:
        await ctx.send('Kindly perform the commmand in #bot-commands channel')

@bot.command()
async def trello(ctx, *args):
    if(str(ctx.channel)=="bot-commands"):
        if(len(args)==0):
            await ctx.send('_Input parameters not given_')
            return
        if(args[0]=='boardName'):
            if(len(args)!=3):
                await ctx.send('_Invalid input parameters given_')
                return
            oldName = args[1]
            newName = args[2]

            url1 = f'https://api.trello.com/1/member/me/boards?fields=name,url&key={TrelloKey}&token={TrelloToken}'
            response = requests.get(url1)
            json1 = response.json()

            boardID = [data['id'] for data in json1 if data['name']==oldName][0]

            url2 = f'https://api.trello.com/1/boards/{boardID}?key={TrelloKey}&token={TrelloToken}'
            response = requests.put(url2,data={"name":newName})

            if(response.status_code==200):
                await ctx.send('> Successfully changed the board name')
            else:
                await ctx.send('_Error occured._')
        else:
            await ctx.send('_Incorrect command_')
    else:
        await ctx.send('Kindly perform the commmand in #bot-commands channel')

TrelloKey = os.environ['TRELLO_KEY']
TrelloToken = os.environ['TRELLO_TOKEN']

bot.run(os.environ['TOKEN'])
