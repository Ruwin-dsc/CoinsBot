const Discord = require('discord.js');

exports.help = {
  name: 'quete',
  aliases: ['quetes' , 'quest' , 'qt'],
  description: 'Affiche votre quête actuelle !',
  use: 'quete',
  category: 'Jeux'
}
exports.run = async (bot, message, args, config, data) => {
    return message.reply(`🔔 Cette commande n'est disponible que sur la version Premium du bot !\nRejoignez [le support EpicBots](https://discord.gg/7hDfsSZeCK) pour en savoir plus !`)
}