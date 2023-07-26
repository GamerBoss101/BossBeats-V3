// @ts-nocheck

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    name: 'pause',
    description: "Pause Music",
    data: new SlashCommandBuilder()
    .setName('pause')
    .setDescription('Pause Music'),
    async execute(Discord, client, interaction) {

        if(!interaction.member.voice.channel) return client.embeds.noVoice(Discord, interaction);

        const queue = client.distube.getQueue(interaction);
        if(!queue) return interaction.reply({ content: `❌ | There is no music playing!` });

        if(queue.paused) return interaction.reply( { content: `❌ | The queue has been paused.` });

        const embed = new Discord.EmbedBuilder()
        .setDescription(`⏸ | Successfully **Paused** a song.`)
        .setFooter({ text: `Request by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });

        client.distube.pause(interaction);

        interaction.reply({ embeds: [embed] });

    }
}