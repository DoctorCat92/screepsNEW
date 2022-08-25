var roleDefender = {

    /** @param {Creep} creep **/
   run: function(creep) {
            
            
            var bunker = creep.room.find(FIND_MY_STRUCTURES, {filter: { structureType: STRUCTURE_RAMPART }});
            
            for (var i=0;i<bunker.length;i++) {
                 var bunkerBusy = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender' && creep.memory.bunker == i);
                if (bunkerBusy.length == 0) {
                    creep.memory.bunker = bunker[i].id;
                } else if ((creep.memory.bunker == undefined) && (bunkerBusy.length == 0)) {
                    creep.memory.bunker = bunker[i].id;
                }
            }
        //creep.say(creep.memory.bunker); ÃÂÃÂ´ÃÂÃÂ¾ÃÂÃÂ±ÃÂÃÂ°ÃÂÃÂ²ÃÂÃÂ»ÃÂÃÂµÃÂÃÂ½ÃÂÃÂ¾ ÃÂÃÂ´ÃÂÃÂ»ÃÂÃÂ ÃÂÃÂÃÂÃÂµÃÂÃÂÃÂÃÂÃÂÃÂ°
                
                var targets = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS,3);
                var bunker = creep.room.find(FIND_MY_STRUCTURES, {filter: { structureType: STRUCTURE_RAMPART }});
                var targetCreep = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
	            var rangesCreep = creep.pos.getRangeTo(targetCreep);
                
                if (bunker.length > 0) {
                    creep.moveTo(bunker[creep.memory.bunker]);
                        if(targets) {
                            creep.rangedAttack(targets[0]);
                        }
                } else {
                    if(rangesCreep <= 3) {
                        creep.rangedAttack(targetCreep);
                    }
                    if(rangesCreep > 3) {
                        creep.moveTo(targetCreep);
                    }
                }  
                
                    

     	        
    
	        
            
            

        }
    }

module.exports = roleDefender;
