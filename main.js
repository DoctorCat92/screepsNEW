module.exports.loop = function() {


    var process = require('class.process');
    var Traveler = require('Traveler');
    var roleTerminal = require('role.terminal');
    var roleSpawn = require('role.spawn');
    var rolePowerSpawn = require('role.powerSpawn');
    var Names = require('Names');

    console.log(Game.time);

    ProcessList = {
        //Testing: {name: 'Testing', priority: 2},
        //Carrier: {name: 'carrier', priority: 2},
    }
    
    for (let i in ProcessList) {
        var ClassProcess = new process(ProcessList[i].name,ProcessList[i].priority);
        ClassProcess.start();
    }


    if(Game.cpu.bucket == 10000) {
        Game.cpu.generatePixel();
    }



    // FillingTheTerminal - 
    // PickupTarget - 
    // CreateSoldiers1 - 
    // MoveSupport - 
    // Game.structures['5ea5ac9eede95210953fc985'].launchNuke(new RoomPosition(39,23, 'W12N38')); - 
        
      /**  let RemoveCreep =_.filter(Game.flags, i => i.name.startsWith('RemoveCreep'));
        
        if (RemoveCreep) {
            let posFlag = RemoveCreep[0].pos.roomName;
            for(var name in Game.creeps) {
                let creep = Game.creeps[name];
                if (creep.pos.roomName == posFlag) {
                    creep.suicide();
                }
            }
        } **/
        
        let TradeOff =_.find(Game.flags, i => i.name.startsWith('TradeOff')); 

        if (TradeOff) {
            let Trade =_.filter(Game.flags, i => i.name.startsWith('Trade'));
            for (i=0; i<Trade.length; i++) {
                Trade[i].remove();
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
        
        //let ResForTarget = _.find(Target, o => o.Resource >= Memory.processor['transference'+creep.memory.roomNumber]);
        let FlagErr = Game.flags.FlagErr;
        if (FlagErr) {
            let Creeps = _.filter(Game.creeps, o=> o.memory.options == 1);
            if (Creeps.length > 0) {
                for (let i =0;i < Creeps.length; i++) {
                    Creeps[i].memory.options = 4;
                }
            }
        }        
      
        
        // ÃÂÃÂÃÂÃÂ°ÃÂÃÂ¹ÃÂÃÂ¼ÃÂÃÂµÃÂÃÂÃÂÃÂ 
        var Time = Game.time;
        console.log('Game Time = ',Time);
        if (Time == 25951921) {
            Game.rooms['W85N20'].createFlag(44,16 , 'MoveToRaid');
        }

       /** var KillCreeps = _.filter(Game.creeps, creep => creep.memory.role == 'support');
        for (var i=0;i < KillCreeps.length;i++) {
            KillCreeps[i].suicide();
        }**/
    
        
        // ÃÂÃÂÃÂÃÂ±ÃÂÃÂÃÂÃÂµÃÂÃÂºÃÂÃÂ - ÃÂÃÂ¿ÃÂÃÂ¾ÃÂÃÂ¿ÃÂÃÂÃÂÃÂ»ÃÂÃÂÃÂÃÂÃÂÃÂ¸ÃÂÃÂ
        var RoomMass =_.filter(Game.rooms,rooms=>rooms.controller&&rooms.controller.my);
        var RoomMassOpt = ['W86N18','W86N17','W87N18'];


        RoomsRoles = {
            
             //hadsdw : { role: 'dismantler', roomNumber: 'E22N12', priority: 1, count: 0, staffed: [], charact: [WORK,WORK,WORK,CARRY,MOVE,WORK], options: 2, }, 
            
             //support: { role: 'support',    roomNumber: 'W19S58', priority: 3, count: 0, staffed: [], charact: [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,], options: 5, }, //CARRY,CARRY,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE
               //support: { role: 'support',    roomNumber: 'W12N47', options: 3, priority: 1, count: 0, staffed: [], charact: [CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE] }, //CARRY,CARRY,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE
            
             //support2: { role: 'support',    roomNumber: 'W19S59', priority: 3, count: 0, staffed: [], charact: [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,], options: 5, },
             //support3: { role: 'support',    roomNumber: 'W18S59', priority: 3, count: 2, staffed: [], charact: [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY], options: 1, },
             // support1: { role: 'upgrader',   roomNumber: 'W19S58', priority: 3, count: 0, staffed: [], charact: [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY], options: 3, }, 
              
        }
        
        
        var Invader = Game.flags.Invader;

        if (Invader) {
           RoomsRoles['invader1'] = { role: 'invader', roomNumber: 'W12N47', priority: 3, count: 1, staffed: [], charact: [MOVE,CLAIM] , options: 1, };
        }
        
         // ÃÂ½ÃÂ°ÃÂ±ÃÂ¸ÃÂ²ÃÂ° ÃÂºÃÂÃÂ¸ÃÂ¿ÃÂ°  
        
        
          
        
    //   
            
        TableProcess = {
            //test: {name: 'test', status: true, type: 'demon', activRooms: ['W86N18'], priority: 3, nameModule: 'process.test', },
            transference: {name: 'transference', status: true, type: 'service', activRooms: [], priority: 3, nameModule: 'service.transference',},
            trader: {name: 'trader', status: true, type: 'service', activRooms: [], priority: 3, nameModule: 'service.trader',},
            SpawnControl: { name: 'SpawnControl',  status: true, type: 'service', activRooms: [], priority: 2, nameModule: 'service.SpawnControl', },
          //  Remotes: {name: 'Remotes', status: false, type: 'demon', activRooms: ['W12N47'], priority: 2, nameModule: 'process.Remotes',},
            Protection: {name: 'Protection', status: true, type: 'service', activRooms: [], priority: 2,nameModule: 'service.protection',},
            Observer: { name: 'Observer', status: true, type: 'service', activRooms: [], priority: 2, nameModule: 'service.observer',},
            AutoBuilder: { name: 'AutoBuilder', status: true, type: 'service', activRooms: [], priority: 2, nameModule: 'service.autoBuilder',},
            //STerminal: { name: 'Terminal', status: true, activRooms: [], priority: 2, nameModule: 'role.terminal', memory:{id:{}}},
            visual: { name: 'visual', status: true, activRooms: [], priority: 3, nameModule: 'room.visual',},
            graph: { name: 'graph', status: true, activRooms: [], priority: 3, nameModule: 'service.Graph',},

        }

        
       // var roomVisual = require('room.visual');
        //roomVisual.roomNumber(process.Room);
        
    // 
        var createProcess = require('createProcess');

        for (let process in TableProcess) {
            if (TableProcess[process].status == true) {
                if (TableProcess[process].activRooms.length > 0) {
                    for (let i in TableProcess[process].activRooms) {
                        for (let p in RoomMass) {
                            let Name = TableProcess[process].name+TableProcess[process].activRooms[p];
                            console.log('TESTING '+Name);
                            createProcess.run(Name,TableProcess[process].state,TableProcess[process].prority,TableProcess[process].activRooms[p]);
                        }
                    }
                }
  
                if (TableProcess[process].activRooms.length == 0) {
                    for (let i in RoomMass) {
                        let Name = TableProcess[process].name+RoomMass[i].name;
                        createProcess.run(Name,TableProcess[process].nameModule,TableProcess[process].state,TableProcess[process].prority,RoomMass[i].name);
                    }
                }

            }
        }



        
        let Processor = Memory.processor;
        let cpuCounter = 0;      
        
        for (let i in Processor) {
           // try {
            let process = require(Processor[i].NameModule); 
            process.run(Processor[i]);
            t = Game.cpu.getUsed();
            result = Math.floor((t-cpuCounter) * 100) / 100;
            console.log(result+' | '+Math.floor(t * 100) / 100+' '+i);
            cpuCounter = t;
           // } catch (error) {
              // console.log(error+' '+Processor[i]);
              // Game.notify(error+' '+Processor[i]+' Game time '+Game.time,1);
           // }
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
       


     
