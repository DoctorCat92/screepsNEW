var roleDismantler = {


    run: function(creep) {
        
        var MoveToDismantle = Game.flags.MoveToDismantle;
       
        if (MoveToDismantle) {
            var CreepRoomName = creep.pos.roomName;
            var FlagRoomName = MoveToDismantle.pos.roomName;
            if (CreepRoomName !== FlagRoomName) {
                creep.travelTo(MoveToDismantle);
            } else if (CreepRoomName == FlagRoomName) {
                var target = creep.room.find(FIND_HOSTILE_STRUCTURES, {filter: object => (object.structureType !== STRUCTURE_CONTROLLER)}); 
              
                if(target.length > 0) {
                    if(creep.dismantle(target[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target[0]);
                    }
                }
            }
        }
        
    } 
}   


module.exports = roleDismantler;