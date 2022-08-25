var processProtection = {

    run: function(process) {
        
         var Towers = Game.rooms[process.Room].find(FIND_STRUCTURES, {filter: object => (object.structureType == STRUCTURE_TOWER)});

        if (Towers.length > 0) {

            let TowersAttack = Game.flags.TowersAttack;

            if (TowersAttack) {
                let look = Game.rooms[process.Room].lookForAt(LOOK_STRUCTURES, TowersAttack);
                if (look.length > 0) {
                    for (let i=0; i<Towers.length; i++) {    
                        Towers[i].attack(look[0]);
                    }  
                }
            }

            var closestHostileHealer = Game.rooms[process.Room].find(FIND_HOSTILE_CREEPS, {
                filter: function(object) {
                    return object.getActiveBodyparts(HEAL) > 0;
                }
            });
            let closestHostileAttacker = Game.rooms[process.Room].find(FIND_HOSTILE_CREEPS);

            if(closestHostileHealer.length > 0) {     
                for (let i=0; i<Towers.length; i++) {    
                    Towers[i].attack(closestHostileHealer[0]);
                }   
            } else if (closestHostileAttacker.length > 0)  {
                for (let i=0; i<Towers.length; i++) {
                    Towers[i].attack(closestHostileAttacker[0]);
                }
            } 
            var Walls = Game.rooms[process.Room].find(FIND_STRUCTURES, {filter: structure => (structure.hits < 10000) && (structure.structureType == STRUCTURE_RAMPART)});  
            Walls.sort((a,b) => a.hits - b.hits);
            if (Walls.length > 0) {
                for (let i=0; i<(Towers.length/2); i++) {
                    if(Towers[i].store[RESOURCE_ENERGY] > 500) {
                        
                        if(Walls.length >0) {
                            Towers[i].repair(Walls[0]);
                        }
                    }
                }
            }
        }
    
    } 
}   

module.exports = processProtection;