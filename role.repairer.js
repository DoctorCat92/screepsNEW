var roleRepairer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        if (creep.carry.energy == 0) {
            creep.memory.bag = 'empty';
            creep.memory.repairer = false;
            creep.memory.building = false;
            delete creep.memory.target;
        }

        if(creep.memory.repairer && (creep.carry.energy == 0 || creep.memory.target == undefined)) {
            creep.memory.repairer = false;
            creep.memory.building = false;
            creep.say('harvesting');
	    }
	    let Targets = creep.room.find(FIND_STRUCTURES, {filter: structure => structure.hits < structure.hitsMax}); 
	    if(!creep.memory.repairer && creep.carry.energy == creep.carryCapacity && Targets.length > 0) {
	        Targets.sort((a,b) => a.hits - b.hits);
	        creep.memory.target = Targets[0].id;
	        creep.memory.repairer = true;
	        creep.memory.building = false;
	        creep.memory.bag = 'full'
	        creep.say('repairing');
	    }
	    
	    if (Targets.length == 0 && creep.carry.energy == creep.carryCapacity && !creep.memory.repairer && !creep.memory.building) {
	        creep.memory.building = true;
	        creep.memory.repairer = false;
	        creep.memory.bag = 'full'
	        creep.say('building');
	    }
	    
	    
          /*hitsMax*/
        
        var RepairTarget = Game.flags.RepairTarget;
        var rangesRepair = creep.pos.getRangeTo(RepairTarget);
        var Numbers = creep.memory.roomNumber;
        
        if(creep.memory.repairer) {
            let targets = Game.getObjectById(creep.memory.target);
            
            if (RepairTarget) {
               var RepairFlagRoom = Game.flags.RepairTarget.pos.roomName;
            if (Numbers == RepairFlagRoom) {
                var RepairFlagRoom = Game.flags.RepairTarget.pos.roomName;
                var PosFlag = Game.flags.RepairTarget.pos;
                var Look = creep.room.lookAt(RepairTarget);
                
                //(Look[i].type == 'creep') &&
                
            if (rangesRepair > 3) {
                    creep.travelTo(RepairTarget,ignoreRoads = true);
                } else if (rangesRepair <= 3) {
                    for (var i=0;i < Look.length;i++) {
                        if (Look[i].type == 'structure') {
                            creep.repair(Look[i].structure);
                            if (Look[i].structure.hits > (Look[i].structure.hitsMax-1000)) {
                                Game.notify('ÃÂÃÂÃÂÃÂÃÂÃÂ¸ÃÂÃÂ¿ÃÂÃÂ ÃÂÃÂ¿ÃÂÃÂ¾ÃÂÃÂÃÂÃÂ¸ÃÂÃÂ½ÃÂÃÂ¸ÃÂÃÂ»ÃÂÃÂ¸ ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ¾ÃÂÃÂµÃÂÃÂ½ÃÂÃÂ¸ÃÂÃÂµ ÃÂÃÂ² ÃÂÃÂºÃÂÃÂ¾ÃÂÃÂ¼ÃÂÃÂ½ÃÂÃÂ°ÃÂÃÂÃÂÃÂµ '+Numbers, 0);
                                Game.flags.RepairTarget.remove();
                            }
                        }
                    }
                }
            }
        } else if (targets) {
                creep.room.visual.line(creep.pos, targets.pos ,{color: 'red', lineStyle: 'dashed'});
                if(creep.repair(targets) == ERR_NOT_IN_RANGE) {
                    creep.travelTo(targets);
                } else if (creep.repair(targets) == ERR_INVALID_TARGET) {
                    delete creep.memory.target;
                } 

                if (targets.hits >= targets.hitsMax) {
                    delete creep.memory.target;
                    Targets.sort((a,b) => a.hits - b.hits);
	                creep.memory.target = Targets[0].id;
                }
            } else if (targets == undefined) {
                delete creep.memory.target;
            } else {
                delete creep.memory.target;
            }
        } 
        if (creep.memory.building) {
            var buildTarget = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(buildTarget.length > 0) {
                if(creep.build(buildTarget[0]) == ERR_NOT_IN_RANGE) {
                    creep.travelTo(buildTarget[0]);
                }
                if ((buildTarget.length == 1) && (buildTarget[0].progress >= buildTarget[0].progressTotal - 50)) {Game.notify('Creeps complited construction in room '+creep.pos.roomName, 0);}
            }
        } creep.say('Пиписька');
        if (!creep.memory.repairer && !creep.memory.building) {
            var sources = creep.pos.findClosestByPath(FIND_SOURCES);
            var Storage = creep.room.find(FIND_CONSTRUCTION_SITES, {filter: structure => ((structure.structureType == STRUCTURE_STORAGE) && (structure.store[RESOURCE_ENERGY] > 500000))});

            creep.say(Storage[0].id);
            if (Storage[0]) {
                if(creep.withdraw(Storage[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.travelTo(Storage[0]);
                }
            } else if (sources) {
                if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                    creep.travelTo(sources);
                }
            } 
        }
	}
};

module.exports = roleRepairer;