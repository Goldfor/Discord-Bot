const discord = require("discord.js");

module.exports.run = async (bot, message, args, broadcast, listSong) => {
    message.channel.send("Я ничего не умею!!");
    return listSong;
}

module.exports.help = {
    name: "help"
}