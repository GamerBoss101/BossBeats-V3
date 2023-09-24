import BotClient from "../../types/BotClient";
import BotCommand from "../../types/BotCommand";

export default class CreateTrackCommand extends BotCommand {
    constructor() {
        super("createtrack", "Creates a track for you to add songs to");
        this.data.addStringOption(option =>
            option.setName('name')
                .setDescription('The name of the track you want to create')
                .setRequired(true)
        );
        this.data.addStringOption(option =>
            option.setName('type')
                .setDescription('The type of track you want to create')
                .setRequired(true)
                .addChoices(
                    { name: 'Empty', value: 'opt_empty' },
                    { name: 'Use Queue', value: 'opt_queue' },
                )
        );
    }

    async execute(Discord: any, client: BotClient, interaction: any) {

        const name = interaction.options.getString('name');
        const type = interaction.options.getString('type');

        if (type === 'opt_empty') {
            const track = await client.storage.tracks.create(name);

            await client.storage.users.update(interaction.user.id, track._id);

            return interaction.reply({ content: `You have created a Track - **${track.name}**`, ephemeral: true });
        }
        
        if (type === 'opt_queue') {

            const queue = client.distube.getQueue(interaction);

            if (!queue) return interaction.reply({ content: `You must be in a voice channel to use this command`, ephemeral: true });

            const track = await client.storage.tracks.create(name);

            await client.storage.users.update(interaction.user.id, track._id);

            queue.songs.forEach(async song => {
                await client.storage.tracks.update(track._id, {
                    title: song.name || 'Unknown',
                    url: song.url || 'Unknown',
                });
            });

            return interaction.reply({ content: `You have created a Track - **${track.name}** with **${queue.songs.length}** Songs.`, ephemeral: true });
        }
        

    }
}