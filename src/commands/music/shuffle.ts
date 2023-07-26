// @ts-nocheck

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    name: 'shuffle',
    description: "Shuffles the Queue",
    data: new SlashCommandBuilder()
    .setName('shuffle')
    .setDescription('Shuffles the Queue'),
    async execute(Discord, client, interaction) {

        if(!interaction.member.voice.channel) return client.embeds.noVoice(Discord, interaction);

        const queue = client.distube.getQueue(interaction);
        if (!queue) return interaction.reply({ content: `❌ | There is no music playing!` });

        client.distube.shuffle(interaction);

        return interaction.reply({ content: `🔀 | Shuffled the Queue` });

    }
}