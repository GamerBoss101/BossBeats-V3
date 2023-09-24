import BotClient from "../../types/BotClient";
import BotCommand from "../../types/BotCommand";

export default class ViewTrackCommand extends BotCommand {
    constructor() {
        super("viewtrack", "View your track");
        this.data.addNumberOption(option => option.setName("track").setDescription("Track to View").setRequired(true));
    }

    async execute(Discord: any, client: BotClient, interaction: any) {

        let user = await client.storage.users.get(interaction.user.id);
        if (!user) return interaction.reply({ content: `You have no tracks`, ephemeral: true });

        let tracks = user.tracks;
        if (tracks.length === 0) return interaction.reply({ content: `You have no tracks`, ephemeral: true });

        let trackData: TrackData = await client.storage.tracks.get(user.tracks[interaction.options.getNumber('track') - 1]);
        if (!trackData) return interaction.reply({ content: `That track does not exist`, ephemeral: true });

        if (trackData.songs.length === 0) return interaction.reply({ content: `That track has no songs`, ephemeral: true });

        let embed = new Discord.EmbedBuilder()
            .setTitle(`Track: ${trackData.name}`)
            .setDescription(`**Songs**\n${trackData.songs.map((song: SongData, index: number) => `\`${index + 1}\` - [${song.title}](${song.url})`).join("\n")}`)
            .setFooter({ text: `Track ID: ${trackData._id}` })
            .setTimestamp();

        return interaction.reply({ embeds: [embed], ephemeral: true });
        
    }
}