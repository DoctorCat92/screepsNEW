var roleInvader = {


run: function(creep) {
    
    switch (creep.memory.options){

    case 1:


    let Colonisation =_.find(Game.flags, f => f.name.startsWith('Colonisation-'+creep.memory.roomNumber)); 
    var Invader = Colonisation;
    
    
    function InvaderCreep() {
        
        if (Invader) {
            creep.travelTo(Invader, {preferHighway:true});
            
            var PosFlag = Colonisation.pos.roomName;
            var PosCreep = creep.pos.roomName;
           
            if (PosFlag !== PosCreep ) {  
                creep.travelTo(Invader, {preferHighway:true});
            } else if (PosFlag == PosCreep) {
                var Controller = creep.room.find(FIND_STRUCTURES, {filter: object => (object.structureType == STRUCTURE_CONTROLLER)});
                if (Controller[0].my == false) {
                    if(creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) { 
                        creep.moveTo(creep.room.controller);
                        creep.say(creep.claimController(creep.room.controller));
                    } else {
                        
                    }
                } else {
                    let Name = 'Spawn'+Colonisation.pos.roomName;
                    Game.rooms[PosFlag].createConstructionSite(PosFlag.x, PosFlag.y, STRUCTURE_SPAWN, Name);
                    Game.notify('Creep colonizer arrived at the destination '+ PosCreep +' and began capturing the controller', 0);
                    Colonisation.pos.createFlag(Colonisation.name+'Claim');
                    Colonisation.remove();
                    creep.suicide();
                }
            }
            
            
        } 
        
        
    }
    
        //----------------------------------------------------------------
        
        var MassPath = [];  // ÃÂÃÂÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ¸ÃÂÃÂ·ÃÂÃÂ°ÃÂÃÂÃÂÃÂ¸ÃÂÃÂ ÃÂÃÂ¿ÃÂÃÂ¾ ÃÂÃÂºÃÂÃÂ¾ÃÂÃÂ¼ÃÂÃÂ½ÃÂÃÂ°ÃÂÃÂÃÂÃÂ°ÃÂÃÂ¼       new RoomPosition(25, 25, 'W86N19')'W90N20','W90N24'
        
        //----------------------------------------------------------------
        
        var PosCreep = creep.pos.roomName;
       
        if (MassPath.length == 0) {
            InvaderCreep();
        } else if (MassPath.length > 0) {
            if (creep.memory.target === undefined) {
                creep.memory.target = '!achieved';
                creep.memory.point = 0; 
            }
            
            if (creep.memory.target == '!achieved') {
                for (var i=0;i < MassPath.length;i++) {
                    if (typeof(MassPath[i]) == 'string') {
                        if (creep.memory.point == i) {
                            if (PosCreep !== MassPath[i]) {
                                creep.moveTo(new RoomPosition(25, 25, MassPath[i]));
                            } else if (PosCreep == MassPath[i]) {
                                creep.memory.point = creep.memory.point + 1;
                            }
                        }
                    } else if (typeof(MassPath[i]) !== 'string') {
                        if (creep.memory.point == i) {
                            if (!creep.pos.isEqualTo(MassPath[i])) {
                                creep.moveTo(MassPath[i]);
                            } else if (creep.pos.isEqualTo(MassPath[i])) {
                                creep.memory.point = creep.memory.point + 1;
                            }
                        }
                    }
                    
                }
            } 
            
            
            if (creep.memory.point == MassPath.length) {
                InvaderCreep();
            }
            
            
        }

    
    break;
    
    case 2:
    

    break;
        
    }        
} 
}   


module.exports = roleInvader;