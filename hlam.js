  //CÃÂÃÂÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ¹ ÃÂÃÂ²ÃÂÃÂ¸ÃÂÃÂ´ ÃÂÃÂÃÂÃÂÃÂÃÂµÃÂÃÂÃÂÃÂÃÂÃÂ¸ÃÂÃÂºÃÂÃÂ¾ÃÂÃÂ²
  //ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ ÃÂÃÂÃÂÃÂÃÂÃÂ ÃÂÃÂ¿ÃÂÃÂ¸ÃÂÃÂ´ÃÂÃÂÃÂÃÂ¸ÃÂÃÂ»ÃÂÃÂ»
 //  test. ggghh
  // test for mobile 
    
    //var builders =_.sum(Game.creeps, creep => creep.memory.role == 'builder' && creep.pos.roomName == RoomMass[i]);
    //var marines = _.filter(Game.creeps, (creep) => creep.memory.role == 'marines');
    /**var harvesters =_.sum(Game.creeps, creep => creep.memory.role == 'harvester' && creep.memory.roomNumber == RoomMass[i]);
     * 
     * 
    var Move = 50;
    var Work = 100;
    var Carry = 50;
    var Attack = 80;
    var Ranged_Attack = 150;
    var Heal = 250;
    var Claim = 600;
    var Tough = 10;
     * 
    //ÃÂÃÂÃÂÃÂÃÂÃÂ¸ÃÂÃÂµÃÂÃÂ¹ÃÂÃÂÃÂÃÂ¾ÃÂÃÂÃÂÃÂ ÃÂÃÂºÃÂÃÂÃÂÃÂ¸ÃÂÃÂ¿ÃÂÃÂ¾ÃÂÃÂ² 
     * if(harvesters < MaxHarvester[i]) {
        var newName = Game.spawns[MassSpawn[i]].createCreep(CharactHarvester[i], undefined, {role: 'harvester',roomNumber: RoomMass[i]});
        console.log('Spawning new harvester: ' + newName);
    }
    
     CÃÂÃÂºÃÂÃÂÃÂÃÂ¸ÃÂÃÂ¿ÃÂÃÂ ÃÂÃÂÃÂÃÂ°ÃÂÃÂÃÂÃÂ¿ÃÂÃÂÃÂÃÂµÃÂÃÂ´ÃÂÃÂµÃÂÃÂ»ÃÂÃÂµÃÂÃÂ½ÃÂÃÂ¸ÃÂÃÂ ÃÂÃÂºÃÂÃÂÃÂÃÂ¸ÃÂÃÂ¿ÃÂÃÂ¾ÃÂÃÂ² ÃÂÃÂ¼ÃÂÃÂµÃÂÃÂ¶ÃÂÃÂ´ÃÂÃÂ ÃÂÃÂÃÂÃÂµÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ½ÃÂÃÂÃÂÃÂ¼ÃÂÃÂ¸ ÃÂÃÂÃÂÃÂ¾ÃÂÃÂÃÂÃÂºÃÂÃÂ°ÃÂÃÂ¼ÃÂÃÂ¸ 
     
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];

        if(creep.memory.role == 'harvester') {
            var sources = creep.room.find(FIND_SOURCES);
            for (var i=0;i<sources.length;i++) {
                 var sourcesBusy = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.memory.sources == i);
                if (sourcesBusy.length == 0) {
                    creep.memory.sources = i;
                } else if ((creep.memory.sources == undefined) && (sourcesBusy.length == 0)) {
                    creep.memory.sources = i;
                }
            }
        creep.say(creep.memory.sources); //ÃÂÃÂ´ÃÂÃÂ¾ÃÂÃÂ±ÃÂÃÂ°ÃÂÃÂ²ÃÂÃÂ»ÃÂÃÂµÃÂÃÂ½ÃÂÃÂ¾ ÃÂÃÂ´ÃÂÃÂ»ÃÂÃÂ ÃÂÃÂÃÂÃÂµÃÂÃÂÃÂÃÂÃÂÃÂ° 
        }
    }
    
    
    
    **/
   
    
    
    
    // ÃÂÃÂ¡ÃÂÃÂÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ¹ Population Control 
    
    /**
    for (var i=0; i < RoomMass.length ;i++) {
   
        var MassSpawn =_.filter(Game.spawns,spawn=>spawn.my && spawn.pos.roomName == RoomMass[i].name);
        var RolesHesh =_.filter(RoomsRoles, o => o.roomNumber == RoomMass[i].name);
        
        console.log('HEEEEELLLOOOO BABY '+RolesHesh);
        // ÃÂÃÂ¿ÃÂÃÂ¾ÃÂÃÂ´ÃÂÃÂÃÂÃÂÃÂÃÂµÃÂÃÂ ÃÂÃÂºÃÂÃÂÃÂÃÂ¸ÃÂÃÂ¿ÃÂÃÂ¾ÃÂÃÂ² ÃÂÃÂ¸ ÃÂÃÂ²ÃÂÃÂÃÂÃÂ²ÃÂÃÂµÃÂÃÂ´ÃÂÃÂµÃÂÃÂ½ÃÂÃÂ¸ÃÂÃÂµ ÃÂÃÂ² ÃÂÃÂºÃÂÃÂ¾ÃÂÃÂ½ÃÂÃÂÃÂÃÂ¾ÃÂÃÂ»ÃÂÃÂ. ÃÂÃÂ¢ÃÂÃÂ°ÃÂÃÂº ÃÂÃÂ¶ÃÂÃÂµ ÃÂÃÂ¿ÃÂÃÂÃÂÃÂ¾ÃÂÃÂ²ÃÂÃÂµÃÂÃÂÃÂÃÂºÃÂÃÂ° ÃÂÃÂÃÂÃÂºÃÂÃÂ¾ÃÂÃÂ¼ÃÂÃÂ¿ÃÂÃÂ»ÃÂÃÂµÃÂÃÂºÃÂÃÂÃÂÃÂ¾ÃÂÃÂ²ÃÂÃÂ°ÃÂÃÂ½ÃÂÃÂ½ÃÂÃÂ¾ÃÂÃÂÃÂÃÂÃÂÃÂ¸ 
        
        for (var j=0; j < Roles.length;j++) {
        
            var SumCreeps = _.sum(Game.creeps, creep => creep.memory.role == Roles[j].role && creep.memory.roomNumber == RoomMass[i].name); //creep.memory.roomNumber == RoomMass[i].name);
            console.log(Roles[j].role+' Actual Count '+SumCreeps);
            
                if(SumCreeps < Roles[j].count[i]) {
                    Roles[j].staffed[i] = 'no';  // ÃÂÃÂ±ÃÂÃÂÃÂÃÂ»ÃÂÃÂ¾ ÃÂÃÂÃÂÃÂÃÂÃÂ
                } else if (SumCreeps >= Roles[j].count[i]) {
                    Roles[j].staffed[i] = 'yes';
                }
            
        }
        
        // ÃÂÃÂÃÂÃÂ°ÃÂÃÂ·ÃÂÃÂ±ÃÂÃÂ¸ÃÂÃÂµÃÂÃÂ½ÃÂÃÂ¸ÃÂÃÂµ ÃÂÃÂ¸ ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ¾ÃÂÃÂ¸ÃÂÃÂÃÂÃÂµÃÂÃÂ»ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ²ÃÂÃÂ¾ ÃÂÃÂºÃÂÃÂÃÂÃÂ¸ÃÂÃÂ¿ÃÂÃÂ¾ÃÂÃÂ² ÃÂÃÂ¿ÃÂÃÂ¾ ÃÂÃÂ¿ÃÂÃÂÃÂÃÂ¸ÃÂÃÂ¾ÃÂÃÂÃÂÃÂ¸ÃÂÃÂÃÂÃÂµÃÂÃÂÃÂÃÂ°ÃÂÃÂ¼
        
        var FirstPriority = _.filter(Roles, o => (o.priority == 1) && (o.staffed[i] == 'no'));
        var SecondPriority = _.filter(Roles, o => (o.priority == 2) && (o.staffed[i] == 'no')); 
        var ThirdPriority = _.filter(Roles, o => (o.priority == 3) && (o.staffed[i] == 'no'));
        
        
        for (var k=0;k < MassSpawn.length;k++) {
            
            console.log('ÃÂÃÂÃÂÃÂ¾ÃÂÃÂ¼ÃÂÃÂ½ÃÂÃÂ°ÃÂÃÂÃÂÃÂ° '+RoomMass[i].name+' CÃÂÃÂ¿ÃÂÃÂ°ÃÂÃÂ²ÃÂÃÂ½ - '+MassSpawn[k].name+' ÃÂÃÂ­ÃÂÃÂ½ÃÂÃÂµÃÂÃÂÃÂÃÂ³ÃÂÃÂ¸ - '+Game.rooms[RoomMass[i].name].energyAvailable);
            
            if (FirstPriority.length > 0) {
                
                for (var q=0; q < FirstPriority.length ;q++) {
                    var newName = Game.spawns[MassSpawn[k].name].createCreep(FirstPriority[q].charact[i], undefined, {role: FirstPriority[q].role, roomNumber: RoomMass[i].name, options: FirstPriority[q].options[i]});
                    console.log('ÃÂÃÂ ÃÂÃÂºÃÂÃÂ¾ÃÂÃÂ¼ÃÂÃÂ½ÃÂÃÂ°ÃÂÃÂÃÂÃÂµ '+RoomMass[i].name+', ÃÂÃÂÃÂÃÂ¿ÃÂÃÂ°ÃÂÃÂ²ÃÂÃÂ½ÃÂÃÂµ ' + MassSpawn[k].name +' ÃÂÃÂ½ÃÂÃÂ¾ÃÂÃÂ²ÃÂÃÂÃÂÃÂ¹ '+ FirstPriority[q].role +' ÃÂÃÂ¿ÃÂÃÂ¾ ÃÂÃÂ¸ÃÂÃÂ¼ÃÂÃÂµÃÂÃÂ½ÃÂÃÂ¸ '+newName);        
                }
            
            } else if (SecondPriority.length > 0) {
                
                for (var w=0; w < SecondPriority.length ;w++) {
                    var newName = Game.spawns[MassSpawn[k].name].createCreep(SecondPriority[w].charact[i], undefined, {role: SecondPriority[w].role, roomNumber: RoomMass[i].name, options: SecondPriority[w].options[i]});
                    console.log('ÃÂÃÂ ÃÂÃÂºÃÂÃÂ¾ÃÂÃÂ¼ÃÂÃÂ½ÃÂÃÂ°ÃÂÃÂÃÂÃÂµ '+RoomMass[i].name+', ÃÂÃÂÃÂÃÂ¿ÃÂÃÂ°ÃÂÃÂ²ÃÂÃÂ½ÃÂÃÂµ ' + MassSpawn[k].name +' ÃÂÃÂ½ÃÂÃÂ¾ÃÂÃÂ²ÃÂÃÂÃÂÃÂ¹ '+ SecondPriority[w].role +' ÃÂÃÂ¿ÃÂÃÂ¾ ÃÂÃÂ¸ÃÂÃÂ¼ÃÂÃÂµÃÂÃÂ½ÃÂÃÂ¸ '+newName);        
                }
            
            } else if (ThirdPriority.length > 0) {
                
                for (var e=0; e < ThirdPriority.length ;e++) {
                    var newName = Game.spawns[MassSpawn[k].name].createCreep(ThirdPriority[e].charact[i], undefined, {role: ThirdPriority[e].role, roomNumber: RoomMass[i].name, options: ThirdPriority[e].options[i]});
                    console.log('ÃÂÃÂ ÃÂÃÂºÃÂÃÂ¾ÃÂÃÂ¼ÃÂÃÂ½ÃÂÃÂ°ÃÂÃÂÃÂÃÂµ '+RoomMass[i].name+', ÃÂÃÂÃÂÃÂ¿ÃÂÃÂ°ÃÂÃÂ²ÃÂÃÂ½ÃÂÃÂµ ' + MassSpawn[k].name +' ÃÂÃÂ½ÃÂÃÂ¾ÃÂÃÂ²ÃÂÃÂÃÂÃÂ¹ '+ ThirdPriority[e].role +' ÃÂÃÂ¿ÃÂÃÂ¾ ÃÂÃÂ¸ÃÂÃÂ¼ÃÂÃÂµÃÂÃÂ½ÃÂÃÂ¸ '+newName);        
                }
            
            }
        }
        
        
        
    }
    
    
    
    var Roles = [
    
        {
            role : 'harvester',
            priority: 1,
            count: [2,2,4],
            staffed: [],
            charact: [[WORK,WORK,MOVE,CARRY],[WORK,WORK,WORK,CARRY,MOVE],[WORK,WORK,CARRY,MOVE]],
            options: [2,2,1],
        },
        {
            role : 'carrier',
            priority: 2,
            count: [6,6,0],
            staffed: [],
            charact: [[CARRY,CARRY,MOVE],[CARRY,CARRY,MOVE],[CARRY,CARRY,MOVE]],
            options: [1,1],
        },
        {
            role : 'upgrader',
            priority: 3,
            count: [4,5,4],
            staffed: [],
            charact: [[WORK,WORK,WORK,MOVE,CARRY],[WORK,WORK,WORK,CARRY,MOVE],[WORK,WORK,CARRY,MOVE]],
            options: [1,1],
        },
        {
            role : 'repairer',
            priority: 3,
            count: [3,4,3],
            staffed: [],
            charact: [[WORK,WORK,CARRY,MOVE],[WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE],[WORK,WORK,CARRY,MOVE]],
            options: [1,1],
        },
        {
            role : 'builder',
            priority: 3,
            count: [3,1,3],
            staffed: [],
            charact: [[WORK,WORK,CARRY,MOVE],[WORK,WORK,CARRY,MOVE],[WORK,WORK,CARRY,MOVE]],
            options: [1,1],
        },
        {
            role : 'defender',
            priority: 3,
            count: [0,0],
            staffed: [],
            charact: [,[RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE]],
            options: [1,1],
        },
        {
            role : 'marines',
            priority: 3,
            count: [0,0],
            staffed: [],
            charact:  [,[RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE]],
            options: [1,1],
        },
        {
            role : 'invader',
            priority: 3,
            count: [0,1],
            staffed: [],
            charact: [,[CLAIM,MOVE]],
            options: [1,0],
        }
        ];
    
    
    
    
    
    function PopulationControl() {
        
        var FirstPriority = _.filter(RolesHesh, o => (o.priority == 1) && (o.staffed == 'no'));
        var SecondPriority = _.filter(RolesHesh, o => (o.priority == 2) && (o.staffed == 'no')); 
        var ThirdPriority = _.filter(RolesHesh, o => (o.priority == 3) && (o.staffed == 'no'));
        
        for (var k=0;k < MassSpawn.length;k++) {
            
            console.log('ÃÂÃÂÃÂÃÂ¾ÃÂÃÂ¼ÃÂÃÂ½ÃÂÃÂ°ÃÂÃÂÃÂÃÂ° '+RoomMass[i].name+' CÃÂÃÂ¿ÃÂÃÂ°ÃÂÃÂ²ÃÂÃÂ½ - '+MassSpawn[k].name+' ÃÂÃÂ­ÃÂÃÂ½ÃÂÃÂµÃÂÃÂÃÂÃÂ³ÃÂÃÂ¸ - '+Game.rooms[RoomMass[i].name].energyAvailable);
            
            if (FirstPriority.length > 0) {
                
                for (var q=0; q < FirstPriority.length ;q++) {
                    var newName = Game.spawns[MassSpawn[k].name].createCreep(FirstPriority[q].charact, undefined, {role: FirstPriority[q].role, roomNumber: RoomMass[i].name, options: FirstPriority[q].options});
                    console.log('ÃÂÃÂ ÃÂÃÂºÃÂÃÂ¾ÃÂÃÂ¼ÃÂÃÂ½ÃÂÃÂ°ÃÂÃÂÃÂÃÂµ '+RoomMass[i].name+', ÃÂÃÂÃÂÃÂ¿ÃÂÃÂ°ÃÂÃÂ²ÃÂÃÂ½ÃÂÃÂµ ' + MassSpawn[k].name +' ÃÂÃÂ½ÃÂÃÂ¾ÃÂÃÂ²ÃÂÃÂÃÂÃÂ¹ '+ FirstPriority[q].role +' ÃÂÃÂ¿ÃÂÃÂ¾ ÃÂÃÂ¸ÃÂÃÂ¼ÃÂÃÂµÃÂÃÂ½ÃÂÃÂ¸ '+newName);        
                }
            
            } else if (SecondPriority.length > 0) {
                
                for (var w=0; w < SecondPriority.length ;w++) {
                    var newName = Game.spawns[MassSpawn[k].name].createCreep(SecondPriority[w].charact, undefined, {role: SecondPriority[w].role, roomNumber: RoomMass[i].name, options: SecondPriority[w].options});
                    console.log('ÃÂÃÂ ÃÂÃÂºÃÂÃÂ¾ÃÂÃÂ¼ÃÂÃÂ½ÃÂÃÂ°ÃÂÃÂÃÂÃÂµ '+RoomMass[i].name+', ÃÂÃÂÃÂÃÂ¿ÃÂÃÂ°ÃÂÃÂ²ÃÂÃÂ½ÃÂÃÂµ ' + MassSpawn[k].name +' ÃÂÃÂ½ÃÂÃÂ¾ÃÂÃÂ²ÃÂÃÂÃÂÃÂ¹ '+ SecondPriority[w].role +' ÃÂÃÂ¿ÃÂÃÂ¾ ÃÂÃÂ¸ÃÂÃÂ¼ÃÂÃÂµÃÂÃÂ½ÃÂÃÂ¸ '+newName);        
                }
            
            } else if (ThirdPriority.length > 0) {
                
                for (var e=0; e < ThirdPriority.length ;e++) {
                    var newName = Game.spawns[MassSpawn[k].name].createCreep(ThirdPriority[e].charact, undefined, {role: ThirdPriority[e].role, roomNumber: RoomMass[i].name, options: ThirdPriority[e].options});
                    console.log('ÃÂÃÂ ÃÂÃÂºÃÂÃÂ¾ÃÂÃÂ¼ÃÂÃÂ½ÃÂÃÂ°ÃÂÃÂÃÂÃÂµ '+RoomMass[i].name+', ÃÂÃÂÃÂÃÂ¿ÃÂÃÂ°ÃÂÃÂ²ÃÂÃÂ½ÃÂÃÂµ ' + MassSpawn[k].name +' ÃÂÃÂ½ÃÂÃÂ¾ÃÂÃÂ²ÃÂÃÂÃÂÃÂ¹ '+ ThirdPriority[e].role +' ÃÂÃÂ¿ÃÂÃÂ¾ ÃÂÃÂ¸ÃÂÃÂ¼ÃÂÃÂµÃÂÃÂ½ÃÂÃÂ¸ '+newName);        
                }
            
            }
        }
    }
    
    
    
    
    var RolesHarvester2 =_.filter(RoomsRoles, o => o.roomNumber == RoomMass[i].name && o.role == 'harvester' && o.options == 2);
        
        if ((RolesHarvester2.length == Sources.length) == MassContainer.length) {
            
            var Numbers = creep.memory.roomNumber; 
            var harvester = _.filter(Game.creeps, creep => creep.memory.role == 'harvester');    
            var containers = creep.room.find(FIND_STRUCTURES, {filter: { structureType: STRUCTURE_CONTAINER }});
            
            for (var i=0;i<containers.length;i++) {
                 var sourcesBusy = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.memory.container == containers[i].id && creep.memory.roomNumber == Numbers);
                if (sourcesBusy.length == 0) {
                    creep.memory.container = containers[i].id;
                } else if ((creep.memory.container == undefined) && (sourcesBusy.length == 0)) {
                    creep.memory.container = containers[i].id;
                }
            }
        }
    
   
   
   
   
var roleUpgrader = {

    
    run: function(creep) {
        
        
        if (creep.carry.energy == 0) {creep.memory.bag = 'empty';}
        
        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('ÃÂ°ÃÂÃÂÃÂ harvest');
	    }
	    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.upgrading = true;
	        creep.memory.bag = 'full';
	        creep.say('ÃÂ¢ÃÂÃÂ¡ upgrade');
	    }
        
	 
	    var rangesTargets1 = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                 filter: (i) => i.structureType == STRUCTURE_CONTAINER &&
                   i.store[RESOURCE_ENERGY] > 0
            });
        
        console.log(rangesTargets1);

	    if (creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        } else if ((!creep.memory.upgrading) && (rangesTargets1)) {
            if((creep.withdraw(rangesTargets1, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)) {
                creep.moveTo(rangesTargets1);
            }
        } else if ((!creep.memory.upgrading)) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
	}
};




module.exports = roleUpgrader;    
    
    
    
 ÃÂÃÂÃÂÃÂ ÃÂÃÂÃÂÃÂµÃÂÃÂ¹ÃÂÃÂ½ÃÂÃÂ° 
 
   /**for(let roomName in Game.rooms) {
	    let currentRoom = Game.rooms[roomName];
	      currentRoom.memory = {}; //ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ°ÃÂÃÂ²ÃÂÃÂ, ÃÂÃÂÃÂÃÂÃÂÃÂ¾ ÃÂÃÂ´ÃÂÃÂÃÂÃÂÃÂÃÂµ ÃÂÃÂÃÂÃÂ³ÃÂÃÂ¾ÃÂÃÂ´ÃÂÃÂ½ÃÂÃÂ¾
     }
    for(let room in Memory.rooms) { // ÃÂÃÂÃÂÃÂ¸ÃÂÃÂÃÂÃÂÃÂÃÂ¸ÃÂÃÂ¼ ÃÂÃÂ¿ÃÂÃÂ°ÃÂÃÂ¼ÃÂÃÂÃÂÃÂÃÂÃÂ
	    if(Game.rooms[room] == undefined) {
		    delete Memory.rooms[room];
	    }
    }
    
    
 ÃÂÃÂÃÂÃÂ¾ÃÂÃÂ´ ÃÂÃÂÃÂÃÂÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ ÃÂÃÂ¸ÃÂÃÂ¼ÃÂÃÂµÃÂÃÂ½
 
    //var newName = Game.spawns[MassSpawn[0].name].createCreep(MassCharacts[j], undefined, {role: Roles[j].role, roomNumber: RoomMass[i].name, options: Roles[j].options[i]});
    //console.log('ÃÂÃÂ ÃÂÃÂºÃÂÃÂ¾ÃÂÃÂ¼ÃÂÃÂ½ÃÂÃÂ°ÃÂÃÂÃÂÃÂµ '+RoomMass[i].name+', ÃÂÃÂÃÂÃÂ¿ÃÂÃÂ°ÃÂÃÂ²ÃÂÃÂ½ÃÂÃÂµ ' + MassSpawn[0].name +' ÃÂÃÂ½ÃÂÃÂ¾ÃÂÃÂ²ÃÂÃÂÃÂÃÂ¹ '+ Roles[j].role +' ÃÂÃÂ¿ÃÂÃÂ¾ ÃÂÃÂ¸ÃÂÃÂ¼ÃÂÃÂµÃÂÃÂ½ÃÂÃÂ¸ '+newName);  
    
     case 1: 

            var Numbers = creep.memory.roomNumber; 
            var carrier = _.filter(Game.creeps, creep => creep.memory.role == 'carrier');
            var containers = creep.room.find(FIND_STRUCTURES, {filter: { structureType: STRUCTURE_CONTAINER }});
           
        if (creep.memory.container === undefined) {
            for (var i=0;i<containers.length;i++) {
                 var sourcesBusy = _.filter(Game.creeps, (creep) => creep.memory.role == 'carrier' && creep.memory.container == containers[i].id && creep.memory.roomNumber == Numbers);
                if (sourcesBusy.length < 2) {
                    creep.memory.container = containers[i].id;
                } else if ((creep.memory.container == undefined) && (sourcesBusy.length < 2)) {
                    creep.memory.container = containers[i].id;
                }
            }
        }   
        
        var targetsStorage = creep.room.find(FIND_STRUCTURES, {filter: object => (object.structureType == STRUCTURE_STORAGE) && object.store[RESOURCE_ENERGY] > 5000 }); // STORAGE
        var container = _.filter(containers, o => o.id == creep.memory.container);
        //creep.say(creep.memory.container);
        
        if(creep.carry.energy == 0) { 
            if (container.length > 0) {
                if (targetsStorage.length > 0 && container[0].store[RESOURCE_ENERGY] < creep.carryCapacity) { 
                    if((creep.withdraw(targetsStorage[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)) {
                        creep.moveTo(targetsStorage[0]);
                    }
                } else if (container[0].store[RESOURCE_ENERGY] > creep.carryCapacity) {
                    if((creep.withdraw(container[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)) {
                        creep.moveTo(container[0]);
                    }
                }
            }
        }
        else if (creep.carry.energy = creep.carryCapacity) {
            
            /**var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_TOWER) && (structure.energy < structure.energyCapacity);
                    }
            });
            
            var rangesTargets1 = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_SPAWN ||
                            structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_TOWER ||
                            structure.structureType == STRUCTURE_POWER_SPAWN) && (structure.energy < structure.energyCapacity);
                }
        }); 
        
       /** var rangesTower = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_TOWER) && (structure.energy < structure.energyCapacity);
                }
        }); 
        
        var targets2 = creep.room.find(FIND_STRUCTURES, {filter: object => (object.structureType == STRUCTURE_STORAGE) && object.store[RESOURCE_ENERGY] < object.storeCapacity}); // STORAGE
    
        var targets23 = creep.room.find(FIND_STRUCTURES, {filter: object => (object.structureType == STRUCTURE_NUKER) && object.energy < object.energyCapacity }); 
    
        var targets3 = _.filter(Game.creeps, creep => creep.memory.role == 'builder' && creep.memory.bag == 'empty' && creep.memory.roomNumber == Numbers);
        var targets4 = _.filter(Game.creeps, creep => creep.memory.role == 'repairer' && creep.memory.bag == 'empty' && creep.memory.roomNumber == Numbers);
        var targets5 = _.filter(Game.creeps, creep => creep.memory.role == 'upgrader' && creep.memory.bag == 'empty' && creep.memory.roomNumber == Numbers);
        
        
        
        var PercentageOfOccupancy = Memory.rooms[Numbers].percentageOfOccupancy;
     
            
            if(rangesTargets1) {
                if(creep.transfer(rangesTargets1, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(rangesTargets1);
                }
            } else if ((targets2.length > 0)) {
                if(creep.transfer(targets2[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets2[0]);
                }
            } else if (targets3.length > 0) {
                if(creep.transfer(targets3[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets3[0]);
                }
            } else if (targets4.length > 0) {
                if(creep.transfer(targets4[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets4[0]);
                }
            } else if (targets5.length > 0) {
                if(creep.transfer(targets5[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets5[0]);
                }    
            } else if((creep.carry.energy < creep.carryCapacity) && (targets5.length == 0)) {
                var sources = creep.room.find(FIND_SOURCES);
                if((creep.withdraw(container[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)) {
                    creep.moveTo(container[0]);
                    }
            }

        
    
    } 
     

    break;
    
       
        // ÃÂÃÂÃÂÃÂ¾ÃÂÃÂ½ÃÂÃÂÃÂÃÂÃÂÃÂ¾ÃÂÃÂ»ÃÂÃÂ ÃÂÃÂÃÂÃÂÃÂÃÂ¼ÃÂÃÂ¸ÃÂÃÂ¸ 2.0 ÃÂÃÂ¡ÃÂÃÂ¾ÃÂÃÂ·ÃÂÃÂ´ÃÂÃÂ°ÃÂÃÂ½ÃÂÃÂ¸ÃÂÃÂµ ÃÂÃÂÃÂÃÂºÃÂÃÂ²ÃÂÃÂ°ÃÂÃÂ´ÃÂÃÂ°.  ÃÂÃÂ¤ÃÂÃÂÃÂÃÂÃÂÃÂ ÃÂÃÂ¡ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ ÃÂÃÂ¡ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ¯ÃÂÃÂ¢ÃÂÃÂ¬ ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ ÃÂÃÂÃÂÃÂ ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ´ÃÂÃÂÃÂÃÂ ÃÂÃÂÃÂÃÂ¿ÃÂÃÂ°ÃÂÃÂ²ÃÂÃÂ½ ÃÂÃÂ¿ÃÂÃÂµÃÂÃÂÃÂÃÂ²ÃÂÃÂ¾ÃÂÃÂ³ÃÂÃÂ¾ ÃÂÃÂºÃÂÃÂÃÂÃÂ¸ÃÂÃÂ¿ÃÂÃÂ° ÃÂÃÂÃÂÃÂÃÂÃÂ¾ÃÂÃÂ³ÃÂÃÂ¾ ÃÂÃÂÃÂÃÂºÃÂÃÂ²ÃÂÃÂ°ÃÂÃÂ´ÃÂÃÂ°, ÃÂÃÂ¸ÃÂÃÂ½ÃÂÃÂ°ÃÂÃÂÃÂÃÂµ ÃÂÃÂ¿ÃÂÃÂ°ÃÂÃÂ¼ÃÂÃÂÃÂÃÂÃÂÃÂ ÃÂÃÂ¾ÃÂÃÂÃÂÃÂ¸ÃÂÃÂÃÂÃÂÃÂÃÂ¸ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ
            
            var CreateSquad = Game.flags.CreateSquad;
            
            if (CreateSquad) {
                var PosFlag = Game.flags.CreateSquad.pos;
                if (Memory.army === undefined) {
                    Memory.army = {};
                    Memory.army[CreateSquad.color] = {ColorSquad: CreateSquad.color, CheckPoint: PosFlag, Gathering: true, Population: true, astartes: 3, apothecary: 0, Replenishment: false, Transport: false}, 
                    Game.flags.CreateSquad.remove();
                } else {
                    Memory.army[CreateSquad.color] = {ColorSquad: CreateSquad.color, CheckPoint: PosFlag, Gathering: true, Population: true, astartes: 3, apothecary: 0, Replenishment: false, Transport: false};
                    Game.flags.CreateSquad.remove();
                }
            }
            
        
        // ÃÂÃÂ¡ÃÂÃÂ±ÃÂÃÂ¾ÃÂÃÂ ÃÂÃÂºÃÂÃÂÃÂÃÂ¸ÃÂÃÂ¿ÃÂÃÂ¾ÃÂÃÂ² ÃÂÃÂ½ÃÂÃÂ° ÃÂÃÂÃÂÃÂ¾ÃÂÃÂÃÂÃÂºÃÂÃÂ ÃÂÃÂÃÂÃÂ±ÃÂÃÂ¾ÃÂÃÂÃÂÃÂ°  
            
            var Gatherings = _.filter(Memory.army, o => o.Gathering == true || (o.Gathering == false && o.Replenishments == true)); 
            //console.log() ÃÂÃÂÃÂÃÂ ÃÂÃÂÃÂÃÂÃÂÃÂ« ÃÂÃÂ¡ÃÂÃÂ ÃÂÃÂÃÂÃÂ¯ÃÂÃÂ¢ÃÂÃÂ¡ÃÂÃÂ¯ ÃÂÃÂÃÂÃÂ ÃÂÃÂÃÂÃÂ¡ÃÂÃÂÃÂÃÂ¥ ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂ¥ ÃÂÃÂ¡ÃÂÃÂ ÃÂÃÂÃÂÃÂÃÂÃÂ£. ÃÂÃÂÃÂÃÂ°ÃÂÃÂ´ÃÂÃÂ¾ ÃÂÃÂ¸ÃÂÃÂÃÂÃÂ¿ÃÂÃÂÃÂÃÂ°ÃÂÃÂ²ÃÂÃÂ¸ÃÂÃÂÃÂÃÂ. 
            if (Gatherings.length > 0) { 
                
                for (let o=0; o < Gatherings.length; o++) {
                    
                // ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ ÃÂÃÂÃÂÃÂ¡ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ¡
                    RoomsRoles['ControlAstartes'+Gatherings[o].CheckPoint.roomName+Gatherings[o].ColorSquad] =  
                    { role: 'astartes', roomNumber: Gatherings[o].CheckPoint.roomName, priority: 0, count: Gatherings[o].astartes, staffed: [], 
                        charact: 
                            [
                                    MOVE,MOVE,MOVE,MOVE,MOVE,            
                                    MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                                    MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                                
                                /**  RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
                                    RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
                                    RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK, **/
                                 /** 
                                    ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK, 
                                    ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,
                                    ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,  
                                   
                                    
                                  //  
                                    RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
                                    RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,HEAL,HEAL,HEAL,HEAL,HEAL,
                                    HEAL,HEAL,HEAL,HEAL,HEAL, 
                                    // 
                                   
                            ], 
                             options: 1,
                             squad: Gatherings[o].ColorSquad,
                             revival: 1,
                    };
                    
                // ÃÂÃÂÃÂÃÂ¾ÃÂÃÂ±ÃÂÃÂ°ÃÂÃÂ²ÃÂÃÂ»ÃÂÃÂµÃÂÃÂ½ÃÂÃÂ¸ÃÂÃÂµ ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ ÃÂÃÂÃÂÃÂÃÂÃÂ
                    RoomsRoles['ControlApothecary'+Gatherings[o].CheckPoint.roomName+Gatherings[o].ColorSquad] = 
                    { role: 'apothecary', roomNumber: Gatherings[o].CheckPoint.roomName, priority: 0, count: Gatherings[o].apothecary, staffed: [], 
                        charact: 
                            [
                             //HEAL,HEAL,HEAL,HEAL,HEAL,
                             
                            // MOVE,MOVE,MOVE,MOVE,MOVE,            
                             MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                             MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,//MOVE,MOVE,MOVE,
                             
                             HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,
                             HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL//,HEAL,HEAL,HEAL,
                             ], 
                             options: 1,
                             squad: Gatherings[o].ColorSquad,
                             revival: 1,
                    };
                
                   // var RolesAstartes = _.find(RolesHesh, pun => pun.role == 'astartes' && pun.roomNumber == Gatherings[o].CheckPoint.roomName && pun.squad == Gatherings[o].ColorSquad);
                    var GatheringSquad = Gatherings[o].astartes + Gatherings[o].apothecary;
                    var SumAstartes = _.sum(Game.creeps, creep => creep.memory.role == 'astartes' && creep.memory.roomNumber == Gatherings[o].CheckPoint.roomName && creep.spawning == false && creep.memory.squad == Gatherings[o].ColorSquad);
                    var SumApothecary = _.sum(Game.creeps, creep => creep.memory.role == 'apothecary' && creep.memory.roomNumber == Gatherings[o].CheckPoint.roomName && creep.spawning == false && creep.memory.squad == Gatherings[o].ColorSquad);
                    var SumSquad = SumAstartes + SumApothecary;
            
                    if (GatheringSquad !== undefined) {
                        if (GatheringSquad == SumSquad) {
                            var PosCheckPoint = new RoomPosition(Gatherings[o].CheckPoint.x, Gatherings[o].CheckPoint.y, Gatherings[o].CheckPoint.roomName);
                            var CreepForCreckPoint = PosCheckPoint.findInRange(FIND_MY_CREEPS, 2);
                            if (CreepForCreckPoint.length >= SumSquad) {
                                Gatherings[o].Gathering = false;
                            }
                        }
                        
                    }
                    
                    
                }
                
            }
            
            
            var MemorySquad =_.filter(Memory.army, o => o.Gathering == false && o.Replenishment == false);
            
            for (let s=0; s < MemorySquad.length;s++) {
                var Astartes = _.filter(Game.creeps, creep => creep.memory.role == 'astartes' && creep.memory.roomNumber == MemorySquad[s].CheckPoint.roomName && creep.memory.squad == MemorySquad[s].ColorSquad);
                if (Astartes.length == 0) {
                     Game.notify('Your soldiers from '+ MemorySquad[s].ColorSquad +' squad destroyed '+Game.time, 0);
                     delete Memory.army[MemorySquad[s].ColorSquad];
                }
            }
            
    



    **/