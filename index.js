/*
* Dev: bombbom
* Arq V: 3.0.4 OBS: VERSIONS < 3.0.3 NO LONGER SUPPORTED
* Freezed: march to system.js
*/

//packs
const aws = require('aws-sdk');
global.Discord=require("discord.js")
//client const
global.client=new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTIONS']})
//database
global.database=require("quick.db")
try {
	require('dotenv/config')
} catch (error) {
	console.log("Developer mode disabled")
} finally {
	//arqv request
	console.log(`requesting mandatory files`)
	console.log(`requesting package.json`)
	const pack=require("./package.json")
	console.log(`requesting BotAndSeason.json`)
	const bseason=require("./BotAndSeason.json")
	console.log(`requesting package-lock.json`)
	const packL=require("./package-lock.json")
	console.log(`requesting command_module.js`)
	const commandList=require("./command_module.js")
	console.log(`requesting security.js`)
	const security=require("./security.js")
	console.log(`successfully requested files. booting...`)
	//vars
	var prefix='$';
	//command
	client.on("ready", ()=>{
		console.log(
			'\x1B[31m╔═════════════════════════════════════════════════════════════════════════════════════╗\n'+
			'║                                     \x1b[33mBot Online  \x1b[31m                                    ║\n'+
			'\x1B[31m║\x1b[0mInfo:\x1B[31m                                                                                ║\n'+
			'\x1B[31m║     \x1b[0mDev: Bombbom\x1B[31m                                                                    ║\n'+
			'\x1B[31m║     \x1b[0mVers: '+pack.version+', Description: '+pack.description+'\x1B[31m                                          ║\n'+
			'\x1B[31m║     \x1b[0mCreation data: Creation data:09/10 at 18:54 (GMT-3)\x1B[31m                             ║\n'+
			'\x1B[31m║     \x1b[0mInit time: '+Date()+'\x1B[31m       ║\n'+
			'\x1B[31m║                                                                                     ║\n'+
			'╚═════════════════════════════════════════════════════════════════════════════════════╝\n\n\x1b[0m'
		)
		console.log('\x1b[33m%s\x1b[0m', `Inportant Info: \n${bseason.BotInfo.Important}`)
		console.log("Init time: ", Date());
	        if(pack.version != packL.version) {console.log('\x1b[31m%s\x1b[0m', `Warning: API version is different from current pack version and instability or errors may occur during use`)}
		client.user.setActivity('use $help', { type: 'WATCHING' });
	  //client.user.setStatus(dnd) // Can be 'available', 'idle', 'dnd', or 'invisible'
	})
	client.on("message", async(message)=>{
	//	try {
			//const's
			const args=message.content.slice().trim().split(/ +/g);
			const command=args.shift().toLowerCase();
			//security system
			security(command, message)
			//bot return
			if(message.author.bot) {return}
			//vars
			var int_chance;
			var chaveP=["estudou", "correu", "levantou peso", "praticou sua resistência", "praticou magia"]
			var dbchave=["intelligence_", "speed_", "strength_", "vitality_", "mana_", "mbar_", "lbar_"]
			//var's funtions
			var random_chance=function getRandomIntInclusive(min, max, ChL, DbL, SeL) {
				min = Math.ceil(min);
				max = Math.floor(max-database.get(`${dbchave[DbL]}${message.author.id}`));
				int_chance=Math.floor(Math.random() * (max - min + 1)) + min
				if(int_chance===0) {
					database.add(`${dbchave[DbL]}${message.author.id}`, 1)
					return message.channel.send(`você ${chaveP[ChL]} ${bseason.Script.P[SeL]}`)
				} 
				else if(int_chance<0) {return message.channel.send(`você ${chaveP[ChL]} ${bseason.Script.O[SeL]}`)}
				else {return message.channel.send(`você ${chaveP[ChL]} ${bseason.Script.F[SeL]}`)}
			}
			var DevsBanner=function() {
				const Embed=new Discord.MessageEmbed()
					.setTitle(`DevsWarn`)
					.setDescription(`Ainda em desenvolvimento ou foi colocado em estado de [OFFLINE]`)
					.setImage(`${bseason.DevControl.Banner.img}`)
					.setFooter(`RPG Bot (project RPWT) - Creator: キャンディー \nVersion: pt-br`)
					.setTimestamp()
					.setColor("#000000");
				return message.channel.send(Embed)
			}
			/*  ------------------------------------
				database-block
			    ------------------------------------ */
			//anti-bug let
			global.AntiBug=await database.fetch(`AntiBug_${message.author.id}`)
			//personal lets
			let intelligence=await database.fetch(`intelligence_${message.author.id}`)
			let strength=await database.fetch(`strength_${message.author.id}`)
			let vitality=await database.fetch(`vitality_${message.author.id}`)
			global.money=await database.fetch(`money_${message.author.id}`)
			let mana=await database.fetch(`mana_${message.author.id}`)
			global.defense=await database.fetch(`def_${message.author.id}`)
			let speed=await database.fetch(`speed_${message.author.id}`)
			global.EID=await database.fetch(`EID_${message.author.id}`)
			//bar lets
			let manacharge=await database.fetch(`mbar_${message.author.id}`)
			global.livecharge=await database.fetch(`lbar_${message.author.id}`)
			let energycharge=await database.fetch(`ebar_${message.author.id}`)
			//item potion let
			let lifeP=await database.fetch(`lifeP_${message.author.id}`)
			let manaP=await database.fetch(`manaP_${message.author.id}`)
			let energyP=await database.fetch(`energyP_${message.author.id}`)
			//item 
			let equiped=await database.fetch(`equiped_${message.author.id}`)
			let wearpons=await database.fetch(`wearpon_${message.author.id}`)
			global.damage=await database.fetch(`damage_${message.author.id}`)
			// dungeon
			global.dungeon=await database.fetch(`dungeon_${message.author.id}`)
			// mob-dungeon
			global.mobID=await database.fetch(`mobID_${message.author.id}`)
			//anti-bug if
			if(AntiBug===null) {AntiBug=false}
			//person ifs
			if(intelligence===null) {intelligence=0}
			if(defense===null) {defense=0}
			if(strength===null) {strength=0}
			if(vitality===null) {vitality=0}
			if(money===null) {money=0}
			if(mana===null) {mana=0}
			if(speed===null) {speed=0}
			if(EID===null) {EID=0}
			//bar ifs
			if(manacharge===null) {manacharge=0}
			if(livecharge===null) {livecharge=1}
			if(energycharge===null) {energycharge=5}
			//itens ifs
			if(lifeP===null) {lifeP=0}
			if(manaP===null) {manaP=0}
			if(energyP===null) {energyP=0}
			if(equiped===null) {equiped='você não equipou nada'}
			if(damage===null) {damage=0}
			// mob dungeon if
			if(mobID===null) {mobID=false}
			//call command_module
			var block=await commandList(command, message, prefix, random_chance, intelligence, strength, vitality, mana, defense, args, lifeP, manaP, client, speed, wearpons, manacharge, energycharge, damage, energyP)
			if(block===1) {DevsBanner()}
		// } catch (error) {
		// 	message.channel.send(`ERROR: ${error}`)
		//  	console.log('\x1b[31m%s\x1b[0m', `ERROR: ${error}`)
		// }
	})
	client.login(process.env.APP_TOKEN)
}