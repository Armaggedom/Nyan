const bseason=require("./BotAndSeason.json")
/*
* Dungeon Machine V:2.0.2-BugsInstable
* keyD=0 dungeon script false
* keyD=1 dungeon script true
* battle system
*	mob defense - user attack = damage on mob & user defense - mob attack = damage on user 
* if (damage<0) {damage=damage 100%chance}
*	if (damage===0) {damage=1 (50% chance)}
*	if (damage>0) {damage=null (0% chance)}
* mob dead: 
* if life_mob=0=recompense
* if life_mob<0=mob not found
* if life_mob>0= mob found but not died
* bot.json randomExploration min=0 max=2
* Arq V:2.0.2 Bugs livecharge don't start in 1 || explorar bug in one time
*/
var keyD=0;
var mobID=0
var number_primary=0
function dungeonM(argsType, Discord, message) {
	number_primary=getRandomIntInclusive(bseason.dungeon.randomExploration.min, bseason.dungeon.randomExploration.max)
	/*
	* Structure 		 |--- 0 return
	* Primary number ---- 1 mob appear	---- (secondary number = mob ID)
	*								 |----2 money found ---- (secondary number = reward)
	*/
	if(argsType==="Def") {
		if(number_primary===2) {
			number_primary=null
			//returned 2 == money reward
			keyD=1;
			database.add(`money_${message.author.id}`, getRandomIntInclusive(bseason.dungeon.randomExploration.randomLootMoney.min, bseason.dungeon.randomExploration.randomLootMoney.max))
			return EmbedMoneyT(Discord)
		}

		else if(number_primary===1) {
			number_primary=null
			mobID=getRandomIntInclusive(bseason.dungeon.mob.mobrandom.min, bseason.dungeon.mob.mobrandom.max)
			return MobSpawn(mobID, message) // min =0, max =0 => 0 = 100% => mob ID: 0 = 100%
		}
		// return 1
		else {
			keyD=0
			number_primary=null
			return EmbedMoneyF(Discord)
		}
	}
	else if(argsType=== "battle") {
		return BattleMode(mobID)

	}
	else {return}
}
// Random machine
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// main function mob spawn
function MobSpawn(mobID, message) {
	// mob global pass to local 
	keyD=2;
	if(database.get(`mob_${message.author.id}.ID_Name`)===null) {
		AddMob(mobID, message)
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
		.addFields({name: `Nome do mob:`, value: PersonalMob.ID_Name, inline: false})
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
module.exports = dungeonM;