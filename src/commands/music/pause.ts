import BotClient from "../../types/BotClient";
import BotCommand from "../../types/BotCommand";

export default class PauseCommand extends BotCommand {
    constructor() {
        super("pause", "Pause Command");
    }

    async execute(Discord: any, client: BotClient, interaction: any) {

        if(!interaction.member.voice.channel) return interaction.reply({ embeds: [client.util.buildEmbed(client.formatter.format("./responses/user/novoice.yaml"))] });

        const queue = client.distube.getQueue(interaction);
        if(!queue) return interaction.reply({ content: `❌ | There is no music playing!` });

        if(queue.paused) return interaction.reply( { content: `❌ | The queue has been paused.` });

        client.distube.pause(interaction);

        const embed = new Discord.EmbedBuilder()
        .setDescription(`⏸ | Successfully **Paused** a song.`)
        .setFooter({ text: `Request by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });

        await interaction.reply({ embeds: [embed] });
    }
}