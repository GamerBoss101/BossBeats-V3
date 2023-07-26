// @ts-nocheck
require("dotenv").config();
const { DisTube } = require('distube')
const Discord = require('discord.js');
const client = new Discord.Client({ 
    partials: [Discord.Partials.Message, Discord.Partials.Channel, Discord.Partials.Reaction],
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMembers,
        Discord.GatewayIntentBits.GuildVoiceStates,
        Discord.GatewayIntentBits.DirectMessages
    ],
    allowedMentions: { parse: ['users', 'roles'], repliedUser: true }
});   


// Module Imports
const Embeds = require("./util/embeds.ts");
const { SpotifyPlugin } = require('@distube/spotify')
const { SoundCloudPlugin } = require('@distube/soundcloud')
const { YtDlpPlugin } = require('@distube/yt-dlp')


// Bot Stuff
client.commands = new Discord.Collection();
client.distube = new DisTube(client, {
    searchSongs: 0,
	searchCooldown: 30,
	leaveOnEmpty: false,
	emptyCooldown: 0,
	leaveOnFinish: false,
    leaveOnStop: false,
    emitNewSongOnly: true,
    emitAddSongWhenCreatingQueue: true,
    emitAddListWhenCreatingQueue: false,
    plugins: [
        new SpotifyPlugin({ 
            parallel: true, 
            emitEventsAfterFetching: true,
            api: { clientId: process.env.spotID, clientSecret: process.env.spotKey }
        }),
        new SoundCloudPlugin(),
        new YtDlpPlugin()
    ]
});

client.embeds = new Embeds();

// Handlers
['event_handler.ts', 'command_handler.ts'].forEach((handler) => {
    require(`./handlers/${handler}`)(client, Discord);
});
    
    
// Bot Login
client.login(process.env.BossBeats).catch(() => console.log(new Error("Invalid Discord Bot Token Provided!")));


process.on('uncaughtException', function (err) {
    console.log('uncaughtException: ' + err)
})

process.on('unhandledRejection', (err) => {
    console.log('unhandledRejection: ' + err)
})
