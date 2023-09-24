import BotClient from "../../types/BotClient";

export default (Discord: any, client: BotClient) => {
    client.user?.setPresence({ activities: [{ name: 'Poor Man\'s Posion' }] });

    client.logger.log(`Logged in as ${client.user?.tag}!`);
}