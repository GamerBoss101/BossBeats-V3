
module.exports = async (Discord, client, queue, song) => {

    let interaction = client.map.get(song.user.id);

    let addSong = new Discord.MessageEmbed()
    .setDescription(` Your Song has been added \n[${song.name}](${song.url}) - \`[${song.formattedDuration}]\``)
    .setThumbnail(song.thumbnail)

    await interaction.editReply({ embeds: [addSong], ephemeral: true })

    client.map.delete(song.user.id);

}