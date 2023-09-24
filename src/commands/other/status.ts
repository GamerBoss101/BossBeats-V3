
import BotClient from "../../types/BotClient";
import BotCommand from "../../types/BotCommand";

export default class StatusCommand extends BotCommand {
    constructor() {
        super("status", "Bot Status Command");
    }

    async execute(Discord: any, client: BotClient, interaction: any) {

        const Link = `https://discord.com/oauth2/authorize?client_id=${client?.user?.id}&permissions=1644971949559&scope=bot%20applications.commands`;

        let totalSeconds = ((client.uptime || 0) / 1000);
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);

        let obj = {
            bot: {
                name: client?.user?.username,
                icon: client?.user?.avatarURL(),
                stats: "Version: `" + `4.0.0` + "`\n" +
                "💻 **Client Latency**: `" + `${Date.now() - interaction.createdTimestamp}ms` + "`\n" +
                "📊 **API Latency**: `" + `${Math.round(client.ws.ping)}ms` + "`\n" +
                "📶 **Ping**: `" + `${client.ws.ping}ms` + "`\n" +
                ":file_cabinet:**Memory**: `" + `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}mb` + "`"
            }, 
            uptime: `${days}d ${hours}h ${minutes}m ${seconds}s`,
            link: Link,
            interaction
        }

        const Embed = client.util.buildEmbed(client.formatter.format("./responses/command/status.yaml", obj));
        
        return interaction.reply({ embeds: [Embed], ephemeral: true });

    }
}