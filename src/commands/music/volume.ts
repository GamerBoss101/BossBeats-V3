// @ts-nocheck

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    name: 'volume',
    description: "Sets Music Volume",
    data: new SlashCommandBuilder()
    .setName('volume')
    .setDescription('Sets Music Volume')    
    .addNumberOption(option => 
        option.setName('number').setDescription('Volume Level').setRequired(true)
    ),
    async execute(Discord, client, interaction) {

        const integer = interaction.options.getNumber('number');

        if(!interaction.member.voice.channel) return client.embeds.noVoice(Discord, interaction);

        const queue = client.distube.getQueue(interaction);
        if (!queue) return interaction.reply({ content: `❌ | There is no music playing!` });

        try {
            queue.setVolume(integer)
            interaction.reply({ content: `❌ | Volume set to \`${integer.toString()}\`` });
        } catch (e) {
            interaction.reply({ content: `${e}` })
        }

    }
}