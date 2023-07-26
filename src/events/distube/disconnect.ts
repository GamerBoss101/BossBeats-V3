

module.exports = async (Discord, client, queue) => {

    const embed = new Discord.EmbedBuilder()
    .setDescription(`✅ | **Leave** the voice channel.\nThank you for using ${client.user.username}!`)
    .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() });
    queue.textChannel.send({ embeds: [embed] });

}