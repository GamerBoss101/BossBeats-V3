module.exports = async(Discord, client, message) => {
    require('../../../handlers/inti_handler.ts').post(client)
    client.user.setPresence({ activities: [{ name: 'BTS' }] });
    console.log(`Bot Is Ready - ${client.user.username} \ ${client.user.id}`);
}