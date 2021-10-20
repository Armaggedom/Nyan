const bseason=require("./BotAndSeason.json")
/*
* Dungeon Machine V:1.0
* keyD=0 dungeon script false
* keyD=1 dungeon script true
* battle
*	mob defense - user attack = damage on mob & user defense - mob attack = damage on user 
* if (damage<0) {damage*1=damage 100%chance}
*	if (damage===0) {damage=1 (50% chance)}
*	if (damage>0) {damage=null (0% chance)}
* mob dead: 
* if life_mob=0=recompense
* if life_mob<0=mob not found
* if life_mob>0= mob found but not died
*/
var keyD=0;

function dungeonM(Discord, message, money) {
	if(getRandomIntInclusive(bseason.dungeon.randomExploration.min, bseason.dungeon.randomExploration.max)===2) {
		keyD=1;
		database.add(`money_${message.author.id}`, getRandomIntInclusive(bseason.dungeon.randomExploration.randomLootMoney.min, bseason.dungeon.randomExploration.randomLootMoney.max))
		return EmbedMoneyT(Discord)
	}
	else {
		keyD=0
		return EmbedMoneyF(Discord)
	}
}
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function EmbedMoneyT(Discord, message, money) {
	const Embed=new Discord.MessageEmbed()
		.setTitle(`Dungeon`)
		.setDescription(bseason.Script.dungeon.script.exploration[keyD]+', seu dinheiro total agora é de: '+ money)
		.setTimestamp()	
		.setFooter(`Dungeon_event on`)
	return Embed
}
function EmbedMoneyF(Discord, message, money) {
	const Embed=new Discord.MessageEmbed()
		.setTitle(`Dungeon`)
		.setDescription(bseason.Script.dungeon.script.exploration[keyD])
		.setTimestamp()
		.setFooter(`Dungeon_event on`)
	return Embed
}
module.exports = dungeonM;