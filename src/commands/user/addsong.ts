import ytdl from "ytdl-core";

import BotClient from "../../types/BotClient";
import BotCommand from "../../types/BotCommand";

export default class AddSongCommand extends BotCommand {
    constructor() {
        super("addsong", "Add a song to a track");
        this.data.addNumberOption(option => option.setName("track").setDescription("The track to add the song to").setRequired(true));
        this.data.addStringOption(option => option.setName("song").setDescription("The song to add to the track").setRequired(true));
    }

    async execute(Discord: any, client: BotClient, interaction: any) {

        const track = interaction.options.getNumber("track") - 1;
        const song = interaction.options.getString("song");

        let user = await client.storage.users.get(interaction.user.id);
        if (!user) return interaction.reply({ content: `You have no tracks`, ephemeral: true });
        let tracks = user.tracks;
        if (tracks.length === 0) return interaction.reply({ content: `You have no tracks`, ephemeral: true });

        let trackData: TrackData = await client.storage.tracks.get(user.tracks[track]);
        if(!trackData) return interaction.reply({ content: `That track does not exist`, ephemeral: true });

        let songData = await ytdl.getBasicInfo(song);
        if(!songData) return interaction.reply({ content: `That song does not exist`, ephemeral: true });

        await client.storage.tracks.update(user.tracks[track], {
            title: songData.videoDetails.title,
            url: song,
        });

        await interaction.reply({ content: `Added **${songData.videoDetails.title}** to **${trackData.name}**`, ephemeral: true });  
    }
}