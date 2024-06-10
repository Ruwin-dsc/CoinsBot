const Discord = require('discord.js');

exports.help = {
  name: 'addcoins',
  aliases: ['addcoin'],
  description: 'Lance un slots',
  use: 'Pas d\'utilisation conseillée',
  category: 'Jeux'
}
exports.run = async (bot, message, args, config, data) => {
    if(!args[0] || isNaN(args[0])) return message.reply(`:x:`)
    bot.functions.addCoins(bot, message, args, message.author.id, args[0], 'coins')
    message.reply(`J'ai ajouté \`${args[0]} coins \``)
}