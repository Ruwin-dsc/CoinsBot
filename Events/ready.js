    module.exports = {
      name: 'ready',
      async execute(bot) {
        try {
        let index = 0;
        const statuses = [
            { name: '/whitehall', type: 5, presence: 'dnd' },
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