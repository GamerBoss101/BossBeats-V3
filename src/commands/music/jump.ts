import BotClient from "../../types/BotClient";
import BotCommand from "../../types/BotCommand";

export default class JumpCommand extends BotCommand {
    constructor() {
        super("jump", "Jumps to a song in the queue");
    }

    async execute(Discord: any, client: BotClient, interaction: any) {

        const songNumber = interaction.options.getNumber('number');

        if(!interaction.member.voice.channel) return interaction.reply({ embeds: [client.util.buildEmbed(client.formatter.format("./responses/user/novoice.yaml"))] });
        
        const queue = client.distube.getQueue(interaction);
        if (!queue) return interaction.reply({ content: `❌ | There is no music playing!` });

        client.distube.jump(interaction, parseInt(songNumber)).catch(err => interaction.reply({ content: `❌ | ${err}` }));

        return interaction.reply({ content: `⏭ | Jumped to song number ${songNumber}` });

    }
}