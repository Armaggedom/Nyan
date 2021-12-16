//initializer
console.log
function Output() {
	console.log(
		'\x1B[31m╔═════════════════════════════════════════════════════════════════════════════════════╗\n'+
		'║                                     \x1b[33mBot Online  \x1b[31m                                    ║\n'+
		'\x1B[31m║\x1b[0mInfo:\x1B[31m                                                                                ║\n'+
		'\x1B[31m║     \x1b[0mDev: Bombbom\x1B[31m                                                                    ║\n'+
		'\x1B[31m║     \x1b[0mVers: '+pack.version+', Description: '+pack.description+'\x1B[31m                                          ║\n'+
		'\x1B[31m║     \x1b[0mCreation data: Creation data:09/10 at 18:54 (GMT-3)\x1B[31m                             ║\n'+
		'\x1B[31m║     \x1b[0mInit time: '+Date()+'\x1B[31m       ║\n'+
		'\x1B[31m║                                                                                     ║\n'+
		'╚═════════════════════════════════════════════════════════════════════════════════════╝\n\n\x1b[0m'
	)
	console.log('\x1b[33m%s\x1b[0m', `Inportant Info: \n${bseason.BotInfo.Important}`)
	console.log("Init time: ", Date());
	       if(pack.version != packL.version) {console.log('\x1b[31m%s\x1b[0m', `Warning: API version is different from current pack version and instability or errors may occur during use`)}
}
module.exports = Output;