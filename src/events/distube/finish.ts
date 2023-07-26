
module.exports = async (Discord, client, queue) => {

    let playSong = new Discord.EmbedBuilder()
    .setDescription(`No more song in queue`)

    queue.textChannel.send({ embeds: [playSong] })
}