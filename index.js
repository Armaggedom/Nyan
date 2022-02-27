/*
* Dev: bombbom
* Arq V: 4.1.1
*/
//packs
const aws = require('aws-sdk');
global.Discord=require("discord.js")
//var 
var update=false;
//client const
global.client=new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTIONS']})
//database
try {
	require('dotenv/config')
} catch (error) {
	console.log("Developer mode disabled")
} finally {
	//arqv request
	console.log(`requesting mandatory files`)
	try {
		console.log(`requesting security.js`)
		global.security=require("./security.js")
	} catch(error) {
		return console.log('fatal error: '+error)
		client.destroy()
	}
	//command
	client.on("ready", ()=>{
		console.log('bot [ONLINE]')
	  //client.user.setStatus(dnd) // Can be 'available', 'idle', 'dnd', or 'invisible'
	})
	client.on("message", async(message, user)=>{
			//const's
			const args=message.content.slice().trim().split(/ +/g);
			const command=args.shift().toLowerCase();
			//security system
			if(command==='@updateon') {
				update=true
				client.user.setActivity('BOT [OFFLINE]', { type: 'WATCHING' });
				message.send('bot em update')
			}
			if(command==='@updateoff') {
				update=false
				message.send('bot operando')
				
			}
			if(update===true) {
				return
			} else {
				client.user.setActivity('BOT [ONLINE]', { type: 'WATCHING' });
				security(command, message, user)	
			}
	})
	client.login(process.env.APP_TOKEN)
}