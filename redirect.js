const Discord = require('discord.js');
const { token, lchannel, schannel } = require("./config.json");
const  client = new Discord.Client();

const user_token = token; 
const listening_channel_1 = lchannel;
const sending_channel_1 = schannel;


client.on('ready', ()=> {
    console.log('This bot is online, redirecting traffic');
    client.user.setStatus('dnd')

    /*client.user.setPresence({
        game: {
            name: 'Visual Studio Code',
            type: "PLAYING"
        }
    });*/
})

client.on('message', message=> {

    try {

        if (message.channel.id === listening_channel_1 && message.embeds[0] !== undefined) {

            //if (message.author.bot) return;
            //if(message.author.id === client.user.id) return;

            if (message.content !== '') {
                client.channels.get(sending_channel_1).send(message.content); 
            }

            var embed_message = message.embeds[0];
            client.channels.get(sending_channel_1).send({ embed: embed_message }); 

        } else if (message.channel.id === listening_channel_1 && message.embeds[0] === undefined) {

            client.channels.get(sending_channel_1).send(message.content); 
            
        } else {}
           
    } catch (error) {

        console.log(error)
    }

});

client.login(user_token);