import BotClient from "../../types/BotClient";
import BotCommand from "../../types/BotCommand";

export default class DisconnectCommand extends BotCommand {
    constructor() {
        super("disconnect", "Disconnect Command");
    }

    async execute(Discord: any, client: BotClient, interaction: any) {

        if(!interaction.member.voice.channel) return client.util.buildEmbed(client.formatter.format("./responses/user/novoice.yaml"));

        const queue = client.distube.getQueue(interaction);

        if(queue) {
            client.distube.stop(interaction);
            client.distube.voices.leave(interaction.guild);
        } else {
            client.distube.voices.leave(interaction.guild);
        }

        const embed = new Discord.EmbedBuilder()
        .setDescription(`Successfully **Disconnected** from the voice channel.`)
        .setFooter({ text: `Request by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });

        await interaction.reply({ embeds: [embed] });
    }
}