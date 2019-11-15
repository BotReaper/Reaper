import { Client } from 'discord.js'

module.exports = class ReaperClient extends Client {
    constructor(options = {}) {
        super(options)

    }

    connect(token = process.env.DISCORD_TOKEN) {
        return super.login(token);
    }
};