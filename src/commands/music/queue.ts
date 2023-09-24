import BotClient from "../../types/BotClient";
import BotCommand from "../../types/BotCommand";

export default class QueueCommand extends BotCommand {
    constructor() {
        super("queue", "Queue Command");
    }

    queueStatus = (queue: any) => {
        let volume = queue.volume;
        let filter = queue.filter || "Off";
        let loop = queue.repeatMode ? queue.repeatMode === 2 ? "All Queue" : "This Song" : "Off";
        let autoplay = queue.autoplay ? "On" : "Off";
    
        let status;
        let footer
    
        if (filter !== "Off" && loop === "Off" && autoplay === "Off") {
            status = `Filter: ${filter}`;
        }
        else if (filter !== "Off" && loop !== "Off" && autoplay === "Off") {
            status = `Filter: ${filter} | Loop: ${loop}`;
        }
        else if (filter !== "Off" && loop !== "Off" && autoplay !== "Off") {
            status = `Filter: ${filter} | Loop: ${loop} | Autoplay: ${autoplay}`;
        }
        else if (filter === "Off" && loop !== "Off" && autoplay !== "Off") {
            status = `Loop: ${loop} | Autoplay: ${autoplay}`;
        }
        else if (filter === "Off" && loop === "Off" && autoplay !== "Off") {
            status = `Autoplay: ${autoplay}`;
        }
        else if (filter === "Off" && loop === "Off" && autoplay === "Off") {
            status = null;
        }
    
        if (!status) {
            footer = `Volume: ${volume}%`;
        } else {
            footer = `Volume: ${volume}% | ${status}`;
        }
    
        return footer;
    }

    async queueButton(interaction: any, arrays: Array<any>, embed: any, timeout = 120000) {

        const array = arrays;
    
        const generateEmbed = async (start: number) => {
            const current = array.slice(start, start + 10);
    
            embed.setDescription(`${current.join("\n")}`);
            return embed;
        };
    
        const embeds = await generateEmbed(0);
    
        await interaction.reply({
            embeds: [embeds]
        });
    }

    async execute(Discord: any, client: BotClient, interaction: any) {

        if(!interaction.member.voice.channel) return client.util.buildEmbed(client.formatter.format("./responses/user/novoice.yaml"));
        
        const queue = client.distube.getQueue(interaction);
        if(!queue) return interaction.reply({ content: `❌ | There is no music playing!` });

        const currentSong = queue.songs[0];

        let filter = queue.songs.filter(song => song !== currentSong);
        let arrays = filter.map((song, id) => `**${id + 1}**. [${song.name}](${song.url}) - \`${song.formattedDuration}\``);

        let embed = new Discord.EmbedBuilder()
        .setAuthor({ name: `📜 Queue` })
        .setThumbnail(currentSong.thumbnail)
        .addFields({ name: `🎵 Now Playing`, value: `[${currentSong.name}](${currentSong.url}) - \`[${currentSong.formattedDuration}]\`` })
        .setFooter({ text: `Request by ${interaction.user.tag} • ${this.queueStatus(queue)}`, iconURL: interaction.user.displayAvatarURL() });

        if (arrays.length === 0) {
            embed.setDescription(`\`No song in queue\``);
            interaction.reply({ embeds: [embed] });
        } else {
            embed.addFields({ name:"Total Song", value: `${arrays.length} Songs`});
            embed.addFields({ name: "Total Duration", value: `${queue.formattedDuration}`});
            this.queueButton(interaction, arrays, embed)
        }
    }
}