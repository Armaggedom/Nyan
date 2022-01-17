/*
* Dev: bombbom
* Arq V: 4.0
*/
//packs
const aws = require('aws-sdk');
global.Discord=require("discord.js")
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
		global.security=require("./security.js")
	} catch(error) {
		return console.log('fatal error: '+error)
		client.destroy()
	}
	//command
	client.on("ready", ()=>{
		client.user.setActivity('use $help | BOT [OFFLINE]', { type: 'WATCHING' });
	  //client.user.setStatus(dnd) // Can be 'available', 'idle', 'dnd', or 'invisible'
	})
	client.on("message", async(message)=>{
			//const's
			const args=message.content.slice().trim().split(/ +/g);
			const command=args.shift().toLowerCase();
			//security system
			security(command, message)	
	})
	client.login(process.env.APP_TOKEN)
}