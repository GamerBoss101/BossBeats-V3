// @ts-nocheck

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    name: 'skip',
    description: "Skips Music",
    data: new SlashCommandBuilder()
    .setName('skip')
    .setDescription('Skips Music'),
    async execute(Discord, client, interaction) {

        interaction.deferReply({ ephemeral: true });

        if(!interaction.member.voice.channel) return client.embeds.noVoice(Discord, interaction);

        const queue = client.distube.getQueue(interaction);
        if (!queue) return interaction.reply({ content: `❌ | There is no music playing!` });

        try {
            const song = await queue.skip()
            interaction.reply({ content: `✅ | Skipped! Now playing:\n${song.name}` })
        } catch (e) {
            interaction.reply({ content: `${e}` })
        }

    }
}