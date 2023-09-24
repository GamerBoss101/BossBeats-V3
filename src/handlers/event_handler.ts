import fs from "fs";
import path from "path";
import ms from "ms";

import BotClient from "../types/BotClient";

let Events: Array<string> = [];

function isEvent(file: string): boolean {
    return file.endsWith(".js");
}

function ScanDir(Discord: any, client: BotClient, dir: string) {
    fs.readdirSync(dir).forEach((file: string) => {
        if(isEvent(file)) return loadEvent(Discord, client, `${dir}/${file}`);
        else return ScanDir(Discord, client, `${dir}/${file}`);
    });
}

async function loadEvent(Discord: any, client: BotClient, file: string): Promise<void> {
    const event = await import(file);
    let event_name: any = file.split("/");
    event_name = event_name[event_name.length - 1].split(".")[0];
    client.on(event_name, event.default.bind(null, Discord, client));
    Events.push(event_name);
}

function ScanDirDistube(Discord: any, client: BotClient, dir: string) {
    fs.readdirSync(dir).forEach((file: string) => {
        if(isEvent(file)) return loadEventDistube(Discord, client, `${dir}/${file}`);
        else return ScanDirDistube(Discord, client, `${dir}/${file}`);
    });
}

async function loadEventDistube(Discord: any, client: BotClient, file: string): Promise<void> {
    const event = await import(file);
    let event_name: any = file.split("/");
    event_name = event_name[event_name.length - 1].split(".")[0];
    client.distube.on(event_name, event.default.bind(null, Discord, client));
    Events.push(event_name);
}

export default async(Discord: any, client: BotClient) => { 
    ScanDir(Discord, client, path.join(__dirname, `../events/bot`));
    ScanDirDistube(Discord, client, path.join(__dirname, `../events/distube`));
    await client.util.wait(ms("5s"));
    Events.forEach((event: string) => {
        client.logger.log(`&6${event} &a- Event Loaded`);
    });
}