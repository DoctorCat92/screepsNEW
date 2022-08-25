var roleScout = {

    
    run: function(creep) { 
        
        
        var roomNumber = creep.memory.roomNumber;
        
        if (Memory.RoomMem === undefined) {
            Memory.RoomMem = {};
        } else {
            if (Memory.RoomMem[roomNumber] === undefined) {
                Memory.RoomMem[roomNumber] = {};
            } else {
                
                if (Memory.RoomMem[roomNumber].roomForRemote === undefined) {
                    Memory.RoomMem[roomNumber].roomForRemote = {};
                    
                    if (Memory.RoomMem[roomNumber].roomForRemote.allRoom === undefined) {
                        Memory.RoomMem[roomNumber].roomForRemote.allRoom = [];
                    }
                    
                    if (Memory.RoomMem[roomNumber].roomForRemote.counter === undefined) {
                        Memory.RoomMem[roomNumber].roomForRemote.counter = 0;
                    }
                    
                    var exits = Game.map.describeExits(roomNumber);
                    
                    for(let key in exits) {
                        Memory.RoomMem[roomNumber].roomForRemote.allRoom.push(exits[key]);
                    }
                } else {
            
                    var RoomMassiv = Memory.RoomMem[roomNumber].roomForRemote.allRoom;
                    var ct = Memory.RoomMem[roomNumber].roomForRemote.counter;
                      
                    if (ct < RoomMassiv.length) {
                        if (creep.pos.roomName !== RoomMassiv[ct]) {
                            creep.moveTo(new RoomPosition(25, 25, RoomMassiv[ct]));
                        } else if (creep.pos.roomName == RoomMassiv[ct]) {
                            var EnemyCreeps = creep.room.find(FIND_HOSTILE_CREEPS);
                            var Sources = creep.room.find(FIND_SOURCES);
                            
                            if (EnemyCreeps.length < 2) {
                                
                                if (Memory.RoomMem[roomNumber].roomForRemote.readyRoom === undefined) {
                                    Memory.RoomMem[roomNumber].roomForRemote.readyRoom = {};
                                    Memory.RoomMem[roomNumber].roomForRemote.readyRoom[RoomMassiv[ct]] = {};
                                    Memory.RoomMem[roomNumber].roomForRemote.readyRoom[RoomMassiv[ct]].sourcesCount = Sources.length;
                                    
                                    if (Sources.length > 0) {
                                        for (let i=0;i<Sources.length;i++) {
                                            Memory.RoomMem[roomNumber].roomForRemote.readyRoom[RoomMassiv[ct]].sources[Sources[i].id] = {busy:'no'};
                                        }
                                    }
                                    
                                } else if (Memory.RoomMem[roomNumber].roomForRemote.readyRoom)  {
                                    Memory.RoomMem[roomNumber].roomForRemote.readyRoom[RoomMassiv[ct]] = {};
                                    Memory.RoomMem[roomNumber].roomForRemote.readyRoom[RoomMassiv[ct]].sources = Sources.length;
                                }
                                
                                Memory.RoomMem[roomNumber].roomForRemote.counter = ct + 1;
                                Memory.RoomMem[roomNumber].roomForRemote.coutForRemote = 0 + 1;  
                                
                            } else if (EnemyCreeps.length >= 2) {
                                Memory.RoomMem[roomNumber].roomForRemote.counter = ct + 1;
                            }
                        }
                        //
                    } else {
                        let RemoteMiningFlag =_.find(Game.flags, f => f.name.startsWith('RemoteMining-'+creep.memory.roomNumber));
                        if (RemoteMiningFlag) {
                            if (creep.pos.roomName !== RemoteMiningFlag.pos.roomName) {
                                creep.travelTo(RemoteMiningFlag);
                            } else {
                                creep.travelTo(RemoteMiningFlag);
                                let sources = creep.room.find(FIND_SOURCES);
                                let proc = Memory.processor['Remotes'+creep.memory.roomNumber];
                                let variable = 'Remotes'+creep.memory.roomNumber;
                                creep.say(proc.Name);
                                if (sources.length > 0) {
                                    for (i=0; i<sources.length; i++)  {
                                        if (proc.SourceList[sources[i].id] === undefined) {
                                            proc.SourceList[sources[i].id] = {};
                                            proc.SourceList[sources[i].id] = {id:sources[i].id };
                                        } else {
                                            proc[sources[i].id] = {id:sources[i].id };
                                        }
                                    }
                                    RemoteMiningFlag.remove();
                                }
                            }
                        } 
                    }
                }
            }
        }                                         
	}
};




module.exports = roleScout;  