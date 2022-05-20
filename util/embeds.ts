

module.exports = class embeds {
    noVoice(Discord, interaction) {
        let embed = new Discord.MessageEmbed()
        .setDescription(`❌ | You are not connected to a Voice Channel`)
        interaction.reply({ embeds: [embed], ephemeral: true })
    }
}