    module.exports = {
      name: 'ready',
      async execute(bot) {
        let req = bot.db.prepare('SELECT * FROM bot WHERE id = ?').get(bot.user.id)
        if(!req) {
          bot.db.exec(`INSERT INTO bot (id) VALUES ('${bot.user.id}')`);
        req = bot.db.prepare('SELECT * FROM bot WHERE id = ?').get(bot.user.id)
        }
        try {
        let index = 0;
        const statuses = [
            { name: JSON.parse(req.activity).name, type: JSON.parse(req.activity).type, presence: 'online' },
        ];
        setInterval(async () => {
            await bot.user.setPresence({ activities: [{ name: statuses[index].name, type: statuses[index].type }], status: statuses[index].presence });
            index = (index + 1) % statuses.length;
        }, 10000);
      } catch (e) { 
        console.log(e)
      }
      },
    };