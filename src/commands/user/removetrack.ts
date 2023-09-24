import BotClient from "../../types/BotClient";
import BotCommand from "../../types/BotCommand";

export default class RemoveTrackCommand extends BotCommand {
    constructor() {
        super("removetrack", "Remove a track from your tracks");
        this.data.addNumberOption(option => option.setName("track").setDescription("Track to Remove").setRequired(true));
    }

    async execute(Discord: any, client: BotClient, interaction: any) {

        let track = interaction.options.getNumber('track') - 1;

        let user = await client.storage.users.get(interaction.user.id);
        if (!user) return interaction.reply({ content: `You have no tracks`, ephemeral: true });

        let tracks = user.tracks;
        if (tracks.length === 0) return interaction.reply({ content: `You have no tracks`, ephemeral: true });

        if (track > tracks.length - 1) return interaction.reply({ content: `That track does not exist`, ephemeral: true });

        let trackData: TrackData = await client.storage.tracks.get(user.tracks[track]);
        if (!trackData) return interaction.reply({ content: `That track does not exist`, ephemeral: true });

        await client.storage.tracks.delete(trackData._id);

        await client.storage.users.delete(interaction.user.id, trackData._id);

        return interaction.reply({ content: `Removed Track **${trackData.name}**`, ephemeral: true });
    }
}