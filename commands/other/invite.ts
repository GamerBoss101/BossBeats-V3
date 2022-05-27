// @ts-nocheck

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: 'invite',
    description: "Invite Bot",
    data: new SlashCommandBuilder()
    .setName('invite')
    .setDescription('Invite Bot'),
    async execute(Discord, client, interaction) {

        const Link = `https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=1644971949559&scope=bot%20applications.commands`;

        const Embed = new Discord.MessageEmbed()
        .setDescription(`Bot Version: ` + "`" + `v${require("../../package.json").version}`+ "`")
        .setAuthor("Bot Invite", client.user.avatarURL({
            dynamic: true
        }))
        .addField("Invite", `[Click Me](${Link})`, true)
        .setFooter(`Requested By ${interaction.user.username}`, interaction.user.avatarURL({ dynamic: true }))
        .setTimestamp();

        return interaction.reply({ embeds: [Embed], ephemeral: true });

    }
}