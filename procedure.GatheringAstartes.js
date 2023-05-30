var GatheringAstartes = {
    
    run: function () {
        
        var CreateSquad = _.find(Game.flags, f => f.name.startsWith('CreateSquad'));

        if (CreateSquad) {
            
            var PosFlag = CreateSquad.pos;
            var str = CreateSquad.name;
            var Healer = str.indexOf('Healer', 10);
            var Ranged = str.indexOf('Ranged', 10);
            var Melee = str.indexOf('Melee', 10);
            var Rep = str.indexOf('Rep', 10);
            var Auto = str.indexOf('Auto', 10);
            var VarRep = false;
            var VarAuto = false;
            if (Rep > 0) {
                VarRep = true;
            }
            if (Auto > 0) {
                VarAuto = true;
            }
            

            if (Memory.army === undefined) {
                Memory.army = {};
                Memory.army[CreateSquad.color] = { ColorSquad: CreateSquad.color, CheckPoint: PosFlag, Gathering: true, Population: true, Replenishment: VarRep, Transport: false },
                Memory.army[CreateSquad.color].apothecary = Number(str[Healer + 7]);
                if (Ranged > 0) {
                    Memory.army[CreateSquad.color].typeAstartes = 'Ranged';
                    Memory.army[CreateSquad.color].astartes = Number(str[Ranged + 7]);
                }
                if (Melee > 0) {
                     Memory.army[CreateSquad.color].typeAstartes = 'Melee';
                     Memory.army[CreateSquad.color].astartes = Number(str[Melee + 6]);
                }
                Memory.army[CreateSquad.color].typeCharact = VarAuto;
                CreateSquad.remove();
            } else {
                Memory.army[CreateSquad.color] = { ColorSquad: CreateSquad.color, CheckPoint: PosFlag, Gathering: true, Population: true, Replenishment: VarRep, Transport: false };
                Memory.army[CreateSquad.color].apothecary = Number(str[Healer + 7]);
                if (Ranged > 0) {
                    Memory.army[CreateSquad.color].typeAstartes = 'Ranged';
                    Memory.army[CreateSquad.color].astartes = Number(str[Ranged + 7]);
                }
                if (Melee > 0) {
                     Memory.army[CreateSquad.color].typeAstartes = 'Melee';
                     Memory.army[CreateSquad.color].astartes = Number(str[Melee + 6]);
                }
                Memory.army[CreateSquad.color].typeCharact = VarAuto;
                CreateSquad.remove();
            }

        }


        var Gatherings = _.filter(Memory.army, o => o.Gathering == true || (o.Gathering == false && o.Replenishments == true));
        //console.log() 
        if (Gatherings.length > 0) {

            for (let o = 0; o < Gatherings.length; o++) {
                
                if (Gatherings[o].typeCharact == true) {
                    let Capasity1 = RoomsCapacity;
                    let Capasity2 = RoomsCapacity;
                    let Capasity3 = RoomsCapacity;
                    let ArrayCharact = [];
                    let ArrayHeal = [];
                    let r = 0;
                    let m = 0;
                    let a = 0;
                    if (Gatherings[o].typeAstartes == 'Ranged') {
                        do { 
                            ArrayCharact.push(MOVE,RANGED_ATTACK); 
                            Capasity1 = Capasity1 - 200;
                            r++;
                            if (Capasity1 <= 250) break;
                        } while (r < 25);
                    }

                    if (Gatherings[o].typeAstartes == 'Melee') {
                        do {
                            ArrayCharact.push(MOVE,ATTACK); 
                            Capasity2 = Capasity2 - 130;
                            m++;
                            if (Capasity2 <= 250) break;
                        } while (m < 25);
                    }

                    if (Gatherings[o].apothecary > 0) {
                        do {
                            ArrayHeal.push(MOVE,HEAL); 
                            Capasity3 = Capasity3 - 300;
                            a++;
                            if (Capasity3 <= 300) break;
                        } while (a < 25);
                    }
                    
                    
                    TablePopulation['ControlAstartes' + Gatherings[o].CheckPoint.roomName + Gatherings[o].ColorSquad] =
                        {
                            role: 'astartes', roomNumber: Gatherings[o].CheckPoint.roomName, priority: 0, count: Gatherings[o].astartes, staffed: [], charact: ArrayCharact,
                            options: Gatherings[o].ColorSquad,
                            squad: Gatherings[o].ColorSquad,
                            revival: 1,
                        };
                    //console.log(TablePopulation['ControlAstartes++++++' + Gatherings[o].CheckPoint.roomName + Gatherings[o].ColorSquad].count);
                    
                    TablePopulation['ControlApothecary' + Gatherings[o].CheckPoint.roomName + Gatherings[o].ColorSquad] =
                    {
                        role: 'apothecary', roomNumber: Gatherings[o].CheckPoint.roomName, priority: 0, count: Gatherings[o].apothecary, staffed: [],
                        charact: ArrayHeal,
                        options: Gatherings[o].ColorSquad,
                        squad: Gatherings[o].ColorSquad,
                        revival: 1,
                    };
                    console.log(TablePopulation['ControlApothecary' + Gatherings[o].CheckPoint.roomName + Gatherings[o].ColorSquad].count);
                } else if (Gatherings[o].typeCharact == false) {
                    TablePopulation['ControlAstartes' + Gatherings[o].CheckPoint.roomName + Gatherings[o].ColorSquad] =
                    {
                        role: 'astartes', roomNumber: Gatherings[o].CheckPoint.roomName, priority: 0, count: Gatherings[o].astartes, staffed: [],
                        charact:
                            [
                                MOVE, MOVE, MOVE, MOVE, MOVE,
                                MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                                MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,

                                    /**  RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
                                    RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
                                    RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK, **/

                                ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK,
                                ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK,
                                ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, 


                                //  /**
                                //RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
                                //  RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,HEAL,HEAL,HEAL,HEAL,HEAL,
                                //  HEAL,HEAL,HEAL,HEAL,HEAL, 
                                // **/

                            ],
                        options: Gatherings[o].ColorSquad,
                        squad: Gatherings[o].ColorSquad,
                        revival: 1,
                    };


                    TablePopulation['ControlApothecary' + Gatherings[o].CheckPoint.roomName + Gatherings[o].ColorSquad] =
                    {
                        role: 'apothecary', roomNumber: Gatherings[o].CheckPoint.roomName, priority: 0, count: Gatherings[o].apothecary, staffed: [],
                        charact:
                            [
                                //HEAL,HEAL,HEAL,HEAL,HEAL,

                                //MOVE,MOVE,MOVE,MOVE,MOVE,            
                                MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                                MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                                MOVE, MOVE, MOVE, MOVE, MOVE,

                                HEAL, HEAL, HEAL, HEAL, HEAL,
                                HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL,
                                HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL,
                            ],
                        options: Gatherings[o].ColorSquad,
                        squad: Gatherings[o].ColorSquad,
                        revival: 1,
                    };

                    // var RolesAstartes = _.find(RolesHesh, pun => pun.role == 'astartes' && pun.roomNumber == Gatherings[o].CheckPoint.roomName && pun.squad == Gatherings[o].ColorSquad);
                        
                }

                var GatheringSquad = Gatherings[o].astartes + Gatherings[o].apothecary;
                var SumAstartes = _.sum(Game.creeps, creep => creep.memory.role == 'astartes' && creep.memory.roomNumber == Gatherings[o].CheckPoint.roomName && creep.spawning == false && creep.memory.squad == Gatherings[o].ColorSquad);
                var SumApothecary = _.sum(Game.creeps, creep => creep.memory.role == 'apothecary' && creep.memory.roomNumber == Gatherings[o].CheckPoint.roomName && creep.spawning == false && creep.memory.squad == Gatherings[o].ColorSquad);
                var SumSquad = SumAstartes + SumApothecary;

                if (GatheringSquad !== undefined) {
                    if (GatheringSquad == SumSquad) {
                        var PosCheckPoint = new RoomPosition(Gatherings[o].CheckPoint.x, Gatherings[o].CheckPoint.y, Gatherings[o].CheckPoint.roomName);
                        var CreepForCreckPoint = PosCheckPoint.findInRange(FIND_MY_CREEPS, 4);
                        if (CreepForCreckPoint.length >= SumSquad) {
                            Gatherings[o].Gathering = false;
                        }
                    }   
                }
            }
        }

        
        var MemorySquad = _.filter(Memory.army, o => o.Gathering == false && o.Replenishment == false);

        for (let s = 0; s < MemorySquad.length; s++) {
            var Astartes = _.filter(Game.creeps, creep => creep.memory.role == 'astartes' && creep.memory.roomNumber == MemorySquad[s].CheckPoint.roomName && creep.memory.squad == MemorySquad[s].ColorSquad);
            if (Astartes.length == 0) {
                var FlagsSquads = _.filter(Game.flags, f => f.name.startsWith('Squad'+MemorySquad[s].ColorSquad));
                for (let i=0; i < FlagsSquads.length; i++) {
                    Game.notify('Флаги сквада ' + MemorySquad[s].ColorSquad + ' удалены ' +Game.time+ ' в комнате '+ FlagsSquads[i].pos.roomName , 0);
                    FlagsSquads[i].remove();
                }
                Game.notify('Your soldiers from ' + MemorySquad[s].ColorSquad + ' squad destroyed ' + Game.time, 0);
                delete Memory.army[MemorySquad[s].ColorSquad];
            }
        }
    }

};

module.exports = GatheringAstartes;