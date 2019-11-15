const { CommandContext, EventListener, MiscUtils } = require('../')

module.exports = class MainListener extends EventListener {
    constructor (client) {
        super(client);
        this.events = ['ready', 'message']
    }

    onReady () {
        this.user.setActivity(`${MiscUtils.formatNumber(this.users.filter(u => !u.bot).size, 'en-US')} users | @Reaper help`, { type: 'LISTENING' });
    }

    async onMessage (message) {
        if (message.author.bot) return

        const guildId = message.guild && message.guild.id
        const prefix = await this.database.guilds.findOne(guildId).then(t => t.prefix)
        const language = await this.database.guilds.findOne(guildId).then(t => t.language)

        const botMention = this.user.toString()

        const sw = (...s) => s.some(st => message.content.startsWith(st))
        const usedPrefix = sw(botMention, `<@!${this.user.id}>`) ? `${botMention} ` : sw(prefix) ? prefix : null

        if (usedPrefix) {
            const fullCmd = message.content.substring(usedPrefix.length).split(/[ \t]+/).filter(a => a)
            const args = fullCmd.slice(1)
            if (!fullCmd.length) return

            const cmd = fullCmd[0].toLowerCase().trim()
            const command = this.commands.find(c => c.name.toLowerCase() === cmd || (c.aliases && c.aliases.includes(cmd)))
            if (command) {

                const context = new CommandContext({
                    defaultPrefix: usedPrefix,
                    aliase: cmd,
                    client: this,
                    prefix,
                    message,
                    command,
                    language
                })

                this.log(`[35m"${message.content}" (${command.constructor.name}) run by "${message.author.tag}" (${message.author.id}) on guild "**${message.guild.name}**" (${message.guild.id}) channel "${message.channel.name}" (${message.channel.id})`, 'Commands')
                this.runCommand(command, context, args, language)
                await this.database.commands.update(command.name, {
                    $inc: {
                        usedSize: +1
                    }
                })
            }
        }
    }
}