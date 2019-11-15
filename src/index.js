const CommandStructures = require('./structures/command')

module.exports = {

    // Command Structures
    CommandStructures,
    Command: CommandStructures.Command,
    CommandContext: CommandStructures.CommandContext,
    CommandError: CommandStructures.CommandError,
    CommandParameters: CommandStructures.CommandParameters,
    CommandRequirements: CommandStructures.CommandRequirements,
    Parameter: CommandStructures.Parameter,

    // Command extensions
    RandomRedditPostCommand: CommandStructures.RandomRedditPostCommand,
    SearchCommand: CommandStructures.SearchCommand,
    SubcommandListCommand: CommandStructures.SubcommandListCommand,

    Embed: require('./structures/embed/Embed'),
    Hex: require('./structures/embed/HexColors'),
    Constants: require('./utils/Constants'),
    EventListener: require('./structures/EventListener'),
    Loader: require('./structures/Loader'),
    Color: require('./utils/Color.js'),
    Reddit: require('./utils/Reddit.js'),
    Constants: require('./utils/Constants.js'),
    DiscordUtils: require('./utils/DiscordUtils.js'),
    FileUtils: require('./utils/FileUtils.js'),
    MiscUtils: require('./utils/MiscUtils.js'),
    PermissionUtils: require('./utils/PermissionUtils.js'),
    EmojiUtils: require('./utils/EmojiUtils.js'),
    EndpointUtils: require('./utils/EndpointUtils.js'),
}