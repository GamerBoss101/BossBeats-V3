import BotClient from "../../types/BotClient";
import BotCommand from "../../types/BotCommand";

export default class LoopCommand extends BotCommand {
    constructor() {
        super("loop", "Loop Command");
        super.data.addStringOption(option =>
            option.setName('type')
                .setDescription('The type of loop')
                .setRequired(true)
                .addChoices(
                    { name: 'Quene', value: 'loop_quene' },
                    { name: 'Song', value: 'loop_song' },
                    { name: 'Off', value: 'loop_off' },
                )
        );
    }

    async execute(Discord: any, client: BotClient, interaction: any) {

        if(!interaction.member.voice.channel) return client.util.buildEmbed(client.formatter.format("./responses/user/novoice.yaml"));
        const queue = client.distube.getQueue(interaction);
        if (!queue) return interaction.reply({ content: `❌ | There is no music playing!` });

        let mode = interaction.options.getString('type');

        switch (mode) {
            case 'loop_quene':
                client.distube.setRepeatMode(interaction, 2);
                interaction.reply({ content: `🔁 | Looping the Queue` });
                break;
            case 'loop_song':
                client.distube.setRepeatMode(interaction, 1);
                interaction.reply({ content: `🔁 | Looping the Song` });
                break;
            case 'loop_off':
                client.distube.setRepeatMode(interaction, 0);
                interaction.reply({ content: `🔁 | Looping Off` });
                break;
            default:
                interaction.reply({ content: `❌ | Invalid Loop Mode` });
                break;
        }

    }
}