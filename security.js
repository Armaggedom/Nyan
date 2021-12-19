/* security.js
 * V: 1.1
*/
async function Security(command, message) {
	var myString=message.content
	var splits = myString.split(" ").join(',').split('/').join(',').split(',');
	console.log(splits)

	for(var i=0; i<10; i++) {
		if(splits[i]==='discord.gg'){
			await message.delete({timeout:1})
			myString=null;
			return EmbedReturns(message)
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