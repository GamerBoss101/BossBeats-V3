// @ts-nocheck

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    name: 'play',
    description: "Plays Music",
    data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Play Music')
    .addStringOption(option => 
        option.setName('song').setDescription('name or link of Music').setRequired(true)
    ),
    async execute(Discord, client, interaction) {

        if(!interaction.member.voice.channel) return client.embeds.noVoice(Discord, interaction);

        client.distube.play(interaction.member.voice.channel, interaction.options.getString('song'), {
            member: interaction.member,
            textChannel: interaction.channel
        })

        interaction.reply({ content: `Searching for ${interaction.options.getString('song')} . . .`, ephemeral: true });

    }
}