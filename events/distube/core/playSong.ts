
module.exports = async(Discord, client, queue, song) => {

    
    const status = queue => {
        return `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.join(', ') || 'Off'}\` | Loop: \`${
            queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off'
        }\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``;
    }


    queue.textChannel.send(
        `${client.emotes.play} | Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${
          song.user
        }\n${status(queue)}`
    )

}