import BotClient from "../../types/BotClient";
import BotCommand from "../../types/BotCommand";

export default class ShuffleCommand extends BotCommand {
    constructor() {
        super("shuffle", "Shuffle Command");
    }

    async execute(Discord: any, client: BotClient, interaction: any) {

        if(!interaction.member.voice.channel) return interaction.reply({ embeds: [client.util.buildEmbed(client.formatter.format("./responses/user/novoice.yaml"))] });
        
        const queue = client.distube.getQueue(interaction);
        if (!queue) return interaction.reply({ content: `❌ | There is no music playing!` });

        client.distube.shuffle(interaction);

        return interaction.reply({ content: `🔀 | Shuffled the Queue` });
    }
}