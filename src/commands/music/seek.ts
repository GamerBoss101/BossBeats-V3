// @ts-nocheck

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    name: 'seek',
    description: "Skips to Time in Song",
    data: new SlashCommandBuilder()
    .setName('seek')
    .setDescription('Skips to Time in Song')    
    .addNumberOption(option => 
        option.setName('time').setDescription('Time in Seconds').setRequired(true)
    ),
    async execute(Discord, client, interaction) {

        const songTime = interaction.options.getNumber('time');

        if(!interaction.member.voice.channel) return client.embeds.noVoice(Discord, interaction);

        const queue = client.distube.getQueue(interaction);
        if (!queue) return interaction.reply({ content: `❌ | There is no music playing!` });

        client.distube.seek(interaction, Number(songTime));

        return interaction.reply({ content: `⏭ | Skipped to ${songTime} seconds` });

    }
}