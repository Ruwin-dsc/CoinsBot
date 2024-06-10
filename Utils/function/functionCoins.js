const Discord = require('discord.js');

function checkuser(bot, message, args, userId) {
    let req = bot.db.prepare('SELECT * FROM user WHERE id = ?').get(userId)
    if(!req) {
        bot.db.exec(`INSERT INTO user (id) VALUES ('${userId}')`);
        req = bot.db.prepare('SELECT * FROM user WHERE id = ?').get(userId)
        return req
    } else return req
}

function checkguild(bot, message, guildId) {
    let req = bot.db.prepare('SELECT * FROM guild WHERE id = ?').get(guildId)
    if(!req) {
        bot.db.exec(`INSERT INTO guild (id) VALUES ('${guildId}')`);
        req = bot.db.prepare('SELECT * FROM guild WHERE id = ?').get(guildId)
        return req
    } else return req
}

function addcoins(bot, message, args, userId, coins, type) {
    const req = checkuser(bot, message, args, userId)
    if(type == 'coins') {
        const json = {
            'coins': parseInt(JSON.parse(req.coins).coins) + parseInt(coins),
            'bank': JSON.parse(req.coins).bank,
            'rep': JSON.parse(req.coins).rep
        }
        bot.db.prepare(`UPDATE user SET coins = @coins WHERE id = @id`).run({ coins: JSON.stringify(json), id: userId});
    } else if(type == 'bank') {
        const json = {
            'coins': parseInt(JSON.parse(req.coins).coins),
            'bank': JSON.parse(req.coins).bank + parseInt(coins),
            'rep': JSON.parse(req.coins).rep
        }
        bot.db.prepare(`UPDATE user SET coins = @coins WHERE id = @id`).run({ coins: JSON.stringify(json), id: userId});
    } else if(type == 'rep') {
        const json = {
            'coins': parseInt(JSON.parse(req.coins).coins),
            'bank': JSON.parse(req.coins).bank,
            'rep': JSON.parse(req.coins).rep + parseInt(coins)
        }
        bot.db.prepare(`UPDATE user SET coins = @coins WHERE id = @id`).run({ coins: JSON.stringify(json), id: userId});
    }
}

function removecoins(bot, message, args, userId, coins, type) {
    const req = checkuser(bot, message, args, userId)
    if(type == 'coins') {
        const json = {
            'coins': parseInt(JSON.parse(req.coins).coins) - parseInt(coins),
            'bank': JSON.parse(req.coins).bank,
            'rep': JSON.parse(req.coins).rep
        }
        bot.db.prepare(`UPDATE user SET coins = @coins WHERE id = @id`).run({ coins: JSON.stringify(json), id: userId});
    } else if(type == 'bank') {
        const json = {
            'coins': parseInt(JSON.parse(req.coins).coins),
            'bank': JSON.parse(req.coins).bank - parseInt(coins),
            'rep': JSON.parse(req.coins).rep
        }
        bot.db.prepare(`UPDATE user SET coins = @coins WHERE id = @id`).run({ coins: JSON.stringify(json), id: userId});
    } else if(type == 'rep') {
        const json = {
            'coins': parseInt(JSON.parse(req.coins).coins),
            'bank': JSON.parse(req.coins).bank,
            'rep': JSON.parse(req.coins).rep - parseInt(coins)
        }
        bot.db.prepare(`UPDATE user SET coins = @coins WHERE id = @id`).run({ coins: JSON.stringify(json), id: userId});
    }
}

