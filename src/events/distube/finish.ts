import BotClient from "../../types/BotClient";

export default async(Discord: any, client: BotClient,  queue: any) => {

    let playSong = new Discord.EmbedBuilder()
    .setDescription(`No more song in queue`)

    queue.textChannel.send({ embeds: [playSong] })

}