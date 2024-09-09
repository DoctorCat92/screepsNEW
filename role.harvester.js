var roleHarvester = {

   
run: function(creep) {
    
        switch (creep.memory.options){
        
        case 1:    
            
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_TOWER) && (structure.store[RESOURCE_ENERGY] < structure.store.getCapacity(RESOURCE_ENERGY));
            }
        }); 

        creep.say(targets.length);
            
        if (creep.carry.energy == 0) {
            creep.memory.upgrader = false;
            creep.memory.harvester = false;
            creep.memory.builder = false;
        }
        
        if (creep.store[RESOURCE_ENERGY] == creep.store.getCapacity() && (!creep.memory.harvester && !creep.memory.upgrader && !creep.memory.builder)) {
            
            
            
            var buildTarget = creep.room.find(FIND_CONSTRUCTION_SITES);
            //creep.say(targets.length);
            if (targets.length > 0) {
                creep.say(targets.length);
                creep.memory.harvester = true;
            } else if (buildTarget.length > 0) {
                creep.memory.builder = true;
            } else if (targets.length == 0 && buildTarget.length == 0) {
                creep.memory.upgrader = true;
            }
            
        } 
       
        if (creep.memory.builder) {
            var buildTarget = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(buildTarget.length > 0) {
                if(creep.build(buildTarget[0]) == ERR_NOT_IN_RANGE) {
                    creep.travelTo(buildTarget[0]);
                }
                if ((buildTarget.length == 1) && (buildTarget[0].progress >= buildTarget[0].progressTotal - 50)) {Game.notify('Creeps complited construction in room '+creep.pos.roomName, 0);}
            }
        }
        
        if (creep.memory.harvester) {
            var targets = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_SPAWN ||
                            structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_TOWER) && (structure.energy < structure.energyCapacity);
                }
            }); 
            
            if(creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.travelTo(targets);
            } else if (creep.transfer(targets, RESOURCE_ENERGY) == ERR_FULL) {
                creep.memory.upgrader = false;
                creep.memory.harvester = false;
            } else {
                creep.memory.upgrader = false;
                creep.memory.harvester = false;
            }
        }
        
        if (creep.memory.upgrader) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.travelTo(creep.room.controller);
            }
        }
        
        if (!creep.memory.harvester && !creep.memory.upgrader && !creep.memory.builder) {
            var container = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: object => (object.structureType == STRUCTURE_CONTAINER) && object.store[RESOURCE_ENERGY] > 0});
            var sources = creep.pos.findClosestByPath(FIND_SOURCES);
      
            if (container) {    
                if(creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) { 
                    creep.travelTo(container);
                }
            } else {
                if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                    creep.travelTo(sources);
                }
            }
            
        }
        
        
        
	   
        break;
        
        case 2:
        
   //ÃÂÃÂ¿ÃÂÃÂ¾ÃÂÃÂ¸ÃÂÃÂÃÂÃÂº ÃÂÃÂ½ÃÂÃÂµÃÂÃÂ·ÃÂÃÂ°ÃÂÃÂ½ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ ÃÂÃÂºÃÂÃÂ¾ÃÂÃÂ½ÃÂÃÂÃÂÃÂµÃÂÃÂ¹ÃÂÃÂ½ÃÂÃÂµÃÂÃÂÃÂÃÂ¾ÃÂÃÂ² ÃÂÃÂ´ÃÂÃÂ»ÃÂÃÂ ÃÂÃÂÃÂÃÂ°ÃÂÃÂÃÂÃÂ²ÃÂÃÂµÃÂÃÂÃÂÃÂµÃÂÃÂÃÂÃÂµÃÂÃÂÃÂÃÂ° (ÃÂÃÂ¾ÃÂÃÂ¿ÃÂÃÂÃÂÃÂ¸ÃÂÃÂ 2)
            
       
            if (creep.memory.container === undefined) {
                var containers = creep.room.find(FIND_STRUCTURES, {filter: { structureType: STRUCTURE_CONTAINER }});    
                if (containers.length > 0) {
                    var Numbers = creep.memory.roomNumber; 
                    
                    for (var i=0;i<containers.length;i++) {
                        var sourcesBusy = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.memory.container == containers[i].id && creep.memory.roomNumber == Numbers);
                        if (sourcesBusy.length == 0) {
                            creep.memory.container = containers[i].id;
                        } else if ((creep.memory.container == undefined) && (sourcesBusy.length == 0)) {
                            creep.memory.container = containers[i].id;
                        }
                    }
                }


            } else if (creep.memory.container !== undefined) {
                //creep.say(RoomsRoles.miner.role);
        
                var sources = creep.pos.findClosestByRange(FIND_SOURCES);
                var container = Game.getObjectById(creep.memory.container);
                var total = _.sum(creep.store);
                if (container) {
                    creep.travelTo(container);
                    if (container.store[RESOURCE_ENERGY] < container.storeCapacity) {
                         creep.harvest(sources);
                    }
                     creep.say(creep.carryCapacity);
                     
                    if(container.hits < container.hitsMax) { 
                        if (creep.store[RESOURCE_ENERGY] < creep.carryCapacity) {
                            creep.harvest(sources);
                            creep.repair(container);
                        }
                       
                    }
                }
                
            }
        
    
        break;   
        
        case 3:
            
            
        var Numbers = creep.memory.roomNumber; 
        
        //var links = creep.room.find(FIND_STRUCTURES, {filter: { structureType: STRUCTURE_LINK }});    
            
        if (creep.memory.sources === undefined) {
            var sources = creep.room.find(FIND_SOURCES);
            for (var i=0;i < 2;i++) {
                 var sourcesBusy = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.memory.sources == sources[i].id && creep.memory.roomNumber == Numbers);
                if (sourcesBusy.length == 0) {
                    creep.memory.sources = sources[i].id;
                } else if ((creep.memory.link == undefined) && (sourcesBusy.length == 0)) {
                    creep.memory.sources = sources[i].id;
                }
            }
        }
        
        if (creep.memory.link === undefined) {
            let source = Game.getObjectById(creep.memory.sources);
            if (source) {
                let linkClos = source.pos.findClosestByRange(FIND_STRUCTURES, {filter: { structureType: STRUCTURE_LINK }});
                if (linkClos) {
                    creep.memory.link = linkClos.id;
                }
            }
        }
        
        let link = Game.getObjectById(creep.memory.link);

        if (link) {
            if (link.energy < link.energyCapacity) {

                let source = Game.getObjectById(creep.memory.sources);

                if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.travelTo(source);
                }
    
                if (creep.store[RESOURCE_ENERGY] == creep.store.getCapacity()) {
                    if(creep.transfer(link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.travelTo(link);
                    }
                }
            } 
        } else {
            delete creep.memory.link;
        }
            
        break;
        }
    }
}

module.exports = roleHarvester;