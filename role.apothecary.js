let roleApothecary = {

    
    run: function(creep) {
        
        let AddTargetMove = Game.flags.AddTargetMove;
        
        let Squad = creep.memory.squad;
        let SquadMemory = Memory.army[Squad];
        let AllRemove = Game.flags.AllRemove;
    
        if (Memory.army[creep.memory.squad]) { 
            if (Memory.army[creep.memory.squad].Gathering == true) { // ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ¾ÃÂÃÂ´ ÃÂÃÂ½ÃÂÃÂ° ÃÂÃÂÃÂÃÂ¾ÃÂÃÂÃÂÃÂºÃÂÃÂ ÃÂÃÂÃÂÃÂ±ÃÂÃÂ¾ÃÂÃÂÃÂÃÂ°
                let Pos = new RoomPosition(SquadMemory.CheckPoint.x, SquadMemory.CheckPoint.y, SquadMemory.CheckPoint.roomName);
                creep.travelTo(Pos ,{visualizePathStyle: {stroke: '#7FFF00',opacity: 0.5}});
            } else if (Memory.army[creep.memory.squad].Gathering == false ) {
                
    // ÃÂÃÂÃÂÃÂ¾ÃÂÃÂ±ÃÂÃÂ°ÃÂÃÂ²ÃÂÃÂ¸ÃÂÃÂÃÂÃÂ ÃÂÃÂÃÂÃÂµÃÂÃÂ»ÃÂÃÂ ÃÂÃÂ´ÃÂÃÂ»ÃÂÃÂ ÃÂÃÂ´ÃÂÃÂ²ÃÂÃÂ¸ÃÂÃÂ¶ÃÂÃÂµÃÂÃÂ½ÃÂÃÂ¸ÃÂÃÂ           
                if (AddTargetMove && AddTargetMove.color == creep.memory.squad) {
                    PosTargetMove = Game.flags.AddTargetMove.pos;
                    Memory.army[creep.memory.squad].TargetMove = PosTargetMove;
                    Game.flags.AddTargetMove.remove();
                }
            
    // ÃÂÃÂÃÂÃÂ²ÃÂÃÂ¸ÃÂÃÂ¶ÃÂÃÂµÃÂÃÂ½ÃÂÃÂ¸ÃÂÃÂµ ÃÂÃÂ¿ÃÂÃÂ¾ ÃÂÃÂ´ÃÂÃÂ¾ÃÂÃÂ±ÃÂÃÂ°ÃÂÃÂ²ÃÂÃÂ»ÃÂÃÂµÃÂÃÂ½ÃÂÃÂ½ÃÂÃÂ¾ÃÂÃÂ¹ ÃÂÃÂÃÂÃÂµÃÂÃÂ»ÃÂÃÂ¸           
                if (Memory.army[creep.memory.squad].TargetMove !== undefined) {
                    const PosMove = new RoomPosition(Memory.army[creep.memory.squad].TargetMove.x, Memory.army[creep.memory.squad].TargetMove.y, Memory.army[creep.memory.squad].TargetMove.roomName);
                    creep.travelTo(PosMove, {visualizePathStyle: {stroke: '#4169E0', opacity: 0.5,}});
                    if (creep.pos.inRangeTo(PosMove, 2)) {
                        Memory.army[creep.memory.squad].TargetMove = undefined;
                    }
                }
                
                if (AllRemove) {
                    let PosRemove = Game.flags.AllRemove.pos.roomName;
                    if (creep.pos.roomName == PosRemove) {
                        creep.suicide();
                    }
                }
	           
                
    // ÃÂÃÂÃÂÃÂ¾ÃÂÃÂ²ÃÂÃÂµÃÂÃÂ´ÃÂÃÂµÃÂÃÂ½ÃÂÃÂ¸ÃÂÃÂµ ÃÂÃÂÃÂÃÂ¸ÃÂÃÂ»ÃÂÃÂµÃÂÃÂÃÂÃÂ¾ÃÂÃÂ²            
            let Squad = creep.memory.squad;
            let Astartes = _.find(Game.creeps, creep => creep.memory.role == 'astartes' && creep.memory.squad == Squad);
            

      
            if (creep.ticksToLive < 300) {
                    if (creep.memory.revival == 1) {
                        const CreepName ='creepID-'+`f${(~~(Math.random()*1e8)).toString(16)}`;
                        let bodys = _.map(creep.body, 'type');
                        let roomNumber = creep.memory.roomNumber;
                        Memory.processor['SpawnControl'+roomNumber].List[CreepName] = {name: CreepName, role: creep.memory.role, priority: 0, roomNumber: creep.memory.roomNumber, charact: bodys,
                            options: creep.memory.options, squad: creep.memory.squad, queue: 0, TargetStatus: '!achieved', revival: creep.memory.revival,
                        };
                        creep.memory.revival = 0;
                    }
            }      
                                
                    let SquadPowerMining = Game.flags['Squad'+creep.memory.squad+'-PowerMining'+creep.memory.queue];


                    
                    if (SquadPowerMining) {
                                
                                if (creep.pos.roomName !== SquadPowerMining.pos.roomName) {
                                    creep.travelTo(SquadPowerMining, {visualizePathStyle: {stroke: '#8B0000', opacity: 0.5,}});
                                } else if (creep.pos.roomName == SquadPowerMining.pos.roomName) {
                                   
                                        let target = creep.pos.findClosestByRange(FIND_MY_CREEPS, {filter: function(object) {return (object.hits < object.hitsMax) && (object.memory.squad == Squad) && (object.memory.role == 'astartes');}});
                                        
                                        creep.travelTo(target);
                                        
                                        let targetBanks = creep.room.find(FIND_STRUCTURES, { filter: object => (object.structureType == STRUCTURE_POWER_BANK) });
                                        
                                        if (targetBanks.length > 0) {
                                            if (creep.pos.isNearTo(targetBanks[0])) {
                                                let direction = creep.pos.getDirectionTo(targetBanks[0]);
                                                creep.say('Банка близко');
                                                switch (direction) {
                                                    case TOP : creep.move(BOTTOM); break; 
                                                    case TOP_RIGHT : creep.move(BOTTOM_LEFT); break;
                                                    case RIGHT : creep.move(LEFT); break;
                                                    case BOTTOM_RIGHT : creep.move(TOP_LEFT); break;
                                                    case BOTTOM : creep.move(TOP); break;
                                                    case BOTTOM_LEFT : creep.move(TOP_RIGHT); break;
                                                    case LEFT : creep.move(RIGHT); break;
                                                    case TOP_LEFT : creep.move(BOTTOM_RIGHT); break;
                                                }
                                            }
                                        }
                                        
                                    // find closest Roo
                                        
                                        //reinforcement
                                        if (creep.memory.rangeToHome === undefined) {
                                            const range = creep.pos.getRangeTo(target);
                                            if(range <= 5) {
                                                creep.memory.rangeToHome = 1500 - creep.ticksToLive + creep.memory.SpawninigTime + 10;
                                            }
                                        }
                                        
                                        if (creep.ticksToLive < creep.memory.rangeToHome) {
                                            if (creep.memory.revival == 1) {
                                                const CreepName ='creepID-'+`f${(~~(Math.random()*1e8)).toString(16)}`;
                                                let bodys = _.map(creep.body, 'type');
                                                let roomNumber = creep.memory.roomNumber;
                                                Memory.processor['SpawnControl'+roomNumber].List[CreepName] = {name: CreepName, role: creep.memory.role, priority: 0, roomNumber: creep.memory.roomNumber, charact: bodys,
                                                    options: creep.memory.options, squad: creep.memory.squad, queue: 0, TargetStatus: '!achieved', revival: creep.memory.revival,
                                                };
                                                creep.memory.revival = 0;
                                            }
                                        }
                                    
                                        

                                    
                        }
                    }
            
            //let target = creep.room.find(FIND_MY_CREEPS, {filter: function(object) {return (object.hits < object.hitsMax) && (object.memory.squad == Squad) && (object.memory.role == 'astartes');}});  
            let findAstartes = _.filter(Game.creeps, o => o.memory.squad == Squad && o.hits < o.hitsMax);
            let sortHPAstartes = findAstartes.sort((a, b) => a.hits - b.hits);
           // let minHP = _.min(findAstartes, 'hits');
           // creep.say(minHP.hits);

                 
            if (findAstartes) {
                let target = creep.pos.findClosestByRange(FIND_MY_CREEPS, {filter: function(object) {return (object.hits < object.hitsMax) && (object.memory.role == 'astartes');}});  
                if(sortHPAstartes.length > 0) {
                    
                    if(creep.heal(sortHPAstartes[0]) !== OK) {
                        creep.moveTo(Astartes);
                        creep.rangedHeal(sortHPAstartes[0]);
                    } else {
                        creep.moveTo(Astartes);
                    }
                    
                } else if (target) {
                    
                    if(creep.heal(target) !== OK) {
                        creep.travelTo(target);
                        creep.rangedHeal(target);
                    }
                    
                } else if (!target) {
    
                    const target2 = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
                        filter: function(object) {
                        return (object.hits < object.hitsMax);
                        }
                      });
                    if (target2) {
                        if(creep.heal(target2) !== OK) {
                            //creep.travelTo(target2, {stuckValue:1});
                            creep.travelTo(target);
                            creep.rangedHeal(target2);
                        }
                    } else { 
                        creep.travelTo(Astartes);
                    } 
                } 
            }
            


            }
            
        }
        
        
        
	}
};




module.exports = roleApothecary;  