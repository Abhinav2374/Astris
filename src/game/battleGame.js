const {Battle}= require('./BattleSystem')
const {getRandomEnemy} = require('./Enemy')

let activeBattle = null;

function startBattle(channel) {
    if(activeBattle){
        channel.send("⚠️ A battle is already in progress!");
        return;
    }
    const enemy = getRandomEnemy();
    activeBattle = new Battle(channel, enemy);
}

function attackPlayer(user) {
    if (activeBattle) {
        activeBattle.playerAttack(user);
    }
}

function quitBattle() {
    activeBattle = null;
    channel.send(`⚠️ Battle ended`);
}

module.exports = {startBattle,attackPlayer,quitBattle};