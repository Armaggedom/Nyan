const bseason=require("./BotAndSeason.json")
const app_pack=require("./package.json")
function commandList(command, message, prefix, Discord, random_chance, intelligence, strength, vitality, money, mana, database, defense, args, lifeP, manaP, client) {
	//function-no imported
	function progressBar (value, maxValue, size, keyF) {
		const percentage = value / maxValue; // Calculate the percentage of the bar
		const progress = Math.round((size * percentage)); // Calculate the number of square caracters to fill the progress side.
		const emptyProgress = size - progress; // Calculate the number of dash caracters to fill the empty progress side.
		const progressText = '▇'.repeat(progress); // Repeat is creating a string with progress * caracters in it
		const emptyProgressText = '—'.repeat(emptyProgress); // Repeat is creating a string with empty progress * caracters in it
		const percentageText = Math.round(percentage * 100)+'%'; // Displaying the percentage of the bar
		const bar = '```'+bseason.Script.Key.KeyF[keyF]+'\n['+progressText+emptyProgressText+']'+percentageText+'```'; // Creating the bar
		return bar;
	}
	//bot test
	if(command===`${prefix}info`) {
		const Embed=new Discord.MessageEmbed()
			.setTitle(`BOT: ${client.user.username}`)
			.setDescription(
				'╔══════════════════════════\n'+
				'║ BOT: project RPWT [Role Play Word Text]\n'+
				'║ Version: '+app_pack.version+'\n'+
				'╚══════════════════════════'
				)
			.addFields({name: `M-Dev:`, value: `キャンディー`, inline: true})
			.setAuthor('GitHub', 'https://cdn-icons-png.flaticon.com/512/25/25231.png', 'https://github.com/Armaggedom/Nyan')
			.setFooter(`RPG Bot (project RPWT) - Creator: キャンディー \nVersion: pt-br`)
			.setTimestamp()
			.setColor("#000000");
		return message.channel.send(Embed)
	}
	/*  ------------------------------------
		default-command-block
		----,-------------------------------- */
	else if(command===`${prefix}help`) {
		const Embed=new Discord.MessageEmbed()
			.setTitle(`Help`)
			.setDescription(`RPG bot:\nBot de RPG\nseason info:\n${bseason.SeasonControl.infoSeason}`)
			.addFields({name: `Comandos: prefixo: '${prefix}'`, value: `\`\`\`${bseason.BotInfo.comandos}\`\`\``, inline: true})
			.addFields({name: `novidades:`, value: `\`\`\`${bseason.BotInfo.New}\`\`\``,inline: true})
			.setFooter(`RPG Bot (project RPWT) - Creator: キャンディー \nVersion: pt-br`)
			.setTimestamp()
			.setColor("#000000");
		return message.channel.send(Embed)
	}
	/*  ------------------------------------
		database-comand-block
		player-database-comand-block
	    ------------------------------------ */
	else if(command===`${prefix}infoplayer`) {
			if (bseason.SeasonControl.acessKey===true) {
				const Embed=new Discord.MessageEmbed()
					.setAuthor(`RPG: season ${bseason.SeasonControl.season}`, `${bseason.SeasonControl.img.seasonImg}`)
					.setThumbnail(`${message.author.displayAvatarURL({format: "png"})}`)
					.setTitle(`Info Player`)
					.setDescription(`Informações do seu personagem:\nNome: ${message.author.username}`)
					.addFields({name: '\u200b', value: '\u200b'})
					.addFields({name: `força`, value: `\`\`\`${strength}\`\`\``, inline: false})
				//	.addFields({name: `agilidade`, value: `\`\`\`${speed}\`\`\``, inline: false})
					.addFields({name: `vitalidade`, value: `\`\`\`${vitality}\`\`\``, inline: false})
					.addFields({name: `inteligência [Developing]`, value: `\`\`\`${intelligence}\`\`\``, inline: false})
					.addFields({name: `Mana`, value: `\`\`\`${mana}\`\`\``, inline: true})
					.setFooter(`userInfo ${message.author.username}`)
					.setTimestamp()
					.setColor("#000000");
				return message.channel.send(Embed)
			} else {
				const Embed=new Discord.MessageEmbed()
					.setAuthor(`RPG: season ${bseason.SeasonControl.season}`, `${bseason.SeasonControl.img.seasonImg}`)
					.setThumbnail(`${message.author.displayAvatarURL({format: "png"})}`)
					.setTitle(`Em breve`)
					.setDescription(`Uma nova season está por vir`)
					.setImage(`${bseason.SeasonControl.seasonImg}`)
					.setColor("#000000");
				return message.channel.send(Embed)
			}
	}
	// else if(command===`full`) {
	// 	database.set(`lbar_${message.author.id}`, 1)
	// }
	else if(command===`${prefix}stats`) {
		if(database.get(`mana_${message.author.id}`)!==0) {
			return message.channel.send(
				progressBar(database.get(`mbar_${message.author.id}`), bseason.player.stats.mana.Lv[mana], bseason.player.stats.mana.Lv[mana], 0) 
				+'\n'+ progressBar(database.get(`lbar_${message.author.id}`), bseason.player.stats.vitality.Lv[vitality], bseason.player.stats.vitality.Lv[vitality], 1)
				+'\n'+ progressBar(database.get(`ebar_${message.author.id}`), bseason.player.stats.energy.Lv[energy], bseason.player.stats.energy.Lv[speed], 2)
				+'```\n'+'dano p/atk: '+database.get(`wearpon_${message.author.id}.damage`)
				+'\n'+'defesa: '+defense+'```'
			)
		} 
		else {
			return message.channel.send(`você não tem magia`)
		}
	}
	/*  ------------------------------------
		person-stats-comand-block
	    ------------------------------------ */
	else if(command===`${prefix}usemanapotion`) {
		if(database.get(`manaP_${message.author.id}`)<=0) {
			return message.channel.send(`você não tem poções de mana`)
		}
		else {
			if(database.get(`mana_${message.author.id}`)===0) {
				return message.channel.send(`poções de mana não ajudam quem não tem magia`)
			}
			else {
				if(bseason.DevControl.Developing===false | message.author.id === bseason.DevControl.IDs.Dev1) {
					database.subtract(`manaP_${message.author.id}`, 1)
					database.set(`mbar_${message.author.id}`, bseason.player.stats.mana.Lv[mana])
					return message.channel.send(`você usou uma poção de mana`)
				}
			}
		}
	}
	else if(command===`${prefix}uselifepotion`) {
		if(database.get(`lifeP_${message.author.id}`)<=0) {
			return message.channel.send(`você não tem poções de vida`)
		}
		else {
			if(bseason.DevControl.Developing===false | message.author.id === bseason.DevControl.IDs.Dev1) {
				database.subtract(`lifeP_${message.author.id}`, 1)
				database.set(`lbar_${message.author.id}`, bseason.player.stats.vitality.Lv[vitality])
				return message.channel.send(`você usou uma poção de vida`)
			}
		}
	}
	else if(command===`${prefix}useEnergy`) {
		if(database.get(`energyP_${message.author.id}`)<=0) {
			return message.channel.send(`você não tem energéticos`)
		}
		else {
			if(bseason.DevControl.Developing===false | message.author.id === bseason.DevControl.IDs.Dev1) {
				database.subtract(`energyP_${message.author.id}`, 1)
				database.set(`energyP_${message.author.id}`, bseason.player.stats.energy.Lv[energy])
				return message.channel.send(`você usou um energético`)
			}
		}
	}
	/*  ------------------------------------
		economic-comand-block
	    ------------------------------------ */
	//money view
	else if(command===`${prefix}dinheiro`) {
		if(bseason.DevControl.Developing!==false & message.author.id !== bseason.DevControl.IDs.Dev1) {return 1}
		return message.channel.send(`você tem ${money}-yans`)
	}
	//money in
	else if(command===`${prefix}trabalhar`) {
		if(bseason.DevControl.Developing!==false & message.author.id !== bseason.DevControl.IDs.Dev1) {return 1}
	   	database.add(`money_${message.author.id}`, bseason.Economic.Wage.InspectorSal)
	   	return message.channel.send(`você trabalhou na padaria do seu Jonias \ngahou um total de ${bseason.Economic.Wage.Def}yans`)
	}
	//money out
	else if(command===`${prefix}loja`) {
	  	
	  	if(bseason.DevControl.Developing!==false & message.author.id !== bseason.DevControl.IDs.Dev1) {return 1}
		if(bseason.Economic.Shop.Open===true) {
		   	const Embed=new Discord.MessageEmbed()
			.setTitle(`Loja`)
			.setDescription(`${bseason.Script.Shops.Open}`)
			.setFooter(`para comprar digite buy [número do item]`)
			return message.channel.send(Embed)
		}
		else {
			const Embed=new Discord.MessageEmbed()
				.setTitle(`Loja`)
				.setDescription(`${bseason.Script.Shops.Close}`)
			return message.channel.send(Embed)
		  }
	}
	else if(command===`${prefix}buy`) {
		if(bseason.DevControl.Developing!==false & message.author.id !== bseason.DevControl.IDs.Dev1) {return 1}
		const item=parseInt(args[0]);
		if(isNaN(item)) {return message.channel.send(`você deve digitar o numero do item ex: buy 1`)}
		else {
			if(database.get(`money_${message.author.id}`)<bseason.Economic.Shop.itens.price[item-1]) {
				return message.channel.send(`você não tem dinheiro suficiente`)
			}
			else if(item>3) {
				message.channel.send(`você comprou 1 arma e ela ja foi equipada`)
				return database.set(`wearpon_${message.author.id}`, {name: bseason.wearpons[item-4], damage: bseason.wearpons[item-4].damage})
			}
			else {
				database.add(`${bseason.Economic.Shop.itens.keyI[item-1]}${message.author.id}`, 1)
				database.subtract(`money_${message.author.id}`, bseason.Economic.Shop.itens.price[item-1])	
				return message.channel.send(`você comprou 1 item`)
			}
		}
	}
	/*  ------------------------------------
		player-comand-block
	    ------------------------------------ */
	else if(command===`${prefix}inventario`) {
		const Embed=new Discord.MessageEmbed()
			.setTitle(`inventario`)
			.setDescription('você tem: \n'+lifeP+'poções de vida \n'+manaP+' poções de mana \nvocê esta usando como arma'+database.get(`wearpon_${message.author.id}.name`))
		return message.channel.send(Embed)
	}
	/*  ------------------------------------
		interact-comand-block
	    ------------------------------------ */
	else if(command===`${prefix}estudar`) {
		if(bseason.DevControl.Developing!==false & message.author.id !== bseason.DevControl.IDs.Dev1){return 1}
		random_chance(bseason.habilitLevel.min, bseason.habilitLevel.max, 0, 0, 0)
	}
	else if(command===`${prefix}correr`){random_chance(bseason.habilitLevel.min, bseason.habilitLevel.max, 1, 1, 1)}
	else if(command===`${prefix}academia`){random_chance(bseason.habilitLevel.min, bseason.habilitLevel.max, 2, 2, 2)}
	else if(command===`${prefix}treinarresistência`){random_chance(bseason.habilitLevel.min, bseason.habilitLevel.max, 3, 3, 3)}
	else if(command===`${prefix}treinarmana`){random_chance(bseason.habilitLevel.min, bseason.habilitLevel.max, 4, 4, 4)}
	/*  ------------------------------------
		dungeon-comand-block
	    ------------------------------------ */
	else if(command===`${prefix}dungeon`) {
		if(bseason.DevControl.Developing!==false & message.author.id !== bseason.DevControl.IDs.Dev1) {return 1}
		return 1
	}
	else {return}
}
module.exports = commandList;
