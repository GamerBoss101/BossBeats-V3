
import BotClient from "../../types/BotClient";
import BotCommand from "../../types/BotCommand";

export default class SkipCommand extends BotCommand {
    constructor() {
        super("skip", "Skip a song or track");
    }

    async execute(Discord: any, client: BotClient, interaction: any) {

        if(!interaction.member.voice.channel) return interaction.reply({ embeds: [client.util.buildEmbed(client.formatter.format("./responses/user/novoice.yaml"))] });

        const queue = client.distube.getQueue(interaction);
        if (!queue) return interaction.reply({ content: `❌ | There is no music playing!` });

        try {
            const song = await queue.skip()
            interaction.reply({ content: `✅ | Skipped! Now playing:\n${song.name}` })
        } catch (e) {
            interaction.reply({ content: `${e}` })
        }

    }
}