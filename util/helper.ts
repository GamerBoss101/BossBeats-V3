// @ts-nocheck
const fs = require('fs');
const moment = require('moment');
const { MessageActionRow, MessageButton } = require("discord.js");

exports.log = (content) => {
    fs.writeFile(`./logs/log-[${moment().format("MMM Do YY")}].txt`, `[${moment().format('lll')}] ` + content + "\n", { flag: 'a+' }, err => { if(err) console.log(err) });
    console.log(`[${moment().format('lll')}] ` + content);
}

exports.progressbar = (total, current, size, line, slider) => {
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

exports.convertTime =  (duration) => {
    let seconds = parseInt((duration / 1000) % 60);
    let minutes = parseInt((duration / (1000 * 60)) % 60);
    let hours = parseInt((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    if (duration < 3600000) {
        return minutes + ":" + seconds ;
    } else {
        return hours + ":" + minutes + ":" + seconds ;
    }
}

exports.convertNumber = (number, decPlaces) => {
    decPlaces = Math.pow(10,decPlaces);

    let abbrev = [ "K", "M", "B", "T" ];

    for (let i=abbrev.length-1; i>=0; i--) {
        const size = Math.pow(10,(i+1)*3);

        if(size <= number) {
            number = Math.round(number*decPlaces/size)/decPlaces;
            if((number == 1000) && (i < abbrev.length - 1)) {
                number = 1;
                i++;
            }
            number += abbrev[i];
            break;
        }
    }

    return number;
}

exports.queueStatus = (queue) => {
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

exports.queueButton = async(interaction, arrays, embed, timeout = 120000) => {

    const array = arrays;

    const generateEmbed = async (start) => {
        const current = array.slice(start, start + 10);

        embed.setDescription(`${current.join("\n")}`);
        return embed;
    };

    const embeds = await generateEmbed(0);

    await interaction.reply({
        embeds: [embeds]
    });

}


exports.reaction = async(interaction, arrays, embed, footer, timeout = 60000) => {
    const array = arrays;

    const generateEmbed = start => {
        const current = array.slice(start, start + 10);

        embed.setDescription(current.join('\n') + `\n\nShowing ${footer} ${start + 1}-${start + current.length} out of ${array.length}`);
        return embed;
    }

    interaction.channel.send({ embeds: [generateEmbed(0)] }).then(async msg => {
        if (array.length <= 10) return;

        await msg.react('➡️');

        const filter = (reaction, user) => ['⬅️', '➡️'].includes(reaction.emoji.name) && user.id == interaction.user.id;
        const collector = msg.createReactionCollector({ filter, time: timeout });

        let currentIndex = 0;
        collector.on('collect', async reaction => {
            await msg.reactions.removeAll();

            reaction.emoji.name === '⬅️' ? currentIndex -= 10 : currentIndex += 10

            await msg.edit({ embeds: [ generateEmbed(currentIndex) ] });

            if (currentIndex !== 0) await msg.react('⬅️');

            if (currentIndex + 10 < array.length) await msg.react('➡️');
        });
        collector.on("end", async collected => {
            await msg.reactions.removeAll();
        });
    })
}