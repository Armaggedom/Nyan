/*
* Arq V: 1.0 
* OBS: V: ^1.0 just suport version ^4.0.0 index.js.version
* All system vars declared here 
*/
async function system(systemType, message) {
	if(systemType==='Init') {
		console.log(`Defining prefix`)
		global.prefix='$';
		console.log(`requesting package.json`)
		global.pack=require("./package.json")
		console.log(`requesting BotAndSeason.json`)
		global.bseason=require("./BotAndSeason.json")
		console.log(`requesting dungeonMachine.js`)
		global.dungeonM=require("./dungeonMachine.js")
		console.log(`requesting package-lock.json`)
		global.packL=require("./package-lock.json")
		console.log(`requesting command_module.js`)
		global.commandList=require("./command_module.js")
		console.log(`requesting security.js`)
		global.security=require("./security.js")
		console.log(`requesting initalizerOutput.js`)
		global.output=require("./initalizerOutput.js")
		console.log(`successfully requested files. booting...`)
	}
	//else if(systemType==='Lets') {} bug
	else if(systemType==='InstallDungeon') {
		message.channel.send(`personagem sendo criado, aguarde...`)
		.then(async(msg)=>{
			await msg.edit('\n┐ System Call... └\n')
			await setTimeout(function(){}, 5);
			msg.edit('installing your id with the variable: \'lbar_\'')
			await database.set(`lbar_${message.author.id}`, bseason.player.stats.vitality.Lv[0])
			msg.edit('installation completed, booting next')
			msg.edit('installing your id with the variable: \'mana_\'')
			await database.set(`mbar_${message.author.id}`, bseason.player.stats.mana.Lv[0])
			msg.edit('installation completed, booting next')
			msg.edit('installing your id with the variable \'speed_\'')
			await database.set(`ebar_${message.author.id}`, bseason.player.stats.energy.Lv[0])
			msg.edit('installation completed, booting next')
			msg.edit('installing your id with the variable: \'money_\'')
			await database.set(`money_${message.author.id}`, 0)
			msg.edit('installation completed, booting next')
			msg.edit('installing your id with the variable: \'equiped_\'')
			await database.set(`equiped_${message.author.id}`, 'você não equipou nada')
			msg.edit('installation completed, booting next')
			msg.edit('installing your id with the variable: \'DungeonFloor_\'')
			await database.set(`DungeonFloor_${message.author.id}`, 'A0')
			msg.edit('installation completed, booting next')
			//installation END
			msg.edit('installing your id with the variable: \'AntiBug_\'')
			await database.set(`AntiBug_${message.author.id}`, true)
			await msg.edit('installation finished')
		})
	}
	else{return}
}
module.exports = system;