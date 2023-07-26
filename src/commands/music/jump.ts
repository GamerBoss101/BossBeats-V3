// @ts-nocheck

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    name: 'jump',
    description: "Jumps to Song in Queue",
    data: new SlashCommandBuilder()
    .setName('jump')
    .setDescription('Jumps to Song in Queue')    
    .addNumberOption(option => 
        option.setName('number').setDescription('Song Number').setRequired(true)
    ),
    async execute(Discord, client, interaction) {

        const songNumber = interaction.options.getNumber('number');

        if(!interaction.member.voice.channel) return client.embeds.noVoice(Discord, interaction);

        const queue = client.distube.getQueue(interaction);
        if (!queue) return interaction.reply({ content: `❌ | There is no music playing!` });

        client.distube.jump(interaction, parseInt(songNumber)).catch(err => interaction.reply({ content: `❌ | ${err}` }));

        return interaction.reply({ content: `⏭ | Jumped to song number ${songNumber}` });

    }
}