
import BotClient from "../../types/BotClient";
import BotCommand from "../../types/BotCommand";

export default class PlayCommand extends BotCommand {
    constructor() {
        super("play", "Play Command");
        super.data.addStringOption(option => 
            option.setName('song').setDescription('name or link of Music').setRequired(true)
        );
    }

    async execute(Discord: any, client: BotClient, interaction: any) {

        if(!interaction.member.voice.channel) return client.util.buildEmbed(client.formatter.format("./responses/user/novoice.yaml"));

        client.distube.play(interaction.member.voice.channel, interaction.options.getString('song'), {
            member: interaction.member,
            textChannel: interaction.channel
        });

        return await interaction.reply({ content: `Searching for ${interaction.options.getString('song')} . . .`, ephemeral: true });
    }
}