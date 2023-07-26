// @ts-nocheck
const fs = require('fs');

const { REST, Routes } = require('discord.js');

const rest = new REST({ version: '10' }).setToken(process.env.BossBeats);

const botCommands = [];

module.exports.post = (client) => {

    const Categories = ["music", "other"];
    Categories.forEach((Category) => {
        const comandFiles = fs.readdirSync(`./commands/${Category}`).filter(file => file.endsWith('.ts'));
        for(const file of comandFiles) {
            const command = require(`../commands/${Category}/${file}`);

            if(!command.data) {
                continue;
            } else {
                botCommands.push(command.data);
            }
        }
    });

    (async () => {
    	try {

            await client.guilds.cache.forEach(async(guild) => {

                await rest.put(
                    Routes.applicationGuildCommands(client.user.id, guild.id),
                    { body: botCommands },
                );

                console.log(`Posted (/) Commands for ${guild.name}`)

            });

    		console.log('Posted all application (/) commands');
        } catch (error) {
	    	console.log(error);
    	}
    })();

}


module.exports.guildPost = async(client, guild) => {
    try {

        await rest.put(
            Routes.applicationGuildCommands(client.user.id, guild.id),
            { body: botCommands },
        );

        console.log(`Posted (/) Commands for ${guild.name}`)
    } catch (error) {
        console.error(error);
    }
}