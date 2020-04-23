const Discord = require('discord.js');
const YouTube = require('youtube-node');
const ytdl = require('ytdl-core');
const fs = require('fs');
const client = new Discord.Client();
const youtube = new YouTube();
const streamOptions = { seek: 0, volume: 1 };
const key = process.env.Discord2;
const syoutube = process.env.YouTube;

client.on('ready', () => {
    console.log('ログインしました。');
});

client.on('message', message => {
    if (message.content == "/join") {
        message.member.voiceChannel.join();
        return;
    }
    if (message.content == "/leave") {
        message.member.voiceChannel.leave();
        return;
    }
    if (message.content == "/start") {
        message.member.voiceChannel.speakable();
    }
    if (message.content.match(/!youtube/)) {
        youtube.setKey(syoutube);
        var vtext = message.content.replace('!youtube ', '');
        let vURL = "https://www.youtube.com/watch?v=" + vtext;
        message.member.voiceChannel.join().then(connection => {
            const stream = ytdl(vURL, { filter: 'audioonly' });
            const dispatcher = connection.playStream(stream, streamOptions);
        })

    }
    if (message.content == "/shutdown") {
        process.exit();
    }

});



client.login(key);