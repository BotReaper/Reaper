const { Command, Embed, MiscUtils, Constants } = require('../../');
const moment = require('moment');
require('moment-duration-format')

module.exports = class botInfo extends Command {
    constructor(client) {
        super(client, {
            name: 'botinfo',
            aliases: ['bi', 'sobre'],
            category: 'bot'
        })
    }

    async run ({ t, guild, author, channel, language, prefix }) {
        await channel.startTyping();
        moment.locale(language)

        const embed = new Embed(author)
        embed.setAuthor(this.client.user.tag, this.client.user.avatarURL)
        embed.setThumbnail(this.client.user.displayAvatarURL)
        embed.setDescription([t('commands:botinfo.description', {
            uptime: moment.duration(process.uptime() * 1000).format('d [d], h [h], m [m], s [s]'),
            commands: this.client.commands.size,
            guilds: MiscUtils.formatNumber(this.client.guilds.size, language),
            users: MiscUtils.formatNumber(this.client.users.filter(user => !user.bot).size, language),
            githubRepository: Constants.GITHUB_REPOSITORY,
            supportInvite: Constants.SUPPORT_INVITE,
            language: language,
            prefix: prefix
        })].join('\n'))
        embed.addField(t('commands:botinfo:field.title'), t('commands:botinfo:field.description', {
            githubRepository: Constants.GITHUB_REPOSITORY,
            supportInvite: Constants.SUPPORT_INVITE
        }))

        await channel.send(embed).then(async() => await channel.stopTyping())
    }
}