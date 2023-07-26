

module.exports = async(Discord, client, guild) => {
    try {

        await require("../../../handlers/inti_handler").guildPost(client, Discord, guild)

    }  catch (error) {
        console.log(error)
    }
}