var roomVisual = {

    // Вывод информации о колличестве ресурсов в комнате
    run: function(process) { 
        let room = process.Room;
    // Цвета
        const ColorSets = {
            white:  ["#ffffff"],
            grey:   ["#b4b4b4"],
            red:    ["#FF0000"],
            yellow: ["#F7FE2E"],
            green:  ["#00f4a2"],
            blue:   ["#50d7f9"],
            purple: ["#a071ff"],
          };

          const ResourceColors = {
            [RESOURCE_ENERGY]:    ColorSets.yellow,
            [RESOURCE_POWER]:     ColorSets.red,
          
            [RESOURCE_HYDROGEN]:  ColorSets.grey,
            [RESOURCE_OXYGEN]:    ColorSets.grey,
            [RESOURCE_UTRIUM]:    ColorSets.blue,
            [RESOURCE_LEMERGIUM]: ColorSets.green,
            [RESOURCE_KEANIUM]:   ColorSets.purple,
            [RESOURCE_ZYNTHIUM]:  ColorSets.yellow,
            [RESOURCE_CATALYST]:  ColorSets.red,
            [RESOURCE_GHODIUM]:   ColorSets.white,
          
            [RESOURCE_HYDROXIDE]:         ColorSets.grey,
            [RESOURCE_ZYNTHIUM_KEANITE]:  ColorSets.grey,
            [RESOURCE_UTRIUM_LEMERGITE]:  ColorSets.grey,
          
            [RESOURCE_UTRIUM_HYDRIDE]:    ColorSets.blue,
            [RESOURCE_UTRIUM_OXIDE]:      ColorSets.blue,
            [RESOURCE_KEANIUM_HYDRIDE]:   ColorSets.purple,
            [RESOURCE_KEANIUM_OXIDE]:     ColorSets.purple,
            [RESOURCE_LEMERGIUM_HYDRIDE]: ColorSets.green,
            [RESOURCE_LEMERGIUM_OXIDE]:   ColorSets.green,
            [RESOURCE_ZYNTHIUM_HYDRIDE]:  ColorSets.yellow,
            [RESOURCE_ZYNTHIUM_OXIDE]:    ColorSets.yellow,
            [RESOURCE_GHODIUM_HYDRIDE]:   ColorSets.white,
            [RESOURCE_GHODIUM_OXIDE]:     ColorSets.white,
          
            [RESOURCE_UTRIUM_ACID]:       ColorSets.blue,
            [RESOURCE_UTRIUM_ALKALIDE]:   ColorSets.blue,
            [RESOURCE_KEANIUM_ACID]:      ColorSets.purple,
            [RESOURCE_KEANIUM_ALKALIDE]:  ColorSets.purple,
            [RESOURCE_LEMERGIUM_ACID]:    ColorSets.green,
            [RESOURCE_LEMERGIUM_ALKALIDE]:ColorSets.green,
            [RESOURCE_ZYNTHIUM_ACID]:     ColorSets.yellow,
            [RESOURCE_ZYNTHIUM_ALKALIDE]: ColorSets.yellow,
            [RESOURCE_GHODIUM_ACID]:      ColorSets.white,
            [RESOURCE_GHODIUM_ALKALIDE]:  ColorSets.white,
          
            [RESOURCE_CATALYZED_UTRIUM_ACID]:         ColorSets.blue,
            [RESOURCE_CATALYZED_UTRIUM_ALKALIDE]:     ColorSets.blue,
            [RESOURCE_CATALYZED_KEANIUM_ACID]:        ColorSets.purple,
            [RESOURCE_CATALYZED_KEANIUM_ALKALIDE]:    ColorSets.purple,
            [RESOURCE_CATALYZED_LEMERGIUM_ACID]:      ColorSets.green,
            [RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE]:  ColorSets.green,
            [RESOURCE_CATALYZED_ZYNTHIUM_ACID]:       ColorSets.yellow,
            [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE]:   ColorSets.yellow,
            [RESOURCE_CATALYZED_GHODIUM_ACID]:        ColorSets.white,
            [RESOURCE_CATALYZED_GHODIUM_ALKALIDE]:    ColorSets.white,
          };

        var vis = require('RoomVisual');
        var RoomsEnergy = Game.rooms[room].energyAvailable;
        var RoomsCapacity = Game.rooms[room].energyCapacityAvailable;
        var MassExtension = Game.rooms[room].find(FIND_STRUCTURES, {filter: object => (object.structureType == STRUCTURE_EXTENSION)});
        var Controller = Game.rooms[room].find(FIND_STRUCTURES, {filter: object => (object.structureType == STRUCTURE_CONTROLLER)});
        var Storage = Game.rooms[room].storage;

        
        // Колонка слева
        new RoomVisual(room).rect(0, 0, 9, 3, {fill:'#000100', opacity: 0.7});
        new RoomVisual(room).text(' ext energy '+RoomsEnergy+'/'+RoomsCapacity, 0, 1, {align: 'left',color:'#FFFFFF' ,font: 0.8});
        new RoomVisual(room).text(' Cntl: '+Controller[0].progress+'/'+Controller[0].progressTotal+'', 0, 2, {align: 'left',color:'#FFFFFF' ,font: 0.8});
        
        if (Storage) {

        let obj = Game.rooms[room].storage.store;
        let LengthObj = Object.keys(obj).length; 
        new RoomVisual(room).rect(0, 3, 9, 1+LengthObj, {fill:'#000000', opacity: 0.7}); 
        
        let i = 0;
       
            
            for (let key in Storage.store) {

                new RoomVisual(room).resource(key, 1,i+4, 0.5);
                new RoomVisual(room).text(+Storage.store[key] ,2 ,i+4.3, {align: 'left',color:'#FFFFFF',font: 0.8});

                let ResPercent = (Storage.store[key] / 1000000) * 100;
                let CoordinateParcent = (7/100) * ResPercent;
                let ColorRect = ResourceColors[key];
                new RoomVisual(room).rect(2 ,i+3.6, CoordinateParcent, 0.8, {fill: ColorRect, opacity: 0.3}); 
                
                i++;
            }
        }
        
        //Контроллер
        new RoomVisual(room).rect(Controller[0].pos.x-2.5, Controller[0].pos.y-4, 5, 3.5, {fill:'#000100', opacity: 0.7});
        let procentController = Math.round(Controller[0].progress/(Controller[0].progressTotal/100));
        new RoomVisual(room).text("bucket:"+Game.cpu.bucket+'   ', Controller[0].pos.x, Controller[0].pos.y-2);
        new RoomVisual(room).text("progress:"+procentController+'%', Controller[0].pos.x, Controller[0].pos.y-3);
        if (process.List.boostLastTick === undefined) {
            process.List['boostLastTick'] = 0;
        } else {
            var boost = Controller[0].progress - process.List.boostLastTick;
            new RoomVisual(room).text("boost:"+boost, Controller[0].pos.x, Controller[0].pos.y-1);
            process.List.boostLastTick = Controller[0].progress;
        }
        
        Memory

        if (!Memory.screeppix) {
            Memory.screeppix = {};
        }
        
        if (Memory.screeppix) {
            if (!Memory.screeppix.DataItems) {
                Memory.screeppix.DataItems = {};
            }
        }


        Game.roomVisual = {
            createMetric: function (object,metric,frequency,limit) {
                let Obj = Game.getObjectById(object);
                let Metr = Obj.store[metric];
                
                Memory.screeppix.DataItems[room+metric] = {
                    Metric: metric,
                    NameObject: Obj.structureType,
                    IdObject: Obj.id,
                    TickToMeasure: 0,
                    frequency: frequency,
                    limit: limit,
                    Data: [],
                    status: enable,
                    tickCreate: Game.time,
                }
            }, 

            delete: function (NameObj) {
                delete Memory.screeppix.DataItems[NameObj];
            }
        }

        
        if (Object.keys(Memory.screeppix.DataItems).length > 0) {
            for (let key in Memory.screeppix.DataItems) {
                let ObjMetric = Memory.screeppix.DataItems[key]
                let Obj = Game.getObjectById(ObjMetric.IdObject);
                if (Obj) {
                    
                }
                console.log('TEST '+Obj.structureType);
            }
            
        }

        // new RoomVisual(room).circle(0,1,{radius:0.25,fill:"#FFFF00",opacity:1});
                                                
    },

    
};

module.exports = roomVisual;

