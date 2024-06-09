const Discord = require('discord.js');
module.exports = {
  name: 'messageCreate',
  async execute(message, bot, config) {
    try { 
      if (!message.guild && message.author.bot) return;
      
      if (message.content.startsWith(`<@${bot.user.id}>`)) {
        const args = message.content.slice(`<@${bot.user.id}>`.length).trim().split(/ +/);
        const commandFile = args.shift()?.toLowerCase() ? bot.commands.get(args.shift()?.toLowerCase()) : null;
        const guild = bot.functions.checkGuild(bot, message, args, message.guild.id)
        await commandFile.run(bot, message, config, guild);
    } else if (message.content.startsWith("&")) {
        const messageArray = message.content.slice("&".length).trim().split(/ +/);
        if(!messageArray[0]) return
        const args = messageArray.slice(1);
        const commandFile = bot.commands.get(messageArray[0].toLowerCase());
        if (!commandFile) return;
        const guild = bot.functions.checkGuild(bot, message, args, message.guild.id)
        await commandFile.run(bot, message, args, config, guild);
      }
    } catch(e) {
      console.log(e)
    }
  },
};