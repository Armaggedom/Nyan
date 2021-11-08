// Arq V:3.0.2.4 OBS: energy-- in dungeon commented to test
const bseason=require("./BotAndSeason.json")
const app_pack=require("./package.json")
const dungeonM=require("./dungeonMachine.js")

var color=000000;
function commandList(command, message, prefix, Discord, random_chance, intelligence, strength, vitality, mana, defense, args, lifeP, manaP, client, speed, wearpons, manacharge, energycharge, damage, energyP) {
	// AntiBug command Border
	if(command===`${prefix}playerbuild`) {
		if(AntiBug===true){return message.channel.send('você já criou um personagem')}
		try {
			message.channel.send(`personagem sendo criado, aguarde...`)
			.then(async(msg)=>{
				msg.edit('iniciando log aguarde...')
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
				msg.edit('installing your id with the variable: \'mob_\'')
				await database.set(`mob_${message.author.id}`, 0)
				msg.edit('installation completed, booting next')
				//installation END
				msg.edit('installing your id with the variable: \'AntiBug_\'')
				await database.set(`AntiBug_${message.author.id}`, true)
				await msg.edit('installation finished')
			})
		} 
		catch (error) {
			message.channel.send('Error: '+ error+ ' Instalation aborted')
			try {
				database.delete(`lbar_${message.author.id}`)
				database.delete(`mbar_${message.author.id}`)
				database.delete(`ebar_${message.author.id}`)
				database.delete(`money_${message.author.id}`)
				database.delete(`equiped_${message.author.id}`)
				database.delete(`mob_${message.author.id}`)
				database.delete(`AntiBug_${message.author.id}`)
			}
			catch(error) {return}
		}
		finally{return}
	}
	/*  ------------------------------------
		default-command-block
		------------------------------------ */
	if(command===`${prefix}info`) {
		const Embed=new Discord.MessageEmbed()
			.setTitle(`BOT: ${client.user.username}`)
			.setDescription(
				'╔══════════════════════════\n'+
				'║ BOT: project RPWT [Role Play Word Text]\n'+
				'║ Version: '+app_pack.version+'\n'+
				'║ GitHub: https://github.com/Armaggedom/Nyan\n'+
				'╚══════════════════════════'
				)
			.addFields({name: `M-Dev:`, value: `キャンディー`, inline: true})
			.setAuthor('MyGitHub', 'https://cdn-icons-png.flaticon.com/512/25/25231.png', 'https://github.com/Armaggedom/Nyan')
			.setFooter(`RPG Bot (project RPWT) - Creator: キャンディー \nVersion: pt-br`)
			.setTimestamp()
			.setColor("#000000");
		return message.channel.send(Embed)
	}
	else if(command===`${prefix}help`) {
		const Embed=new Discord.MessageEmbed()
			.setTitle(`Help`)
			.setDescription(`RPG bot:\nBot de RPG\nseason info:\n${bseason.SeasonControl.infoSeason}, para utilizar comandos de personagem, você deve utilizar o comando playerbuild como primeiro comando`)
			.addFields({name: `Comandos: prefixo: '${prefix}'`, value: `\`\`\`${bseason.BotInfo.comandos}\`\`\``, inline: true})
			.addFields({name: `novidades:`, value: `\`\`\`${bseason.BotInfo.New}\`\`\``,inline: true})
			.addFields({name: `para mais Informações entre em contato com o @キャンディー#9775 :`, value: '\u200b',inline: false})
			.setFooter(`RPG Bot (project RPWT) - Creator: キャンディー \nVersion: pt-br`)
			.setTimestamp()
			.setColor("#000000");
		return message.channel.send(Embed)
	}
	//AntiBug Border
	if(database.get(`AntiBug_${message.author.id}`)===false | database.get(`AntiBug_${message.author.id}`)===null) {
		return message.channel.send(`você deve usar o comando ${prefix}playerbuild antes, para usar esse comando`)
	}
	//function-progressBar
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
	/*  ------------------------------------
		database-comand-block
		player-database-comand-block
	    ------------------------------------ */
	if(command===`${prefix}infoplayer`) {
		if (bseason.SeasonControl.acessKey===true) {
			const Embed=new Discord.MessageEmbed()
				.setAuthor(`RPG: season ${bseason.SeasonControl.season}`, `${bseason.SeasonControl.img.seasonImg}`)
				.setThumbnail(`${message.author.displayAvatarURL({format: "png"})}`)
				.setTitle(`Info Player`)
				.setDescription(`Informações do seu personagem:\nNome: ${message.author.username}`)
				.addFields({name: '\u200b', value: '\u200b'})
				.addFields({name: `força`, value: `${strength}`, inline: false})
				.addFields({name: `agilidade`, value: `${speed}`, inline: false})
				.addFields({name: `vitalidade`, value: `${vitality}`, inline: false})
				.addFields({name: `inteligência [Developing]`, value: `${intelligence}`, inline: false})
				.addFields({name: `Mana`, value: `${mana}`, inline: false})
				.addFields({name: `Arma equipada`, value: database.get(`equiped_${message.author.id}`), inline: false})
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
	else if(command===`give`) {
	 	const amount=parseInt(args[0]);
	 	database.set(`money_${message.author.id}`, amount)
	}
	else if(command===`${prefix}stats`) {
		if(manacharge<0) {manacharge=0}
		//if(livecharge<0) {livecharge=0}
		if(energycharge<0) {energycharge=0}
		return message.channel.send(
			progressBar(manacharge, bseason.player.stats.mana.Lv[mana], bseason.player.stats.mana.Lv[mana], 0) 
			+'\n'+ progressBar(database.get(`lbar_${message.author.id}`), bseason.player.stats.vitality.Lv[vitality], bseason.player.stats.vitality.Lv[vitality], 1)
			+'\n'+ progressBar(energycharge, bseason.player.stats.energy.Lv[speed], bseason.player.stats.energy.Lv[speed], 2)
			+'```\n'+'dano p/atk: '+database.get(`damage_${message.author.id}`)
			+'\n'+'defesa: '+defense+'```'
		) 
	}
	/*  ------------------------------------
		person-stats-comand-block
	    ------------------------------------ */
	else if(command===`${prefix}use`) {
		if(!args.length) {
			return message.channel.send(`você precisa colocar o comando use com o item ex use manapotion, lifepotion ou energypotion`)
		}
		else if(args[0]==='manapotion') {
			if(database.get(`manaP_${message.author.id}`)<=0) {
				return message.channel.send(`você não tem poções de mana`)
			}
			else {
				if(database.get(`mana_${message.author.id}`)===0) {
					return message.channel.send(`poções de mana não ajudam quem não tem magia`)
				}
				else {
					database.subtract(`manaP_${message.author.id}`, 1)
					database.set(`mbar_${message.author.id}`, bseason.player.stats.mana.Lv[mana])
					return message.channel.send(`você usou uma poção de mana`)
				}
			}
		}
		else if(args[0]==='lifepotion') {
			if(database.get(`lifeP_${message.author.id}`)<=0) {
				return message.channel.send(`você não tem poções de vida`)
			}
			else {
				database.subtract(`lifeP_${message.author.id}`, 1)
				database.set(`lbar_${message.author.id}`, bseason.player.stats.vitality.Lv[vitality])
				return message.channel.send(`você usou uma poção de vida`)
			}

		}
		else if(args[0]==='energypotion') {
			if(database.get(`energyP_${message.author.id}`)<=0) {
				return message.channel.send(`você não tem energéticos`)
			}
			else {
				database.subtract(`energyP_${message.author.id}`, 1)
				database.set(`ebar_${message.author.id}`, bseason.player.stats.energy.Lv[speed])
				return message.channel.send(`você usou um energético`)
			}
		}
	}
	/*  ------------------------------------
		economic-comand-block
	    ------------------------------------ */
	//money view
	else if(command===`${prefix}dinheiro`) {
		return message.channel.send(`você tem ${money}-yans`)
	}
	//money in
	else if(command===`${prefix}trabalhar`) {
		if(database.get(`dungeon_${message.author.id}`)===true) {return message.channel.send(`durante o evento de dungeon esse comando estará desabilitado`)}
	   	database.add(`money_${message.author.id}`, bseason.Economic.Wage.Def)
	   	return message.channel.send(`você trabalhou na padaria do seu Jonias \ngahou um total de ${bseason.Economic.Wage.Def}yans`)
	}
	//money out
	else if(command===`${prefix}loja`) {
		if(database.get(`dungeon_${message.author.id}`)===true) {return message.channel.send(`durante o evento de dungeon esse comando estará desabilitado`)}
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
		if(database.get(`dungeon_${message.author.id}`)===true) {return message.channel.send(`durante o evento de dungeon esse comando estará desabilitado`)}
		const item=parseInt(args[0]);
		if(isNaN(item)) {return message.channel.send(`você deve digitar o numero do item ex: buy 1`)}
		else {
			if(database.get(`money_${message.author.id}`)<bseason.Economic.Shop.itens.price[item-1]) {
				return message.channel.send(`você não tem dinheiro suficiente`)
			}
			else if(item>3) {
				message.channel.send(`você comprou 1 arma ela está no seu inventario`)
				database.push(`wearpon_${message.author.id}.name`, bseason.wearpons.name[item-4])
				database.push(`wearpon_${message.author.id}.damage`, bseason.wearpons.damage[item-4])
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
			.setDescription('você tem: \n'+lifeP+' poções de vida \n'+manaP+' poções de mana \n'+energyP+' poções de energia \nvocê tem as seguintes armas: '+database.get(`wearpon_${message.author.id}.name`))
		return message.channel.send(Embed)
	}
	else if(command===`${prefix}equip`) {
		const item=parseInt(args[0])
		if(isNaN(item)) {return message.channel.send(`você deve digitar o numero do item ex: a arma que está na posição 1 coloque no final do comando o número 1 equip 1`)}
		else {
			try {
				database.set(`equiped_${message.author.id}`, wearpons.name[item-1])
				database.set(`damage_${message.author.id}`, wearpons.damage[item-1])
			}
			catch(error) {return message.channel.send(`não foi possível equipar essa arma`)}
			return message.channel.send('você equipou a '+ wearpons.name[item-1])
		}			
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
		if(!args.length) {
			return message.channel.send(`você precisa colocar o comando da dungeon ex dungeon in`)
		}
		else if(args[0]==='in') {
			if(database.get(`dungeon_${message.author.id}`)!==true) {
				if(energycharge>0) {
					database.set(`ebar_${message.author.id}`,energycharge-=1)
					database.set(`dungeon_${message.author.id}`, true)
					const Embed=new Discord.MessageEmbed()
						.setTitle(`Dungeon`)
						.setDescription(bseason.Script.dungeon.in)
						.addFields({name: bseason.Script.dungeon.commands, value: '\u200b', inline: false})
						.setImage(bseason.dungeon.images.dungeon_in_out)
						.setTimestamp()
						.setFooter(`Dungeon_event on`)
					return message.channel.send(Embed)
				}
				else {
					return message.channel.send(`você não tem energia suficiente`)
				}
			}
		}
		if(database.get(`dungeon_${message.author.id}`)===true) {
			if(args[0]===`out`) {
				database.set(`dungeon_${message.author.id}`, false)
				const Embed=new Discord.MessageEmbed()
					.setTitle(`Dungeon`)
					.setDescription(bseason.Script.dungeon.out)
					.setImage(bseason.dungeon.images.dungeon_in_out)
					.setTimestamp()
					.setFooter(`Dungeon_event off`)
				return message.channel.send(Embed)
			}
			else if(args[0]===`explorar`) {
				var keyD;
				if(energycharge<0) {return message.channel.send(`você não tem energia suficiente`)} 
			//	database.set(`ebar_${message.author.id}`,energycharge-=1)
				return message.channel.send(dungeonM("Def", Discord, message))
			}
			else if(args[0]===`atacar`) {
				if(energycharge<0) {return message.channel.send(`você não tem energia suficiente`)}
			//	database.set(`ebar_${message.author.id}`,energycharge-=1)
				message.channel.send(dungeonM("battle", Discord, message, money))
				return database.set(`lbar_${message.author.id}`, livecharge)
			}
		}
	}
	else {return}
}
module.exports = commandList;