import ytdl from "ytdl-core";

import BotClient from "../../types/BotClient";
import BotCommand from "../../types/BotCommand";

export default class RemoveSong extends BotCommand {
    constructor() {
        super("removesong", "Remove a song from a track");
        this.data.addNumberOption(option => option.setName("track").setDescription("The track you want to remove your song from.").setRequired(true));
        this.data.addNumberOption(option => option.setName("song").setDescription("The song you want to remove from your track").setRequired(true));
    }

    async execute(Discord: any, client: BotClient, interaction: any) {

        const track = interaction.options.getNumber("track") - 1;
        const song = interaction.options.getNumber("song") - 1;

        let user = await client.storage.users.get(interaction.user.id);
        if (!user) return interaction.reply({ content: `You have no tracks`, ephemeral: true });
        let tracks = user.tracks;
        if (tracks.length === 0) return interaction.reply({ content: `You have no tracks`, ephemeral: true });

        let trackData: TrackData = await client.storage.tracks.get(user.tracks[track]);
        if(!trackData) return interaction.reply({ content: `That track does not exist`, ephemeral: true });

        let songData = await ytdl.getBasicInfo(trackData.songs[song].url);

        await client.storage.tracks.deleteSong(user.tracks[track], {
            title: songData.videoDetails.title,
            url: trackData.songs[song].url,
        });

        await interaction.reply({ content: `Removed **${songData.videoDetails.title}** from **${trackData.name}**`, ephemeral: true });
    }
}