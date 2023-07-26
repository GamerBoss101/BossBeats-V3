// @ts-nocheck

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    name: 'stop',
    description: "Stops Music",
    data: new SlashCommandBuilder()
    .setName('stop')
    .setDescription('Stops Music'),
    async execute(Discord, client, interaction) {

        if(!interaction.member.voice.channel) return client.embeds.noVoice(Discord, interaction);

        const queue = client.distube.getQueue(interaction);
        if(!queue) return interaction.reply({ content: `❌ | There is no music playing!` });

        const embed = new Discord.EmbedBuilder()
        .setDescription(` Successfully **Stopped** the music.`)
        .setFooter({ text: `Request by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });

        client.distube.stop(interaction);

        interaction.reply({ embeds: [embed] });

    }
}