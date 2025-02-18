class Battle {
    constructor(channel,enemy,endBattleCallback){
        this.channel = channel;
        this.enemy = {...enemy};
        this.players = new Map();
        this.active = true;
        this.endBattleCallback = endBattleCallback;
        this.start();
    }
    async start(){
        await this.channel.send(`⚔️ A wild **${this.enemy.name}** appeared ! Type **attack** to fight`);
        this.enemyAttackLoop();
    }

    playerAttack(user){
        if(!this.active) return;
        if(!this.players.has(user.id)){
            this.players.set(user.id,{health : 100, attack :10});
        }

        const player = this.players.get(user.id);
        const damage = Math.max(player.attack - this.enemy.defense, 1);
        this.enemy.health -= damage;

        if(this.enemy.health < 0){
            this.channel.send(`🎉 **${this.enemy.name}** has been defeated`);
            this.active = false;;
            if (this.endBattleCallback) {
                this.endBattleCallback();
            }
        }else{
            this.channel.send(`💥 **${user.username}** attacked **${this.enemy.name}** for **${damage}** damage! Enemy health : **${this.enemy.health}**`);
        }
    }

    async enemyAttackLoop() {
        while(this.active && this.enemy.health > 0) {
            await new Promise(resolve => setTimeout(resolve,this.enemy.speed));
            this.enemyAttack();
        }
    }

    enemyAttack(){
        if (this.players.size === 0) return;
        const playerIds = [...this.players.keys()];
        const targetId = playerIds[Math.floor(Math.random()* playerIds.length)];
        const player = this.players.get(targetId);
        const damage = Math.max(this.enemy.attack - 3, 1);
        player.health -= damage;

        this.channel.send(`🔥 **${this.enemy.name}** attacked **<@${targetId}>** for **${damage}** damage! Player health: ${player.health}`)

        if(player.health < 0){
            this.channel.send(`💀 **<@${targetId}>** has been defeated!`);
            this.players.delete(targetId);
            if(this.players.size === 0) {
                this.channel.send(`☠️ The **${this.enemy.name}** has won!`);
                this.active = false;
                if (this.endBattleCallback) {
                    this.endBattleCallback();
                }
            }
        }

    }
}

module.exports = {Battle};
