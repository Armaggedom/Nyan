const bseason=require("./BotAndSeason.json")
/*
* Dungeon Machine V:2.0.3-OffLine
* V:2.0.3.5 rebuild
* Arq V:2.0.3
* Rebulding ALL code, final version 2.0.4
* version < 2.0.4 dont suport
* var keyD=0;
* var mobID=0
* var number_primary=0
--------------------------------------------------------------------------------------- */
// Random machine
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
/*  ------------------------------------
main-machine-block
------------------------------------ */
function dungeonM(argsType, message) {
	if(argsType==="explorer") {
		var eventRandom=getRandomIntInclusive(bseason.dungeon.system.eventRandom.min, bseason.dungeon.system.eventRandom.max)
		/*  ------------------------------------
		mob-summoner/summoned-block
		------------------------------------ */
		if(mobID===false && eventRandom===3 || mobID===null && eventRandom===3 ) {
			// create mob //mob found
			createMobID(message)
			return GlobalEmbed(message, "001")
		}
		else if(mobID!==false || mobID!==null) {return} // embed | ERROR: mobID aready found
		else {return} //ERROR escape
	}
	// args ATTACK
	else if(argsType==="attack" && mobID!=false || argsType==="attack" && mobID!==null) {
		//Damage system here//
		return GlobalEmbed(message, "002")
	}
	else if(argsType==="test") {//test embeds
		console.log('deletando o mob')
		return deleteMobID(message)
	}
	else {return}
}
/*  ------------------------------------
mob-creation_and_delete-block
------------------------------------ */
function createMobID(message) {
	var mobRandom=getRandomIntInclusive(bseason.dungeon.system.mobRandom.min, bseason.dungeon.system.mobRandom.max)
	//database block
	database.push(`mobID_${message.author.id}.IDname`, bseason.dungeon.system.mobList.Names[mobRandom])
	database.push(`mobID_${message.author.id}.IDlife`, bseason.dungeon.system.mobList.Life[mobRandom])
	database.push(`mobID_${message.author.id}.IDdamage`, bseason.dungeon.system.mobList.Damage[mobRandom])
	database.push(`mobID_${message.author.id}.IDdefense`, bseason.dungeon.system.mobList.Defense[mobRandom])
}
function deleteMobID(message) {
	database.delete(`mobID_${message.author.id}`)
}
/*  ------------------------------------
multiple_use-function
------------------------------------ */
function GlobalEmbed(message, TypeEmbedID) {
	// Global.embed | return embed
	//transform TypeEmbedID.string to int
	if(TypeEmbedID==="001") {
		database.set(`EID_${message.author.id}`, 1)
	}
	else if(TypeEmbedID==="002") {
		database.set(`EID_${message.author.id}`, 2)
	}
	//-------------
	if(TypeEmbedID==="001") {
		return Geral_Embed(message, TypeEmbedID)
	}
	else if(TypeEmbedID==="002") {
		return Attack_Embed(message, TypeEmbedID)
	}
	else {return}
}
/*  ------------------------------------
Embed-blocks
------------------------------------ */
function Geral_Embed(message, TypeEmbedID) {
	const Embed=new Discord.MessageEmbed()
		.setTitle(bseason.dungeon.system.EmbedID.Title[database.get(`EID_${message.author.id}`)-1])
		.setDescription(bseason.dungeon.system.EmbedID.Description[database.get(`EID_${message.author.id}`)-1])	
		.addFields({name: 'Name', value: '\`\`\`'+database.get(`mobID_${message.author.id}.IDname`)+'\`\`\`', inline: true})
		.addFields({name: 'Life', value: '\`\`\`'+database.get(`mobID_${message.author.id}.IDlife`)+'\`\`\`', inline: true})
		.addFields({name: '\u200b', value: '\u200b', inline: false})
		.addFields({name: 'Damage', value: '\`\`\`'+database.get(`mobID_${message.author.id}.IDdamage`)+'\`\`\`', inline: true})
		.addFields({name: 'Defense', value: '\`\`\`'+database.get(`mobID_${message.author.id}.IDdefense`)+'\`\`\`', inline: true})
		.setTimestamp()
		.setColor("#000000");
		database.delete(`EID_${message.author.id}`) // bug chance | in case the bug delete this and json.sqlite and reinstall using $playerbuild
	return Embed
}
/*  ------------------------------------
Battle-system-block
------------------------------------ */
function Attack_Embed(message, TypeEmbedID) {
	var PlayerDamage=Player_Damage(message)
	if(livecharge<=0) {return Final_Embed("defeat")}
	else {Mob_Damage(message)}
	if(database.get(`mobID_${message.author.id}.IDlife`)<=0) {return Final_Embed("victory")}
	else if(PlayerDamage>0 && database.get(`mobID_${message.author.id}.IDlife`)>0) {
		const Embed=new Discord.MessageEmbed()
			.setTitle(bseason.dungeon.system.EmbedID.Title[database.get(`EID_${message.author.id}`)-1])
			.setDescription(bseason.dungeon.system.EmbedID.Description[database.get(`EID_${message.author.id}`)-1]+PlayerDamage+bseason.dungeon.system.EmbedID.Complement[database.get(`EID_${message.author.id}`)-2]+MobDamage+' de dano')
			.addFields({name: 'Name', value: '\`\`\`'+database.get(`mobID_${message.author.id}.IDname`)+'\`\`\`', inline: true})
			.addFields({name: 'Vida do Mob: Life', value: '\`\`\`'+database.get(`mobID_${message.author.id}.IDlife`)+'\`\`\`', inline: true})
			.setTimestamp()
			.setColor("#000000");
			database.delete(`EID_${message.author.id}`) // bug chance | in case the bug delete this and json.sqlite and reinstall using $playerbuild
		return Embed
	}
	else if(PlayerDamage<=0) {return console.log('ataque ineficiente')/*Attack ineficient*/}
	else {return}	
}
/*  ------------------------------------
Final-function
------------------------------------ */
function Final_Embed(StringDef) {
	var victoryText=1;
	// Dead end and victory end
	if(StringDef==="victory") {
		// define victory
		victoryText=1
		deleteMobID(message)
	}
	else if(StringDef==="defeat") {
		// define defeat
		victoryText=0
		deleteMobID(message)
	}
	else{return}
	const Embed=new Discord.MessageEmbed()
		.setTitle(bseason.dungeon.system.EmbedID.Title[victoryText+2])
		.setDescription(bseason.dungeon.system.EmbedID.Description[victoryText+2])
		.addFields({name: 'Commandos', value: '\`\`\`'+bseason.dungeon.system.EmbedID.Complement[[1]]+'\`\`\`', inline: true})
		.setTimestamp()
		.setColor("#000000");
		database.delete(`EID_${message.author.id}`) // bug chance | in case the bug delete this and json.sqlite and reinstall using $playerbuild
	return Embed
}
/*  ------------------------------------
Mob-Damage-function
------------------------------------ */
async function Mob_Damage(message) {
	if(livecharge<=0) {return Final_Embed("defeat")}	
	else {
		var MobDamage=Math.round(database.get(`mobID_${message.author.id}.IDdamage`)-database.get(`def_${message.author.id}`))
 		if(MobDamage>0) {
	 		// damage effective
	 		await database.subtract(`lbar_${message.author.id}`, MobDamage)
 		}
 		else {MobDamage=0}
 		return MobDamage
 	}
}
/*  ------------------------------------
Player-Damage-function
------------------------------------ */
async function Player_Damage(message) {
	//vars damage, defense, mobID, life
	if(livecharge<=0) {return Final_Embed("defeat")}
	else {
	 	//damage-defense | EX: player damage=2 Mobdefense=1 | 2-1=1 (damage)
	 	var PlayerDamage=Math.round(database.get(`damage_${message.author.id}`)-database.get(`mobID_${message.author.id}.IDdefense`))
	 	if(PlayerDamage>0) {
	 		// damage effective
	 		await database.subtract(`mobID_${message.author.id}.IDlife`, PlayerDamage)
	 	}
	 	else {PlayerDamage=0}
	 	return PlayerDamage
	}
}
module.exports = dungeonM;
//end

























































































