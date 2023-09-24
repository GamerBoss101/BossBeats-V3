import fs from "fs";
import path from "path";

import { REST, Routes, SlashCommandBuilder } from "discord.js";
import BotClient from "../types/BotClient";
import BotCommand from "../types/BotCommand";

// @ts-ignore
const rest = new REST({ version: '10' }).setToken(process.env.BossBeats);

export default (Discord: any, client: BotClient) => {
    fs.readdirSync(path.join(__dirname, "../commands")).forEach((dir: string) => {
        fs.readdirSync(path.join(__dirname, `../commands/${dir}`)).forEach( async(file: string) => {
            let command: BotCommand = new (await( await import(path.join(__dirname, `../commands/${dir}/${file}`)))).default();
            client.commands.set(command.name, command);
        });       
    });
}

export async function post(client: BotClient) {
    let botCommands: Array<SlashCommandBuilder> = [];
    client.commands.forEach((value, key) => {
        botCommands.push(value.data);
    });

    try {
        client.guilds.cache.forEach(async (guild) => {
            await rest.put(
                // @ts-ignore
                Routes.applicationGuildCommands(client.user.id, guild.id),
                { body: botCommands }
            );
            client.logger.log(`&bPosted (/) Commands for &f${guild.name}`);
        });
    } catch (error) {
        console.error(error);
    }
}