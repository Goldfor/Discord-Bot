const discord = require("discord.js");
const BOT = require("../BotFunc.js");


module.exports.run = async (bot, message, args, broadcast, listSong, vol) => {
    message.channel.send("ОКе");
    if(listSong.playNow > 1){
        BOT.PlayMusic(`C:/Users/Almaz/Desktop/Superbot/music/1.mp3`, bot, broadcast, vol);
        console.log('next');
        }
    else{
        listSong.playNow = 0;
        broadcast.pause();
        for (const con of bot.voiceConnections.values()) {
            con.disconnect();
        }
        console.log('end');
    }
    return listSong;
}

module.exports.help = {
    name: "next"
}