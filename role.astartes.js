let roleAstartes = {


    run: function (creep) {

        // ÃÂÃÂ­ÃÂÃÂ»ÃÂÃÂ»ÃÂÃÂµÃÂÃÂ¼ÃÂÃÂµÃÂÃÂ½ÃÂÃÂÃÂÃÂ ÃÂÃÂÃÂÃÂ¿ÃÂÃÂÃÂÃÂ°ÃÂÃÂ²ÃÂÃÂ»ÃÂÃÂµÃÂÃÂ½ÃÂÃÂ¸ÃÂÃÂ
        // AddTargetAttack - ÃÂÃÂÃÂÃÂ»ÃÂÃÂ°ÃÂÃÂ³ ÃÂÃÂ°ÃÂÃÂÃÂÃÂ°ÃÂÃÂºÃÂÃÂ¸
        // AddTargetMove - ÃÂÃÂÃÂÃÂ»ÃÂÃÂ°ÃÂÃÂ³ ÃÂÃÂ´ÃÂÃÂ²ÃÂÃÂ¸ÃÂÃÂ¶ÃÂÃÂµÃÂÃÂ½ÃÂÃÂ¸ÃÂÃÂ
        //1111
        let now = new Date();
        let sec = now.getSeconds();
        
        creep.memory.tick = sec - creep.memory.time;
        creep.memory.time = sec;
        //--- Движение рядом с хилом
        function CombatMovement(target) {
            let number = creep.memory.roomNumber;
            let Squad = creep.memory.squad;     //creep => creep.memory.role == 'apothecary' && creep.memory.roomNumber == number && creep.spawning == false && creep.memory.squad == Squad            
            Game.map.visual.circle(creep.pos ,{fill: ArrayСolors[creep.memory.squad], radius: 5, stroke: '#ff0000'});

            let apothecarys =  creep.pos.findClosestByRange(FIND_MY_CREEPS, {
                filter: function(object) {
                    return object.memory.role == 'apothecary' &&
                           object.spawning == false &&      
                           object.memory.squad == Squad                 
                ;}
            });
            
            if (Memory.army[creep.memory.squad].Gathering == true) {
                creep.travelTo(target);
            } else if (Memory.army[creep.memory.squad].Gathering == false) {
              //  Game.map.visual.line(creep.pos, target.pos, {color: '#ff0000', lineStyle: 'dashed'});
                if (apothecarys) {
                    if (creep.hits < creep.hitsMax) {
                        let apothecarysArr = creep.pos.findInRange(FIND_MY_CREEPS, {filter: function(object) {return object.memory.role == 'apothecary' && object.spawning == false && object.memory.squad == Squad;}}, 2);
                        let t = 0;
                        for (let i=0; i<apothecarysArr.length;i++) {
                            if (creep.pos.isNearTo(apothecarysArr[i].pos)) {
                                t = t + 1;
                            }
                        } 
                        if (t >= apothecarysArr.length) {
                            creep.travelTo(target);
                        }
                        if (t < apothecarysArr.length) {
                            creep.travelTo(apothecarys);
                        }

                    } else if (creep.hits == creep.hitsMax) {
                        //if (creep.pos.isNearTo(apothecarys.pos)) {
                            creep.travelTo(target);
                        //} else if (creep.pos.isNearTo(apothecarys.pos) == false) {
                           // creep.travelTo(apothecarys)
                        //}
                    }                
                } else if (!apothecarys) {
                    creep.travelTo(target);
                }
            }
        }

        //--- Вызов транспорта
     
        function TransportCall() {
         
            let targetBanks = creep.room.find(FIND_STRUCTURES, { filter: object => (object.structureType == STRUCTURE_POWER_BANK) });

            if (!creep.memory.closestRoom) {
                let Controllers = _.filter(Game.rooms, rooms => rooms.controller && rooms.controller.my && rooms.controller.level >= 7);
                let n = 0;
                for (let i = 0; i < Controllers.length; i++) {

                    let DistanceRoom = Game.map.getRoomLinearDistance(Controllers[i].name, creep.pos.roomName);
                    if (i == 0) {
                        let n = DistanceRoom;
                        let m = Controllers[i].name;
                    } else if (i > 0 && DistanceRoom < n) {
                        let n = DistanceRoom;
                        let m = Controllers[i].name
                        creep.memory.closestRoom = m;
                    }
                }

                let transports = Math.round(targetBanks.power / 500);
                creep.memory.transp = transports;
            }

            // Если есть силовая банка
            if (targetBanks.length > 0) { 
                let transports = Math.round(targetBanks[0].power / 500);
                creep.memory.transp = transports;
                Game.rooms[creep.pos.roomName].createFlag(44, 16, 'MoveToRaid' + creep.memory.roomNumber);
                if (!creep.memory.notify || creep.memory.notify == false) {
                    Game.notify('Вызван транспорт на сбор Power в комнате '+creep.pos.roomName);
                    creep.memory.notify = true;

                }
            }

            // Если есть другие ресурсы
            let StructuresInRoom = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION) || (structure.structureType == STRUCTURE_SPAWN) ||
                    (structure.structureType == STRUCTURE_CONTAINER) || (structure.structureType == STRUCTURE_LAB) || (structure.structureType == STRUCTURE_FACTORY);
                }
            }); 
            if(StructuresInRoom.length > 0) {
                let sum = 0;
                for (i in StructuresInRoom) {
                    for (j in StructuresInRoom[i].store) {
                        sum = sum + StructuresInRoom[i].store[j];
                    }
                }
                let transports = Math.round((sum / 500)/2);
                creep.memory.transp = transports + 3;

                Game.rooms[creep.pos.roomName].createFlag(44, 16, 'MoveToRaid' + creep.memory.roomNumber);
                if (!creep.memory.notify || creep.memory.notify == false) {
                    Game.notify('Need transporters, the detachment of Astartes for the collection of Power in room '+creep.pos.roomName);
                    creep.memory.notify = true;
                }
            }
        } 


        let AddTargetAttack = Game.flags.AddTargetAttack;
        let AddTargetMove = Game.flags.AddTargetMove;
        let AddAllTargetMove = Game.flags.AddAllTargetMove;
        let AddAllTargetAttack = Game.flags.AddAllTargetAttack;
        let AllRemove = Game.flags.AllRemove;

        let HeshTargets = {


            //o2: {squad: 10, target: new RoomPosition(31,31, 'W90N16'),Type: 'attack',   queue: 0},
            //o11: {squad: 1, target: 'W90N20',Type: 'move', queue: 0},
            //o00: {squad: 1, target: new RoomPosition(31,31, 'W90N16'),Type: 'attack',   queue: 0},
            //o12: {squad: 2, target: 'W90N20',Type: 'move', queue: 0},
            //o000: {squad: 2, target: new RoomPosition(31,31, 'W90N16'),Type: 'attack',   queue: 0},
            //o13: {squad: 3, target: 'W90N20',Type: 'move', queue: 0},
            //o01: {squad: 3, target: new RoomPosition(31,31, 'W90N16'),Type: 'attack',   queue: 0},
            //o3: {squad: 10, target: new RoomPosition(27,40, 'W89N21'),Type: 'attack',   queue: 1},
        }



        // ÃÂÃÂÃÂÃÂ¾ÃÂÃÂ²ÃÂÃÂµÃÂÃÂ´ÃÂÃÂµÃÂÃÂ½ÃÂÃÂ¸ÃÂÃÂµ ÃÂÃÂ¸ ÃÂÃÂÃÂÃÂ°ÃÂÃÂ±ÃÂÃÂ¾ÃÂÃÂÃÂÃÂ° ÃÂÃÂ ÃÂÃÂÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ¼ÃÂÃÂ¸ ÃÂÃÂÃÂÃÂµÃÂÃÂ»ÃÂÃÂ°

        let RangedAttackBodyparts = creep.getActiveBodyparts(RANGED_ATTACK);
        let AttackBodyparts = creep.getActiveBodyparts(ATTACK);
        const HostileCreeps = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 5, {
            filter: function (object) {
                return object.getActiveBodyparts(ATTACK) > 0 || object.getActiveBodyparts(RANGED_ATTACK) > 0;
            }
        });
        let ClosestCreeps = creep.pos.findClosestByRange(HostileCreeps);

        let Squad = creep.memory.squad;
        let SquadMemory = Memory.army[Squad];
        let ArrayСolors = ['0', '#FF0000', "#800080", '#00BFFF', '#00FFFF', '#008000', '#FFFF00', '#FF8C00', "#A9A9A9", '#FFFFFF'];
        creep.room.visual.circle(creep.pos, { fill: 'transparent', radius: 0.30, fill: ArrayСolors[Squad] });


        if (Memory.army[creep.memory.squad]) {


            if (Memory.army[creep.memory.squad].Gathering == true) {
                let Pos = new RoomPosition(SquadMemory.CheckPoint.x, SquadMemory.CheckPoint.y, SquadMemory.CheckPoint.roomName);
                CombatMovement(Pos);
            } else if (Memory.army[creep.memory.squad].Gathering == false) {


                if (AddTargetMove && AddTargetMove.color == creep.memory.squad) {
                    let PosTargetMove = Game.flags.AddTargetMove.pos;
                    Memory.army[creep.memory.squad].TargetMove = PosTargetMove;
                    Game.flags.AddTargetMove.remove();
                }


                if (AddTargetAttack && AddTargetAttack.color == creep.memory.squad) {
                    let PosTargetAttack = Game.flags.AddTargetAttack.pos;
                    Memory.army[creep.memory.squad].TargetAttack = PosTargetAttack;
                    Game.flags.AddTargetAttack.remove();
                }


                if (AddAllTargetMove) {
                    let PosTargetMove = Game.flags.AddAllTargetMove.pos;
                    Memory.army[creep.memory.squad].TargetMove = PosTargetMove;
                    Game.flags.AddAllTargetMove.remove();
                }


                if (AddAllTargetAttack) {
                    let PosTargetAttack = Game.flags.AddAllTargetAttack.pos;
                    Memory.army[creep.memory.squad].TargetAttack = PosTargetAttack;
                    Game.flags.AddAllTargetAttack.remove();
                }

                if (AllRemove) {
                    let PosRemove = Game.flags.AllRemove.pos.roomName;
                    if (creep.pos.roomName == PosRemove) {
                        creep.suicide();
                    }
                }



                if (Memory.army[creep.memory.squad].TargetMove !== undefined) {
                    const PosMove = new RoomPosition(Memory.army[creep.memory.squad].TargetMove.x, Memory.army[creep.memory.squad].TargetMove.y, Memory.army[creep.memory.squad].TargetMove.roomName);
                    CombatMovement(PosMove);
                    if (creep.pos.inRangeTo(PosMove, 2)) {
                        Memory.army[creep.memory.squad].TargetMove = undefined;
                    }
                }


                if (Memory.army[creep.memory.squad].TargetAttack !== undefined && Memory.army[creep.memory.squad].TargetMove == undefined) {
                    let RangedAttackBodyparts = creep.getActiveBodyparts(RANGED_ATTACK);
                    let AttackBodyparts = creep.getActiveBodyparts(ATTACK);

                    let PosAttack = new RoomPosition(Memory.army[creep.memory.squad].TargetAttack.x, Memory.army[creep.memory.squad].TargetAttack.y, Memory.army[creep.memory.squad].TargetAttack.roomName);

                    if (creep.pos.roomName !== Memory.army[creep.memory.squad].TargetAttack.roomName) {
                        CombatMovement(PosAttack);
                    } else if (creep.pos.roomName == Memory.army[creep.memory.squad].TargetAttack.roomName) {
                        // ÃÂÃÂÃÂÃÂÃÂÃÂ¾ÃÂÃÂÃÂÃÂ¼ÃÂÃÂ¾ÃÂÃÂÃÂÃÂ ÃÂÃÂÃÂÃÂµÃÂÃÂ»ÃÂÃÂ¸

                        let LookF = creep.room.lookAt(PosAttack);
                        let targets = _.filter(LookF, opa => opa.type == 'structure' || opa.type == 'creep');

                        // ÃÂÃÂÃÂÃÂÃÂÃÂ°ÃÂÃÂºÃÂÃÂ° ÃÂÃÂÃÂÃÂµÃÂÃÂ»ÃÂÃÂ¸
                        if (targets.length > 0) {

                            // ÃÂÃÂÃÂÃÂÃÂÃÂ¸ÃÂÃÂÃÂÃÂ²ÃÂÃÂ¾ÃÂÃÂµÃÂÃÂ½ÃÂÃÂ¸ÃÂÃÂµ ÃÂÃÂÃÂÃÂµÃÂÃÂ»ÃÂÃÂ¸ 
                            if (targets[0].type == 'structure') {
                                creep.memory.target = { id: targets[0].structure.id, type: targets[0].type };
                                let target = creep.room.find(FIND_STRUCTURES, { filter: { id: creep.memory.target.id } });
                            } else if (targets[0].type == 'creep') {
                                creep.memory.target = { id: targets[0].creep.id, type: targets[0].type };
                                let target = creep.room.find(FIND_CREEPS, { filter: { id: creep.memory.target.id } });
                            }

                            // ÃÂÃÂÃÂÃÂÃÂÃÂ°ÃÂÃÂºÃÂÃÂ° ÃÂÃÂÃÂÃÂµÃÂÃÂ»ÃÂÃÂ¸// ÃÂÃÂÃÂÃÂÃÂÃÂ°ÃÂÃÂºÃÂÃÂ° ÃÂÃÂÃÂÃÂµÃÂÃÂ»ÃÂÃÂ¸
                            if (RangedAttackBodyparts > 0) {
                                if ((creep.rangedAttack(target[0])) == ERR_NOT_IN_RANGE) {
                                    CombatMovement((target[0]));
                                }
                            }

                            if (AttackBodyparts > 0) {
                                creep.say(AttackBodyparts);
                                if ((creep.attack(target[0])) == ERR_NOT_IN_RANGE) {
                                    CombatMovement((target[0]));
                                }
                            }

                        } else if (targets.length == 0) {
                            Memory.army[creep.memory.squad].TargetAttack = undefined;
                            Game.notify('Your soldiers from the' + creep.memory.squad + 'squad destroyed the added target', 0);
                            //creep.suicide();
                        }
                    }


                }


                // ÃÂÃÂÃÂÃÂ²ÃÂÃÂ¸ÃÂÃÂ¶ÃÂÃÂµÃÂÃÂ½ÃÂÃÂ¸ÃÂÃÂµ ÃÂÃÂ¿ÃÂÃÂ¾ ÃÂÃÂ¾ÃÂÃÂÃÂÃÂµÃÂÃÂÃÂÃÂµÃÂÃÂ´ÃÂÃÂ¸ 
                //creep.memory.TargetMove == undefined
                if (Memory.army[creep.memory.squad].TargetAttack == undefined && Memory.army[creep.memory.squad].TargetMove == undefined) {


                    let SquadMove = Game.flags['Squad' + creep.memory.squad + '-Move' + creep.memory.queue];
                    let SquadWait = Game.flags['Squad' + creep.memory.squad + '-Wait' + creep.memory.queue];
                    let SquadPowerMining = Game.flags['Squad' + creep.memory.squad + '-PowerMining' + creep.memory.queue];
                    let SquadAttackRoom = Game.flags['Squad' + creep.memory.squad + '-AttackRoom' + creep.memory.queue];
                    let SquadAttackTarget = Game.flags['Squad' + creep.memory.squad + '-AttackTarget' + creep.memory.queue];
                    let SquadGestalt = Game.flags['Squad' + creep.memory.squad + '-Gestalt' + creep.memory.queue];

                    if (SquadGestalt) {
                        if (creep.pos.roomName !== SquadGestalt.pos.roomName) {
                            CombatMovement(SquadGestalt);
                        } else if (creep.pos.roomName == SquadGestalt.pos.roomName) {
                            if (!creep.pos.inRangeTo(SquadGestalt, 1)) {
                                CombatMovement(SquadGestalt);
                            } else if (creep.pos.inRangeTo(SquadGestalt, 1)) {
                                let PositionCheckPoint = new RoomPosition(SquadGestalt.pos.x, SquadGestalt.pos.y, SquadGestalt.pos.roomName);
                                let CreepForCreckPoint = PositionCheckPoint.findInRange(FIND_MY_CREEPS, 5);
                                let SumSquad = Memory.army[creep.memory.squad].astartes + Memory.army[creep.memory.squad].apothecary;
                                if (CreepForCreckPoint.length >= SumSquad) {
                                    creep.say('Hail');
                                }
                            }
                        }
                    }

                    if (SquadMove) {
                        CombatMovement(SquadMove);
                        if (creep.pos.inRangeTo(SquadMove, 1)) {
                            creep.memory.queue = creep.memory.queue + 1;
                        }
                    }

                    if (SquadWait) {
                        if (creep.pos.roomName !== SquadWait.pos.roomName) {
                            CombatMovement(SquadWait);
                        } else if (creep.pos.roomName == SquadWait.pos.roomName) {
                            let SumAstartes = _.sum(Game.creeps, o => o.memory.role == 'astartes' && o.memory.roomNumber == creep.memory.roomNumber && o.spawning == false && o.memory.squad == creep.memory.squad);
                            let SumApothecary = _.sum(Game.creeps, o => o.memory.role == 'apothecary' && o.memory.roomNumber == creep.memory.roomNumber && o.spawning == false && o.memory.squad == creep.memory.squad);
                            let SumSquad = SumAstartes + SumApothecary;
                            let PosCheckPoint = new RoomPosition(SquadWait.pos.x, SquadWait.pos.y, SquadWait.pos.roomName);
                            let CreepForCreckPoint = PosCheckPoint.findInRange(FIND_MY_CREEPS, 4);
                            let time = 50;

                            if (!creep.pos.inRangeTo(SquadWait, 1)) {
                                CombatMovement(SquadWait);
                                Memory.army[creep.memory.squad].timeWait = Game.time + time;
                            } else if ((Game.time >= Memory.army[creep.memory.squad].timeWait) && (CreepForCreckPoint.length >= SumSquad)) {
                                    creep.memory.queue = creep.memory.queue + 1;
                                    SquadWait.remove();
                            }
                        }
                    }

                    if (SquadAttackRoom) {



                        if (creep.pos.roomName !== SquadAttackRoom.pos.roomName) {
                            CombatMovement(SquadAttackRoom);
                        } else if (creep.pos.roomName == SquadAttackRoom.pos.roomName) {
                            let targetCreep = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
                                filter: function (object) {
                                    return object.getActiveBodyparts(ATTACK) > 0 || object.getActiveBodyparts(RANGED_ATTACK) > 0 ;
                                }
                            });
                            let targetStructure = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, { filter: object => (object.structureType !== STRUCTURE_CONTROLLER && object.structureType !== STRUCTURE_STORAGE && object.structureType !== STRUCTURE_LAB && object.structureType !== STRUCTURE_TERMINAL) });

                            if (targetCreep) {

                                let RangedBodyparts = creep.getActiveBodyparts(RANGED_ATTACK);
                                let AttackBodyparts = creep.getActiveBodyparts(ATTACK);

                                //creep.attack(targetCreep);

                                if (creep.rangedAttack(targetCreep) == ERR_NOT_IN_RANGE) {
                                    CombatMovement(targetCreep);
                                } else {
                                    creep.rangedAttack(targetCreep);
                                }

                                if ((RangedBodyparts < AttackBodyparts) && (creep.attack(targetCreep) == ERR_NOT_IN_RANGE)) {
                                    CombatMovement(targetCreep);
                                } else {
                                    creep.attack(targetCreep);
                                }

                                
                            } else if (targetStructure) {
                                
                                let targetTower = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, { filter: object => (object.structureType == STRUCTURE_TOWER) });
                                
                                if (targetTower) {
                                    if (creep.rangedAttack(targetTower) == ERR_NOT_IN_RANGE) {
                                        CombatMovement(targetTower);
                                    } else {
                                        creep.rangedAttack(targetTower);
                                    } 

                                    if (creep.attack(targetTower) == ERR_NOT_IN_RANGE) {
                                        CombatMovement(targetTower);
                                    } else {
                                        creep.attack(targetTower);
                                    }   
                                } else {
                                    if (creep.rangedAttack(targetStructure) == ERR_NOT_IN_RANGE) {
                                        CombatMovement(targetStructure);
                                    } else {
                                        creep.rangedAttack(targetStructure);
                                    }
    
                                    if (creep.attack(targetStructure) == ERR_NOT_IN_RANGE) {
                                        CombatMovement(targetStructure);
                                    } else {
                                        creep.attack(targetStructure);
                                    }
                                }
                            } else if (!targetCreep && !targetStructure) {
                                creep.memory.queue = creep.memory.queue + 1;
                                Game.notify('Отряд крипов из сквада ' + creep.memory.squad + ' завершил все задачи в комнате '+ creep.pos.roomName + ' и вызвал транспорт '+ Game.time, 0);
                                TransportCall();
                            }

                        }
                    }


                    if (SquadAttackTarget) {

                        const Range = creep.pos.getRangeTo(SquadAttackTarget);

                        if (Range > 3) {
                            CombatMovement(SquadAttackTarget);
                        } else if (Range <= 4) {

                            let LookF = creep.room.lookAt(SquadAttackTarget);
                            let targets = _.filter(LookF, opa => (opa.type == 'structure') || opa.type == 'creep');
                            if (targets.length > 0) {

                                if (RangedAttackBodyparts > 0) {
                                    if ((creep.rangedAttack(targets[0].structure || targets[0].creep)) == ERR_NOT_IN_RANGE) {
                                        CombatMovement((targets[0].structure || targets[0].creep));
                                    }
                                }

                                if (AttackBodyparts > 0) {
                                    if ((creep.attack(targets[0].structure || targets[0].creep)) == ERR_NOT_IN_RANGE) {
                                        CombatMovement((targets[0].structure || targets[0].creep));
                                    }
                                }

                            } else if (targets.length == 0) {
                                SquadAttackTarget.remove();
                                creep.memory.queue = creep.memory.queue + 1;
                            }
                        }
                    }


                    if (SquadPowerMining) {
                        
                        if (creep.pos.roomName !== SquadPowerMining.pos.roomName) {
                            creep.travelTo(SquadPowerMining);
                            let rooms = Game.map.getRoomLinearDistance(creep.pos.roomName, SquadPowerMining.pos.roomName);
                            let tick = creep.memory.tick;
                            Game.map.visual.text('Время пути '+(rooms*50)*tick , new RoomPosition(creep.pos.x,creep.pos.y,creep.pos.roomName), {color: '#B22222', fontSize: 5}); 
                        } else if (creep.pos.roomName == SquadPowerMining.pos.roomName) {
                            if (creep.memory.target == undefined) {
                                let Banks = creep.room.find(FIND_STRUCTURES, { filter: object => (object.structureType == STRUCTURE_POWER_BANK) });
                                if (Banks.length>0) {
                                  creep.memory.target = Banks[0].id;
                                }
                            } else {
                                let targetBanks = Game.getObjectById(creep.memory.target);
                                if (targetBanks) {
                                    let RangedBodyparts = creep.getActiveBodyparts(RANGED_ATTACK);
                                    let AttackBodyparts = creep.getActiveBodyparts(ATTACK);
                                    let AllAttackBodyparts = _.filter(creep.body, a => a.type == ATTACK || a.type == RANGED_ATTACK);
                                    let Percent = Math.round((targetBanks.hits/targetBanks.hitsMax)*100);
                                    // Графонистые плюшки
                                    new RoomVisual(creep.pos.roomName).rect(targetBanks.pos.x-2.5, targetBanks.pos.y-7, 5, 4, {fill:'#000000', opacity: 0.5});
                                    new RoomVisual(creep.pos.roomName).text('hits '+targetBanks.hits, targetBanks.pos.x-2, targetBanks.pos.y-6, {align: 'left'}); 
                                    new RoomVisual(creep.pos.roomName).text('% '+Percent, targetBanks.pos.x-2, targetBanks.pos.y-5, {align: 'left'}); 
                                    
                                    //выбор частей тела
                                    
                                    if (AllAttackBodyparts.length !== 0) {
                                        if (RangedBodyparts.length !== 0) {
                                            var range = creep.pos.getRangeTo(targetBanks);
                                            if (range > 3) {
                                                creep.moveTo(targetBanks);
                                            } else if (range <= 3) {
                                                creep.rangedAttack(targetBanks);
                                            }
                                            /**if (creep.rangedAttack(targetBanks) == ERR_NOT_IN_RANGE) {
                                                 
                                            } else if (creep.rangedAttack(targetBanks) == OK) { creep.say('adaad');
                                                creep.rangedAttack(targetBanks);
                                            } **/
                                        }
                                        if (creep.attack(targetBanks) == ERR_NOT_IN_RANGE) {
                                            creep.moveTo(targetBanks); creep.say('adaad');
                                            creep.say('heal');
                                        }
                                    }
    
                                    // Перерерождение
                                    // Определние времени 
                                    if (creep.memory.rangeToHome === undefined) {
                                        var range = creep.pos.getRangeTo(targetBanks);
                                        if (range <= 5) {
                                            creep.memory.rangeToHome = 1500 - creep.ticksToLive + creep.memory.SpawninigTime;
                                        }
                                    }
    
                                    //Спавн замены ко времени
                                    if (creep.ticksToLive < creep.memory.rangeToHome) {
                                        if (creep.memory.revival == 1) {
                                            const CreepName = 'creepID-' + `f${(~~(Math.random() * 1e8)).toString(16)}`;
                                            let bodys = _.map(creep.body, 'type');
                                            let roomNumber = creep.memory.roomNumber;
                                            Memory.processor['SpawnControl' + roomNumber].List[CreepName] = {
                                                name: CreepName, role: creep.memory.role, priority: 0, roomNumber: creep.memory.roomNumber, charact: bodys,
                                                options: creep.memory.options, squad: creep.memory.squad, queue: 0, TargetStatus: '!achieved', revival: creep.memory.revival,
                                            };
                                            creep.memory.revival = 0;
                                        }
                                    }
                                    // Вызов транспорта на сбор ресурсов
                                    if (targetBanks.hits < 250000) {
                                        TransportCall();
                                    }
                                } else if (!targetBanks) {
                                    CombatMovement(new RoomPosition(25, 25, creep.pos.roomName));
                                }
                            }
                        }
                    }


                   /** let Target = _.find(HeshTargets, o => o.squad == creep.memory.squad && o.queue == creep.memory.queue);
                    if (Target) {

                        if (Target.Type == 'waitForSquad') {

                            if (typeof (Target.target) == 'string') {

                                if (creep.pos.roomName !== Target.target) {
                                    CombatMovement(new RoomPosition(25, 25, Target.target), { visualizePathStyle: { stroke: '#4169E0', opacity: 0.5, } });
                                } else if (creep.pos.roomName == Target.target) {
                                    let PosCheckPoint = new RoomPosition(25, 25, Target.target);
                                    let CreepForCreckPoint = PosCheckPoint.findInRange(FIND_MY_CREEPS, 3);

                                    CombatMovement(PosCheckPoint, { visualizePathStyle: { stroke: '#4169E0', opacity: 0.5, } });

                                    if (!creep.memory.expectedSquads) {
                                        let m = 0;
                                        for (let i = 0; i < Target.expectedSquads.length; i++) {
                                            let SumAstartes = _.sum(Game.creeps, creep => creep.memory.role == 'astartes' && creep.memory.squad == Target.expectedSquads[i]);
                                            m = m + SumAstartes;
                                        }
                                        creep.memory.expectedSquads = m;
                                    } else if (creep.memory.expectedSquads) {
                                        if (CreepForCreckPoint.length >= creep.memory.expectedSquads) {
                                            creep.memory.queue = creep.memory.queue + 1;
                                        }
                                    }

                                }
                            } else if (typeof (Target.target) !== 'string') {

                                if (!creep.pos.inRangeTo(Target.target, 2)) {
                                    CombatMovement(Target.target, { visualizePathStyle: { stroke: '#4169E0', opacity: 0.5, } });
                                } else if (creep.pos.inRangeTo(Target.target, 2)) {
                                    let SumAstartes = _.sum(Game.creeps, creep => creep.memory.role == 'astartes' && creep.memory.squad == Gatherings[o].ColorSquad);

                                    if (!creep.memory.expectedSquads) {
                                        let m = 0;
                                        for (let i = 0; i < target.expectedSquads.length; i++) {
                                            let SumAstartes = _.sum(Game.creeps, creep => creep.memory.role == 'astartes' && creep.memory.squad == target.expectedSquads[i]);
                                            m = m + SumAstartes;
                                        }
                                        creep.memory.expectedSquads = m;
                                    } else if (creep.memory.expectedSquads) {
                                        let PosCheckPoint = new RoomPosition(Target.target);
                                        let CreepForCreckPoint = PosCheckPoint.findInRange(FIND_MY_CREEPS, 5);

                                        if (CreepForCreckPoint.length >= creep.memory.expectedSquads) {
                                            creep.memory.queue = creep.memory.queue + 1;
                                        }
                                    }
                                }
                            }

                        } else if (Target.Type == 'attack') {

                            if (typeof (Target.target) == 'string') {

                                if (creep.pos.roomName !== Target.target) {
                                    CombatMovement(new RoomPosition(25, 25, Target.target), { visualizePathStyle: { stroke: '#8B0000', opacity: 0.5, } });
                                } else if (creep.pos.roomName == Target.target) {
                                    let targetCreep = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
                                        filter: function (object) {
                                            return object.getActiveBodyparts(ATTACK) > 0 || object.getActiveBodyparts(RANGED_ATTACK) > 0;
                                        }
                                    });
                                    let targetStructure = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, { filter: object => (object.structureType !== STRUCTURE_CONTROLLER) });

                                    if (targetCreep) {

                                        let RangedBodyparts = creep.getActiveBodyparts(RANGED_ATTACK);
                                        let AttackBodyparts = creep.getActiveBodyparts(ATTACK);

                                        //creep.attack(targetCreep);

                                        if (creep.rangedAttack(targetCreep) == ERR_NOT_IN_RANGE) {
                                            CombatMovement(targetCreep, { visualizePathStyle: { stroke: '#FF0000', opacity: 0.5, } });
                                        } else {
                                            creep.rangedAttack(targetCreep);
                                        }

                                        if ((RangedBodyparts < AttackBodyparts) && (creep.attack(targetCreep) == ERR_NOT_IN_RANGE)) {
                                            CombatMovement(targetCreep, { visualizePathStyle: { stroke: '#FF0000', opacity: 0.5, } });
                                        } else {
                                            creep.attack(targetCreep);
                                        }


                                    } else if (targetStructure) {
                                        creep.say(targetStructure.structureType);

                                        if (creep.rangedAttack(targetStructure) == ERR_NOT_IN_RANGE) {
                                            CombatMovement(targetStructure, { visualizePathStyle: { stroke: '#FF0000', opacity: 0.5, } });
                                        } else {
                                            creep.rangedAttack(targetStructure);
                                        }

                                        if (creep.attack(targetStructure) == ERR_NOT_IN_RANGE) {
                                            CombatMovement(targetStructure, { visualizePathStyle: { stroke: '#FF0000', opacity: 0.5, } });
                                        } else {
                                            creep.attack(targetStructure);
                                        }
                                    } else if (!targetCreep && !targetStructure) {
                                        creep.memory.queue = creep.memory.queue + 1;
                                    }

                                }

                            } else if (typeof (Target.target) !== 'string') {

                                const Range = creep.pos.getRangeTo(Target.target);

                                if (Range > 3) {
                                    CombatMovement(Target.target, { visualizePathStyle: { stroke: '#FF0000', opacity: 0.5, } });
                                } else if (Range <= 4) {

                                    let LookF = creep.room.lookAt(Target.target);
                                    let targets = _.filter(LookF, opa => opa.type == 'structure' || opa.type == 'creep');
                                    if (targets.length > 0) {

                                        if (RangedAttackBodyparts > 0) {
                                            if ((creep.rangedAttack(targets[0].structure || targets[0].creep)) == ERR_NOT_IN_RANGE) {
                                                CombatMovement((targets[0].structure || targets[0].creep), { visualizePathStyle: { stroke: '#FF0000', opacity: 0.5, } });
                                            }
                                        }

                                        if (AttackBodyparts > 0) {
                                            if ((creep.attack(targets[0].structure || targets[0].creep)) == ERR_NOT_IN_RANGE) {
                                                CombatMovement((targets[0].structure || targets[0].creep), { visualizePathStyle: { stroke: '#B22222', opacity: 0.5, } });
                                            }
                                        }

                                    } else if (targets.length == 0) {
                                        creep.memory.queue = creep.memory.queue + 1;
                                    }
                                }
                            }

                        }


                    } else if (Target == undefined) {
                            
                            CombatMovement(new RoomPosition(25,25, creep.pos.roomName));
                            
                            if (creep.memory.massage == undefined) {
                                Game.notify('Your soldiers from' + creep.memory.squad + 'completed all the tasks in the sector'+ creep.pos.roomName + ' '+ Game.time, 0);
                                creep.memory.massage = 1;                            
                            } 
                            
                        // CombatMovement(new RoomPosition(25, 25, creep.memory.roomName));
                        } **/
                }



                // ÃÂÃÂÃÂÃÂ¾ÃÂÃÂ±ÃÂÃÂ°ÃÂÃÂ²ÃÂÃÂ¸ÃÂÃÂÃÂÃÂ ÃÂÃÂ°ÃÂÃÂÃÂÃÂ°ÃÂÃÂºÃÂÃÂ ÃÂÃÂÃÂÃÂµÃÂÃÂ»ÃÂÃÂ¸ ÃÂÃÂ¿ÃÂÃÂ¾ ÃÂÃÂ°ÃÂÃÂ½ÃÂÃÂ°ÃÂÃÂ»ÃÂÃÂ¾ÃÂÃÂ³ÃÂÃÂ¸ÃÂÃÂ¸ ÃÂÃÂ²ÃÂÃÂÃÂÃÂÃÂÃÂµ ÃÂÃÂºÃÂÃÂ°ÃÂÃÂº ÃÂÃÂ ÃÂÃÂ¼ÃÂÃÂÃÂÃÂ²ÃÂÃÂ¾ÃÂÃÂ¼
            }

        }

        if (AttackBodyparts > 0) {
            if (HostileCreeps.length > 0) {
                if (AttackBodyparts >= RangedAttackBodyparts) {
                    if (creep.attack(ClosestCreeps) == ERR_NOT_IN_RANGE) {
                        CombatMovement(ClosestCreeps);
                        creep.say('Come to me')
                    }
                } else if (AttackBodyparts < RangedAttackBodyparts) {
                    if (creep.rangedAttack(ClosestCreeps) == ERR_NOT_IN_RANGE) {
                        CombatMovement(ClosestCreeps);
                        creep.say('Come to me')
                    }
                }
            }
        }

        //creep.heal(creep);
        if (RangedAttackBodyparts > 0) {
            if (HostileCreeps.length > 0) {
                creep.rangedAttack(ClosestCreeps);
            }
        }

        if (creep.attack(ClosestCreeps) !== OK) {
            creep.heal(creep);
        }



    }
};



module.exports = roleAstartes;  
