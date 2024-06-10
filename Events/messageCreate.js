const Discord = require('discord.js');
module.exports = {
  name: 'messageCreate',
  async execute(message, bot, config) {
    const guild = bot.functions.checkGuild(bot, message, message.guild.id)
    try { 
      if (!message.guild && message.author.bot) return;
      
      if (message.content.startsWith(`<@${bot.user.id}>`)) {
        const args = message.content.slice(`<@${bot.user.id}>`.length).trim().split(/ +/);
        const commandFile = args.shift()?.toLowerCase() ? bot.commands.get(args.shift()?.toLowerCase()) : null;
        if(bot.functions.checkUser(bot, message, args, message.author.id).color) guild.color = bot.functions.checkUser(bot, message, args, message.author.id).color
        await commandFile.run(bot, message, config, guild);
    } else if (message.content.startsWith(guild.prefix)) {
        const messageArray = message.content.slice(guild.prefix.length).trim().split(/ +/);
        if(!messageArray[0]) return
        const args = messageArray.slice(1);
        const commandFile = bot.commands.get(messageArray[0].toLowerCase());
        if (!commandFile) return;
        if(bot.functions.checkUser(bot, message, args, message.author.id).color) guild.color = bot.functions.checkUser(bot, message, args, message.author.id).color
        await commandFile.run(bot, message, args, config, guild);
      }
    } catch(e) {
      console.log(e)
    }
  },
};