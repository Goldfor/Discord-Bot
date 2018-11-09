const discord = require("discord.js");

module.exports.run = async (bot, message, args, broadcast, listSong) => {
	broadcast.end();
	console.log(message.author.id);
	message.channel.send(` ${message.author}  Я поняла, я вам не нужна`)
	listSong.playNow = 0;
	listSong.list = [];
    message.member.voiceChannel.leave();
    bot.setTimeout(dlt, 3600000, message);
    return listSong;
}

module.exports.help = {
    name: "stop"
}

function dlt(mes){
    mes.delete()
        .then(msg => console.log(`Deleted message from ${msg.author.username}`))
        .catch(console.error);


}