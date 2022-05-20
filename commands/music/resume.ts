// @ts-nocheck

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: 'resume',
    description: "Resumes Music",
    data: new SlashCommandBuilder()
    .setName('resume')
    .setDescription('Resumes Music'),
    async execute(Discord, client, interaction) {

        if(!interaction.member.voice.channel) return client.embeds.noVoice(Discord, interaction);

        const queue = client.distube.getQueue(interaction);
        if(!queue) return interaction.reply({ content: `❌ | There is no music playing!` });

        if(!queue.paused) return interaction.reply( { content: `❌ | The queue is being played.` });

        const embed = new Discord.MessageEmbed()
        .setDescription(`▶ | Successfully **Resumed** a song.`)
        .setFooter({ text: `Request by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });

        client.distube.resume(interaction);

        interaction.reply({ embeds: [embed] });

    }
}