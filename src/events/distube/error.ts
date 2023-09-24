import BotClient from "../../types/BotClient";

export default async(Discord: any, client: BotClient,  channel: any, error: any) => {

    const embed = new Discord.EmbedBuilder()
    .setDescription(`❌ | There was an Error\n ${error}`)
    channel.send({ embeds: [embed] })

}