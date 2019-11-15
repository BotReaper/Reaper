const { Client } = require('discord.js')
const Loaders = require('./loaders')

module.exports = class ReaperClient extends Client {
    constructor(options = {}) {
        super(options)

        this.initLoaders();
    }

    connect(token = process.env.DISCORD_TOKEN) {
        return super.login(token);
    }

    log (...args) {
        const message = args[0]
        const tags = args.slice(1).map(t => `[36m[${t}][0m`)
        console.log(...tags, message + '[0m')
    }

    logError (...args) {
        const tags = args.length > 1 ? args.slice(0, -1).map(t => `[${t}]`) : []
        console.error('[ErrorLog]', ...tags, args[args.length - 1])
    }

    runCommand (command, context, args, language) {
        context.setFixedT(this.i18next.getFixedT(language))
        command._run(context, args).catch(this.logError)
    }

    async initLoaders () {
        for (let Loader of Object.values(Loaders)) {
            const loader = new Loader(this)
            let success = false
            try {
                success = await loader.load()
            } catch (e) {
                this.logError(e)
            } finally {
                if (!success && loader.critical) process.exit(1)
            }
        }
    }
};