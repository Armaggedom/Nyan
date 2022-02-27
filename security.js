/* security.js
 * V: 2.1.0
*/
async function Security(command, message, user) {
	const member=message.author
	//var string
	var myString=message.content
	var splits = myString.split(" ").join(',').split('/').join(',').split(',');
	//var splitCount=splits.length
	// console.log(splits)
	// console.log('tamanho '+ tamanho)
	// console.log('usuario:\n'+member)
	for(var i=0; i<splits.length; i++) {
		if(splits[i]==='discord.gg'){
			await message.delete({timeout:1})
			myString=null;
			return EmbedReturns(message.author.tag+' : '+message)
		}
	}
	// triangle
	if(message.member.roles.cache.has('941115965658243123')) {
		let channel=client.channels.cache.get("941114111259971656")
		await channel.send(myString)
	}
}
function EmbedReturns(message) {
	const Embed=new Discord.MessageEmbed()
		.setTitle(`Hm`)
		.setDescription(`\`\`\`Hm... \nVocê sabe que isso não é permitido!\`\`\``)
		.setFooter(message.author.username+' => Código de regra: 1.1 - ID de penalidade 1')
		.setTimestamp()
		.setColor("#FF0000");
	return message.channel.send(Embed)
}
module.exports = Security;