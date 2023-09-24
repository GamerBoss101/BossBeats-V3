import { post } from "../../handlers/command_handler";
import BotClient from "../../types/BotClient";

export default (Discord: any, client: BotClient) => {
    client.user?.setPresence({ activities: [{ name: 'Poor Man\'s Posion' }] });

    post(client);

    client.logger.log(`Logged in as ${client.user?.tag}!`);
}