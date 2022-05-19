// @ts-nocheck
const moment = require('moment');

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: 'play',
    description: "Plays Music",
    data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Play Music')
    .addStringOption(option => 
        option.setName('input').setDescription('name or link of Music').setRequired(true)
    ),
    async execute(Discord, client, interaction) {

        if(!interaction.member.voice.channel) return console.log('No Voice')

        client.distube.play(interaction.member.voice.channel, interaction.options.getString('input'), {
            member: interaction.member,
            textChannel: interaction.channel
        })
    }
}