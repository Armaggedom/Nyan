/* security.js
 * V: 2.0
*/
async function Security(command, message, user) {
	const member=message.author
	//var string
	var myString=message.content
	var splits = myString.split(" ").join(',').split('/').join(',').split(',');
	console.log(splits)
	console.log('usuario:\n'+member)
	if(message.member.roles.cache.has('941115965658243123')) {
		let channel=client.channels.cache.get("941114111259971656")
		await channel.send(myString)
	}
	for(var i=0; i<10; i++) {
		if(splits[i]==='discord.gg'){
			await message.delete({timeout:1})
			myString=null;
			return EmbedReturns(message.author.tag+' : '+message)
		}
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