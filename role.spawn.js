var roleSpawn = {

    
    run: function(structure) {
        
        
        
        if (structure.spawning !== null) {
            let Procent = (((structure.spawning.needTime - structure.spawning.remainingTime)/structure.spawning.needTime) * 100).toFixed(1);
            new RoomVisual(structure.pos.roomName).text("spawn "+structure.spawning.name+' ('+Procent+')', structure.pos.x+1, structure.pos.y-1, {color: '#FFFFFF', font: 0.6});
        } 
        
	}
};








module.exports = roleSpawn;  