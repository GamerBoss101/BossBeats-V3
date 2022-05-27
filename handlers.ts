
// @ts-nocheck
const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Token } = require("./config.ts");

const { log } = require('./util/helper.ts')

const rest = new REST({ version: '9' }).setToken(Token);

const Categories = ["music", "other"];
const commandss = [];

module.exports.command = (client, Discord) => {
    const Categories = ["music", "other"];
    Categories.forEach((Category) => {
        const comandFiles = fs.readdirSync(`./commands/${Category}`).filter(file => file.endsWith('.js') || file.endsWith('.ts'));
        for(const file of comandFiles){
            const command = require(`./commands/${Category}/${file}`);

            if (!command.name) return log("BossBeats: " + `${command.name}` + ` Failed To Load - ❌`);

            client.commands.set(command.name, command)

            if(command.name) log("BossBeats: " + `${command.name}` + ` Has Been Loaded - ✅`)
        }
    });
}

module.exports.event = (client, Discord) =>{
    const load_dir = (dirs) =>{
        const events_files = fs.readdirSync(`./events/bot/${dirs}`).filter(file => file.endsWith('.ts'));

        for(const file of events_files){
            console.log(file)
            const event = require(`./events/bot/${dirs}/${file}`);
            const event_name = file.split('.')[0];
            client.on(event_name, event.bind(null, Discord, client));
        }
    }
    ['client', 'guild'].forEach(e => load_dir(e));

    const load_dis = () => {
        const events_files = fs.readdirSync(`./events/distube/`).filter(file => file.endsWith('.ts'));

        for(const file of events_files){
            console.log(file)
            const event = require(`./events/distube/${file}`);
            const event_name = file.split('.')[0];
            client.distube.on(event_name, event.bind(null, Discord, client));
        }
    }
    load_dis()

}

module.exports.post = (client) => {
    Categories.forEach((Category) => {
        const comandFiles = fs.readdirSync(`./commands/${Category}`).filter(file => file.endsWith('.js') || file.endsWith('.ts'));
        for(const file of comandFiles){
            const command = require(`./commands/${Category}/${file}`);

            if (!command.data) {
                log("BossBot: " + `${command.name}` + ` INTI Failed To Load - ❌`);
            } else {

                commandss.push(command.data);

                if(command.name) log("BossBot: " + `${command.name}` + ` INTI Has Been Loaded - ✅`)

            }
        }
    });

    (async () => {
	    try {

            await client.guilds.cache.forEach( async (guild) => {
                await rest.put(
                    Routes.applicationGuildCommands(client.user.id, guild.id), //applicationGuildCommands("825562206674354200"),
                    { body: commandss.map(command => command.toJSON()) }
                );
                log("BossBot: " + `Posted (/) Commands for ${guild.name}`)
            });

    	} finally {
            log("BossBot: " + 'Successfully registered application commands.');  
        }
    })();
}

module.exports.guildPost = (client, guild) => {
    (async () => {
	    try {
            await rest.put(
                Routes.applicationGuildCommands(client.user.id, guild.id), //applicationGuildCommands("825562206674354200"),
                { body: commandss.map(command => command.toJSON()) }
            );
            log("BossBot: " + `Posted (/) Commands for ${guild.name}`)
    	} finally {
            log("BossBot: " + 'Successfully registered application commands.');  
        }
    })();
}