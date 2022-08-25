var processTransference = {

    createTask: function (roomNumber, priority, source, target, type , condition) {
        let nameTask = target.id + type + priority + condition;
        let nameProcess = 'transference'+roomNumber; 

        if (Memory.processor[nameTask]) {
            let Process = Memory.processor[nameTask];
             Process[nameProcess] = { 
                target: { id: target.id, name: target.name }, 
                source: { id: source.id, name: source.name }, 
                type: type, 
                priority: priority, 
                condition: condition,
            };
        }
        
    },


    run: function (process) {

        var Energy = Game.rooms[process.Room].energyAvailable;
        var EnergyCapacity = Game.rooms[process.Room].energyCapacityAvailable;
        var Tower = Game.rooms[process.Room].find;

        if (Energy < EnergyCapacity) {

            var CreepsCarrier = _.filter(Game.creeps, o => o.memory.roomNumber == process.Room && o.memory.role == 'carrier' && o.memory.options == 3 && o.memory.target === undefined && o.store.getCapacity() > 0); //

            if (CreepsCarrier.length > 0) {
                for (let i = 0; i < CreepsCarrier.length; i++) {



                    var ClosestTarget = CreepsCarrier[i].pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_TOWER) && (structure.store[RESOURCE_ENERGY] < structure.store.getCapacity(RESOURCE_ENERGY))
                        }
                    });


                    if (ClosestTarget) {
                        if ((CreepsCarrier[i].carry[RESOURCE_ENERGY] + ClosestTarget.energy) >= ClosestTarget.energyCapacity) {
                            //process.BusyTarget.push(ClosestTarget.id);
                            CreepsCarrier[i].memory.target = { id: ClosestTarget.id };
                            CreepsCarrier[i].memory.task = {};
                        } else {
                            CreepsCarrier[i].memory.target = { id: ClosestTarget.id };
                            CreepsCarrier[i].memory.task = {};
                        }
                    }


                }
            }

        } else if (Energy == EnergyCapacity) {

            if (process.time < 2) {
                process.time = process.time + 1;
            } else {       console.log('creare task');

                var Storage = Game.rooms[process.Room].find(FIND_STRUCTURES, { filter: (structure) => { return (structure.structureType == STRUCTURE_STORAGE); } });
                var Terminal = Game.rooms[process.Room].find(FIND_STRUCTURES, { filter: (structure) => { return (structure.structureType == STRUCTURE_TERMINAL) ; } });
                var PowerSpawn = Game.rooms[process.Room].find(FIND_STRUCTURES, { filter: (structure) => { return (structure.structureType == STRUCTURE_POWER_SPAWN); } });
                var link = Game.rooms[process.Room].find(FIND_STRUCTURES, { filter: object => (object.structureType == STRUCTURE_LINK) });
                var Towers = Game.rooms[process.Room].find(FIND_STRUCTURES, { filter: (structure) => { return (structure.structureType == STRUCTURE_TOWER) && (structure.energy < 1000); } });
                var Nuke = Game.rooms[process.Room].find(FIND_STRUCTURES, { filter: (structure) => { return (structure.structureType == STRUCTURE_NUKER) && ((structure.energy < structure.energyCapacity) || (structure.ghodium < structure.ghodiumCapacity)); } });
                var Lab = Game.rooms[process.Room].find(FIND_STRUCTURES, { filter: (structure) => { return (structure.structureType == STRUCTURE_LAB); } });
                var Upgraders = _.filter(Game.creeps, creep => creep.memory.role == 'upgrader' && creep.memory.bag == 'empty' && creep.memory.roomNumber == process.Room);
                var Supports = _.filter(Game.creeps, creep => creep.memory.role == 'support' && creep.memory.bag == 'empty' && creep.memory.options == 1 && creep.pos.roomName == process.Room);
                var Tombstones = Game.rooms[process.Room].find(FIND_TOMBSTONES, {filter: (structure) => {return (structure.store.getUsedCapacity() > 0) ;}});
                //  

                CarriersTasks = {
                    Tombston: { roomNumber: 'W21S2', priority: 1, source: Tombstones[0], target: Storage[0], type: 'energy', condition: 0},
                    H: { roomNumber: 'W21S2', priority: 1, source: Storage[0], target: Terminal[0], type: 'H', condition: 150000},
                    StorageEn: { roomNumber: 'all', priority: 1, source: link[2], target: Storage[0], type: 'energy', condition: 800000},
                    tower: { roomNumber: 'all', priority: 0, source: Storage[0], target: Towers[0], type: 'energy', condition: 1000 },
                    terminalalt: { roomNumber: 'W19S7', priority: 2, source: Storage[0], target: Terminal[0], type: 'H', condition: 150000 },
                    terminalall: { roomNumber: 'all', priority: 2, source: Storage[0], target: Terminal[0], type: 'energy', condition: 150000 },
                    


                   // lab0K: { roomNumber: 'all', priority: 1, source: Storage[0], target: Lab[0], type: 'K', condition: 3000 },
                    lab0e: { roomNumber: 'all', priority: 2, source: Storage[0], target: Lab[0], type: 'energy', condition: 2000 },
                    lab1K: { roomNumber: 'all', priority: 2, source: Storage[0], target: Lab[1], type: 'LO', condition: 3000 },
                    lab1e: { roomNumber: 'all', priority: 2, source: Storage[0], target: Lab[1], type: 'energy', condition: 2000 },
                    PowerEn: { roomNumber: 'all', priority: 1, source: Storage[0], target: PowerSpawn[0], type: 'energy', condition: 5000 },
                    PowerPr: { roomNumber: 'all', priority: 1, source: Storage[0], target: PowerSpawn[0], type: 'power', condition: 100 },
                    NukeEn: { roomNumber: 'all', priority: 3, source: link[2], target: Nuke[0], type: 'energy', condition: 300000 },
                    NukePr: { roomNumber: 'all', priority: 2, source: Terminal[0], target: Nuke[0], type: 'G', condition: 5000 },
                    NukePrS: { roomNumber: 'all', priority: 1, source: Storage[0], target: Nuke[0], type: 'G', condition: 5000 },

                }

                var Tasker = _.filter(CarriersTasks, o => o.roomNumber == process.Room || o.roomNumber == 'all');
                
                if (process.List === undefined) {
                    process.List = {};
                }

                if (Tasker.length > 0) {
                    for (let i = 0; i < Tasker.length; i++) {
                        if (Tasker[i].type !== 'all') { 
                            if (Tasker[i].target && Tasker[i].source && Tasker[i].source.store[Tasker[i].type] > 0) { //
                                if (Tasker[i].target.store[Tasker[i].type] < Tasker[i].condition) {
                                    let nameProcess = Tasker[i].target.id + Tasker[i].type + Tasker[i].priority + Tasker[i].condition;
                                    process.List[nameProcess] = { target: { id: Tasker[i].target.id, name: Tasker[i].target.name }, source: { id: Tasker[i].source.id, name: Tasker[i].source.name }, type: Tasker[i].type, priority: Tasker[i].priority, condition: Tasker[i].condition };
                                    //console.log('creare task');
                                    
                                }
                            }
                        } if (Tasker[i].type == 'all') {
                            if (Tasker[i].target && Tasker[i].source) {
                                var Res = Object.keys(Tasker[i].source.store);
                                if (Tasker[i].source.store[Res[0]] > 0) { //target
                                    let nameProcess = Tasker[i].target.id + Res[0] + Tasker[i].priority + Tasker[i].condition;
                                    process.List[nameProcess] = { target: { id: Tasker[i].target.id, name: Tasker[i].target.name }, source: { id: Tasker[i].source.id, name: Tasker[i].source.name }, type: Res[0], priority: Tasker[i].priority, condition: Tasker[i].condition };
                                }
                            }
                        }
                    }
                }

                process.time = 0;
            }


        /** Создание флагов для создания задачи по переноске ресурсов. Лучше переделать в глобальный прототип
            let CarryOut = _.find(Game.flags, f => f.name.startsWith('CarryOut'));
            let CarryIn = Game.flags.CarryIn;

            if (CarryOut && CarryIn) {
                let str = CarryIn.name;
                let Res = str.slice(8);

            }
**/
            for (let i = 0; i < 4; i++) {
                var Task1 = _.filter(process.List, o => o.priority == i);

                if (Task1.length > 0) {
                    //for (let j=0; j < Task.length; j++) {
                    var CreepsCarrier = _.filter(Game.creeps, o => o.memory.roomNumber == process.Room && o.memory.role == 'carrier' && o.memory.options == 3 && o.memory.target === undefined);

                    if (CreepsCarrier.length > 0) {

                        for (let i = 0; i < CreepsCarrier.length; i++) {
                            let Task = _.shuffle(Task1);
                            let Total = _.sum(CreepsCarrier[i].carry);

                            if (Total > 0) {
                                let Resource = _.findKey(CreepsCarrier[i].store, o => o > 0);

                                if (Resource == Task[0].type) {
                                    CreepsCarrier[i].memory.task = Task[0];
                                    CreepsCarrier[i].memory.target = Task[0].target;
                                    // Проверка полный заполнит ли крип таск в соло
                                    var TargId = CreepsCarrier[i].memory.target.id + CreepsCarrier[i].memory.task.type + CreepsCarrier[i].memory.task.priority + CreepsCarrier[i].memory.task.condition;
                                    let cond = Memory.processor["transference"+CreepsCarrier[i].memory.roomNumber].List[TargId];  
                                    if (cond) {
                                        var Target = Game.getObjectById(CreepsCarrier[i].memory.target.id);
                                        if (CreepsCarrier[i].store.getCapacity(Task[0].type) >= (cond.condition - Target.store[Task[0].type])) {
                                            delete Memory.processor["transference"+CreepsCarrier[i].memory.roomNumber].List[TargId];
                                            break;
                                        }
                                    } 
                                }
                                /** else if (Resource[0].resourceType !== Task[0].type) {
                                    CreepsCarrier[i].memory.task = Task[0];
                                    CreepsCarrier[i].memory.target = Task[0].source;
                                } **/
                            } else if (Total == 0) {
                                 var Target = Game.getObjectById(Task[0].source.id);
                                if (Target) { 
                                    //
                                    let Resource = _.findKey(Target, o => o[Task[0].type] > 0);  //CreepsCarrier[i].say(Task[0].target.id);
                                    if (Resource) {
                                        CreepsCarrier[i].memory.task = Task[0];
                                        CreepsCarrier[i].memory.target = Task[0].source;
                                        //CreepsCarrier[i].say(Task[0].type);
                                    // Проверка полный заполнит ли крип таск в соло
                                        var TargId = CreepsCarrier[i].memory.target.id + CreepsCarrier[i].memory.task.type + CreepsCarrier[i].memory.task.priority + CreepsCarrier[i].memory.task.condition;
                                        let cond = Memory.processor["transference"+CreepsCarrier[i].memory.roomNumber].List[TargId];  
                                        if (cond) {
                                            var Target = Game.getObjectById(CreepsCarrier[i].memory.target.id);
                                            if (CreepsCarrier[i].store.getCapacity(Task[0].type) >= (cond.condition - Target.store[Task[0].type])) {
                                                delete Memory.processor["transference"+CreepsCarrier[i].memory.roomNumber].List[TargId];
                                                break;
                                            }
                                        }       
                                    }
                                }
                            }
                        }

                    }
                    //}
                    //break;

                }
            }

        }


    }
}


module.exports = processTransference;
