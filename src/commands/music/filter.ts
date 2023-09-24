// @ts-nocheck

import BotClient from "../../types/BotClient";
import BotCommand from "../../types/BotCommand";

export default class FilterCommand extends BotCommand {
    constructor() {
        super("filter", "Filter Command");
        super.data.addStringOption(option => 
            option.setName('name').setDescription('Name of Filter').setRequired(true)
        );
    }

    async execute(Discord: any, client: BotClient, interaction: any) {

        const string = interaction.options.getString('name');

        if(!interaction.member.voice.channel) return client.util.buildEmbed(client.formatter.format("./responses/user/novoice.yaml"));
        
        const queue = client.distube.getQueue(interaction);
        if (!queue) return interaction.reply({ content: `❌ | There is no music playing!` });

        try {

            if (string === 'off' && queue.filters?.length) queue.setFilter(false)
            else if (Object.keys(client.distube.filters).includes(string)) queue.setFilter(string)
            else if (string) return interaction.reply({ content: `❌ | Not a valid filter` });

            interaction.reply({ content: `Current Queue Filter: \`${queue.filters.join(', ') || 'Off'}\`` });
        } catch (e) {
            interaction.reply({ content: `${e}` })
        }

    }
}