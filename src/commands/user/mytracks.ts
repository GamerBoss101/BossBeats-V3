import BotClient from "../../types/BotClient";
import BotCommand from "../../types/BotCommand";

export default class MyTracksCommand extends BotCommand {
    constructor() {
        super("mytracks", "View your tracks");
    }

    async execute(Discord: any, client: BotClient, interaction: any) {

        let user = await client.storage.users.get(interaction.user.id);

        if (!user) return interaction.reply({ content: `You have no tracks`, ephemeral: true });

        let tracks = user.tracks;

        if (tracks.length === 0) return interaction.reply({ content: `You have no tracks`, ephemeral: true });

        await interaction.reply({ content: "Getting Tracks !!", ephemeral: true });

        let embed = new Discord.EmbedBuilder()
        .setTitle(`Your Tracks`)
        .setDescription(`Here are your tracks`)
        .setColor(`#FF0000`);

        let fields: any = [];

        for(let i = 0; i < tracks.length; i++) {
            let trackData: TrackData = await client.storage.tracks.get(tracks[i]);
            if(!trackData) continue;

            fields.push({
                name: `${i + 1} - ${trackData.name}`,
                value: `**ID:** \`${trackData._id}\` Songs: **${trackData.songs.length}**`,
                inline: false,
            });
        }

        embed.addFields(fields);

        await client.util.wait(2000);

        await interaction.editReply({ content: null, embeds: [embed], ephemeral: true });
        
    }
}