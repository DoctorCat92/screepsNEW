roleBuilder = {
     
    /** @param {Creep} creep    
        flag2 = Game.flags['Flag2'];
        creep.moveTo(flag2);
    **/
    run: function(creep) {
        
        
        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        
        if (creep.carry.energy == 0) {creep.memory.bag = 'empty';}

	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('harvesting');
	    }
	    if((!creep.memory.building) && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.memory.bag = 'full';
	        creep.say('building');
	    }
 
            var MoveBuilderAll = Game.flags.MoveBuilderAll;
            var Numbers = creep.memory.roomNumber;
                     
            if (MoveBuilderAll) {
                
              var PosFlag = Game.flags.MoveBuilderAll.pos.roomName;
              var PosCreep = creep.pos.roomName;  
            
                if (PosFlag !== PosCreep ) {
                    creep.moveTo(MoveBuilderAll);
                    
                }else if (PosFlag == PosCreep) { 
                             
	                if (creep.memory.building) {
	                   var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                            if(targets.length) {
                                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                                    creep.moveTo(targets[0]);
                                }
                                if ((targets.length == 1) && (targets[0].progress >= targets[0].progressTotal - 50)) {Game.notify('ÃÂÃÂÃÂÃÂÃÂÃÂ¸ÃÂÃÂ¿ÃÂÃÂ ÃÂÃÂ¿ÃÂÃÂ¾ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ¾ÃÂÃÂ¸ÃÂÃÂ»ÃÂÃÂ¸ ÃÂÃÂ²ÃÂÃÂÃÂÃÂµ ÃÂÃÂ·ÃÂÃÂ´ÃÂÃÂ°ÃÂÃÂ½ÃÂÃÂ¸ÃÂÃÂ ÃÂÃÂ² ÃÂÃÂºÃÂÃÂ¾ÃÂÃÂ¼ÃÂÃÂ½ÃÂÃÂ°ÃÂÃÂÃÂÃÂµ '+PosCreep, 0);}  
                            }
	                } else {
	                   var sources = creep.pos.findClosestByPath(FIND_SOURCES);
                            if(creep.harvest(sources) == ERR_NOT_IN_RANGE) { //ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ¯ÃÂÃÂ¢ÃÂÃÂ¬ ÃÂÃÂÃÂÃÂ 0 ÃÂÃÂ¸ÃÂÃÂ»ÃÂÃÂ¸ 1
                                creep.moveTo(sources); 
                            } 	   
                    }
	            }
	            
            } else if (!MoveBuilderAll) {
                var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                var buildTargets = creep.room.find(FIND_CONSTRUCTION_SITES);
                
                var PosCreep = creep.pos.roomName;  
	                if (creep.memory.building && (targets.length > 0)) {
                        if(targets.length) {
                            creep.say(Math.round((targets[0].progress/targets[0].progressTotal)*100)+'%');
                            if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                                creep.travelTo(targets[0]);
                            }
                            if ((targets.length == 1) && (targets[0].progress >= targets[0].progressTotal - 50)) {Game.notify('ÃÂÃÂÃÂÃÂÃÂÃÂ¸ÃÂÃÂ¿ÃÂÃÂ ÃÂÃÂ¿ÃÂÃÂ¾ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ¾ÃÂÃÂ¸ÃÂÃÂ»ÃÂÃÂ¸ ÃÂÃÂ²ÃÂÃÂÃÂÃÂµ ÃÂÃÂ·ÃÂÃÂ´ÃÂÃÂ°ÃÂÃÂ½ÃÂÃÂ¸ÃÂÃÂ ÃÂÃÂ² ÃÂÃÂºÃÂÃÂ¾ÃÂÃÂ¼ÃÂÃÂ½ÃÂÃÂ°ÃÂÃÂÃÂÃÂµ '+PosCreep, 0);}
                        }
	                } else if ((targets.length == 0) && creep.memory.building) {
	                    
                        var repairers = creep.room.find(FIND_STRUCTURES, {filter: structure => ((structure.structureType == STRUCTURE_WALL) || (structure.structureType == STRUCTURE_RAMPART)) && (structure.hits < structure.hitsMax)});
                            repairers.sort((a,b) => a.hits - b.hits);
                            if(repairers.length > 0) {
                                    if(creep.repair(repairers[0]) == ERR_NOT_IN_RANGE) {
                                    creep.moveTo(repairers[0]);
                                    }
                            }
                    } else {
                        var source = creep.pos.findClosestByPath(FIND_SOURCES); 
                        var Ruins = creep.pos.findClosestByPath(FIND_RUINS, {filter: object => object.store[RESOURCE_ENERGY] > 0}); 
                        var MassStorage = creep.room.find(FIND_STRUCTURES, {filter: object => (object.structureType == STRUCTURE_STORAGE) && object.store[RESOURCE_ENERGY] > 50000});
                        var Terminal = creep.room.find(FIND_STRUCTURES, {filter: object => (object.structureType == STRUCTURE_TERMINAL) && object.store[RESOURCE_ENERGY] > 50000});
                        var Container = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: object => (object.structureType == STRUCTURE_CONTAINER) && object.store[RESOURCE_ENERGY] >= creep.store.getCapacity()}); 
                        
                        var ArrayTargets = [];
                        
                        /**if (Ruins) {
                            if(creep.withdraw(Ruins, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                creep.travelTo(Ruins);
                            }
                        } else if (MassStorage.length > 0) {
                            if(creep.withdraw(MassStorage[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                creep.travelTo(MassStorage[0]);
                            }
                        } else if (Container) {
                            if(creep.withdraw(Container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                creep.travelTo(Container);
                            }
                        } else if (Terminal.length > 0) { ;
                            if(creep.withdraw(Terminal[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                creep.travelTo(Terminal[0]);
                            }
                        } else {
                            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                                creep.travelTo(source);
                            }
                        }  **/  
                        
                        if (Ruins) {
                            ArrayTargets.push(Ruins);
                        }
                        if (MassStorage.length > 0) {
                            ArrayTargets.push(MassStorage[0]);
                        }
                        if (Container) {
                            ArrayTargets.push(Container);
                        }
                        if (Terminal) {
                            ArrayTargets.push(Terminal[0]);
                        }

                        if (ArrayTargets.length > 1) {
                            console.log("Массив"+ArrayTargets);
                            var ClosestTarget = creep.pos.findClosestByPath(ArrayTargets);
                        }
                         
                        
                        if (ClosestTarget) {
                            if(creep.withdraw(ClosestTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                creep.travelTo(ClosestTarget);
                            }
                        } else {
                            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                                creep.travelTo(source);
                            }
                        }
                        
                    }
            }     
	}
};

module.exports = roleBuilder;