import discord
import requests
import json
import token
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
    await ctx.send(ctx.channel)

@bot.command()
async def quote(ctx):
    response = requests.get("https://zenquotes.io/api/random")
    quote = response.json()[0]['q']
    author = response.json()[0]['a']
    final = quote+' - '+author
    await ctx.send(final)

# client.run(os.getenv('TOKEN'))
bot.run(token.get_token())