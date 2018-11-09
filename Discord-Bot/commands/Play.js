const discord = require("discord.js");
const ytdl = require("ytdl-core");
const BOT = require("../BotFunc.js");

module.exports.run = function(bot, message, args, broadcast, listSong, vol){
	if((message.member.voiceChannel) && (args[0] !== '')){
    var connection1;
    console.log('args');
    if(!message.guild.voiceConnection){
      connection1 = message.member.voiceChannel.join()
      console.log(connection1);
    }
    console.log('args');
    message.channel.send(` ${message.author}  так точно мой Господин`);
    bot.setTimeout(dlt, 3600000, message);
    
    if(listSong.playNow == 0){
      listSong.playNow = 0;
      BOT.PlayMusic(args[0], bot, broadcast, vol);
    }
    else{
      listSong.list.push(args[0]);
      console.log(args[0]);
    }
    listSong.playNow = listSong.playNow + 1;
    console.log('PlayNow');
    console.log(listSong);
    return listSong;
  }
  else{
    return {playNow: 0, list: []};
  }
}

module.exports.help = {
    name: "play"
}

function dlt(mes){
    mes.delete()
        .then(msg => console.log(`Deleted message from ${msg.author.username}`))
        .catch(console.error);


}