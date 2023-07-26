// @ts-nocheck
const ms = require('ms')
const moment = require('moment');

const { log } = require('../../../util/helper.ts')

module.exports = async(Discord, client, interaction) => {
	if (!interaction.isCommand()) return;
	let command = client.commands.get(interaction.commandName);
	if(!command) return;

	try {
		await command.execute(Discord, client, interaction);
	} catch(error) {

        const embed = new Discord.EmbedBuilder()
        .setDescription(`❌ | There was an Error\n ${error}`)
        interaction.reply({ embeds: [embed] });
		console.log(error);
	}
}