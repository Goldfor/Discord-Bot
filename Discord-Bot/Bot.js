const Discord = require("discord.js");
const config = require("./config.json"); 
const BOT = require("./BotFunc.js");
var ListSong = {playNow: 0, list: []};

token = "7ef43046e06c4919ddbb01bf84e66d38248dc56480fc83d4485049e73cd5df3878cf84964020312b76224";

const bot = new Discord.Client({disableEveryone: true});
const fs = require("fs");

const ytdl = require('ytdl-core');
const broadcast = bot.createVoiceBroadcast();


const gtr = new Date().getTime();

console.log(gtr);
const messageArray1 = [new Discord.Message()];

bot.commands = new Discord.Collection();

var volume = 0.05;

// Requires all dependencies
fs.readdir("./commands/", (err, files) => {
    if (err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("No commands were found...")
        return;
    }
    

    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`)
        console.log(`${f} loaded!`)
        bot.commands.set(props.help.name, props);
    })
})

bot.on("ready", async () => {
    console.log(`${bot.user.username} online!`)
    bot.user.setActivity("Жду указания !!", {type: "WATCHING"});
    bot.setTimeout(messageDeLoger, 100);
});



bot.on("message", async message => {
    if(message.channel.type === "dm") return;
    
    if(message.channel.name !== "for-bots"){
        if(message.author.id === "270198738570444801"){
            return message.delete()
                    .then(msg => console.log(`Deleted message from ${msg.author.username}`))
                    .catch(console.error);
        }
        if(message.content[0]==="!"){
            rer = message
            message.delete()
                .then(msg => console.log(`Deleted message from ${msg.author.username}`))
                .catch(console.error);
            rer.channel.send(` ${rer.author}  маленький пидор`);
            return;
        }
    }
    else{
        bot.setTimeout(dlt, 3600000, message);
    }


    let prefix = config.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile){ 
        ListSong = commandfile.run(bot, message, args, broadcast, ListSong, volume);
        console.log('lox');
        //console.log(ListSong.playNow);
    }

});

broadcast.once('end', () =>{
    console.log(ListSong);
    if(ListSong.playNow > 1){
            let in1 = ListSong.list.shift();
            ListSong.playNow = ListSong.playNow - 1;
            console.log(in1);
            console.log(ListSong);
            BOT.PlayMusic(in1, bot, broadcast, volume);
            console.log('next');
        }
    else{
            ListSong.playNow = 0;
            broadcast.pause();
            for (const con of bot.voiceConnections.values()) {
                con.disconnect();
            }
            console.log('end');
        }
});

function messageLoger(args){
    messageArray1.push(args);
    console.log(messageArray1);
}

function messageDeLoger(){
    //connection.disconnect();

    bot.setTimeout(messageDeLoger, 100);

}

function delet(mes){
    console.log(mes);
    mes.delete()
        .then(msg => console.log(`Deleted message from ${msg.author.username}`))
        .catch(console.error);
}

function dlt(mes){
    mes.delete()
        .then(msg => console.log(`Deleted message from ${msg.author.username}`))
        .catch(console.error);


}

bot.login(config.token);