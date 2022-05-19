

module.exports = async(Discord, client, guild) => {
    try {

        await require("../../../handlers.ts").guildPost(client, Discord, guild)

    }  catch (error) {
        console.log(error)
    }
}