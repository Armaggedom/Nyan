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
global.database=require("quick.db")
try {
	require('dotenv/config')
} catch (error) {
	console.log("Developer mode disabled")
} finally {
	//arqv request
	console.log(`requesting mandatory files`)
	try {
		console.log(`requesting system.js`)
		global.system=require("./system.js")
	} catch(error) {
		return console.log('fatal error: '+error)
		client.destroy()
	}
	system('Init')
	//command
	client.on("ready", ()=>{
		output()
		client.user.setActivity('use $help | BOT [OFFLINE]', { type: 'WATCHING' });
	  //client.user.setStatus(dnd) // Can be 'available', 'idle', 'dnd', or 'invisible'
	})
	client.on("message", async(message)=>{
		try {
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
			//system('Lets') bug
			global.AntiBug=await database.fetch(`AntiBug_${message.author.id}`)
			//personal lets
			global.intelligence=await database.fetch(`intelligence_${message.author.id}`)
			global.strength=await database.fetch(`strength_${message.author.id}`)
			global.vitality=await database.fetch(`vitality_${message.author.id}`)
			global.money=await database.fetch(`money_${message.author.id}`)
			global.mana=await database.fetch(`mana_${message.author.id}`)
			global.defense=await database.fetch(`def_${message.author.id}`)
			global.speed=await database.fetch(`speed_${message.author.id}`)
			global.EID=await database.fetch(`EID_${message.author.id}`)
			//bar lets
			global.manacharge=await database.fetch(`mbar_${message.author.id}`)
			global.livecharge=await database.fetch(`lbar_${message.author.id}`)
			global.energycharge=await database.fetch(`ebar_${message.author.id}`)
			//item potion let
			global.lifeP=await database.fetch(`lifeP_${message.author.id}`)
			global.manaP=await database.fetch(`manaP_${message.author.id}`)
			global.energyP=await database.fetch(`energyP_${message.author.id}`)
			//item 
			global.equiped=await database.fetch(`equiped_${message.author.id}`)
			global.wearpons=await database.fetch(`wearpon_${message.author.id}`)
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
		} 
		catch (error) {
		 	message.channel.send(`ERROR: ${error}`)
		  	console.log('\x1b[31m%s\x1b[0m', `ERROR: ${error}`)
		}
	})
	client.login(process.env.APP_TOKEN)
}