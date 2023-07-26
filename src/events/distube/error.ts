

module.exports = async (Discord, client, channel, e) => {

    const embed = new Discord.EmbedBuilder()
    .setDescription(`❌ | There was an Error\n ${e}`)
    channel.send({ embeds: [embed] })
}