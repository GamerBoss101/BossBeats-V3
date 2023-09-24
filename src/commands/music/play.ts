
import BotClient from "../../types/BotClient";
import BotCommand from "../../types/BotCommand";

export default class PlayCommand extends BotCommand {
    constructor() {
        super("play", "Play Command");
        this.data.addStringOption(option => 
            option.setName('song').setDescription('name or link of Music')
        );
        this.data.addNumberOption(option => option.setName("track").setDescription("Track to Play Music From"));
    }

    async execute(Discord: any, client: BotClient, interaction: any) {

        if(!interaction.member.voice.channel) return interaction.reply({ embeds: [client.util.buildEmbed(client.formatter.format("./responses/user/novoice.yaml"))] });

        if(interaction.options.getNumber('track') != null) {
            let user = await client.storage.users.get(interaction.user.id);
            if(!user) return interaction.reply({ content: `You have no tracks`, ephemeral: true });

            let tracks = user.tracks;
            if(tracks.length === 0) return interaction.reply({ content: `You have no tracks`, ephemeral: true });

            let trackData: TrackData = await client.storage.tracks.get(user.tracks[interaction.options.getNumber('track') - 1]);
            if(!trackData) return interaction.reply({ content: `That track does not exist`, ephemeral: true });

            if(trackData.songs.length === 0) return interaction.reply({ content: `That track has no songs`, ephemeral: true });

            let songs = trackData.songs.map((song: SongData) => song.url);

            const playlist = await client.distube.createCustomPlaylist(songs, {
                member: interaction.member,
                properties: { name: trackData.name, source: "custom" },
                parallel: true
            });

            client.distube.play(interaction.member.voice.channel, playlist, {
                member: interaction.member,
                textChannel: interaction.channel
            });

            return await interaction.reply({ content: `Playing Track **${trackData.name}**`, ephemeral: true });
        }

        if(interaction.options.getString('song') != null) {

            client.distube.play(interaction.member.voice.channel, interaction.options.getString('song'), {
                member: interaction.member,
                textChannel: interaction.channel
            });

            return await interaction.reply({ content: `Searching for ${interaction.options.getString('song')} . . .`, ephemeral: true });
        }

        return interaction.reply({ content: `You must provide a song to play`, ephemeral: true });
    }
}