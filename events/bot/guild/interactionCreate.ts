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
		log(`[${moment().format('L')}] BossBot: ${command.name} / ${interaction.user.tag}`)

	} catch(error) {
		console.log(error)
	}
}