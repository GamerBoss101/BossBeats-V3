

module.exports = class embeds {
    noVoice(Discord, interaction) {
        let embed = new Discord.EmbedBuilder()
        .setDescription(`❌ | You are not connected to a Voice Channel`)
        interaction.reply({ embeds: [embed], ephemeral: true })
    }
}