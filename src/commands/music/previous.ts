import BotClient from "../../types/BotClient";
import BotCommand from "../../types/BotCommand";

export default class PreviousCommand extends BotCommand {
    constructor() {
        super("previous", "Previous Command");
    }

    async execute(Discord: any, client: BotClient, interaction: any) {

        interaction.deferReply({ ephemeral: true });

        if(!interaction.member.voice.channel) return client.util.buildEmbed(client.formatter.format("./responses/user/novoice.yaml"));
        
        const queue = client.distube.getQueue(interaction);
        if (!queue) return interaction.reply({ content: `❌ | There is no music playing!` });

        try {
            const song = await queue.previous()
            interaction.reply({ content: `✅ | Now playing:\n${song.name}` })
        } catch (e) {
            interaction.reply({ content: `${e}` })
        }

    }
}