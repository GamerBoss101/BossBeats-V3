
module.exports = async (Discord, client, queue, song) => {

    let addSong = new Discord.EmbedBuilder()
    .setDescription(` Your Song has been added \n[${song.name}](${song.url}) - \`[${song.formattedDuration}]\``)
    .setThumbnail(song.thumbnail)

    await queue.textChannel.send({ embeds: [addSong], ephemeral: true })

}