/*
* Dungeon Machine V:2.0.5
* version < 2.0.4 dont suport
--------------------------------------------------------------------------------------- */
// Requires
const system=require('./dungeon_system.json')
const bseason=require("./BotAndSeason.json") // update this
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
    /*  ------------------------------------
        D1: if's-action-block | Recive argsType
        ------------------------------------ */
    if(argsType==="in") {
        const Embed=new Discord.MessageEmbed()
            .setTitle(`Dungeon | Andar: ` + database.get(`DungeonFloor_${message.author.id}`))
            .setDescription(bseason.Script.dungeon.in) // update this block
            .addFields({name: bseason.Script.dungeon.commands, value: '\u200b', inline: false})
            .setImage(bseason.dungeon.images.dungeon_in_out)
            .setTimestamp()
            .setFooter(`Dungeon_event on`)
        return message.channel.send(Embed)
    }
    if(argsType==="out") {
        if(database.get(`dungeon_${message.author.id}`)!==true) {return 'você não esta dentro de uma dungeon'}
        else if(database.get(`mobID_${message.author.id}`)!==null) {return 'você está em batalha'}
        else{
            database.set(`dungeon_${message.author.id}`, false)
            const Embed=new Discord.MessageEmbed()
                .setTitle(`Dungeon`)
                .setDescription(bseason.Script.dungeon.out)
                .setImage(bseason.dungeon.images.dungeon_in_out)
                .setTimestamp()
                .setFooter(`Dungeon_event off`)
            return message.channel.send(Embed)
        }
    }
    /*  commands in dungeon
        explorer commands   */
    else if(argsType==="explorer") {
        if(database.get(`mobID_${message.author.id}`)!==null) {return 'você está em batalha'}
        // call random => 50% = true or false
        if(getRandomIntInclusive(system.explorationChance.mim, system.explorationChance.max)===0) {
            return Explorer_FALSE_EMBED()
        }
        else {
            return Explorer_TRUE_EMBED(message)
        }
    }
    // attack command
    else if(argsType==="attack") {
        if(database.get(`mobID_${message.author.id}`)===null) {return 'você não encontrou nenhum mob'}
        return BattleMode(message)
    }
    // test command
    else if(argsType==="test") {
        database.set(`lbar_${message.author.id}`, 1)
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
    function BattleMode(message) {
        // player attack
        if(database.get(`lbar_${message.author.id}`)<=0) {return console.log('jogador morreu')}
        var PlayerDamage = Math.round(database.get(`damage_${message.author.id}`)-database.get(`mobID_${message.author.id}.defense`))
        if(PlayerDamage<=0) {PlayerDamage=0}
        else {database.subtract(`mobID_${message.author.id}.life`, PlayerDamage)}
        // mob attack
        if(database.get(`mobID_${message.author.id}.life`)<=0) {return MobDead(message)}
        var MobDamage = Math.round(database.get(`mobID_${message.author.id}.damage`)-database.get(`def_${message.author.id}`))
        if(MobDamage<=0) {MobDamage=0}
        else{database.subtract(`lbar_${message.author.id}`, MobDamage)}
        // anti bug
        if(database.get(`lbar_${message.author.id}`)<=0) {return PlayerDead(message)}
        //damage embed
        console.log('vida do jogador: '+database.get(`lbar_${message.author.id}`)+' seu dano '+PlayerDamage+'\nvida do mob: '+database.get(`mobID_${message.author.id}.life`)+' dano do mob '+MobDamage)
        const Embed=new Discord.MessageEmbed()
            .setTitle('Dungeon: Andar: '+ database.get(`DungeonFloor_${message.author.id}`))
            .setDescription('você atacou o mob causando ' +PlayerDamage+' de dano e ele te atacou causando ' +MobDamage+ ' de dano' )
        return Embed;
    }
    function PlayerDead(message) {
        const Embed=new Discord.MessageEmbed()
            .setTitle('Dungeon: Andar: '+ database.get(`DungeonFloor_${message.author.id}`))
            .setDescription('você morreu batalhando com um '+database.get(`mobID_${message.author.id}.name`))
            .setTimestamp()
            .setFooter('Dungeon_event off')
        database.delete(`mobID_${message.author.id}`)
        database.set(`dungeon_${message.author.id}`, false)
        return Embed;
    }
    function MobDead(message) {
        const Embed=new Discord.MessageEmbed()
            .setTitle('Dungeon: Andar: '+ database.get(`DungeonFloor_${message.author.id}`))
            .setDescription('você matou o mob'+database.get(`mobID_${message.author.id}.name`)+' e ele dropou um núcleo estilhaçado que vale 5 moedas')
            .setTimestamp()
            .setFooter('Dungeon_event on')
        database.add(`money_${message.author.id}`)
        database.delete(`mobID_${message.author.id}`)            
        return Embed;
    }
}
//  --- END ---
module.exports = dungeonM;