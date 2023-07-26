// @ts-nocheck

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    name: 'filter',
    description: "Music Filter",
    data: new SlashCommandBuilder()
    .setName('filter')
    .setDescription('Music Filter')    
    .addStringOption(option => 
        option.setName('name').setDescription('Name of Filter').setRequired(true)
    ),
    async execute(Discord, client, interaction) {

        const string = interaction.options.getString('name');

        if(!interaction.member.voice.channel) return client.embeds.noVoice(Discord, interaction);

        const queue = client.distube.getQueue(interaction);
        if (!queue) return interaction.reply({ content: `❌ | There is no music playing!` });

        try {

            if (string === 'off' && queue.filters?.length) queue.setFilter(false)
            else if (Object.keys(client.distube.filters).includes(string)) queue.setFilter(string)
            else if (string) return interaction.reply({ content: `❌ | Not a valid filter` });

            interaction.reply({ content: `Current Queue Filter: \`${queue.filters.join(', ') || 'Off'}\`` });
        } catch (e) {
            interaction.reply({ content: `${e}` })
        }

    }
}