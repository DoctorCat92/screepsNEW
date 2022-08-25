var roleHealer = {


    run: function(creep) {
    
    const target = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
        filter: function(object) {
            return object.hits < object.hitsMax;
            }
    });
    
    var Numbers = creep.memory.roomNumber; 
    var Soldiers = _.find(Game.creeps, creep => creep.memory.role == 'astartes' ); //&& creep.memory.roomNumber == Numbers
    
    var Move = Game.flags.Move;
    var MoveHealers = Game.flags.MoveHealers;
    var MoveGroup = Game.flags.MoveGroup;
    
    
        if(target) {
            if(creep.heal(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        } else if (!target) {
            creep.moveTo(Soldiers[0]);
        }
        
        if (Move) {
            creep.moveTo(Move);
        }
        if (MoveHealers) {
            creep.moveTo(MoveHealers);
        }
        if (MoveGroup) {
            creep.moveTo(MoveGroup);
        }
        
        var CreateSoldiers1 = Game.flags.CreateSoldiers1;
        if (CreateSoldiers1) {
            creep.moveTo(CreateSoldiers1);
        }
    
    } 
}   


module.exports = roleHealer;