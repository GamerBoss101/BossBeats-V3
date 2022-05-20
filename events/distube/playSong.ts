
module.exports = async (Discord, client, queue, song) => {

    if(client.map.size > 0) {
        let interaction = client.map.get(song.user.id);

        let addSong = new Discord.MessageEmbed()
        .setDescription(` Your Song has been added \n[${song.name}](${song.url}) - \`[${song.formattedDuration}]\``)
        .setThumbnail(song.thumbnail)
    
        await interaction.editReply({ embeds: [addSong], ephemeral: true })
    
        client.map.delete(song.user.id);
    }

    let playSong = new Discord.MessageEmbed()
    .setThumbnail(song.thumbnail)
    .setDescription(`Song Playing \n[${song.name}](${song.url}) - \`[${song.formattedDuration}]\``)
    .setFooter({ text: `Request by ${song.user.tag}`, iconURL: song.user.displayAvatarURL() });

    queue.textChannel.send({ embeds: [playSong] })

}