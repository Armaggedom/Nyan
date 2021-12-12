/*
* Dungeon Machine V:2.0.3 original version-OffLine
* Arq V:2.0.3.5
* version < 2.0.3.5 dont suport
* Rebulding ALL code, final version 2.0.4
* need to add: attack, win, lose
--------------------------------------------------------------------------------------- */
// Requires
const system=require('./dungeon_system.json')
// Random machine
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
/*  ------------------------------------
main-machine-block
------------------------------------ */
function dungeonM(argsType, message) {
    // Recive argsType
    if(argsType==="in") {
        const Embed=new Discord.MessageEmbed()
            .setTitle(`Dungeon | Andar: ` + database.get(`DungeonFloor_${message.author.id}`))
            .setDescription(bseason.Script.dungeon.in)
            .addFields({name: bseason.Script.dungeon.commands, value: '\u200b', inline: false})
            .setImage(bseason.dungeon.images.dungeon_in_out)
            .setTimestamp()
            .setFooter(`Dungeon_event on`)
        return message.channel.send(Embed)
    }
    // in the dungeon
    if(argsType==="explorer") {
        //return
        if(database.get(`mobID_${message.author.id}`)!==null) {return 'você está em batalha'}
        //explorer command
        if(getRandomIntInclusive(system.explorationChance.mim, system.explorationChance.max)===0) {
            return Explorer_FALSE_EMBED()
        }
        else {
            return Explorer_TRUE_EMBED(message)
        }
    }
    else if(argsType==="test") {
        return database.delete(`mobID_${message.author.id}`)
    }
    else{return};
    /*  ------------------------------------
    F1: functions-block-embed
    ------------------------------------ */
    return Explorer_FALSE_EMBED()
    function Explorer_TRUE_EMBED(message) {
        //create mob
        return CreateMob(message)
    }
    function Explorer_FALSE_EMBED() {
        const Embed=new Discord.MessageEmbed()
            .setTitle('Dungeon: Andar: '+ database.get(`DungeonFloor_${message.author.id}`))
            .setDescription('você explorou esse andar mas não encontrou nada')
            .setTimestamp()
            .setFooter('Dungeon_event on')
        return Embed;
    }
    /*  ------------------------------------
    F2: functions-block-Mob
    ------------------------------------ */
    function CreateMob(message) {
        database.push(`mobID_${message.author.id}.ID`, getRandomIntInclusive(system.mobNumber.min, system.mobNumber.max))
        database.push(`mobID_${message.author.id}.name`, system.MobID[database.get(`mobID_${message.author.id}.ID`)].Mob.Name)
        database.push(`mobID_${message.author.id}.life`, system.MobID[database.get(`mobID_${message.author.id}.ID`)].Mob.Life)
        database.push(`mobID_${message.author.id}.defense`, system.MobID[database.get(`mobID_${message.author.id}.ID`)].Mob.Defense)
        database.push(`mobID_${message.author.id}.damage`, system.MobID[database.get(`mobID_${message.author.id}.ID`)].Mob.Damage)
        const Embed=new Discord.MessageEmbed()
            .setTitle('Dungeon: Andar: '+ database.get(`DungeonFloor_${message.author.id}`))
            .setDescription('você encontrou um mob')
            .addFields({name: `Nome:`, value: `${database.get(`mobID_${message.author.id}.name`)}`, inline: false})
            .addFields({name: `Life:`, value: `\`\`\`${database.get(`mobID_${message.author.id}.life`)}\`\`\``, inline: true})
            .addFields({name: `Defesa:`, value: `\`\`\`${database.get(`mobID_${message.author.id}.defense`)}\`\`\``, inline: true})
            .addFields({name: `Ataque:`, value: `\`\`\`${database.get(`mobID_${message.author.id}.damage`)}\`\`\``, inline: true})
            .setTimestamp()
            .setFooter('mob ID: '+ database.get(`mobID_${message.author.id}.ID`))
        return Embed;
    }
}
//  --- END ---
module.exports = dungeonM;