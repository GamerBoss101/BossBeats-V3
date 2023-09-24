import BotClient from "../../types/BotClient";

export default async(Discord: any, client: BotClient, queue: any, song: any) => {

    let addSong = new Discord.EmbedBuilder()
    .setDescription(` Your Song has been added \n[${song.name}](${song.url}) - \`[${song.formattedDuration}]\``)
    .setThumbnail(song.thumbnail)

    await queue.textChannel.send({ embeds: [addSong] })

}