function checklogs(bot, message, args, guildId, coins, type, color) {
    const req = checkguild(bot, message, args, guildId)
    if(type == "dailyCoins") {
        const channel = message.guild.channels.cache.get(JSON.parse(req.logs).transaction)
        if(channel) {
            const embed = new Discord.EmbedBuilder()
            .setColor('Green')
            .setDescription(`${message.member.user.username} vient de gagner \`${coins} coins\``)
            .setAuthor({ name: `${message.member.user.username}`, iconURL: message.member.user.displayAvatarURL({ dynamic: true }) })
            .setTimestamp()
            .setTitle('Daily')
            channel.send({ embeds: [embed]})
        }
    } else if(type == "gift") {
        const channel = message.guild.channels.cache.get(JSON.parse(req.logs).transaction)
        if(channel) {
            const embed = new Discord.EmbedBuilder()
            .setDescription(`${coins}`)
            .setAuthor({ name: `${message.member.user.username}`, iconURL: message.member.user.displayAvatarURL({ dynamic: true }) })
            .setTimestamp()
            .setTitle('Cards')
            .setColor(color)
            channel.send({ embeds: [embed]})
        } 
    } else if(type == "pay") {
        const channel = message.guild.channels.cache.get(JSON.parse(req.logs).transaction)
        if(channel) {
            const embed = new Discord.EmbedBuilder()
            .setDescription(`${coins}`)
            .setAuthor({ name: `${message.member.user.username}`, iconURL: message.member.user.displayAvatarURL({ dynamic: true }) })
            .setTimestamp()
            .setTitle('Pay')
            .setColor(color)
            channel.send({ embeds: [embed]})
        }
    } else if(type == "rep") {
        const channel = message.guild.channels.cache.get(JSON.parse(req.logs).transaction)
        if(channel) {
            const embed = new Discord.EmbedBuilder()
            .setDescription(`${coins}`)
            .setAuthor({ name: `${message.member.user.username}`, iconURL: message.member.user.displayAvatarURL({ dynamic: true }) })
            .setTimestamp()
            .setTitle('Reputation')
            .setColor(color)
            channel.send({ embeds: [embed]})
        }
    } else if(type == "rob") {
        const channel = message.guild.channels.cache.get(JSON.parse(req.logs).transaction)
        if(channel) {
            const embed = new Discord.EmbedBuilder()
            .setDescription(`${coins}`)
            .setAuthor({ name: `${message.member.user.username}`, iconURL: message.member.user.displayAvatarURL({ dynamic: true }) })
            .setTimestamp()
            .setTitle('Rob')
            .setColor(color)
            channel.send({ embeds: [embed]})
        }
    } else if(type == "work") {
        const channel = message.guild.channels.cache.get(JSON.parse(req.logs).transaction)
        if(channel) {
            const embed = new Discord.EmbedBuilder()
            .setColor('Green')
            .setDescription(`${message.member.user.username} vient de gagner \`${coins} coins\``)
            .setAuthor({ name: `${message.member.user.username}`, iconURL: message.member.user.displayAvatarURL({ dynamic: true }) })
            .setTimestamp()
            .setTitle('Work')
            channel.send({ embeds: [embed]})
        }
    } else if(type == "roulette") {
        const channel = message.guild.channels.cache.get(JSON.parse(req.logs).transaction)
        if(channel) {
            const embed = new Discord.EmbedBuilder()
            .setColor(color)
            .setDescription(coins)
            .setAuthor({ name: `${message.member.user.username}`, iconURL: message.member.user.displayAvatarURL({ dynamic: true }) })
            .setTimestamp()
            .setTitle('Roulette')
            channel.send({ embeds: [embed]})
        }
    } else if(type == "slots") {
        const channel = message.guild.channels.cache.get(JSON.parse(req.logs).transaction)
        if(channel) {
            const embed = new Discord.EmbedBuilder()
            .setColor(color)
            .setDescription(coins)
            .setAuthor({ name: `${message.member.user.username}`, iconURL: message.member.user.displayAvatarURL({ dynamic: true }) })
            .setTimestamp()
            .setTitle('Slots')
            channel.send({ embeds: [embed]})
        }
    }

}

function addminerais(bot, message, args, userId, number, type) {
    const req = checkuser(bot, message, args, userId)
    const json = {
        "wagon": type == "wagon" ? JSON.parse(req.minerais).wagon + number : JSON.parse(req.minerais).wagon,
        "charbon": type == "charbon" ? JSON.parse(req.minerais).charbon + number : JSON.parse(req.minerais).charbon,
        "fer": type == "fer" ? JSON.parse(req.minerais).fer + number : JSON.parse(req.minerais).fer,
        "or": type == "or" ? JSON.parse(req.minerais).or + number : JSON.parse(req.minerais).or,
        "diamant": type == "diamant" ? JSON.parse(req.minerais).diamant + number : JSON.parse(req.minerais).diamant
    }

    bot.db.prepare(`UPDATE user SET minerais = @minerais WHERE id = @id`).run({ minerais: JSON.stringify(json), id: userId});
}

function removeminerais(bot, message, args, userId, number, type) {
    const req = checkuser(bot, message, args, userId)
    const json = {
        "wagon": type == "wagon" ? JSON.parse(req.minerais).wagon - number : JSON.parse(req.minerais).wagon,
        "charbon": type == "charbon" ? JSON.parse(req.minerais).charbon - number : JSON.parse(req.minerais).charbon,
        "fer": type == "fer" ? JSON.parse(req.minerais).fer - number : JSON.parse(req.minerais).fer,
        "or": type == "or" ? JSON.parse(req.minerais).or - number : JSON.parse(req.minerais).or,
        "diamant": type == "diamant" ? JSON.parse(req.minerais).diamant - number : JSON.parse(req.minerais).diamant
    }

    bot.db.prepare(`UPDATE user SET minerais = @minerais WHERE id = @id`).run({ minerais: JSON.stringify(json), id: userId});
}

function checkteam(bot, message, args, teamName) {
    let req = bot.db.prepare('SELECT * FROM team WHERE id = ?').get(teamName.toLowerCase())
    if(!req) return false
    else return req
}

function checkentreprise(bot, message, args, entrepriseName) {
    let req = bot.db.prepare('SELECT * FROM entreprise WHERE id = ?').get(entrepriseName.toLowerCase())
    if(!req) {
        bot.db.exec(`INSERT INTO entreprise (id, author) VALUES ('${entrepriseName}', '${message.author.id}')`);
        req = bot.db.prepare('SELECT * FROM entreprise WHERE id = ?').get(entrepriseName)
        return req
    } else return req
}

function addteam(bot, message, args, teamName, number, type) {
    let req = checkteam(bot, message, args, teamName)
    if(type == "rep") {
        const json = {
            'rep': parseInt(JSON.parse(req.coins).rep) + number
        }
        bot.db.prepare(`UPDATE team SET rep = @coins WHERE id = @id`).run({ coins: JSON.stringify(json), id: teamName.toLowerCase()});
    }
}
module.exports = {
    checkUser: checkuser,
    checkGuild: checkguild,
    addCoins: addcoins,
    checkLogs: checklogs,
    removeCoins: removecoins,
    addMinerais: addminerais,
    removeMinerais: removeminerais,
    checkTeam: checkteam,
    addTeam: addteam,
    checkEntreprise: checkentreprise
}