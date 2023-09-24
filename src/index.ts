import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import Discord from "discord.js";
import BotClient from "./types/BotClient";

dotenv.config();

const client = new BotClient({ 
    partials: [Discord.Partials.Message, Discord.Partials.Channel, Discord.Partials.Reaction],
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMembers,
        Discord.GatewayIntentBits.GuildVoiceStates,
        Discord.GatewayIntentBits.DirectMessages
    ],
    allowedMentions: { parse: ['users', 'roles'], repliedUser: true }
});

(async() => {
    fs.readdirSync(path.join(__dirname, "./handlers")).forEach( async(file: string) => {
        await (await import(path.join(__dirname, `./handlers/${file}`))).default(Discord, client);
    });
})();

client.login(process.env.BossBeats).then(() => client.logger.log("&aBot Online!")).catch(() => console.log(new Error("Invalid Discord Bot Token Provided!")));

// PROCESS
process.on('uncaughtException', (err) => {
    client.logger.log("&4" + err);
});

process.on('unhandledRejection', (err) => {
    client.logger.log("&4" + err);
});