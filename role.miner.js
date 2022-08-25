var roleMiner = {


    run: function(creep) {
        
        var mines = creep.room.find(FIND_MINERALS);
        var total = _.sum(creep.carry);
        var resource = total[0];
        
        
        if(total < creep.carryCapacity) {
            if(creep.harvest(mines[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(mines[0]);
            }
        } else if (total == creep.carryCapacity) {
        
            var targets = creep.room.find(FIND_STRUCTURES, {filter: { structureType: STRUCTURE_STORAGE}});
            var Resource = _.findKey(creep.carry, o => o > 0);
            
            if(creep.transfer(targets[0], Resource) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
            }   

        }
    } 
}   


module.exports = roleMiner;