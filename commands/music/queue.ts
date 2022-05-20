// @ts-nocheck

const { SlashCommandBuilder } = require('@discordjs/builders');

const { queueStatus, queueButton } = require('../../util/helper.ts');

module.exports = {
    name: 'queue',
    description: 'Displays the music queue',
    data: new SlashCommandBuilder()
    .setName('queue')
    .setDescription('Displays the music queue'),
    async execute(Discord, client, interaction) {

        if(!interaction.member.voice.channel) return client.embeds.noVoice(Discord, interaction);

        const queue = client.distube.getQueue(interaction);
        if(!queue) return interaction.reply({ content: `❌ | There is no music playing!` });

        const currentSong = queue.songs[0];

        let filter = queue.songs.filter(song => song !== currentSong);
        let arrays = filter.map((song, id) => `**${id + 1}**. [${song.name}](${song.url}) - \`${song.formattedDuration}\``);

        let embed = new Discord.MessageEmbed()
        .setAuthor({ name: `📜 Queue` })
        .setThumbnail(currentSong.thumbnail)
        .addField(`🎵 Now Playing`, `[${currentSong.name}](${currentSong.url}) - \`[${currentSong.formattedDuration}]\``)
        .setFooter({ text: `Request by ${interaction.user.tag} • ${queueStatus(queue)}`, iconURL: interaction.user.displayAvatarURL() });

        if (arrays.length === 0) {
            embed.setDescription(`\`No song in queue\``);
            interaction.reply({ embeds: [embed] });
        } else {
            embed.addField("Total Song", `${arrays.length} Songs`);
            embed.addField("Total Duration", `${queue.formattedDuration}`);
            queueButton(interaction, arrays, embed)
        }
    }
}