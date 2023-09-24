import BotClient from "../../types/BotClient";

export default async(Discord: any, client: BotClient, queue: any) => {

    const embed = new Discord.EmbedBuilder()
    .setDescription(`✅ | **Leave** the voice channel.\nThank you for using ${client?.user?.username}!`)
    .setFooter({ text: client?.user?.username, iconURL: client?.user?.displayAvatarURL() });
    queue.textChannel.send({ embeds: [embed] });

}