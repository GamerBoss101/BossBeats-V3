// @ts-nocheck

const { SlashCommandBuilder } = require('@discordjs/builders');

const { progressbar, convertTime } = require('../../util/helper.ts')

module.exports = {
    name: 'nowplaying',
    description: "Gets the current song playing",
    data: new SlashCommandBuilder()
    .setName('nowplaying')
    .setDescription('Gets the current song playing'),
    async execute(Discord, client, interaction) {

        const queue = client.distube.getQueue(interaction);
        if (!queue) return interaction.reply({ content: `❌ | There is no music playing!` });

        const currentSong = queue.songs[0];

        // Progress Bar
        var total = currentSong.duration * 1000;
        var current = queue.currentTime * 1000;
        var size = 30;
        var line = '─';
        var slider = "|";    


        let embed = new Discord.MessageEmbed()
        .setTitle(`🎵 Now Playing`)
        .setThumbnail(currentSong.thumbnail)
        .setDescription(`[${currentSong.name}](${currentSong.url}) - \`[${currentSong.formattedDuration}]\`` + "\n\n" + `\`${convertTime(current)} / ${convertTime(total)}\``)
        .addField("\u200b", progressbar(total, current, size, line, slider))
        .setFooter({ text: `Request by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });
        interaction.reply({ embeds: [embed] });

    }
}