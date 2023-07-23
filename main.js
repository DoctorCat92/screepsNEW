module.exports.loop = function() {
    //test111
    var classProcess = require('class.process');
    var Traveler = require('Traveler');
    var roleTerminal = require('role.terminal');
    var roleSpawn = require('role.spawn');
    var rolePowerSpawn = require('role.powerSpawn');
    var Names = require('Names');
   //test andr
   console.log(Game.time);

        let FlagErr = Game.flags.FlagErr;
        if (FlagErr) {
            let Creeps = _.filter(Game.creeps, o=> o.memory.options == 1);
            if (Creeps.length > 0) {
                for (let i =0;i < Creeps.length; i++) {
                    Creeps[i].memory.options = 4;
                }
            }
        }        
      
        var Time = Game.time;
        console.log('Game Time = ',Time);
        if (Time == 25951921) {
            Game.rooms['W85N20'].createFlag(44,16 , 'MoveToRaid');
        }


         
          
        ProcessList = {
            
        }
        
        for (let i in ProcessList) {
            var ClassProcess = new process(ProcessList[i].name,ProcessList[i].priority);
            //ClassProcess.start();
        }
            
        TableProcess = {
            transference: {name: 'transference', status: true, type: 'service', activRooms: [], priority: 3, nameModule: 'service.transference',},
            trader: {name: 'trader', status: true, type: 'service', activRooms: [], priority: 3, nameModule: 'service.trader',},
            SpawnControl: { name: 'SpawnControl',  status: true, type: 'service', activRooms: [], priority: 2, nameModule: 'service.SpawnControl', },
            Protection: {name: 'Protection', status: true, type: 'service', activRooms: [], priority: 2,nameModule: 'service.protection',},
            Observer: { name: 'observer', status: true, type: 'service', activRooms: [], priority: 2, nameModule: 'service.observer',},
            AutoBuilder: { name: 'AutoBuilder', status: true, type: 'service', activRooms: [], priority: 2, nameModule: 'service.autoBuilder',},
            visual: { name: 'visual', status: true, activRooms: [], priority: 3, nameModule: 'room.visual',},
            graph: { name: 'graph', status: true, activRooms: [], priority: 3, nameModule: 'service.Graph',},

        }
        
        //Создание процессов по таблице выше

        var RoomMass =_.filter(Game.rooms,rooms=>rooms.controller&&rooms.controller.my);
        var RoomMassOpt = ['W86N18','W86N17','W87N18'];
        //var createProcess = require('createProcess');
        //var createProcess = require('class.process');
        for (let process in TableProcess) {
            if (TableProcess[process].status == true) {
                if (TableProcess[process].activRooms.length > 0) {
                    for (let i in TableProcess[process].activRooms) {
                        for (let p in RoomMass) {
                            let Name = TableProcess[process].name+TableProcess[process].activRooms[p];
                            console.log('TESTING '+Name);
                            //createProcess.run(Name,TableProcess[process].state,TableProcess[process].prority,TableProcess[process].activRooms[p]);
                            let newProcess = new classProcess(Name,TableProcess[process].nameModule,TableProcess[process].state,TableProcess[process].prority,TableProcess[process].activRooms[p]);
                            newProcess.start();
                        }
                    }
                }
  
                if (TableProcess[process].activRooms.length == 0) {
                    for (let i in RoomMass) {
                        let Name = TableProcess[process].name+RoomMass[i].name;
                        //createProcess.run(Name,TableProcess[process].nameModule,TableProcess[process].state,TableProcess[process].prority,RoomMass[i].name);
                        let newProcess = new classProcess(Name,TableProcess[process].nameModule,TableProcess[process].state,TableProcess[process].prority,RoomMass[i].name);
                        newProcess.start();
                    }
                }

            }
        }



        // запуск процессов из памяти
        let Processor = Memory.processor;
        let cpuCounter = 0;      
        
        for (let name in Processor) {
            try {
            let process = require(Processor[name].NameModule); 
            process.run(Processor[name]);
            t = Game.cpu.getUsed();
            result = Math.floor((t-cpuCounter) * 100) / 100;
            console.log(result+' | '+Math.floor(t * 100) / 100+' '+name);
            cpuCounter = t;
            } catch (error) {
               console.log(error+' '+Processor[i]);
               Game.notify(error+' '+Processor[i]+' Game time '+Game.time,1);
            } /** **/
        }
        
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            
            let role = creep.memory.role;
             
            try {
            
                if (role) {
                    let module = require('role.'+role);
                    module.run(creep);
                }
                t = Game.cpu.getUsed(); 
                result = Math.floor((t-cpuCounter) * 100) / 100;
                cpuCounter = t;
                console.log(result+' | '+Math.floor(t*100)/100+' | '+name+' '+role);
                
           } catch (error) {
                console.log(error+' '+module.run+' '+name);
                Game.notify(error+' '+module.run+' '+name+' Game time '+Game.time,1);
            } /** **/
        }
        
        
        
        for(var id in Game.structures) {
            var structure = Game.structures[id];  
            
            //if(structure.structureType == STRUCTURE_TOWER) {
              //  roleTower.run(structure);
            //}
            
            if(structure.structureType == STRUCTURE_TERMINAL) {
              //  roleTerminal.run(structure);
            }
            if(structure.structureType == STRUCTURE_SPAWN) {
                roleSpawn.run(structure);
            }
            if(structure.structureType == STRUCTURE_POWER_SPAWN) {
                rolePowerSpawn.run(structure);
            }
            //console.log("structure"+' '+Game.cpu.getUsed());
        } 
        
        //flags
        var CreateSquad = Game.flags.CreateSquad;
        if (CreateSquad) {
            flagCreateSquad.run(CreateSquad);
        }

        
        for (var i=0; i < RoomMass.length ;i++) {
            
            var MassLink = Game.rooms[RoomMass[i].name].find(FIND_STRUCTURES, {filter: object => (object.structureType == STRUCTURE_LINK)});
          
        
            var MemorySquad =_.filter(Memory.army, o => o.Gathering == false && o.Replenishment == false);
            
            for (let s=0; s < MemorySquad.length;s++) {
                var Astartes = _.filter(Game.creeps, creep => creep.memory.role == 'astartes' && creep.memory.roomNumber == MemorySquad[s].CheckPoint.roomName && creep.memory.squad == MemorySquad[s].ColorSquad);
                if (Astartes.length == 0) {
                     Game.notify('Your soldiers from '+ MemorySquad[s].ColorSquad +' squad destroyed '+Game.time, 0);
                     delete Memory.army[MemorySquad[s].ColorSquad];
                }
            }
            
            
            if (MassLink.length > 2 && MassLink[2].energy < 700) { //MassLink[2].energyCapacity
                if (MassLink[0].energy >= 300) {
                    MassLink[0].transferEnergy(MassLink[2]);
                }
                if (MassLink[1].energy >= 300) {
                    MassLink[1].transferEnergy(MassLink[2]);
                }

            }
            if (MassLink.length > 3 && MassLink[2].energy > 700) {
                if (MassLink[3].energy < 700) {
                    if (MassLink[0].energy > 300) {
                        MassLink[0].transferEnergy(MassLink[3]);
                    }
                    if (MassLink[1].energy > 300) {
                        MassLink[1].transferEnergy(MassLink[3]);
                    }
                }
                
            }
            
           

             
        }


        let Eye = Game.flags.Eye;
        
        if (Eye) {
            let Obj = Game.rooms[Eye.pos.roomName].lookAt(Eye);
            
            for(let i=0; i<Obj.length;i++) {
                new RoomVisual(Eye.pos.roomName).rect(Eye.pos.x, Eye.pos.y, 5, 4, {fill:'#000000', opacity: 0.5});
                new RoomVisual(Eye.pos.roomName).text(Obj[i] , Eye.pos.x+i, Eye.pos.y+i, {align: 'left'});     
            }
        }


        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                //console.log('Clearing non-existing creep memory:', name);
            }
        }


        if(Game.cpu.bucket == 10000) {
            Game.cpu.generatePixel();
        }
    
            
            let TradeOff =_.find(Game.flags, i => i.name.startsWith('TradeOff')); 
    
            if (TradeOff) {
                let Trade =_.filter(Game.flags, i => i.name.startsWith('Trade'));
                for (i=0; i<Trade.length; i++) {
                    Trade[i].remove();
                }
            }
        
        
        
        Game.trade = {
            buy: function (Res, Amount, room) {
                let Orders = Game.market.getAllOrders(order => order.resourceType == Res && order.type == ORDER_SELL);
                let OrdersSort = _.sortBy(Orders, ['price']);

                if (OrdersSort.length > 0) { 
                    var CalcNumber = Game.market.calcTransactionCost(Amount, room , OrdersSort[0].roomName);
                    console.log('Первоночальное расстрояние '+CalcNumber);
                    for (let key in OrdersSort) {
                        
                        let NoCalcNumber = Game.market.calcTransactionCost(Amount, room, OrdersSort[key].roomName);
                        console.log('Косты '+ NoCalcNumber);
                        if (NoCalcNumber < CalcNumber) {
                            console.log('Этот кост меньше предыдущего '+ NoCalcNumber);
                            var CalcNumber = NoCalcNumber;
                            var ObjectCalcCostBuy = OrdersSort[key];
                        }
                    }

                    console.log('Наименьший кост '+CalcNumber);
                    console.log('Облект с наименьшей стоитстью '+ObjectCalcCostBuy.price);                    
                    if (Game.market.deal(ObjectCalcCostBuy.id, Amount ,room) == OK) {
                        Game.notify('Куплено '+Amount+' '+ObjectCalcCostBuy.resourceType+' по цене '+ObjectCalcCostBuy.price+', на это затрачено энергии '+CalcNumber, 0);
                        return 'Куплено '+Amount+' '+ObjectCalcCostBuy.resourceType+' по цене '+ObjectCalcCostBuy.price+', на это затрачено энергии '+CalcNumber;
                    }
                }
                
            },
        }
        
        
        function exportStats() {
            // Reset stats object
            Memory.stats = {
              gcl: {},
              rooms: {},
              cpu: {},
            };
          
            Memory.stats.time = Game.time;
          
            // Collect room stats
            for (let roomName in Game.rooms) {
              let room = Game.rooms[roomName];
              let isMyRoom = (room.controller ? room.controller.my : false);
              if (isMyRoom) {
                let roomStats = Memory.stats.rooms[roomName] = {};
                roomStats.storageEnergy           = (room.storage ? room.storage.store.energy : 0);
                roomStats.terminalEnergy          = (room.terminal ? room.terminal.store.energy : 0);
                roomStats.energyAvailable         = room.energyAvailable;
                roomStats.energyCapacityAvailable = room.energyCapacityAvailable;
                roomStats.controllerProgress      = room.controller.progress;
                roomStats.controllerProgressTotal = room.controller.progressTotal;
                roomStats.controllerLevel         = room.controller.level;
              }
            }
          
            // Collect GCL stats
            Memory.stats.gcl.progress      = Game.gcl.progress;
            Memory.stats.gcl.progressTotal = Game.gcl.progressTotal;
            Memory.stats.gcl.level         = Game.gcl.level;
          
            // Collect CPU stats
            Memory.stats.cpu.bucket        = Game.cpu.bucket;
            Memory.stats.cpu.limit         = Game.cpu.limit;
            Memory.stats.cpu.used          = Game.cpu.getUsed();
          }
      
            exportStats();
              
            console.log("end"+' '+Game.cpu.getUsed());
              
           // 
            console.log('Cpu-CalcBucket '+(20-(Game.cpu.bucket-Memory.cpu)));
            Memory.cpu = Game.cpu.bucket;
    }
       


     
