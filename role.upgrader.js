var roleUpgrader = {

    
    run: function(creep) {
        
        if (creep.carry.energy == 0) {
            creep.memory.upgrader = false;
        }
        
        if (creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrader = true;
        }
        
        if(creep.memory.upgrader) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.travelTo(creep.room.controller);
            }
        }
        
        if(!creep.memory.upgrader) {
            var source = creep.pos.findClosestByPath(FIND_SOURCES, {filter: object => object.energy > creep.store.getCapacity()});
            var MassStorage = creep.room.find(FIND_STRUCTURES, {filter: object => (object.structureType == STRUCTURE_STORAGE) && object.store[RESOURCE_ENERGY] > 500000});
            var Links = creep.room.find(FIND_STRUCTURES, {filter: object => (object.structureType == STRUCTURE_LINK) && object.store[RESOURCE_ENERGY] > 0});
            var Terminal = creep.room.find(FIND_STRUCTURES, {filter: object => (object.structureType == STRUCTURE_TERMINAL) && object.store[RESOURCE_ENERGY] > 50000});
            
              
            if (Links[3])  {
                if(creep.withdraw(Links[3], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.travelTo(Links[3]); 
                }
            } else if (MassStorage[0]) { 
                if (creep.room.controller.level > 0) { 
                    if(creep.withdraw(MassStorage[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.travelTo(MassStorage[0]);
                    } 
                }
                
            } else if (!MassStorage[0] && (!Links[3] || (Links[3] && Links[3].store[RESOURCE_ENERGY] == 0))) {
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.travelTo(source);
                }
            } else
            if (!source) {
                let sources = creep.room.find(FIND_SOURCES, {filter: object => object.energy >= 0});
                creep.say('hi');
                let RegSource = _.sortBy(sources, ['ticksToRegeneration']);
                    if (creep.harvest(RegSource[0]) == ERR_NOT_IN_RANGE) {
                        creep.travelTo(RegSource[0]);
                    }
               
            } else { 
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.travelTo(source);
                }
            }
            
        }

                                                
	}
};


module.exports = roleUpgrader;  