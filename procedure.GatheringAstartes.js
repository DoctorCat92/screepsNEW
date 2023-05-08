var GatheringAstartes = {
    
    create: function () {

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
    }
}
module.export = GatheringAstartes;