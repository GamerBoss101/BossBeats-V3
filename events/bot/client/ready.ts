module.exports = async(Discord, client, message) => {
    require('../../../handlers.ts').post(client)
    console.log(`Bot Is Ready - ${client.user.username} \ ${client.user.id}`);
    client.user.setActivity('/help', { type: 'PLAYING' });
}