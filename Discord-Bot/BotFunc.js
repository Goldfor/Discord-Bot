module.exports.PlayMusic = function(IN, bot, broadcast, vol){
    if(IN[0] === 'h') {
        var ter = IN;
        if(IN[(IN.length - 4)] !== '.'){
            ter = ytdl(IN, { filter : 'audio' });
        }
        broadcast.playStream(ter, {
            volume: vol,
            passes: 5
        });
    }
    else{
        broadcast.playFile(`C:/Users/Almaz/Desktop/Superbot/music/${IN}.mp3`, {
            volume: vol,
            passes: 5
        });
    }
    for (const con of bot.voiceConnections.values()) {
            console.log(con);
            con.playBroadcast(broadcast);
        }
    //console.log(broadcast);
}