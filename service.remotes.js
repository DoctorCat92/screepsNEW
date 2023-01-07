var serviceRemotes = {

    run: function(process) {
        
        // Поставить флаг RemoteMining на ресурс и указать комнату которая будет добывать 

        if (process.SourceList) {

            let MiningTarget =_.find(Game.flags, f => f.name.startsWith('RemoteMiningTarget'+process.Room)); 
            
           
        }
    } 
}   


module.exports = serviceRemotes;