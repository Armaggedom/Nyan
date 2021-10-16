const bseason=require("./BotAndSeason.json")
function commandList(command, message, prefix, Discord, random_chance,intelligence, strength, vitality, money, mana, database, defense) {
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
	if(command===`${prefix}test`){return message.reply(`estou falando diretamente do arquivo command_modules.js \nEstou crescendo ein, ja to com 2 .js, 4 .json e 1 Procfile hih`)};
	/*  ------------------------------------
		default-command-block
		----,-------------------------------- */
	if(command===`${prefix}help`) {
		const Embed=new Discord.MessageEmbed()
			.setTitle(`Help`)
			.setDescription(`RPG bot:\nBot de RPG\nseason info:\n${bseason.SeasonControl.infoSeason}`)
			.addFields({name: `Comandos: prefixo: '${prefix}'`, value: `\`\`\`${bseason.BotInfo.comandos}\`\`\``, inline: true})
			.addFields({name: `novidades:`, value: `\`\`\`${bseason.BotInfo.New}\`\`\``,inline: true})
			.setFooter(`RPG Bot (project OWT) - Creator: キャンディー \nVersion: pt-br`)
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
					.addFields({name: `inteligência`, value: `\`\`\`${intelligence}\`\`\``, inline: false})
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
				+'```\n'+'dano p/atk: '+strength
				+'\n'+'defesa: '+defense+'```'
			)
		} 
		else {
			return message.channel.send(`você não tem magia`)
		}
	}
	else if(command===`${prefix}usemanapotion`) {
		if(database.get(`mana_${message.author.id}`)===0) {
			return message.channel.send(`poções de mana não ajudam quem não tem magia`)
		}
		else {
			if(bseason.DevControl.Developing===false | message.author.id === bseason.DevControl.IDs.Dev1) {
				database.set(`mbar_${message.author.id}`, bseason.player.stats.mana.Lv[mana])
				return message.channel.send(`você usou uma poção de mana`)
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
	   	return message.channel.send(`você trabalhou na fronteira do país e ganhou o salário por ser um inspetor de fronteira \ngahou um total de ${bseason.Economic.Wage.InspectorSal}yans`)
	}
	//money out
	else if(command===`${prefix}loja`) {
	  	
	  	if(bseason.DevControl.Developing!==false & message.author.id !== bseason.DevControl.IDs.Dev1) {return 1}
		if(bseason.Economic.Shop.Open===true) {
		   	const Embed=new Discord.MessageEmbed()
			.setTitle(`Loja`)
			.setDescription(`${bseason.Script.Shops.Open}`)
			return message.channel.send(Embed)
		}
		else {
			const Embed=new Discord.MessageEmbed()
				.setTitle(`Loja`)
				.setDescription(`${bseason.Script.Shops.Close}`)
			return message.channel.send(Embed)
		  }
	}
	/*  ------------------------------------
		interact-comand-block
	    ------------------------------------ */
	else if(command===`${prefix}estudar`){random_chance(bseason.habilitLevel.min, bseason.habilitLevel.max, 0, 0, 0) }
	else if(command===`${prefix}correr`){random_chance(bseason.habilitLevel.min, bseason.habilitLevel.max, 1, 1, 1)}
	else if(command===`${prefix}academia`){random_chance(bseason.habilitLevel.min, bseason.habilitLevel.max, 2, 2, 2)}
	else if(command===`${prefix}treinarresistência`){random_chance(bseason.habilitLevel.min, bseason.habilitLevel.max, 3, 3, 3)}
	else if(command===`${prefix}treinarmana`){random_chance(bseason.habilitLevel.min, bseason.habilitLevel.max, 4, 4, 4)}
	/*  ------------------------------------
		interact-comand-block
	    ------------------------------------ */
	else if(command===`${prefix}dungeon`) {
		if(bseason.DevControl.Developing===false | message.author.id === bseason.DevControl.IDs.Dev1) {}
	}
	else {return}
}
module.exports = commandList;
