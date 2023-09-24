import BotClient from "../../types/BotClient";
import BotCommand from "../../types/BotCommand";

export default class NowPlayingCommand extends BotCommand {
    constructor() {
        super("nowplaying", "Now Playing Command");
    }

    progressbar(total: number, current: number, size: number, line: string, slider: any) {
        if (current > total) {
            const bar = line.repeat(size + 2);
            return bar;
        } else {
            const percentage = current / total;
            const progress = Math.round((size * percentage));
            const emptyProgress = size - progress;
            const progressText = line.repeat(progress).replace(/.$/, slider);
            const emptyProgressText = line.repeat(emptyProgress);
            const bar = progressText + emptyProgressText;
            return bar;
        }
    }

    convertTime(duration: number) {
        // @ts-ignore
        let seconds: any = parseInt((duration / 1000) % 60);
        // @ts-ignore
        let minutes: any = parseInt((duration / (1000 * 60)) % 60);
        // @ts-ignore
        let hours: any = parseInt((duration / (1000 * 60 * 60)) % 24);
    
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
    
        if (duration < 3600000) {
            return minutes + ":" + seconds ;
        } else {
            return hours + ":" + minutes + ":" + seconds ;
        }
    }
    
    async execute(Discord: any, client: BotClient, interaction: any) {

        if(!interaction.member.voice.channel) return interaction.reply({ embeds: [client.util.buildEmbed(client.formatter.format("./responses/user/novoice.yaml"))] });
        
        const queue = client.distube.getQueue(interaction);
        if (!queue) return interaction.reply({ content: `❌ | There is no music playing!` });

        const currentSong = queue.songs[0];

        // Progress Bar
        var total = currentSong.duration * 1000;
        var current = queue.currentTime * 1000;
        var size = 30;
        var line = '─';
        var slider = "|";    


        let embed = new Discord.EmbedBuilder()
        .setTitle(`🎵 Now Playing`)
        .setThumbnail(currentSong.thumbnail)
        .setDescription(`[${currentSong.name}](${currentSong.url}) - \`[${currentSong.formattedDuration}]\`` + "\n\n" + `\`${this.convertTime(current)} / ${this.convertTime(total)}\``)
        .addFields({ name:"\u200b", value: this.progressbar(total, current, size, line, slider)})
        .setFooter({ text: `Request by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });
        interaction.reply({ embeds: [embed] });

    }
}
