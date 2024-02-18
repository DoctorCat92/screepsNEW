var roleSupport = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        switch (creep.memory.options){    
            
            // 1  Строитель новых колоний (нужнается в доработке)
            // 2  Рейдер
            // 3  Подбиратор 
            // 4  Наполнятор
            // 5  Рейдер астартес
        
        case 1: // ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ¨ÃÂÃÂÃÂÃÂÃÂÃÂ ÃÂÃÂ ÃÂÃÂ ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂ ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ
       
        
        function functionCreep() {
             
                var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                var RoomsEnergy = creep.room.energyAvailable;
                var RoomsCapacity = creep.room.energyCapacityAvailable;
                var procent = (RoomsEnergy/RoomsCapacity)*100;
        
                if (creep.carry.energy == 0) {creep.memory.bag = 'empty';}

                if(creep.carry.energy == 0) { 
                    creep.memory.upgrading = false;
                    creep.memory.building = false;
                    creep.memory.harvester = false;
                   // creep.say('harvesting');
                } 
                if((creep.carry.energy == creep.carryCapacity) && (targets.length > 0)) {
                    creep.memory.building = true;
                    creep.memory.bag = 'full';
                    creep.say('building');
                } else 
                if((creep.carry.energy == creep.carryCapacity) && (procent < 70)) {
                    creep.memory.harvester = true;
                    creep.memory.bag = 'full';
                    creep.say('harvester');
                } else 
                if((!creep.memory.upgrading && !creep.memory.building) && (creep.carry.energy == creep.carryCapacity)) {
                    creep.memory.upgrading = true;
                    creep.memory.bag = 'full';
                    creep.say('upgrader');
                } 
                
                let MoveSupport =_.find(Game.flags, f => f.name.startsWith('Colonisation-'));
                var Numbers = creep.memory.roomNumber;
                
                if (MoveSupport) {
                        
                    var PosFlag = MoveSupport.pos.roomName;
                    var PosCreep = creep.pos.roomName;  
                
                        if (PosFlag !== PosCreep ) {  
                            creep.travelTo(MoveSupport, {preferHighway:true});
                            
                        } else if (PosFlag == PosCreep) { 
                            if(creep.memory.building) {
                                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                                    creep.moveTo(targets[0]);
                                }   
                            }
                            if(creep.memory.upgrading)  {
                                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                                    creep.moveTo(creep.room.controller);
                                }
                            } 
                            if(creep.memory.harvester) {
                                
                                var targets = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                                    filter: (structure) => {
                                    return (structure.structureType == STRUCTURE_SPAWN ||
                                        structure.structureType == STRUCTURE_EXTENSION ||
                                        structure.structureType == STRUCTURE_TOWER) && (structure.energy < structure.energyCapacity);
                                    }
                                });
                                
                                if(targets) {
                                    if(creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                        creep.moveTo(targets);
                                    }
                                } 
                                
                            }
                            if (!creep.memory.upgrading && !creep.memory.building && !creep.memory.harvester ) { 
                               
                                var DroppedRes = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
                                
                                let HostileStructure = creep.room.find(FIND_STRUCTURES, {
                                        filter: (structure) => {
                                            return (structure.structureType == STRUCTURE_SPAWN ||
                                                    structure.structureType == STRUCTURE_EXTENSION ||
                                                    structure.structureType == STRUCTURE_TOWER ||
                                                   // structure.structureType == STRUCTURE_STORAGE ||
                                                    structure.structureType == STRUCTURE_LAB ||
                                                    structure.structureType == STRUCTURE_LINK ||
                                                   //structure.structureType == STRUCTURE_TERMINAL ||
                                                    structure.structureType == STRUCTURE_EXTRACTOR ||
                                                    structure.structureType == STRUCTURE_POWER_SPAWN) && (structure.my == false);
                                        }
                                    }); 

                            
                                if (DroppedRes) {
                                    if(creep.pickup(DroppedRes) == ERR_NOT_IN_RANGE) {
                                        creep.moveTo(DroppedRes);
                                    }
                                } else if (HostileStructure.length > 0) { 
                                    let HostileStructureEnergy = creep.room.find(FIND_STRUCTURES, {
                                        filter: (structure) => {
                                            return (structure.structureType == STRUCTURE_SPAWN ||
                                                    structure.structureType == STRUCTURE_EXTENSION ||
                                                    structure.structureType == STRUCTURE_TOWER ||
                                                    structure.structureType == STRUCTURE_STORAGE ||
                                                    structure.structureType == STRUCTURE_LAB ||
                                                    structure.structureType == STRUCTURE_LINK //|| structure.structureType == STRUCTURE_TERMINAL
                                                    ) && (structure.my == false) && (structure.store[RESOURCE_ENERGY] > 0);
                                        }
                                    }); 

                                    if (HostileStructureEnergy.length > 0) {
                                        if (HostileStructureEnergy[0]) {  
                                            if(creep.withdraw(HostileStructureEnergy[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) { 
                                                creep.travelTo(HostileStructureEnergy[0]);
                                            }
                                        }
                                    } else if (HostileStructureEnergy.length == 0) {
                                        if(creep.dismantle(HostileStructure[0]) == ERR_NOT_IN_RANGE) {
                                            creep.moveTo(HostileStructure[0]);
                                        }
                                    }
                                } else if (HostileStructure.length == 0) {
                                    var source = creep.pos.findClosestByPath(FIND_SOURCES, {filter: (object) => {return object.energy > 0}}); 
                                    if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                                        creep.moveTo(source);
                                    }    
                                }

                                let Move = Game.flags.Move;
                                if (Move) {
                                    creep.moveTo(Move);
                                }
                                
                            }

                            //Respawning

                        


                        }
                }
        }

        //----------------------------------------------------------------
        
        var MassPath = [];  //       new RoomPosition(25, 25, 'W86N19')'W90N20','W90N24'
            
        //----------------------------------------------------------------
        
        var PosCreep = creep.pos.roomName;
    
        if (MassPath.length == 0) {
            functionCreep();
        } else if (MassPath.length > 0) {
            if (creep.memory.target === undefined) {
                creep.memory.target = '!achieved';
                creep.memory.point = 0; 
            }
            
            if (creep.memory.target == '!achieved') {
                for (var i=0;i < MassPath.length;i++) {
                    if (typeof(MassPath[i]) == 'string') {
                        if (creep.memory.point == i) {
                            if (PosCreep !== MassPath[i]) {
                                creep.moveTo(new RoomPosition(25, 25, MassPath[i]));
                            } else if (PosCreep == MassPath[i]) {
                                creep.memory.point = creep.memory.point + 1;
                            }
                        }
                    } else if (typeof(MassPath[i]) !== 'string') {
                        if (creep.memory.point == i) {
                            if (!creep.pos.isEqualTo(MassPath[i])) {
                                creep.moveTo(MassPath[i]);
                            } else if (creep.pos.isEqualTo(MassPath[i])) {
                                creep.memory.point = creep.memory.point + 1;
                            }
                        }
                    }
                    
                }
            } 
            
            if (creep.memory.point == MassPath.length) {
                functionCreep();
            }
            
            
        }

        break;
        
        
        case 2:  // ÃÂÃÂ ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ  ÃÂÃÂÃÂÃÂ ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂ¬
        
        function FunctionCreep() {     
            
            
            var MoveToRaid = Game.flags.MoveToRaid;
            var MoveTarget = Game.flags.MoveTarget;
            var PosCreep = creep.pos.roomName;
            var Numbers = creep.memory.roomNumber;
            
            var total = _.sum(creep.carry);
            
           
            var MoveRaidSupport = Game.flags.MoveRaidSupport;
            if (MoveRaidSupport) {
                creep.moveTo(MoveRaidSupport);
            }
    
            
            if (MoveToRaid && (total < creep.carryCapacity)) {
                    
                var PosFlag = Game.flags.MoveToRaid.pos.roomName;
                
                    if (PosFlag !== PosCreep ) {
                        creep.travelTo(MoveToRaid);
                    } else if (PosFlag == PosCreep) {
                        
                        var target = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
                        var target2 = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {filter: object => (object.structureType == STRUCTURE_LAB) && object.mineralType !== null});
                        var target3 = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {filter: object => (object.structureType == STRUCTURE_TERMINAL) && (_.sum(object.store) > 0)});
                        var target4 = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {filter: object => (object.structureType == STRUCTURE_STORAGE) && (_.sum(object.store) > 0)}); 
                        var target5 = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {filter: object => (object.structureType == STRUCTURE_FACTORY) && (_.sum(object.store) > 0)}); 
                        
                        creep.say(creep.pickup('psisi'));
                            if (target5 !== null) {
                                if(creep.pickup(target5) == ERR_NOT_IN_RANGE) {
                                    creep.travelTo(target5);
                                }
                            } else if (target2 !== null) {
                                
                                creep.travelTo(target2);
                
                                for(const resourceType in target2.mineralType) {
                                    console.log('hihih '+resourceType);
                                    creep.withdraw(target2, target2.mineralType);
                                }
                            } else if (target3 !== null) {
                                creep.travelTo(target3);
                                for(const resourceType in target3.store) {
                                    creep.withdraw(target3, resourceType);
                                }
                            } else if (target4 !== null) {
                                creep.travelTo(target4);
                                for(const resourceType in target4.store) {
                                    creep.withdraw(target4, resourceType);
                                }
                            } else {
                                Game.notify('Targets for Raiders in '+ PosCreep +' not detected', 0);
                                var PowerBank = creep.room.find(FIND_STRUCTURES, {filter: object => (object.structureType == STRUCTURE_POWER_BANK)});
                                if (PowerBank.length == 0) {
                                    Game.flags.MoveToRaid.remove();
                                }
                            }
                        
                    }
            } else if (total == creep.carryCapacity) {
                
                var MassStorage = Game.rooms[Numbers].find(FIND_STRUCTURES, {filter: object => (object.structureType == STRUCTURE_STORAGE)});
                
                if (PosCreep !== Numbers) {
                    creep.travelTo(MassStorage[0]);
                } else if (Numbers == PosCreep)  {
                    creep.travelTo(MassStorage[0]);
                    for(const resourceType in creep.carry) {
                        creep.transfer(MassStorage[0], resourceType);
                    }
                }
                
            } else if (!MoveToRaid) {
    
                var total = _.sum(creep.carry);
    
                if (total > creep.carryCapacity) {
                
                    var MassStorage = Game.rooms[Numbers].find(FIND_STRUCTURES, {filter: object => (object.structureType == STRUCTURE_STORAGE)});
                    
                    if (PosCreep !== Numbers) {
                        creep.travelTo(MassStorage[0]);
                    } else if (Numbers == PosCreep) {
                        
                        var Resource = _.findKey(creep.carry, o => o > 0);
    
                        if(creep.transfer(MassStorage[0], Resource) == ERR_NOT_IN_RANGE) {
                            creep.travelTo(MassStorage[0]);
                        }
                    }
                } else if (total == 0) {
                    creep.suicide();
                }
            } 
    
    
            var TransferSupport = Game.flags.TransferSupport;
            if (TransferSupport) {
                
                var Look = Game.flags.TransferSupport.pos.lookFor(LOOK_STRUCTURES);
                
                creep.travelTo(Look[0]);
    
                for(const resourceType in creep.carry) {
                    creep.transfer(Look[0], resourceType);
                }
            }
        
        }  
        
        // ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂÃÂ 
        //----------------------------------------------------------------
        
        var MassPath = [];  // ÃÂÃÂÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ¸ÃÂÃÂ·ÃÂÃÂ°ÃÂÃÂÃÂÃÂ¸ÃÂÃÂ ÃÂÃÂ¿ÃÂÃÂ¾ ÃÂÃÂºÃÂÃÂ¾ÃÂÃÂ¼ÃÂÃÂ½ÃÂÃÂ°ÃÂÃÂÃÂÃÂ°ÃÂÃÂ¼       new RoomPosition(25, 25, 'W86N19')
        
        //----------------------------------------------------------------
        
        var PosCreep = creep.pos.roomName;
        var total =_.sum(creep.carry);
       
        if (MassPath.length == 0) {
            FunctionCreep();
        } else if (MassPath.length > 0) {
            if (creep.memory.target === undefined) {
                creep.memory.target = '!achieved';
                creep.memory.point = 0; 
            }
            
            if (creep.memory.target == '!achieved') {
                for (var i=0;i < MassPath.length;i++) {
                    if (typeof(MassPath[i]) == 'string') {
                        if (creep.memory.point == i) {
                            if (PosCreep !== MassPath[i]) {
                                creep.travelTo(new RoomPosition(25, 25, MassPath[i]));
                            } else if (PosCreep == MassPath[i]) {
                                creep.memory.point = creep.memory.point + 1;
                            }
                        }
                    } else if (typeof(MassPath[i]) !== 'string') {
                        if (creep.memory.point == i) {
                            if (!creep.pos.isEqualTo(MassPath[i])) {
                                creep.travelTo(MassPath[i]);
                            } else if (creep.pos.isEqualTo(MassPath[i])) {
                                creep.memory.point = creep.memory.point + 1;
                            }
                        }
                    }
                    
                }
            } 
            if (creep.memory.target == 'achieved') {
                var TransMassPath = MassPath.reverse();
                for (var i=0;i < TransMassPath.length;i++) {
                    if (typeof(MassPath[i]) == 'string') {
                        if (creep.memory.point == i) {
                            if (PosCreep !== MassPath[i]) {
                                creep.travelTo(new RoomPosition(25, 25, TransMassPath[i]));
                            } else if (PosCreep == MassPath[i]) {
                                creep.memory.point = creep.memory.point + 1;
                            }
                        }
                    } else if (typeof(TransMassPath[i]) !== 'string') {
                        if (creep.memory.point == i) {
                            var PositionCreep = creep.pos;
                            if (!creep.pos.isEqualTo(TransMassPath[i])) {
                                creep.travelTo(TransMassPath[i]);
                            } else if (creep.pos.isEqualTo(MassPath[i])) {
                                creep.memory.point = creep.memory.point + 1;
                            }
                        }
                    }
                }
            }
            
            if (MassPath.length == creep.memory.point) {
                FunctionCreep();
            }
            
            
        }
        
        
        break;
        
        case 3: // Крипы по флагу PickupTargetRes тащят в доманшюю комнату что указано
        
    
        function FunctionCreep() {
            
            
            var PickupTargetResource = Game.flags.PickupTargetResource;
            var PickupTarget = Game.flags.PickupTarget;
            var CampTarget = Game.flags.CampTarget;
            var MoveTarget = Game.flags.MoveTarget;
            var Numbers = creep.memory.roomNumber;
            var total =_.sum(creep.carry);
            
            if (PickupTargetResource) {
                
                var PosFlag = Game.flags.PickupTargetResource.pos;
                var PosCreep = creep.pos.roomName;
                var Look = creep.room.lookAt(PosFlag);
                var Resource = RESOURCE_POWER;
                
                if (total < creep.carryCapacity) {
                    
                    if (creep.pos.roomName !== PosFlag.roomName) {
                        creep.travelTo(PickupTargetResource);
                    } else if (creep.pos.roomName == PosFlag.roomName) {
                        
                        if (creep.withdraw(Look[0].structure, Resource) == ERR_NOT_IN_RANGE) {
                            creep.travelTo(PickupTargetResource);
                        } else if (creep.withdraw(Look[0].structure, Resource) == ERR_NOT_ENOUGH_RESOURCES) {
                            PickupTargetResource.remove();
                        } else if (creep.withdraw(Look[0].structure, Resource) == ERR_INVALID_TARGET) {
                            PickupTargetResource.remove();
                        }
                    }
                    
                } else if (total == creep.carryCapacity) {
                    var MassStorage = Game.rooms[Numbers].find(FIND_STRUCTURES, {filter: object => (object.structureType == STRUCTURE_STORAGE)});
                    var PosStorage = MassStorage[0].pos;
                        if (creep.memory.target == '!achieved') {
                            creep.memory.target = 'achieved';
                            creep.memory.point = 0;
                        }
                    
                        if (PosCreep !== Numbers) {
                            creep.travelTo(MassStorage[0]);
                        } else if (Numbers == PosCreep)  {
                            creep.moveTo(MassStorage[0]);
                                for(const resourceType in creep.carry) {
                                    creep.transfer(MassStorage[0], resourceType);
                                        if(creep.transfer(MassStorage[0], resourceType) == OK) {
                                            creep.memory.target = '!achieved';
                                            creep.memory.point = 0;
                                        }
                                }
                        }
                    
            
                }    
                 
            } else if (PickupTarget) {
            
                var PosFlag = Game.flags.PickupTarget.pos;
                var PosCreep = creep.pos.roomName;
                
                
                //(Look[i].type == 'creep') &&
                
                if (total < creep.carryCapacity) {
                    
                    creep.travelTo(PickupTarget);
                    if (PosFlag.roomName == PosCreep) {
                        
                        var Look = creep.room.lookForAt(LOOK_STRUCTURES,PosFlag);
                        
                        for (var i=0;i < Look.length;i++) {
                                var Resources = Object.keys(Look[0].store);
                                if (Resources.length > 0) {
                                    if (creep.withdraw(Look[i], Resources[0]) == ERR_NOT_IN_RANGE) {
                                        creep.travelTo(PickupTarget);
                                    } else if (creep.withdraw(Look[i], Resources[0]) == ERR_NOT_ENOUGH_RESOURCES) {
                                        Game.notify('Крипчаны в вытащили всё что можно вытащить в комнате '+PosCreep+'из '+look[i].structureType);
                                        PickupTarget.remove();
                                    }
                                }
                       } 
                    }
                    
                    
                } else if (total == creep.carryCapacity) {
                    var MassStorage = Game.rooms[Numbers].find(FIND_STRUCTURES, {filter: object => (object.structureType == STRUCTURE_STORAGE)});
                    var PosStorage = MassStorage[0].pos;
                        if (creep.memory.target == '!achieved') {
                            creep.memory.target = 'achieved';
                            creep.memory.point = 0;
                        }
                    
                        if (PosCreep !== Numbers) {
                            creep.travelTo(MassStorage[0]);
                        } else if (Numbers == PosCreep)  {
                            creep.moveTo(MassStorage[0]);
                                for(const resourceType in creep.carry) {
                                    creep.transfer(MassStorage[0], resourceType);
                                        if(creep.transfer(MassStorage[0], resourceType) == OK) {
                                            creep.memory.target = '!achieved';
                                            creep.memory.point = 0;
                                        }
                                }
                        }
                    
            
                }
                

            } else if (!PickupTarget) {
            
            var MassStorage = Game.rooms[Numbers].find(FIND_STRUCTURES, {filter: object => (object.structureType == STRUCTURE_STORAGE)});
            
                if (PosCreep !== Numbers) {
                    creep.moveTo(MassStorage[0]);
                } else if (Numbers == PosCreep)  {
                    creep.moveTo(MassStorage[0]);
                    for(const resourceType in creep.carry) {
                        creep.transfer(MassStorage[0], resourceType);
                    }
                }
            }
         
         
            
        }  
        
        // ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂÃÂ 
        //----------------------------------------------------------------
        
        var MassPath = [];  // ÃÂÃÂÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ¸ÃÂÃÂ·ÃÂÃÂ°ÃÂÃÂÃÂÃÂ¸ÃÂÃÂ ÃÂÃÂ¿ÃÂÃÂ¾ ÃÂÃÂºÃÂÃÂ¾ÃÂÃÂ¼ÃÂÃÂ½ÃÂÃÂ°ÃÂÃÂÃÂÃÂ°ÃÂÃÂ¼       new RoomPosition(25, 25, 'W86N19')
        
        //----------------------------------------------------------------
        
        var PosCreep = creep.pos.roomName;
        var total =_.sum(creep.carry);
       
        if (MassPath.length == 0) {
            FunctionCreep();
        } else if (MassPath.length > 0) {
            if (creep.memory.target === undefined) {
                creep.memory.target = '!achieved';
                creep.memory.point = 0; 
            }
            
            if (creep.memory.target == '!achieved') {
                for (var i=0;i < MassPath.length;i++) {
                    if (typeof(MassPath[i]) == 'string') {
                        if (creep.memory.point == i) {
                            if (PosCreep !== MassPath[i]) {
                                creep.travelTo(new RoomPosition(25, 25, MassPath[i]));
                            } else if (PosCreep == MassPath[i]) {
                                creep.memory.point = creep.memory.point + 1;
                            }
                        }
                    } else if (typeof(MassPath[i]) !== 'string') {
                        if (creep.memory.point == i) {
                            if (!creep.pos.isEqualTo(MassPath[i])) {
                                creep.travelTo(MassPath[i]);
                            } else if (creep.pos.isEqualTo(MassPath[i])) {
                                creep.memory.point = creep.memory.point + 1;
                            }
                        }
                    }
                    
                }
            } 
            if (creep.memory.target == 'achieved') {
                var TransMassPath = MassPath.reverse();
                for (var i=0;i < TransMassPath.length;i++) {
                    if (typeof(MassPath[i]) == 'string') {
                        if (creep.memory.point == i) {
                            if (PosCreep !== MassPath[i]) {
                                creep.travelTo(new RoomPosition(25, 25, TransMassPath[i]));
                            } else if (PosCreep == MassPath[i]) {
                                creep.memory.point = creep.memory.point + 1;
                            }
                        }
                    } else if (typeof(TransMassPath[i]) !== 'string') {
                        if (creep.memory.point == i) {
                            var PositionCreep = creep.pos;
                            if (!creep.pos.isEqualTo(TransMassPath[i])) {
                                creep.travelTo(TransMassPath[i]);
                            } else if (creep.pos.isEqualTo(MassPath[i])) {
                                creep.memory.point = creep.memory.point + 1;
                            }
                        }
                    }
                }
            }
            
            if (MassPath.length == creep.memory.point) {
                FunctionCreep();
            }
            
            
        }
        
      
        
        var MoveRaidSupport = Game.flags.MoveRaidSupport;
        if (MoveRaidSupport) {
            creep.moveTo(MoveRaidSupport);
        }
        
        
        
        break;
        
        case 4:  // ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ ÃÂÃÂ£ÃÂÃÂÃÂÃÂ§ÃÂÃÂÃÂÃÂ ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ
            
        
        var FillingTheTerminal = Game.flags.FillingTheTerminal;
        var FillingTheTarget = Game.flags.FillingTheTarget;
        var Numbers = creep.memory.roomNumber;
        var RechargeTheTerminal = Game.flags.RechargeTheTerminal;
        var Terminal = creep.room.find(FIND_STRUCTURES, {filter: object => (object.structureType == STRUCTURE_TERMINAL)});
        var total = _.sum(creep.carry);
        var soldResource = 500000;
        
        
        if (FillingTheTerminal) {
            
            var Storage = creep.room.find(FIND_STRUCTURES, {filter: object => (object.structureType == STRUCTURE_STORAGE)});
            var Resource = RESOURCE_HYDROGEN;
            
            if (Terminal.length > 0) {
                
                if (total < creep.carryCapacity) {
                    if(creep.withdraw(Storage[0], Resource) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(Storage[0]); 
                    } 
                } else if (total == creep.carryCapacity) {
                    if(creep.transfer(Terminal[0], Resource) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(Terminal[0]);
                    }
                }
                
                if (Terminal[0].store[Resource] >= soldResource) {
                    Game.flags.FillingTheTerminal.remove();
                    Game.notify('Support downloaded the terminal resource '+Resource, 0);
                }
            }   
        }
        
        
        
        if (RechargeTheTerminal) {
            var totalTerminal = _.sum(Terminal[0].store);
            var sources = creep.pos.findClosestByPath(FIND_SOURCES);
            
            if (total < creep.carryCapacity) {
                if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources);
                }
            } else if (total == creep.carryCapacity) {
                if(creep.transfer(Terminal[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Terminal[0]);
                }
            }
            
            if (totalTerminal == Terminal[0].storeCapacity) {
                Game.flags.RechargeTheTerminal.remove();
                Game.notify('Support loaded terminal to maximum');
            }
        }
        
        
        
        if (FillingTheTarget) {
            
            var TargetResource = RESOURCE_ENERGY;
            var Look = Game.flags.FillingTheTarget.pos.lookFor(LOOK_STRUCTURES);
            var PosCreep = creep.pos.roomName;
            
            if (total < creep.carryCapacity) {
                
                var MassStorage = Game.rooms[Numbers].find(FIND_STRUCTURES, {filter: object => (object.structureType == STRUCTURE_STORAGE)});
                
                if(creep.withdraw(MassStorage[0], TargetResource) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(MassStorage[0]);
                } else if (creep.withdraw(MassStorage[0], TargetResource) == ERR_NOT_ENOUGH_RESOURCES)  {
                    Game.notify('Your creeps support loaded the '+Look[0]+' with '+TargetResource+' in room '+Game.flags.pos.roomName, 0);
                    Game.flags.FillingTheTarget.remove();
                }
            } else if (total == creep.carryCapacity) {
                if(creep.transfer(Look[0], TargetResource) == ERR_NOT_IN_RANGE) {
                    creep.travelTo(Look[0]);
                }
                
                if (creep.transfer(Look[0], TargetResource) == ERR_FULL) {
                    Game.flags.FillingTheTarget.remove();
                }
            }
            
        }
        
        
        break;
        
        
        case 5:
            
        //ÃÂÃÂÃÂÃÂÃÂÃÂ°ÃÂÃÂ±ÃÂÃÂ¸ÃÂÃÂÃÂÃÂµÃÂÃÂ»ÃÂÃÂ¸ ÃÂÃÂ´ÃÂÃÂ»ÃÂÃÂ ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂµÃÂÃÂ 

        var MoveToRaid = Game.flags['MoveToRaid'+creep.memory.roomNumber];
        var MoveTarget = Game.flags.MoveTarget;
        var PosCreep = creep.pos.roomName;
        var Numbers = creep.memory.roomNumber;
        
        var total = _.sum(creep.carry);
        
       
        var MoveRaidSupport = Game.flags.MoveRaidSupport;
        if (MoveRaidSupport) {
            creep.travelTo(MoveRaidSupport, {preferHighway:true});
        }

        
        if (MoveToRaid && (total < creep.carryCapacity)) {
                
            var PosFlag = Game.flags['MoveToRaid'+creep.memory.roomNumber].pos.roomName;
            
                if (PosFlag !== PosCreep ) {
                    creep.travelTo(MoveToRaid,{preferHighway:true});
                } else if (PosFlag == PosCreep) {
                    
                    var target = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
                    var target2 = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {filter: object => (object.structureType == STRUCTURE_LAB) && object.mineralType !== null});
                    var target3 = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {filter: object => (object.structureType == STRUCTURE_TERMINAL) && (_.sum(object.store) > 0)});
                    var target4 = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {filter: object => (object.structureType == STRUCTURE_STORAGE) && (_.sum(object.store) > 0)});
                    var target5 = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {filter: object => (object.structureType == STRUCTURE_TOWER) && (_.sum(object.store) > 0)});
                    var target6 = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {filter: object => (object.structureType == STRUCTURE_EXTENSION) && (_.sum(object.store) > 0)});
                    var target7 = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {filter: object => (object.structureType == STRUCTURE_SPAWN) && (_.sum(object.store) > 0)});
                    var target8 = creep.room.find(FIND_RUINS);
                    
                        if (target !== null) {
                            creep.say('nom nom');
                            if(creep.pickup(target) == ERR_NOT_IN_RANGE) {
                                creep.travelTo(target);
                            }
                        } else if (target2 !== null) {
                            
                            creep.travelTo(target2);
            
                            for(const resourceType in target2.mineralType) {
                                console.log('ÃÂÃÂÃÂÃÂÃÂÃÂ¸ÃÂÃÂ¿ÃÂÃÂ ÃÂÃÂ² ÃÂÃÂºÃÂÃÂ¾ÃÂÃÂ¼ÃÂÃÂ½ÃÂÃÂ°ÃÂÃÂÃÂÃÂµ ÃÂÃÂ¸ÃÂÃÂ·ÃÂÃÂ²ÃÂÃÂ»ÃÂÃÂµÃÂÃÂºÃÂÃÂ°ÃÂÃÂÃÂÃÂ '+resourceType);
                                creep.withdraw(target2, target2.mineralType);
                            }
                        } else if (target3 !== null) {
                            creep.travelTo(target3);
                            for(const resourceType in target3.store) {
                                creep.withdraw(target3, resourceType);
                            }
                        } else if (target4 !== null) {
                            creep.travelTo(target4);
                            for(const resourceType in target4.store) {
                                creep.withdraw(target4, resourceType);
                            }
                        } else if (target5 !== null) {
                            creep.travelTo(target5[0]);
                            for(const resourceType in target5.store) {
                                creep.withdraw(target5, resourceType);
                            }
                        } else if (target6 !== null) {
                            creep.travelTo(target5[0]);
                            creep.say('EXT');
                            for(const resourceType in target5.store) {
                                creep.withdraw(target5, resourceType);
                            }
                        } else if (target7 !== null) {
                            creep.travelTo(target5[0]);
                            creep.say('SPAWN');
                            for(const resourceType in target5.store) {
                                creep.withdraw(target5, resourceType);
                            }
                        } else if (target8.length > 0) {
                            creep.travelTo(target8[0]);
                            creep.say('RUINS');
                            for(const resourceType in target8.store) {
                                creep.withdraw(target8, resourceType);
                            }
                        } else {
                            Game.notify('Targets for Raiders in '+ PosCreep +' not detected', 0);
                            var PowerBank = creep.room.find(FIND_STRUCTURES, {filter: object => (object.structureType == STRUCTURE_POWER_BANK)});
                            if (PowerBank.length == 0) {
                                MoveToRaid.remove();
                            }
                        }
                    
                }
        } else if (total > 0) {
            
            var MassStorage = Game.rooms[Numbers].find(FIND_STRUCTURES, {filter: object => (object.structureType == STRUCTURE_STORAGE)});
            
            if (PosCreep !== Numbers) {
                creep.travelTo(MassStorage[0],{preferHighway:true});
            } else if (Numbers == PosCreep)  {
                creep.travelTo(MassStorage[0],{preferHighway:true});
                for(const resourceType in creep.carry) {
                    creep.transfer(MassStorage[0], resourceType);
                }
            }
            
        } else if (!MoveToRaid) {

            var total = _.sum(creep.carry);

            if (total > creep.carryCapacity) {
            
                var MassStorage = Game.rooms[Numbers].find(FIND_STRUCTURES, {filter: object => (object.structureType == STRUCTURE_STORAGE)});
                
                if (PosCreep !== Numbers) {
                    creep.travelTo(MassStorage[0], {preferHighway:true});
                } else if (Numbers == PosCreep) {
                    
                    var Resource = _.findKey(creep.carry, o => o > 0);

                    if(creep.transfer(MassStorage[0], Resource) == ERR_NOT_IN_RANGE) {
                        creep.travelTo(MassStorage[0]);
                    }
                }
            } else if (total == 0) {
                creep.suicide();
            }
        } 
   

        var TransferSupport = Game.flags.TransferSupport;
        if (TransferSupport) {
            
            var Look = Game.flags.TransferSupport.pos.lookFor(LOOK_STRUCTURES);
            
            creep.travelTo(Look[0]);

            for(const resourceType in creep.carry) {
                creep.transfer(Look[0], resourceType);
            }
        }

            
        break;
        
        }    
	}
};


module.exports = roleSupport;
