import BotClient from "../../types/BotClient";
import BotCommand from "../../types/BotCommand";

export default class SeekCommand extends BotCommand {
    constructor() {
        super("seek", "Seek Command");
        super.data.addNumberOption(option =>
            option.setName('time').setDescription('time to seek').setRequired(true)
        );
    }

    async execute(Discord: any, client: BotClient, interaction: any) {

        const songTime = interaction.options.getNumber('time');

        if(!interaction.member.voice.channel) return client.util.buildEmbed(client.formatter.format("./responses/user/novoice.yaml"));
        
        const queue = client.distube.getQueue(interaction);
        if (!queue) return interaction.reply({ content: `❌ | There is no music playing!` });

        client.distube.seek(interaction, Number(songTime));

        return interaction.reply({ content: `⏭ | Skipped to ${songTime} seconds` });
    }
}