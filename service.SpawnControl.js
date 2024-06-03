class SpawnControlService {
    constructor() {
        this.priority = 1;
        this.type = 'service';
        this.arrayExtension = [0, 0, 0, 10, 20, 30, 40, 50, 60];
        this.arrayEnergy = [0, 0, 250, 500, 1000, 1500, 2000, 5000, 11000];
    }

    run(process) {
        if (process.time % 15 === 0) {
            this.updateRoomInfo(process);
            this.autoBuildCreeps(process);
        } else {
            process.time = 0;
        }
    }

    updateRoomInfo(process) {
        const room = Game.rooms[process.Room];
        const controller = room.controller;

        let mem = Memory.processor[process.NameProcess];
        mem.RoomsEnergy = room.energyAvailable;
        mem.RoomsCapacity = room.energyCapacityAvailable;
        mem.MassExtension = room.find(FIND_STRUCTURES, { filter: object => object.structureType === STRUCTURE_EXTENSION });
        mem.percentageOfOccupancy = (mem.RoomsEnergy / mem.RoomsCapacity) * 100;

        for (let i = 1; i <= controller.level; i++) {
            if ((mem.MassExtension.length >= this.arrayExtension[i]) && (mem.RoomsEnergy >= this.arrayEnergy[i])) {
                Memory.processor[process.NameProcess].level = i;
            }
        }
    }

    autoBuildCreeps(process) {
        let tablePopulation = Memory.processor[`SpawnControl${process.Room}`].TablePopulation;
        let levelRoom = Memory.processor[process.NameProcess];

        this.ensureCreepRole(tablePopulation, process, levelRoom, 'harvester', this.configureHarvester);
        this.ensureCreepRole(tablePopulation, process, levelRoom, 'carrier', this.configureCarrier);
        this.ensureCreepRole(tablePopulation, process, levelRoom, 'upgrader', this.configureUpgrader);
        this.ensureCreepRole(tablePopulation, process, levelRoom, 'repairer', this.configureRepairer);
        this.ensureCreepRole(tablePopulation, process, levelRoom, 'builder', this.configureBuilder);
        this.ensureCreepRole(tablePopulation, process, levelRoom, 'miner', this.configureMiner);
        this.ensureCreepRole(tablePopulation, process, levelRoom, 'support', this.configureSupport);
        this.ensureCreepRole(tablePopulation, process, levelRoom, 'scout', this.configureScout);

        this.spawnCreeps(process, tablePopulation);
    }

    ensureCreepRole(tablePopulation, process, levelRoom, role, configureFn) {
        let controlRole = _.find(tablePopulation, o => o.roomNumber === process.Room && o.role === role);
        if (!controlRole) {
            configureFn.call(this, tablePopulation, process, levelRoom);
        }
    }

    configureHarvester(tablePopulation, process, levelRoom) {
        const massLink = Game.rooms[process.Room].find(FIND_STRUCTURES, { filter: object => object.structureType === STRUCTURE_LINK });
        const massContainer = Game.rooms[process.Room].find(FIND_STRUCTURES, { filter: object => object.structureType === STRUCTURE_CONTAINER });

        const harvesterConfig = this.getHarvesterConfig(levelRoom.level, massLink.length, massContainer.length);
        if (harvesterConfig) {
            tablePopulation[`${process.Room}ControlHarvester`] = {
                role: 'harvester',
                roomNumber: process.Room,
                priority: 1,
                count: harvesterConfig.count,
                staffed: [],
                charact: harvesterConfig.charact,
                options: harvesterConfig.options,
            };
        }
    }

    getHarvesterConfig(level, massLinkLength, massContainerLength) {
        let config = {
            charact: [WORK, WORK, MOVE, CARRY],
        };

        if (massLinkLength >= 3) {
            config.count = 2;
            config.options = 3;
        } else if (massLinkLength < 3 && massContainerLength > 0) {
            config.count = 2;
            config.options = 2;
        } else if (massLinkLength < 3 && massContainerLength < 2) {
            config.count = 4;
            config.options = 1;
        } else {
            return null;
        }

        return config;
    }

    configureCarrier(tablePopulation, process, levelRoom) {
        const massLink = Game.rooms[process.Room].find(FIND_STRUCTURES, { filter: object => object.structureType === STRUCTURE_LINK });
        const massContainer = Game.rooms[process.Room].find(FIND_STRUCTURES, { filter: object => object.structureType === STRUCTURE_CONTAINER });

        if ((massContainer.length > 0) || (massLink.length > 0)) {
            tablePopulation[`${process.Room}ControlCarrier`] = {
                role: 'carrier',
                roomNumber: process.Room,
                priority: 2,
                count: 4,
                staffed: [],
                charact: [MOVE, CARRY],
                options: (massLink.length > 2) ? 3 : 1,
            };
        }
    }

    configureUpgrader(tablePopulation, process, levelRoom) {
        let charact;
        switch (levelRoom.level) {
            case 1:
                charact = [MOVE, WORK, CARRY];
                break;
            case 2:
                charact = [MOVE, MOVE, MOVE, MOVE, WORK, WORK, CARRY, CARRY, CARRY];
                break;
            case 3:
                charact = [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, CARRY, CARRY, CARRY];
                break;
            case 4:
                charact = [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY];
                break;
            case 5:
                charact = [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY];
                break;
            case 6:
                charact = [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY];
                break;
            case 7:
            case 8:
                const massStorage = Game.rooms[process.Room].find(FIND_STRUCTURES, { filter: object => object.structureType === STRUCTURE_STORAGE });
                if (massStorage.length > 0 && massStorage[0].store[RESOURCE_ENERGY] > 500000) {
                    charact = [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY];
                } else {
                    charact = [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY];
                }
                break;
        }

        tablePopulation[`${process.Room}ControlUpgrader`] = {
            role: 'upgrader',
            roomNumber: process.Room,
            priority: 3,
            count: 3,
            staffed: [],
            charact: charact,
            options: 1,
        };
    }

    configureRepairer(tablePopulation, process, levelRoom) {
        let charact;
        switch (levelRoom.level) {
            case 1:
                charact = [MOVE, WORK, CARRY];
                break;
            case 2:
                charact = [MOVE, WORK, CARRY, MOVE, WORK];
                break;
            case 3:
                charact = [MOVE, WORK, CARRY, MOVE, WORK, CARRY];
                break;
            case 4:
                charact = [MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY];
                break;
            case 5:
                charact = [MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY];
                break;
            case 6:
                charact = [MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY];
                break;
            case 7:
                charact = [MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY];
                break;
            case 8:
                charact = [MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY];
                break;
        }

        tablePopulation[`${process.Room}ControlRepairer`] = {
            role: 'repairer',
            roomNumber: process.Room,
            priority: 3,
            count: (levelRoom.level < 4) ? 1 : 2,
            staffed: [],
            charact: charact,
            options: 1,
        };
    }

    configureBuilder(tablePopulation, process, levelRoom) {
        let charact = [MOVE, WORK, CARRY];
        if (levelRoom.level > 1) {
            charact = charact.concat([MOVE, WORK, CARRY]);
        }

        tablePopulation[`${process.Room}ControlBuilder`] = {
            role: 'builder',
            roomNumber: process.Room,
            priority: 3,
            count: 0,
            staffed: [],
            charact: charact,
            options: 1,
        };
    }

    configureMiner(tablePopulation, process, levelRoom) {
        let charact = [MOVE, WORK, CARRY];
        if (levelRoom.level > 1) {
            charact = charact.concat([MOVE, WORK, CARRY]);
        }

        tablePopulation[`${process.Room}ControlMiner`] = {
            role: 'miner',
            roomNumber: process.Room,
            priority: 3,
            count: 0,
            staffed: [],
            charact: charact,
            options: 1,
        };
    }

    configureSupport(tablePopulation, process, levelRoom) {
        let charact = [MOVE, WORK, CARRY];
        if (levelRoom.level > 1) {
            charact = charact.concat([MOVE, WORK, CARRY]);
        }

        tablePopulation[`${process.Room}ControlSupport`] = {
            role: 'support',
            roomNumber: process.Room,
            priority: 3,
            count: 0,
            staffed: [],
            charact: charact,
            options: 1,
        };
    }

    configureScout(tablePopulation, process, levelRoom) {
        if (levelRoom.level >= 1) {
            tablePopulation[`${process.Room}ControlScout`] = {
                role: 'scout',
                roomNumber: process.Room,
                priority: 2,
                count: 0,
                staffed: [],
                charact: [MOVE, MOVE],
                options: 1,
            };
        }
    }

    spawnCreeps(process, tablePopulation) {
        for (let i = 1; i < 4; i++) {
            let massSpawn = _.filter(Game.spawns, spawn => spawn.my && spawn.pos.roomName === process.Room && spawn.spawning === null);
            for (let k = 0; k < massSpawn.length; k++) {
                let firstPriorityMemory = _.filter(process.List, o => o.priority === i);
                for (let q = 0; q < firstPriorityMemory.length; q++) {
                    if (firstPriorityMemory.length > 0) {
                        let newName = `${firstPriorityMemory[0].role}${Game.time}f${(~~(Math.random() * 1e8)).toString(5)}`;
                        if (Game.spawns[massSpawn[k].name].spawnCreep(firstPriorityMemory[0].charact, newName, { memory: { role: firstPriorityMemory[0].role, roomNumber: process.Room, options: firstPriorityMemory[0].options, SpawninigTime: firstPriorityMemory[0].charact.length * 3 } }) === OK) {
                            delete Memory.processor[`SpawnControl${process.Room}`].List[firstPriorityMemory[q].name];
                            break;
                        }
                    }
                }
            }
        }
    }
}

module.exports = new SpawnControlService();
