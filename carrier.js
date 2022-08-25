var carrier = {

    run: function(obj) {
        for (var i in obj) {
            var creep = obj[i];
            if (creep.memory.role == 'carrier') {
                switch (creep.memory.options){
          

                    case 1: 
            
                    var Numbers = creep.memory.roomNumber;     
                    var targetsStorage = creep.room.find(FIND_STRUCTURES, {filter: object => (object.structureType == STRUCTURE_STORAGE) && object.store[RESOURCE_ENERGY] > 5000 }); // STORAGE
                    var container = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: object => (object.structureType == STRUCTURE_CONTAINER) && object.store[RESOURCE_ENERGY] >= creep.carryCapacity});
                    var Energy = creep.room.energyAvailable;
                    var EnergyCapacity = creep.room.energyCapacityAvailable;
                    //creep.say(creep.memory.container);
                    
                    if(creep.carry.energy == 0) { 
                        
                        if (!container) {
                            if (targetsStorage.length > 0) {
                                if((creep.withdraw(targetsStorage[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)) {
                                    creep.travelTo(targetsStorage[0]);
                                }                    
                            }
                        } else if (container) {
                            if((creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)) {
                                creep.travelTo(container);
                            }
                        }
                    } 
                    
                    if (creep.store[RESOURCE_ENERGY] > 0) {
                        
                        /**var targets = creep.room.find(FIND_STRUCTURES, {
                                filter: (structure) => {
                                    return (structure.structureType == STRUCTURE_SPAWN ||
                                            structure.structureType == STRUCTURE_EXTENSION ||
                                            structure.structureType == STRUCTURE_TOWER) && (structure.energy < structure.energyCapacity);
                                }
                        });**/ 
                        
                        var rangesTargets1 = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                                filter: (structure) => {
                                    return (structure.structureType == STRUCTURE_SPAWN ||
                                            structure.structureType == STRUCTURE_EXTENSION ||
                                            structure.structureType == STRUCTURE_TOWER ||
                                            structure.structureType == STRUCTURE_POWER_SPAWN) && (structure.energy < structure.energyCapacity);
                                }
                        }); 
                        
                       /** var rangesTower = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                                filter: (structure) => {
                                    return (structure.structureType == STRUCTURE_TOWER) && (structure.energy < structure.energyCapacity);
                                }
                        }); **/
                        
                        var targets5 = creep.room.find(FIND_STRUCTURES, {filter: object => (object.structureType == STRUCTURE_STORAGE) && object.store[RESOURCE_ENERGY] < 300000}); // STORAGE
                    
                        var targets23 = creep.room.find(FIND_STRUCTURES, {filter: object => (object.structureType == STRUCTURE_NUKER) && object.energy < object.energyCapacity }); 
                    
                        var targets3 = _.filter(Game.creeps, creep => creep.memory.role == 'builder' && creep.memory.bag == 'empty' && creep.memory.roomNumber == Numbers);
                        var targets4 = _.filter(Game.creeps, creep => creep.memory.role == 'repairer' && creep.memory.bag == 'empty' && creep.memory.roomNumber == Numbers);
                        var upgraders = _.filter(Game.creeps, creep => creep.memory.role == 'upgrader' && creep.memory.roomNumber == Numbers && creep.store[RESOURCE_ENERGY] < creep.store.getCapacity() );
                        var targets2 = _.sortBy(upgraders, creep.store.getCapacity());
            
                            
                            if(rangesTargets1) {
                                if(creep.transfer(rangesTargets1, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                    creep.travelTo(rangesTargets1);
                                }
                            } else if ((targets5.length > 0)) {
                                if(creep.transfer(targets5[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                    creep.travelTo(targets5[0]);
                                }
                            } else if (targets2.length > 0) {
                                if(creep.transfer(targets2[targets2.length-1], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                    creep.travelTo(targets2[targets2.length-1]);
                                }
                            } else if (targets4.length > 0) {
                                if(creep.transfer(targets4[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                    creep.travelTo(targets4[0]);
                                }
                            } else if (targets5.length > 0) {
                                if(creep.transfer(targets5[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                    creep.travelTo(targets5[0]);
                                }    
                            } else if((creep.carry.energy < creep.carryCapacity) && (targets5.length == 0)) {
                                var sources = creep.room.find(FIND_SOURCES);
                                if((creep.withdraw(container[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)) {
                                    creep.travelTo(container[0]);
                                    }
                            }
            
                        
                    
                    } 
                    
                     
            
                    break;
                    
                    
                    case 3: 
                   
                    
                    var Numbers = creep.memory.roomNumber; 
                    var Energy = creep.room.energyAvailable;
                    var EnergyCapacity = creep.room.energyCapacityAvailable;
                    var total = _.sum(creep.carry);
            
            
                    function TaskVerification() {     
                        var Numbers = creep.memory.roomNumber;
                        const Target = Game.getObjectById(creep.memory.target.id);
                        if (Target && creep.memory.task.type && creep.memory.task.priority && creep.memory.task.condition) {
                            var TargId = creep.memory.target.id + creep.memory.task.type + creep.memory.task.priority + creep.memory.task.condition;
                            let cond = Memory.processor["transference"+Numbers].List[TargId];   
                            
                            if (cond) {
                                if (Target.store[Res] >= cond.condition) {
                                    delete Memory.processor["transference"+Numbers].List[TargId];
                                    creep.say('complite');
                                }
                            }
                        }
                        delete creep.memory.task;
                        delete creep.memory.target;     
                    }
            
                    function TaskDelete() {   
                        var Numbers = creep.memory.roomNumber;  
                        const Target = Game.getObjectById(creep.memory.target.id);
                        if (Target && creep.memory.task.type && creep.memory.task.priority && creep.memory.task.condition) {
                            var TargId = creep.memory.target.id + creep.memory.task.type + creep.memory.task.priority + creep.memory.task.condition;
                            let cond = Memory.processor["transference"+Numbers].List[TargId];
                            if (cond) {creep.say('dT '+creep.memory.task.type);
                                delete Memory.processor["transference"+Numbers].List[TargId];
                            }  
                        }
                        delete creep.memory.task;
                        delete creep.memory.target;
                    }
            
                    if (creep.ticksToLive > 50) {
               
                        if (Energy < EnergyCapacity) {
            
            
                            if((creep.carry.energy == 0) && (total == 0)) { 
                                var links = creep.room.find(FIND_STRUCTURES, {filter: { structureType: STRUCTURE_LINK }});
                                var storage = creep.room.find(FIND_STRUCTURES, {filter: { structureType: STRUCTURE_STORAGE }});
                                
                                if(links.length >= 3) { 
            
                                        if (links[2].energy > 0) {
                                            if((creep.withdraw(links[2], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)) {
                                                creep.travelTo(links[2]);
                                            }
                                        } else if (links[2].energy == 0) {
                                        
                                            if (storage.length > 0) {
                                                if ((storage[0].store[RESOURCE_ENERGY] > 0) && (creep.withdraw(storage[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)) {
                                                    creep.travelTo(storage[0]);
                                                }
                                            }
                                        }
                                }   
                            } else if ((creep.carry.energy == 0) && (total > 0)) {
                                var Storage = creep.room.find(FIND_STRUCTURES, {
                                    filter: (structure) => {
                                        return (structure.structureType == STRUCTURE_STORAGE) ;
                                        }
                                }); 
                                var Resource = _.findKey(creep.store, o => o > 0);
                                if((creep.transfer(Storage[0], Resource) == ERR_NOT_IN_RANGE)) {
                                    creep.travelTo(Storage[0]);
                                } else if ((creep.transfer(Storage[0], Resource) == OK)) {
                                    delete creep.memory.task;
                                    delete creep.memory.target;
                                }
                                if (creep.transfer(Storage[0], Resource) == ERR_NOT_ENOUGH_RESOURCES) { creep.say('hi');
                                    TaskVerification();
                                }
            
                            }
            
                        } else if (Energy == EnergyCapacity) {
                            
                            if (total == 0) { 
                                if (creep.memory.target && creep.memory.task) {
                                        const Target = Game.getObjectById(creep.memory.target.id);
                                        var WindrRes = creep.memory.task.type;
                                        //creep.say(Target);
                                        if(creep.withdraw(Target, WindrRes) == ERR_NOT_IN_RANGE) {
                                            creep.travelTo(Target); 
                                        } 
                                        if (creep.withdraw(Target, WindrRes) == OK) {
                                            creep.memory.target = creep.memory.task.target;
                                            var TargId = creep.memory.target.id + creep.memory.task.type + creep.memory.task.priority + creep.memory.task.condition;
                                            let cond = Memory.processor["transference"+creep.memory.roomNumber].List[TargId];  
                                            if (cond) {
                                                if (creep.store.getCapacity(creep.memory.task.type) >= (cond.condition - Target.store[creep.memory.task.type])) {
                                                    delete Memory.processor["transference"+creep.memory.roomNumber].List[TargId];
                                                }
                                            }  
                                        }
                                        
                                        if ((creep.withdraw(Target, WindrRes) == ERR_NOT_ENOUGH_RESOURCES)) { 
                                           // if (Target.store[creep.memory.task.type] < creep.store.getCapacity()) {
                                           // creep.say("ErrNotRess");
                                            TaskDelete();
                                                
                                          //  }
                                        }
                                        if ((creep.withdraw(Target, WindrRes) == ERR_INVALID_TARGET)) {
                                            // if (Target.store[creep.memory.task.type] < creep.store.getCapacity()) {
                                                var TargId = creep.memory.target.id + creep.memory.task.type + creep.memory.task.priority + creep.memory.task.condition;
                                                 delete Memory.processor["transference"+Numbers].List[TargId];
                                                 delete creep.memory.task;
                                                 delete creep.memory.target;
                                               //  creep.say('invTarg');
                                           //  }
                                        } else if((creep.withdraw(Target, WindrRes) !== OK)) {
                                            delete creep.memory.target;
                                            delete creep.memory.task;
                                        }
            
                                } else if ((creep.memory.target) || (creep.memory.task)) {
                                    delete creep.memory.target;
                                    delete creep.memory.task;
                                }
                            } else if ((total > 0) && (creep.memory.target === undefined)) {
                               
                                        var Storage = creep.room.find(FIND_STRUCTURES, {
                                                filter: (structure) => {
                                                    return (structure.structureType == STRUCTURE_STORAGE) ;
                                                    }
                                            }); 
                    
                                        var Resource = _.findKey(creep.carry, o => o > 0);
                                        
                                        if((creep.transfer(Storage[0], Resource) == ERR_NOT_IN_RANGE)) {
                                            creep.travelTo(Storage[0]);
                                        } else if((creep.transfer(Storage[0], Resource) == OK)) {
                                            delete creep.memory.task;
                                            delete creep.memory.target;
                                        } else if((creep.transfer(Storage[0], Resource) !== OK)) {
                                            delete creep.memory.task;
                                            delete creep.memory.target;
                                        }
                                  
                            }
               
                        }
            
            
                        if (total > 0) {
                            if (creep.memory.target !== null) {
                                
                                if (creep.memory.target && creep.memory.task) {
                                    
                                    var Target = Game.getObjectById(creep.memory.target.id);
                                    var Resource = _.findKey(creep.store, o => o > 0);
                                    var Res = Resource;
                                    var Numbers = creep.memory.roomNumber;
            
                                    //Проверка сможет ли крип в соло выполнить задание 
                                    if (Target) {
                                        if (creep.store[Resource] + Target.store[Resource] >= creep.memory.task.condition) {
                                            let TargId = creep.memory.target.id + creep.memory.task.type + creep.memory.task.priority + creep.memory.task.condition;
                                            delete Memory.processor["transference"+Numbers].List[TargId];
                                        }
                                    } 
                                    
                                    if(creep.transfer(Target, Resource) == ERR_NOT_IN_RANGE) {
                                        creep.travelTo(Target, {visualizePathStyle: {stroke: '#FF0000', opacity: 0.5,}});
                                    } 
                            
                                    if (creep.transfer(Target, Resource) == OK) {
                                        TaskVerification();
                                    }
                         
                                    if (creep.transfer(Target, Resource) == ERR_NOT_ENOUGH_RESOURCES) {
                                        let TargId = creep.memory.target.id + creep.memory.task.type + creep.memory.task.priority + creep.memory.task.condition;
                                        delete Memory.processor["transference"+Numbers].List[TargId];
                                     //   creep.say('delTarg');
                                        TaskVerification();
                                    }
                                    
                                    if (creep.transfer(Target, Resource) == ERR_INVALID_TARGET) {
                                        let TargId = creep.memory.target.id + creep.memory.task.type + creep.memory.task.priority + creep.memory.task.condition;
                                        delete Memory.processor["transference"+Numbers].List[TargId];
                                     //   creep.say("FerrInv");
                                        TaskVerification();
                                    }
                                    
                                    if (creep.transfer(Target, Resource) == ERR_FULL) {
                                        let TargId = creep.memory.target.id + creep.memory.task.type + creep.memory.task.priority + creep.memory.task.condition;
                                        delete Memory.processor["transference"+Numbers].List[TargId];
                                       // creep.say("FerrFull");
                                        TaskVerification();
                                    }
                                }
                            }
                        }
                    } else if (creep.ticksToLive <= 50)  {
                        if (total > 0) {
                            var Target = creep.room.find(FIND_STRUCTURES, { filter: (structure) => { return (structure.structureType == STRUCTURE_STORAGE); }});;
                            var Resource = _.findKey(creep.store, o => o > 0);
                            if(creep.transfer(Target, Resource) == ERR_NOT_IN_RANGE) {
                                creep.travelTo(Target[0]);
                            }
                        } else {
                            creep.suicide();
                        }
                    }   
                        
                    break;
                    }
            }
        }
    } 
}   


module.exports = carrier;