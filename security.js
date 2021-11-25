/* security.js
 * V: 1.0
*/
//not work
async function Security(command, message) {
	var myString=command
	var splits = myString.split('/');
	for(var i=0; i<10; i++) {
		if(splits[i]==='discord.gg'){
			await message.delete({timeout:1})
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