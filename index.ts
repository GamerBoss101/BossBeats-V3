// @ts-nocheck
const { DisTube } = require('distube')
const Discord = require('discord.js');

const client = new Discord.Client({ 
  partials: [ "USER", "CHANNEL", "MESSAGE", "REACTION" ],
  intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_PRESENCES, Discord.Intents.FLAGS.GUILD_VOICE_STATES],
  allowedMentions: { parse: ['users', 'roles'], repliedUser: true }
});

// Module Imports
const { Token, spotKey, spotID } = require("./config.ts");
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
    emitAddSongWhenCreatingQueue: false,
    emitAddListWhenCreatingQueue: false,
    plugins: [
        new SpotifyPlugin({ 
            parallel: true, 
            emitEventsAfterFetching: true,
            api: { clientId: spotID, clientSecret: spotKey }
        }),
        new SoundCloudPlugin(),
        new YtDlpPlugin()
    ],
    youtubeDL: false
});

client.map = new Discord.Collection();
client.embeds = new Embeds();


// Handlers
const HAND = require(`./handlers.ts`);
HAND.event(client, Discord)
HAND.command(client, Discord)
// require(`./handlers/init_handler.js`)(client, Discord);

/*
['command_handler', 'event_handler'].forEach(handler =>{
    require(`./handlers/${handler}`)(client, Discord);
})*/
  
// Bot Login
client.login(Token).catch(() => console.log(new Error("Invalid Discord Bot Token Provided!")));

// PROCESS

process.on('uncaughtException', function (err) {
    console.log(err)
})

process.on('unhandledRejection', (err) => {
    console.log(err)
})