/*	number_primary=getRandomIntInclusive(bseason.dungeon.randomExploration.min, bseason.dungeon.randomExploration.max)
	/*
	* Structure 		 |--- 0 return
	* Primary number ---- 1 mob appear	---- (secondary number = mob ID)
	*								 |----2 money found ---- (secondary number = reward)
	
	if(argsType==="Def") {
		if(number_primary===2) {
			console.log(`if1`)
			number_primary=null
			//returned 2 == money reward
			keyD=1;
			database.add(`money_${message.author.id}`, getRandomIntInclusive(bseason.dungeon.randomExploration.randomLootMoney.min, bseason.dungeon.randomExploration.randomLootMoney.max))
			return EmbedMoneyT(Discord)
		}

		else if(number_primary===1) {
console.log(`if2`)
			number_primary=null
			mobID=getRandomIntInclusive(bseason.dungeon.mob.mobrandom.min, bseason.dungeon.mob.mobrandom.max)
			MobSpawn(mobID, message) // min =0, max =0 => 0 = 100% => mob ID: 0 = 100%
			console.log(`saiu`)
		}
		// return 1
		else {
console.log(`if3`)
			keyD=0
			number_primary=null
			return EmbedMoneyF(Discord)
		}
		return 0
	}
	else if(argsType=== "battle") {
		return BattleMode(mobID)

	}
	else {return}
}

// main function mob spawn
function MobSpawn(mobID, message) {
	// mob global pass to local 
	keyD=2;
	if(database.get(`mob_${message.author.id}.ID_Name`)===null) {
		console.log(`indo ao addmob`)
		AddMob(mobID, message)
		console.log(`indo ao mob MobAppear`)
		MobAppear(message)
	}
	else if(database.get(`mob_${message.author.id}.Life`)===0) {
		DelMob(mobID, message)
		return MobRewar(mobID)
	}
	else {
		return MobAppear(message)
	}
}
// mob Spawn message
function BattleMode(mobID, message) {
	function Damage(mobID) {
		var damagePlayer=Math.abs(PersonalMob.Defense - damage)
		if(damagePlayer>0) {
			PersonalMob.Life-=damagePlayer
		}
		else {
			return 0
		}
		if(PersonalMob.Life!==0) {
			return damagePlayer
		}
		else {
			keyD=1
			MobReward(Discord, message, mobID)
		}
		
	}
	function MobDamage(mobID) {
		var damageMob=Math.abs(defense - PersonalMob.Damage)
		console.log(damageMob+'damage mob')
		if(livecharge==0) {
			Dead(message)
		}
		else if(damageMob>0) {
			livecharge=Math.round(livecharge-damageMob)
			if(livecharge===0) {
				Dead(message)
			}
			else{return}
		}
		return damageMob
	}
	keyD=0
	Damage(mobID)
	const Embed=new Discord.MessageEmbed()
		.setTitle(`Dungeon`)
		.setDescription(bseason.Script.dungeon.script.battle[keyD]+Damage(mobID)*1+' de dano e ele te ataca de volta dando '+MobDamage(mobID)+' de dano')
		.addFields({name: `Nome do mob:`, value: database.get(`PersonalMob_${message.author.id}.ID_Name`), inline: false})
		.addFields({name: `Vida:`, value: PersonalMob.Life, inline: true})
		.addFields({name: `Defesa:`, value: PersonalMob.Defense*1, inline: true})
		.setTimestamp()	
		.setFooter(`Dungeon_event on`)
	return Embed
}
function MobAppear(message) {
	const Embed=new Discord.MessageEmbed()
		.setTitle(`Dungeon`)
		.setDescription(bseason.Script.dungeon.script.exploration[keyD])
		.addFields({name: `Nome do mob:`, value: PersonalMob.ID_Name, inline: false})
		.addFields({name: `Vida:`, value: PersonalMob.Life, inline: true})
		.addFields({name: `Defesa:`, value: PersonalMob.Defense, inline: true})
		.setTimestamp()	
		.setFooter(`Dungeon_event on`)
	return Embed
}
// function Add mob
function AddMob(mobID, message) {
	database.push(`mob_${message.author.id}.ID_Name`, bseason.dungeon.mob.mobrandom.mobID[mobID])
	database.push(`mob_${message.author.id}.Life`,    bseason.dungeon.mob.mobrandom.mobID[mobID+1])
	database.push(`mob_${message.author.id}.Defense`, bseason.dungeon.mob.mobrandom.mobID[mobID+2])
	database.push(`mob_${message.author.id}.Damage`,  bseason.dungeon.mob.mobrandom.mobID[mobID+3])
	database.push(`mob_${message.author.id}.Loot`,    bseason.dungeon.mob.mobrandom.mobID[mobID+4])
	return 0
}
// function Delet mob
function DelMob(mobID, message) {
	database.delete(`mob_${message.author.id}.ID_Name`)
	database.delete(`mob_${message.author.id}.Life`)
	database.delete(`mob_${message.author.id}.Defense`)
	database.delete(`mob_${message.author.id}.Damage`)
	database.delete(`mob_${message.author.id}.Loot`)
}
// mob Reward
function MobReward(Discord, message, mobID) {
	const Embed=new Discord.MessageEmbed()
		.setTitle(`Dungeon`)
		.setDescription(bseason.Script.dungeon.script.battle[keyD])
		.addFields({name: `Nome do mob:`, value: PersonalMob.ID_Name, inline: false})
		.addFields({name: `Vida:`, value: PersonalMob.Life, inline: true})
		.addFields({name: `Defesa:`, value: PersonalMob.Defense, inline: true})
		.setTimestamp()	
		.setFooter(`Dungeon_event on`)
	return Embed
}
// DEAD
function Dead(message) {
	dungeon=false
	const Embed=new Discord.MessageEmbed()
		.setTitle(`Dungeon`)
		.setDescription(bseason.Script.dungeon.script.dead)
		.setTimestamp()	
		.setFooter(`Dungeon_event off`)
	return Embed
}
// money END
function EmbedMoneyT(Discord, message) {
	const Embed=new Discord.MessageEmbed()
		.setTitle(`Dungeon`)
		.setDescription(bseason.Script.dungeon.script.exploration[keyD]+', seu dinheiro total agora é de: '+ money) // not work
		.setTimestamp()	
		.setFooter(`Dungeon_event on`)
	return Embed
}
function EmbedMoneyF(Discord, message) {
	const Embed=new Discord.MessageEmbed()
		.setTitle(`Dungeon`)
		.setDescription(bseason.Script.dungeon.script.exploration[keyD])
		.setTimestamp()
		.setFooter(`Dungeon_event on`)
	return Embed
}

// comment border */
