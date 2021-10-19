const bseason=require("./BotAndSeason.json")
function dungeonM(modules) {
	if(modules==="exploration_random") {
		return getRandomIntInclusive(bseason.dungeon.randomExploration.min, bseason.dungeon.randomExploration.max)
	}
	else if(modules==="exploration_LootMoney") {
		return getRandomIntInclusive(bseason.dungeon.randomExploration.randomLootMoney.min, bseason.dungeon.randomExploration.randomLootMoney.max)
	}
}
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
module.exports = dungeonM;