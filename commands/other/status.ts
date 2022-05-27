// @ts-nocheck

const { SlashCommandBuilder } = require('@discordjs/builders');

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

        const Embed = new Discord.MessageEmbed()
        .setAuthor("Bot Status", client.user.avatarURL({
            dynamic: true
        }))
        .setDescription(
            "\n**Server Count**: `" + `${client.guilds.cache.size}` + "`\n\n" +
            "💻 **Client Latency**: `" + `${Date.now() - interaction.createdTimestamp}ms` + "`\n\n" +
            "📊 **API Latency**: `" + `${Math.round(client.ws.ping)}ms` + "`\n\n" +
            "📶 **Ping**: `" + `${client.ws.ping}ms` + "`\n\n" +
            ":file_cabinet:**Memory**: `" + `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}mb` + "`"
        )        
        .addField("Uptime", `${days}d / ${hours}h / ${minutes}m / ${seconds}s`)
        .addField("Invite", `[Click Me](${Link})`, true)
        .addField("Developer", Developer, true)
        .setFooter(`Requested By ${interaction.user.username}`, interaction.user.avatarURL({ dynamic: true }))
        .setTimestamp();

        return interaction.reply({ embeds: [Embed], ephemeral: true });

    }
}