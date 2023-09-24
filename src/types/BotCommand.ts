import { SlashCommandBuilder } from "discord.js";
import BotClient from "./BotClient";

export default class BotCommand {
    name: string
    enabled: boolean
    data: SlashCommandBuilder
    constructor(name: string, description: string, enabled: boolean = true) {
        this.name = name;
        this.enabled = enabled;
        this.data = new SlashCommandBuilder();
        this.data.setName(name);
        this.data.setDescription(description);
    }

    getName(): string {
        return this.name;
    }

    isEnabled(): boolean {
        return this.enabled;
    }

    setEnabled(enabled: boolean): void {
        this.enabled = enabled;
    }

    async execute(Discord: any, client: BotClient, interaction: any): Promise<any> {
        await interaction.reply({ content: "This Command is not Implemented Yet!", ephemeral: true })
    }

}