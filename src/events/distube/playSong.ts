
module.exports = async (Discord, client, queue, song) => {

    let playSong = new Discord.EmbedBuilder()
    .setThumbnail(song.thumbnail)
    .setDescription(`Song Playing \n[${song.name}](${song.url}) - \`[${song.formattedDuration}]\``)
    .setFooter({ text: `Request by ${song.user.tag}`, iconURL: song.user.displayAvatarURL() });

    queue.textChannel.send({ embeds: [playSong] })

}