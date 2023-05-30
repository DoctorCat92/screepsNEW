var serviceSpawnControl = {
    
    priority: 1,
    type: 'service',

    run: function (process) {
    

        // ----ТАБЛИЦА ПОПУЛЯЦИИ - таблица из которой берутся данные о крипах, ниже она динамически заполняется в зависимости от уровня контроллера. 

        TablePopulation =

        {
            //harvester:  {role: 'support', roomNumber: 'W19S58', priority: 1, count: 1, staffed: [], charact: [CARRY], options: 1, }, //CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE
          //  support45: { role: 'support', roomNumber: 'W12N51', priority: 3, count: 0, options: 5, staffed: [], charact: [CARRY,CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,CARRY,CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]  },

        }


        

        //------------- Определние уровня комнаты 

        var RoomsEnergy = Game.rooms[process.Room].energyAvailable;
        var RoomsCapacity = Game.rooms[process.Room].energyCapacityAvailable;
        var MassExtension = Game.rooms[process.Room].find(FIND_STRUCTURES, { filter: object => (object.structureType == STRUCTURE_EXTENSION) });
        var Controller = Game.rooms[process.Room].find(FIND_STRUCTURES, { filter: object => (object.structureType == STRUCTURE_CONTROLLER) });
        //let Tower = Game.rooms[roomName].find(FIND_STRUCTURES, {filter: object => (object.structureType == STRUCTURE_TOWER)});
        //let SumEnergyTower = _.sum(Tower.energy);
        //let currentRoom = Memory.rooms[process.Room];
        let Mem = Memory.processor[process.NameProcess];
        const ArrayExtension = [0, 0, 0, 10, 20, 30, 40, 50, 60]
        const ArrayEnergy = [0, 0, 250, 500, 1000, 1500, 2000, 5000, 11000]
        Mem['RoomsEnergy'] = RoomsEnergy;
        Mem['RoomsCapacity'] = RoomsCapacity;
        Mem['MassExtension'] = MassExtension;
        Mem['percentageOfOccupancy'] = (RoomsEnergy / RoomsCapacity) * 100;

        for (i = 1; i < (Controller[0].level + 1); i++) {
            if ((MassExtension.length >= ArrayExtension[i]) && (RoomsEnergy >= ArrayEnergy[i])) {
               Memory.processor[process.NameProcess].level = i;
            }
        }
        // Инфа о комнате 

        

        //--------------------- Автостроительство крипчанов

        var ControlHarvester = _.find(TablePopulation, o => o.roomNumber == process.Room && o.role == 'harvester');
        var ControlCarrier = _.find(TablePopulation, o => o.roomNumber == process.Room && o.role == 'carrier');
        var ControlUpgrader = _.find(TablePopulation, o => o.roomNumber == process.Room && o.role == 'upgrader');
        var ControlRepairer = _.find(TablePopulation, o => o.roomNumber == process.Room && o.role == 'repairer');
        var ControlBuilder = _.find(TablePopulation, o => o.roomNumber == process.Room && o.role == 'builder');
        var ControlMiner = _.find(TablePopulation, o => o.roomNumber == process.Room && o.role == 'miner');
        var ControlSupport = _.find(TablePopulation, o => o.roomNumber == process.Room && o.role == 'support');
        var ControlScout = _.find(TablePopulation, o => o.roomNumber == process.Room && o.role == 'scout');


        var MassContainer = Game.rooms[process.Room].find(FIND_STRUCTURES, { filter: object => (object.structureType == STRUCTURE_CONTAINER) });
        var MassLink = Game.rooms[process.Room].find(FIND_STRUCTURES, { filter: object => (object.structureType == STRUCTURE_LINK) });

        let LevelRoom = Memory.processor[process.NameProcess];




        if (!ControlScout) {

            switch(LevelRoom.level) {
                
            }

            if (LevelRoom.level >= 1) {
                TablePopulation[process.Room + 'ControlScout'] = { role: 'scout', roomNumber: process.Room, priority: 2, count: 0, staffed: [], charact: [MOVE, MOVE], options: 1, };
            }
        }



        if (!ControlHarvester) {
            if (LevelRoom.level == 1) {
                if (MassLink.length < 3 && MassContainer.length < 2) {
                    TablePopulation[process.Room + 'ControlHarvester'] = { role: 'harvester', roomNumber: process.Room, priority: 1, count: 4, staffed: [], charact: [MOVE, WORK, CARRY], options: 1, };
                } if (MassLink.length < 3 && MassContainer.length > 0) {
                    TablePopulation[process.Room + 'ControlHarvester'] = { role: 'harvester', roomNumber: process.Room, priority: 1, count: 2, staffed: [], charact: [MOVE, WORK, CARRY], options: 2, };
                } if (MassLink.length < 3 && MassContainer.length < 2) { TablePopulation[process.Room + 'ControlHarvester'] = { role: 'harvester', roomNumber: process.Room, priority: 1, count: 4, staffed: [], charact: [WORK, MOVE, CARRY], options: 1, }; }
            } else if (LevelRoom.level == 2) {
                if (MassLink.length >= 3) {
                    TablePopulation[process.Room + 'ControlHarvester'] = { role: 'harvester', roomNumber: process.Room, priority: 1, count: 2, staffed: [], charact: [WORK, CARRY, MOVE, WORK], options: 3, };
                } if (MassLink.length < 3 && MassContainer.length > 0) {
                    TablePopulation[process.Room + 'ControlHarvester'] = { role: 'harvester', roomNumber: process.Room, priority: 1, count: 2, staffed: [], charact: [WORK, WORK, MOVE, MOVE], options: 2, };
                } if (MassLink.length < 3 && MassContainer.length < 2) { TablePopulation[process.Room + 'ControlHarvester'] = { role: 'harvester', roomNumber: process.Room, priority: 1, count: 4, staffed: [], charact: [MOVE, WORK, CARRY, MOVE], options: 1, }; }
            } else if (LevelRoom.level == 3) {
                if (MassLink.length >= 3) {
                    TablePopulation[process.Room + 'ControlHarvester'] = { role: 'harvester', roomNumber: process.Room, priority: 1, count: 2, staffed: [], charact: [WORK, WORK, CARRY, MOVE, WORK], options: 3, };
                } if (MassLink.length < 3 && MassContainer.length > 0) {
                    TablePopulation[process.Room + 'ControlHarvester'] = { role: 'harvester', roomNumber: process.Room, priority: 1, count: 2, staffed: [], charact: [WORK, WORK, CARRY, MOVE, WORK], options: 2, };
                } if (MassLink.length < 3 && MassContainer.length < 2) { TablePopulation[process.Room + 'ControlHarvester'] = { role: 'harvester', roomNumber: process.Room, priority: 1, count: 4, staffed: [], charact: [MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE], options: 1, }; }
            } else if (LevelRoom.level == 4) {
                if (MassLink.length >= 3) {
                    TablePopulation[process.Room + 'ControlHarvester'] = { role: 'harvester', roomNumber: process.Room, priority: 1, count: 2, staffed: [], charact: [WORK, WORK, WORK, CARRY, MOVE, WORK], options: 3, };
                } if (MassLink.length < 3 && MassContainer.length > 0) {
                    TablePopulation[process.Room + 'ControlHarvester'] = { role: 'harvester', roomNumber: process.Room, priority: 1, count: 2, staffed: [], charact: [WORK, WORK, WORK,CARRY, MOVE, MOVE, MOVE], options: 2, };
                } if (MassLink.length < 3 && MassContainer.length < 2) { TablePopulation[process.Room + 'ControlHarvester'] = { role: 'harvester', roomNumber: process.Room, priority: 1, count: 4, staffd: [], charact: [MOVE, WORK, CARRY, MOVE, WORK, CARRY], options: 1, }; }
            } else if (LevelRoom.level == 5) {
                if (MassLink.length >= 3) {
                    TablePopulation[process.Room + 'ControlHarvester'] = { role: 'harvester', roomNumber: process.Room, priority: 1, count: 2, staffed: [], charact: [WORK, WORK, WORK, CARRY, MOVE, WORK], options: 3, };
                } else if (MassLink.length < 3 && MassContainer.length > 0) {
                    TablePopulation[process.Room + 'ControlHarvester'] = { role: 'harvester', roomNumber: process.Room, priority: 1, count: 2, staffed: [], charact: [WORK, WORK, WORK, CARRY, CARRY, MOVE, WORK], options: 2, };
                } else if (MassLink.length < 3 && MassContainer.length < 2) { TablePopulation[process.Room + 'ControlHarvester'] = { role: 'harvester', roomNumber: process.Room, priority: 1, count: 4, staffed: [], charact: [MOVE, WORK, CARRY, MOVE, WORK, CARRY], options: 1, }; }
            } else if (LevelRoom.level == 6) {
                if (MassLink.length >= 3) {
                    TablePopulation[process.Room + 'ControlHarvester'] = { role: 'harvester', roomNumber: process.Room, priority: 1, count: 2, staffed: [], charact: [WORK, WORK, WORK, CARRY, MOVE, WORK], options: 3, };
                } else if (MassLink.length < 3 && MassContainer.length > 0) {
                    TablePopulation[process.Room + 'ControlHarvester'] = { role: 'harvester', roomNumber: process.Room, priority: 1, count: 2, staffed: [], charact: [WORK, WORK, WORK, CARRY, MOVE, CARRY, WORK], options: 2, };
                } else if (MassLink.length < 3 && MassContainer.length < 2) { TablePopulation[process.Room + 'ControlHarvester'] = { role: 'harvester', roomNumber: process.Room, priority: 1, count: 4, staffed: [], charact: [MOVE, WORK, CARRY, MOVE, WORK, CARRY], options: 1, }; }
            } else if (LevelRoom.level == 7) {
                if (MassLink.length >= 3) {
                    TablePopulation[process.Room + 'ControlHarvester'] = { role: 'harvester', roomNumber: process.Room, priority: 1, count: 2, staffed: [], charact: [WORK, WORK, WORK, CARRY, MOVE, WORK], options: 3, };
                } else if (MassLink.length < 3 && MassContainer.length > 0) {
                    TablePopulation[process.Room + 'ControlHarvester'] = { role: 'harvester', roomNumber: process.Room, priority: 1, count: 2, staffed: [], charact: [WORK, WORK, WORK, CARRY, MOVE, CARRY, WORK], options: 2, };
                } else if (MassLink.length < 3 && MassContainer.length < 2) { TablePopulation[process.Room + 'ControlHarvester'] = { role: 'harvester', roomNumber: process.Room, priority: 1, count: 4, staffed: [], charact: [MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY], options: 1, }; }

            } else if (LevelRoom.level == 8) {
                if (MassLink.length >= 3) {
                    TablePopulation[process.Room + 'ControlHarvester'] = { role: 'harvester', roomNumber: process.Room, priority: 1, count: 2, staffed: [], charact: [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE], options: 3, };
                } else if (MassLink.length < 3 && MassContainer.length > 0) {
                    TablePopulation[process.Room + 'ControlHarvester'] = { role: 'harvester', roomNumber: process.Room, priority: 1, count: 2, staffed: [], charact: [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, WORK], options: 2, };
                } else if (MassLink.length < 3 && MassContainer.length < 2) { TablePopulation[process.Room + 'ControlHarvester'] = { role: 'harvester', roomNumber: process.Room, priority: 1, count: 4, staffed: [], charact: [MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY], options: 1, }; }
            }
        }


        if (!ControlCarrier && (MassContainer.length > 0) || (MassLink.length > 0)) {
            if (LevelRoom.level == 1) {
                if (MassLink.length > 2) {
                    TablePopulation[process.Room + 'ControlCarrier'] = { role: 'carrier', roomNumber: process.Room, priority: 2, count: 4, staffed: [], charact: [MOVE, CARRY], options: 3, };
                } if (MassLink.length < 3 && MassContainer.length > 0) {
                    TablePopulation[process.Room + 'ControlCarrier'] = { role: 'carrier', roomNumber: process.Room, priority: 2, count: 4, staffed: [], charact: [MOVE, CARRY], options: 1, };
                }
            } else if (LevelRoom.level == 2) {
                if (MassLink.length > 2) {
                    TablePopulation[process.Room + 'ControlCarrier'] = { role: 'carrier', roomNumber: process.Room, priority: 2, count: 4, staffed: [], charact: [MOVE, CARRY], options: 3, };
                } if (MassLink.length < 3 && MassContainer.length > 0) {
                    TablePopulation[process.Room + 'ControlCarrier'] = { role: 'carrier', roomNumber: process.Room, priority: 2, count: 4, staffed: [], charact: [MOVE, CARRY], options: 1, };
                }
            } else if (LevelRoom.level == 3) {
                if (MassLink.length > 2) {
                    TablePopulation[process.Room + 'ControlCarrier'] = { role: 'carrier', roomNumber: process.Room, priority: 2, count: 4, staffed: [], charact: [MOVE, CARRY, MOVE, CARRY, MOVE, CARRY], options: 3, };
                } if (MassLink.length < 3 && MassContainer.length > 0) {
                    TablePopulation[process.Room + 'ControlCarrier'] = { role: 'carrier', roomNumber: process.Room, priority: 2, count: 4, staffed: [], charact: [MOVE, CARRY, MOVE, CARRY, MOVE, CARRY], options: 1, };
                }
                TablePopulation[process.Room + 'ControlCarrier'] = { role: 'carrier', roomNumber: process.Room, priority: 2, count: 1, staffed: [], charact: [MOVE, CARRY], options: 1, };
            } else if (LevelRoom.level == 4) {
                if (MassLink.length > 2) {
                    TablePopulation[process.Room + 'ControlCarrier'] = { role: 'carrier', roomNumber: process.Room, priority: 2, count: 4, staffed: [], charact: [MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY], options: 3, };
                } if (MassLink.length < 3 && MassContainer.length > 0) {
                    TablePopulation[process.Room + 'ControlCarrier'] = { role: 'carrier', roomNumber: process.Room, priority: 2, count: 4, staffed: [], charact: [MOVE, CARRY, MOVE, CARRY, MOVE, CARRY], options: 1, };
                }
            } else if (LevelRoom.level == 5) {
                if (MassLink.length > 2) {
                    TablePopulation[process.Room + 'ControlCarrier'] = { role: 'carrier', roomNumber: process.Room, priority: 2, count: 4, staffed: [], charact: [MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY], options: 3, };
                } if (MassLink.length < 3 && MassContainer.length > 0) {
                    TablePopulation[process.Room + 'ControlCarrier'] = { role: 'carrier', roomNumber: process.Room, priority: 2, count: 4, staffed: [], charact: [MOVE, CARRY, MOVE, CARRY, MOVE, CARRY], options: 1, };
                }
            } else if (LevelRoom.level == 6) {
                if (MassLink.length > 2) {
                    TablePopulation[process.Room + 'ControlCarrier'] = { role: 'carrier', roomNumber: process.Room, priority: 2, count: 4, staffed: [], charact: [MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY], options: 3, };
                } if (MassLink.length < 3 && MassContainer.length > 0) {
                    TablePopulation[process.Room + 'ControlCarrier'] = { role: 'carrier', roomNumber: process.Room, priority: 2, count: 4, staffed: [], charact: [MOVE, CARRY, MOVE, CARRY, MOVE, CARRY], options: 1, };
                }
            } else if (LevelRoom.level == 7) {
                if (MassLink.length > 2) {
                    TablePopulation[process.Room + 'ControlCarrier'] = { role: 'carrier', roomNumber: process.Room, priority: 2, count: 4, staffed: [], charact: [MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY], options: 3, };
                } if (MassLink.length < 3 && MassContainer.length > 0) {
                    TablePopulation[process.Room + 'ControlCarrier'] = { role: 'carrier', roomNumber: process.Room, priority: 2, count: 4, staffed: [], charact: [MOVE, CARRY, MOVE, CARRY, MOVE, CARRY], options: 1, };
                }
            } else if (LevelRoom.level == 8) {
                if (MassLink.length > 2) {
                    TablePopulation[process.Room + 'ControlCarrier'] = { role: 'carrier', roomNumber: process.Room, priority: 2, count: 4, staffed: [], charact: [MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, CARRY, CARRY,  CARRY, CARRY], options: 3, };
                } if (MassLink.length < 3 && MassContainer.length > 0) {
                    TablePopulation[process.Room + 'ControlCarrier'] = { role: 'carrier', roomNumber: process.Room, priority: 2, count: 4, staffed: [], charact: [MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY], options: 1, };
                }
            }
        }

        if (!ControlRepairer) {
            if (LevelRoom.level == 1) {
                TablePopulation[process.Room + 'ControlRepairer'] = { role: 'repairer', roomNumber: process.Room, priority: 3, count: 1, staffed: [], charact: [MOVE, WORK, CARRY], options: 1, };
            } else if (LevelRoom.level == 2) {
                TablePopulation[process.Room + 'ControlRepairer'] = { role: 'repairer', roomNumber: process.Room, priority: 3, count: 1, staffed: [], charact: [MOVE, WORK, CARRY, MOVE, WORK], options: 1, };
            } else if (LevelRoom.level == 3) {
                TablePopulation[process.Room + 'ControlRepairer'] = { role: 'repairer', roomNumber: process.Room, priority: 3, count: 1, staffed: [], charact: [MOVE, WORK, CARRY, MOVE, WORK, CARRY], options: 1, };
            } else if (LevelRoom.level == 4) {
                TablePopulation[process.Room + 'ControlRepairer'] = { role: 'repairer', roomNumber: process.Room, priority: 3, count: 2, staffed: [], charact: [MOVE, WORK, CARRY, MOVE, WORK, CARRY], options: 1, };
            } else if (LevelRoom.level == 5) {
                TablePopulation[process.Room + 'ControlRepairer'] = { role: 'repairer', roomNumber: process.Room, priority: 3, count: 2, staffed: [], charact: [MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY], options: 1, };
            } else if (LevelRoom.level == 6) {
                TablePopulation[process.Room + 'ControlRepairer'] = { role: 'repairer', roomNumber: process.Room, priority: 3, count: 2, staffed: [], charact: [MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY], options: 1, };
            } else if (LevelRoom.level == 7) {
                TablePopulation[process.Room + 'ControlRepairer'] = { role: 'repairer', roomNumber: process.Room, priority: 3, count: 2, staffed: [], charact: [MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY], options: 1, };
            } else if (LevelRoom.level == 8) {
                TablePopulation[process.Room + 'ControlRepairer'] = { role: 'repairer', roomNumber: process.Room, priority: 3, count: 2, staffed: [], charact: [MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY], options: 1, };
            }
        }



        if (!ControlUpgrader) {
            if (LevelRoom.level == 1) {
                TablePopulation[process.Room + 'ControlUpgrader'] = { role: 'upgrader', roomNumber: process.Room, priority: 3, count: 3, staffed: [], charact: [MOVE, WORK, CARRY], options: 1, };
            } else if (LevelRoom.level == 2) {
                TablePopulation[process.Room + 'ControlUpgrader'] = { role: 'upgrader', roomNumber: process.Room, priority: 3, count: 3, staffed: [], charact: [MOVE, MOVE, MOVE, MOVE, WORK, WORK, CARRY, CARRY, CARRY], options: 1, };
            } else if (LevelRoom.level == 3) {
                TablePopulation[process.Room + 'ControlUpgrader'] = { role: 'upgrader', roomNumber: process.Room, priority: 3, count: 2, staffed: [], charact: [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, CARRY, CARRY, CARRY], options: 1, };
            } else if (LevelRoom.level == 4) {
                TablePopulation[process.Room + 'ControlUpgrader'] = { role: 'upgrader', roomNumber: process.Room, priority: 3, count: 3, staffed: [], charact: [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY], options: 1, };
            } else if (LevelRoom.level == 5) {
                TablePopulation[process.Room + 'ControlUpgrader'] = { role: 'upgrader', roomNumber: process.Room, priority: 3, count: 3, staffed: [], charact: [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY], options: 1, };
            } else if (LevelRoom.level == 6) {
                TablePopulation[process.Room + 'ControlUpgrader'] = { role: 'upgrader', roomNumber: process.Room, priority: 3, count: 3, staffed: [], charact: [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY], options: 1, };
            } else if (LevelRoom.level == 7) {
                let MassStorage = Game.rooms[process.Room].find(FIND_STRUCTURES, { filter: object => (object.structureType == STRUCTURE_STORAGE) });
                if ((MassStorage.length > 0) && (Controller[0].level > 7)) {
                    if (MassStorage[0].store[RESOURCE_ENERGY] > 500000) {
                        TablePopulation[process.Room + 'ControlUpgrader'] = { role: 'upgrader', roomNumber: process.Room, priority: 3, count: 4, staffed: [], charact: [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,], options: 1, };
                    }
                } else {
                    TablePopulation[process.Room + 'ControlUpgrader'] = { role: 'upgrader', roomNumber: process.Room, priority: 3, count: 1, staffed: [], charact: [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY], options: 1, };
                }
            } else if (LevelRoom.level == 8) {
                let MassStorage = Game.rooms[process.Room].find(FIND_STRUCTURES, { filter: object => (object.structureType == STRUCTURE_STORAGE) });
                if (MassStorage.length > 0) {
                  //  if (MassStorage[0].store[RESOURCE_ENERGY] > 500000) {
                        TablePopulation[process.Room + 'ControlUpgrader'] = { role: 'upgrader', roomNumber: process.Room, priority: 3, count: 1, staffed: [], charact: [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY], options: 1, };
                    //}                    
                }
            }
        }

        if (!ControlBuilder) {
            if (LevelRoom.level == 1) {
                TablePopulation[process.Room + 'ControlBuilder'] = { role: 'builder', roomNumber: process.Room, priority: 3, count: 0, staffed: [], charact: [MOVE, WORK, CARRY], options: 1, };
            } else if (LevelRoom.level == 2) {
                TablePopulation[process.Room + 'ControlBuilder'] = { role: 'builder', roomNumber: process.Room, priority: 3, count: 0, staffed: [], charact: [MOVE, CARRY, MOVE, WORK], options: 1, };
            } else if (LevelRoom.level == 3) {
                TablePopulation[process.Room + 'ControlBuilder'] = { role: 'builder', roomNumber: process.Room, priority: 3, count: 0, staffed: [], charact: [MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY], options: 1, };
            } else if (LevelRoom.level == 4) {
                TablePopulation[process.Room + 'ControlBuilder'] = { role: 'builder', roomNumber: process.Room, priority: 3, count: 0, staffed: [], charact: [MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY], options: 1, };
            } else if (LevelRoom.level == 5) {
                TablePopulation[process.Room + 'ControlBuilder'] = { role: 'builder', roomNumber: process.Room, priority: 3, count: 0, staffed: [], charact: [MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY], options: 1, };
            } else if (LevelRoom.level == 6) {
                TablePopulation[process.Room + 'ControlBuilder'] = { role: 'builder', roomNumber: process.Room, priority: 3, count: 0, staffed: [], charact: [MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY], options: 1, };
            } else if (LevelRoom.level == 7) {
                TablePopulation[process.Room + 'ControlBuilder'] = { role: 'builder', roomNumber: process.Room, priority: 3, count: 0, staffed: [], charact: [MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY], options: 1, };
            } else if (LevelRoom.level == 8) {
                TablePopulation[process.Room + 'ControlBuilder'] = { role: 'builder', roomNumber: process.Room, priority: 3, count: 0, staffed: [], charact: [MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY], options: 1, };
            }
        }



        var MassExtractor = Game.rooms[process.Room].find(FIND_STRUCTURES, { filter: object => (object.structureType == STRUCTURE_EXTRACTOR) });
        if (!ControlMiner && MassExtractor.length > 0) {
            if (LevelRoom.level == 1) {
                TablePopulation[process.Room + 'ControlMiner'] = { role: 'miner', roomNumber: process.Room, priority: 3, count: 0, staffed: [], charact: [MOVE, WORK, CARRY], options: 1, };
            } else if (LevelRoom.level == 2) {
                TablePopulation[process.Room + 'ControlMiner'] = { role: 'miner', roomNumber: process.Room, priority: 3, count: 0, staffed: [], charact: [MOVE, WORK, CARRY, MOVE, WORK], options: 1, };
            } else if (LevelRoom.level == 3) {
                TablePopulation[process.Room + 'ControlMiner'] = { role: 'miner', roomNumber: process.Room, priority: 3, count: 0, staffed: [], charact: [MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY], options: 1, };
            } else if (LevelRoom.level == 4) {
                TablePopulation[process.Room + 'ControlMiner'] = { role: 'miner', roomNumber: process.Room, priority: 3, count: 0, staffed: [], charact: [MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY], options: 1, };
            } else if (LevelRoom.level == 5) {
                TablePopulation[process.Room + 'ControlMiner'] = { role: 'miner', roomNumber: process.Room, priority: 3, count: 0, staffed: [], charact: [MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY], options: 1, };
            } else if (LevelRoom.level == 6) {
                TablePopulation[process.Room + 'ControlMiner'] = { role: 'miner', roomNumber: process.Room, priority: 3, count: 0, staffed: [], charact: [MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY], options: 1, };
            } else if (LevelRoom.level == 7) {
                TablePopulation[process.Room + 'ControlMiner'] = { role: 'miner', roomNumber: process.Room, priority: 3, count: 0, staffed: [], charact: [MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY], options: 1, };
            } else if (LevelRoom.level == 8) {
                TablePopulation[process.Room + 'ControlMiner'] = { role: 'miner', roomNumber: process.Room, priority: 3, count: 0, staffed: [], charact: [MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY], options: 1, };
            }
        }
        
        if (!ControlSupport) {
            if (LevelRoom.level == 1) {
                TablePopulation[process.Room + 'ControlSupport'] = { role: 'support', roomNumber: process.Room, priority: 3, count: 0, staffed: [], charact: [MOVE, WORK, CARRY], options: 1, };
            } else if (LevelRoom.level == 2) {
                TablePopulation[process.Room + 'ControlSupport'] = { role: 'support', roomNumber: process.Room, priority: 3, count: 0, staffed: [], charact: [MOVE, WORK, CARRY, MOVE, WORK], options: 1, };
            } else if (LevelRoom.level == 3) {
                TablePopulation[process.Room + 'ControlSupport'] = { role: 'support', roomNumber: process.Room, priority: 3, count: 0, staffed: [], charact: [MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY], options: 1, };
            } else if (LevelRoom.level == 4) {
                TablePopulation[process.Room + 'ControlSupport'] = { role: 'support', roomNumber: process.Room, priority: 3, count: 0, staffed: [], charact: [MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY], options: 1, };
            } else if (LevelRoom.level == 5) {
                TablePopulation[process.Room + 'ControlSupport'] = { role: 'support', roomNumber: process.Room, priority: 3, count: 0, staffed: [], charact: [MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY], options: 1, };
            } else if (LevelRoom.level == 6) {
                TablePopulation[process.Room + 'ControlSupport'] = { role: 'support', roomNumber: process.Room, priority: 3, count: 0, staffed: [], charact: [MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY], options: 1, };
            } else if (LevelRoom.level == 7) {
                TablePopulation[process.Room + 'ControlSupport'] = { role: 'support', roomNumber: process.Room, priority: 3, count: 0, staffed: [], charact: [MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY], options: 1, };
            } else if (LevelRoom.level == 8) {
                TablePopulation[process.Room + 'ControlSupport'] = { role: 'support', roomNumber: process.Room, priority: 3, count: 0, staffed: [], charact: [MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY], options: 1, };
            }
        }
        

        // Souts and his flags
        let Colonisation =_.find(Game.flags, f => f.name.startsWith('Colonisation-'+process.Room)); 
        
        if (Colonisation) { 
            let RolesSupport = _.filter(TablePopulation, o => o.roomNumber == process.Room && o.role == 'support');
            if (RolesSupport.length > 0) { 
                RolesSupport[0].count = RolesSupport[0].count + 3;
            }
        }
        
        var Invader = Game.flags.Invader;

        if (Colonisation) {
            let Claim =_.find(Game.flags, f => f.name.endsWith(process.Room+'Claim'));
            if(!Claim) {    
                TablePopulation['invader1'] = { role: 'invader', roomNumber: process.Room, priority: 3, count: 1, staffed: [], charact: [MOVE, CLAIM], options: 1, };
            }
        }
        
        let RemoteMining =_.find(Game.flags, f => f.name.startsWith('RemoteMining-'+process.Room)); 

        if (RemoteMining) {
            let RolesScout = _.filter(TablePopulation, o => o.roomNumber == process.Room && o.role == 'scout');
            if (RolesScout.length > 0) {
                RolesScout[0].count = RolesScout[0].count + 1;
            }
        }

        // Вытаскиватор 
        var PickupTarget = Game.flags.PickupTarget;

        if (PickupTarget) {
            let RolesSupport = _.filter(TablePopulation, o => o.roomNumber == process.Room && o.role == 'support' && o.options == 3);
            if (RolesSupport.length > 0) {
                RolesSupport[0].count = RolesSupport[0].count + 2;
            }
        }

        //Spawn builders when appear building places
        var ConstrSitHesh = Game.rooms[process.Room].find(FIND_CONSTRUCTION_SITES);

        if (ConstrSitHesh.length > 0) {
            var RolesBuilder = _.filter(TablePopulation, o => o.roomNumber == process.Room && o.role == 'builder');
            if (RolesBuilder.length > 0) {
                RolesBuilder[0].count = 2;
            }
        }

        // Spawn minres when appear resources and this extractor 

        var MassExtractor = Game.rooms[process.Room].find(FIND_STRUCTURES, { filter: object => (object.structureType == STRUCTURE_EXTRACTOR) });
        var MassMineral = Game.rooms[process.Room].find(FIND_MINERALS, { filter: object => (object.mineralAmount > 0) });
        var MassStorage = Game.rooms[process.Room].find(FIND_STRUCTURES, { filter: object => (object.structureType == STRUCTURE_STORAGE) });

        if ((MassExtractor.length > 0) && (MassMineral.length > 0) && (MassStorage.length > 0)) {
            var RolesMiner = _.filter(TablePopulation, o => o.roomNumber == process.Room && o.role == 'miner');

            if (RolesMiner.length > 0) {
                RolesMiner[0].count = 1;
            }

        }

        //Астартес 

        var GA = require('procedure.GatheringAstartes');
        GA.GatheringAstartes.create();

    

        // ÃÂÃÂÃÂÃÂ¾ÃÂÃÂ½ÃÂÃÂÃÂÃÂÃÂÃÂ¾ÃÂÃÂ»ÃÂÃÂ ÃÂÃÂÃÂÃÂÃÂÃÂ°ÃÂÃÂ½ÃÂÃÂÃÂÃÂ¿ÃÂÃÂ¾ÃÂÃÂÃÂÃÂÃÂÃÂ°
        let Number11 = process.Room;
        var MoveToRaid = Game.flags['MoveToRaid' + Number11];

        if (MoveToRaid) {
            var Astartes = _.find(Game.creeps, creep => creep.memory.role == 'astartes' && creep.memory.transp !== undefined && creep.memory.roomNumber == Number11);

            if (Astartes) {
                let MemAst = Astartes.memory.transp;
                let bodys = [MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY];
                var MemoryRoles = _.filter(process.List, o => o.role == 'support' && o.options == 5);
                var SumCreeps = _.sum(Game.creeps, creep => creep.memory.role == 'support' && creep.memory.roomNumber == process.Room && creep.memory.options == 5);

                for (let i=SumCreeps+MemoryRoles.length; i<MemAst; i++) {

                    const CreepName = 'creepID-' + `f${(~~(Math.random() * 1e8)).toString(16)}`;
                    Memory.processor['SpawnControl' + Astartes.memory.roomNumber].List[CreepName] = {
                        name: CreepName, role: 'support', priority: 1, roomNumber: Astartes.memory.roomNumber, charact: bodys,
                        options: 5,  queue: 0, TargetStatus: '!achieved', revival: Astartes.memory.revival,
                    };

                }
            } else if (!Astartes) {
            
                var RolesSupport = _.filter(TablePopulation, o => o.role == 'support');
                    if (RolesSupport.length > 0) {
                        RolesSupport[0].count = RolesSupport[0].count + 5;
                        RolesSupport[0].options = 5;
                        RolesSupport[0].roomNumber = Number11;
                    }

            }
        }


        //---------------Флаги Астартес        


        //------Флаг на добычу повера
        var SquadFlag = _.filter(Game.flags, f => f.name.startsWith('Squad'));  

        for (f in SquadFlag) {
            if (SquadFlag[f]) {
                let FlagPowerMining  = SquadFlag[f].name.indexOf('Squad', 0);
                if (FlagPowerMining !== -1) {
                    let RoomMass =_.filter(Game.rooms,rooms=>rooms.controller&&rooms.controller.my);
                    let DistanceRoom = 1000;
                    for (room in RoomMass) {
                        
                        let DistanceFlag = Game.map.getRoomLinearDistance(SquadFlag[f].pos.roomName, RoomMass[room].name); // 3
                        if (DistanceRoom > DistanceFlag) {
                            DistanceRoom = DistanceFlag;
                            var ResultRoom = RoomMass[room].name;
                        } 
                    } 
                    new RoomVisual(SquadFlag[f].pos.roomName).text('Из комнаты '+ResultRoom+' '+DistanceRoom ,SquadFlag[f].pos.x+2,SquadFlag[f].pos.y+2, {color: '#FF0000', fontSize: 10});

                    if (ResultRoom !== undefined) {
                        var str = SquadFlag[f].name;
                        var Space = str.indexOf('-');
                        var NumberColor = str.slice(5, Space);
                        var ColorVar = Number(NumberColor);
                        if (Memory.army[ColorVar] == undefined) {
                            let FlagCheckPoint  =  _.find(Game.flags, f => f.name.startsWith('CheckPoint'+ResultRoom));
                            
                            if (FlagCheckPoint) {
                                new RoomVisual(SquadFlag[f].pos.roomName).text('Из комнаты '+ColorVar+' '+DistanceRoom ,SquadFlag[f].pos.x+3,SquadFlag[f].pos.y+3, {color: '#FF0000', fontSize: 10});
                                Game.rooms[ResultRoom].createFlag(FlagCheckPoint.pos.x, FlagCheckPoint.pos.y, 'CreateSquad Healer-3 Melee-2 Auto', ColorVar);
                            }
                        }
                    }
                }
            } 
        }

        



        //Таймер проверки , запускать функции ниже не кажый тик, а через 2. Это для уменьшения уменьшения CPU.

        if (process.time < 2) {
            process.time = process.time + 1;


            var RolesRoom = _.filter(TablePopulation, obj => obj.roomNumber == process.Room);

            //--------Подсчёт крипов и создание записи в памяти о создании крипа
            
            for (let key in RolesRoom) {

                var MemoryRoles = _.filter(process.List, o => o.role == RolesRoom[key].role && o.options == RolesRoom[key].options); 
                var SumCreeps = _.sum(Game.creeps, creep => creep.memory.role == RolesRoom[key].role && creep.memory.roomNumber == process.Room && creep.memory.options == RolesRoom[key].options);
                
                if ((MemoryRoles.length + SumCreeps) < RolesRoom[key].count) { 
                    if (SumCreeps < RolesRoom[key].count) {
                        const CreepName = 'creepID-' + `f${(~~(Math.random() * 1e8)).toString(16)}`;
                        process.List[CreepName] = RolesRoom[key];
                        process.List[CreepName].name = CreepName;
                    }
                }
            }



           //-------------- Отправка крипов на спавн, из памяти процесса

            for (let i=1; i < 4; i++) {
                let FirstPriorityMemory = _.filter(process.List, o => o.priority == i);
                if (FirstPriorityMemory.length > 0) {
                    var MassSpawn = _.filter(Game.spawns, spawn => spawn.my && spawn.pos.roomName == process.Room && spawn.spawning == null);
                    for (var k = 0; k < MassSpawn.length; k++) {
                        for (var q = 0; q < FirstPriorityMemory.length; q++) {
                           
                            let newName = 'Harvester' + Game.time;
                           
                            if (Game.spawns[MassSpawn[k].name].spawnCreep(FirstPriorityMemory[0].charact, newName, { memory: { role: FirstPriorityMemory[0].role, roomNumber: process.Room, options: FirstPriorityMemory[0].options, SpawninigTime: FirstPriorityMemory[0].charact.length * 3 } }) == OK) {
                                delete Memory.processor["SpawnControl" + process.Room].List[FirstPriorityMemory[q].name];
                            } 
                        }
    
                    }
                }
            }
             
            //--------------- Нулевой приоритет для солдат

            const ZeroPriorityMemory = _.filter(process.List, o => o.priority == 0);
            
            if (ZeroPriorityMemory.length > 0) {
                var MassSpawn = _.filter(Game.spawns, spawn => spawn.my && spawn.pos.roomName == process.Room && spawn.spawning == null);
                var MinNumber = Math.min(MassSpawn.length, ZeroPriorityMemory.length);
                if (MassSpawn.length > 0) {
                    for (var q = 0; q < MinNumber; q++) {
                        var newName = 'Astartes'+'-'+Game.time;
                        let Result = Game.spawns[MassSpawn[q].name].spawnCreep(ZeroPriorityMemory[q].charact, newName, {
                            memory: {
                                role: ZeroPriorityMemory[q].role,
                                roomNumber: ZeroPriorityMemory[q].roomNumber, options: ZeroPriorityMemory[q].squad, squad: ZeroPriorityMemory[q].squad, queue: 0,
                                TargetStatus: '!achieved', revival: ZeroPriorityMemory[q].revival, SpawninigTime: ZeroPriorityMemory[q].charact.length * 3
                            }
                        });
                        if (Result == OK) {
                            delete Memory.processor["SpawnControl" + process.Room].List[ZeroPriorityMemory[q].name];
                        } else {
                            new RoomVisual(Game.spawns[MassSpawn[q].name].pos.roomName).text(Result, Game.spawns[MassSpawn[q].name].pos.x+1, Game.spawns[MassSpawn[q].name].y-1, {color: '#FFFFFF', font: 0.6});
                        }
                    }
                }
            }




        } else {



            process.time = 0;
        }

    }
}


module.exports = serviceSpawnControl;





