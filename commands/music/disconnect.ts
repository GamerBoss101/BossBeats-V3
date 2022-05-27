// @ts-nocheck

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: 'disconnect',
    description: "disconnect from vc",
    data: new SlashCommandBuilder()
    .setName('disconnect')
    .setDescription("disconnect from vc"),
    async execute(Discord, client, interaction) {

        if(!interaction.member.voice.channel) return client.embeds.noVoice(Discord, interaction);

        const queue = client.distube.getQueue(interaction);

        if(queue) {
            message.client.distube.stop(interaction);
            message.client.distube.voices.leave(interaction.guild);
        } else {
            message.client.distube.voices.leave(interaction.guild);
        }
        
        const embed = new Discord.MessageEmbed()
        .setDescription(`Successfully **Disconnected** from the voice channel.`)
        .setFooter({ text: `Request by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });

        interaction.reply({ embeds: [embed] });

    }
}