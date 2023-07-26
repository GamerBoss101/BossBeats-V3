// @ts-nocheck

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    name: 'previous',
    description: "Plays Previous Song",
    data: new SlashCommandBuilder()
    .setName('previous')
    .setDescription('Plays Previous Song'),
    async execute(Discord, client, interaction) {

        interaction.deferReply({ ephemeral: true });

        if(!interaction.member.voice.channel) return client.embeds.noVoice(Discord, interaction);

        const queue = client.distube.getQueue(interaction);
        if (!queue) return interaction.reply({ content: `❌ | There is no music playing!` });

        try {
            const song = queue.previous()
            interaction.reply({ content: `✅ | Now playing:\n${song.name}` })
        } catch (e) {
            interaction.reply({ content: `${e}` })
        }

    }
}