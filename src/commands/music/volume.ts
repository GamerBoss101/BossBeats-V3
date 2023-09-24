import BotClient from "../../types/BotClient";
import BotCommand from "../../types/BotCommand";

export default class VolumeCommand extends BotCommand {
    constructor() {
        super("volume", "Volume Command");
        this.data.addNumberOption(option => 
            option.setName('number').setDescription('Volume Level').setRequired(true)
        );
    }

    async execute(Discord: any, client: BotClient, interaction: any) {

        const volume = interaction.options.getNumber('number');

        if(!interaction.member.voice.channel) return interaction.reply({ embeds: [client.util.buildEmbed(client.formatter.format("./responses/user/novoice.yaml"))] });

        const queue = client.distube.getQueue(interaction);
        if (!queue) return interaction.reply({ content: `❌ | There is no music playing!` });

        try {
            queue.setVolume(volume)
            interaction.reply({ content: `:white_check_mark: | Volume set to \`${volume.toString()}\`` });
        } catch (e) {
            interaction.reply({ content: `${e}` })
        }

    }
}