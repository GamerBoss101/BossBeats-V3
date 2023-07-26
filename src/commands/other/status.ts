// @ts-nocheck

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    name: 'status',
    description: "Bots Status",
    data: new SlashCommandBuilder()
    .setName('status')
    .setDescription('Bots Status'),
    async execute(Discord, client, interaction) {

        const Link = `https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=1644971949559&scope=bot%20applications.commands`,
        Developer = client.users.cache.get('654765210866810880').tag;

        let totalSeconds = (client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);

        const Embed = new Discord.EmbedBuilder()
        .setColor("Green")
        .setAuthor({ name: client.user.username, iconURL: client.user.avatarURL({ dynamic: true }) })
        .setDescription(
            "\n**Server Count**: `" + `${client.guilds.cache.size}` + "`\n" +
            "💻 **Client Latency**: `" + `${Date.now() - interaction.createdTimestamp}ms` + "`\n" +
            "📊 **API Latency**: `" + `${Math.round(client.ws.ping)}ms` + "`\n" +
            "📶 **Ping**: `" + `${client.ws.ping}ms` + "`\n" +
            ":file_cabinet:**Memory**: `" + `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}mb` + "`"
        )   
        .addFields({ name: "Invite", value: `[Click Me!](${Link})`, inline: true })
        .addFields({ name: "Developer", value: `**${Developer}**`, inline: true })
        .addFields({ name: "Uptime", value: `${days}d ${hours}h ${minutes}m ${seconds}s`, inline: false })     
        .setFooter({ text: 'BossTop Studios' })
        .setTimestamp();
        
        return interaction.reply({ embeds: [Embed], ephemeral: true });

    }
}