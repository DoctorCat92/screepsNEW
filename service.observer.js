var serviceObserver = {

    priority: 1,
    type: 'service',
    
    run: function(process) {

        /**
         * Описание Обзёрвера

        1)Определение комнаты в которой он находится. 
        2)Поиск выходов в комнате 
        3)По выходам смотрим другую комнату.
        3.5) делать так по радиусу, указанному в настройках комнаты. 
        4)Помечаем информацию о комнате:
            1.опасная или безопасная, если опасная отмечаем игрока и его ресурсы.
            2.есть ресурсы или нет (брошеные).
            3.наличие контроллера, если нет контроллера значит возможно это "шоссе", если это шоссе, значит делаем пометку в памяти что это шоссе, и проверяем наличие банок. 
            **/
        // # asdadasdadsae21  
       
        RoomObserver = {
            W21S2: {roomName:'W21S2', roomsArray: ['W21S0','W20S0','W19S0','W18S0','W19N0','W18N0','W20S1','W20S2','W20S3','W20S4','W20S5'] },
        }

        let DataInTable = RoomObserver[process.Room]; 
        let Observer = Game.rooms[process.Room].find(FIND_STRUCTURES, {filter: object => (object.structureType == STRUCTURE_OBSERVER)});
        
        if (DataInTable) {
            let TrackingList = RoomObserver[process.Room].roomsArray;
            if (TrackingList.length > 0) {
                if (process.time < TrackingList.length) {
                    let i = process.time; 
                    
                    if (Observer.length > 0) {
                        Observer[0].observeRoom(TrackingList[i]);

                        if (i>0) {
                            let t = i-1;
                            let OpenRoom = TrackingList[t];
                            console.log("Obsessed room "+OpenRoom);
                         //   try {
                                if (Game.rooms[OpenRoom]) {
                                    let PowerBank = Game.rooms[OpenRoom].find(FIND_STRUCTURES, { filter: object => (object.structureType == STRUCTURE_POWER_BANK)});
                                    
                                    if (PowerBank.length > 0 ) {
                                        if (PowerBank[0].ticksToDecay > 2300) {
                                            console.log('Найдена Повер банка в комнате '+OpenRoom);
                                            let Flag = _.find(Game.flags, f => f.name.startsWith('Squad') && f.pos.roomName == OpenRoom);
                                            if (Flag) {
                                              
                                            } else if (!Flag) {
                                               // Game.notify('Найдена банка в ' + PowerBank[0].pos.roomName + ' c временем ' + PowerBank[0].ticksToDecay);
                                                
                                                for (let SquadNumber=1; SquadNumber<10; SquadNumber++) {
                                                    let NameFlag = Game.flags['Squad'+SquadNumber+'-PowerMining0'];
                                                    if (NameFlag) {

                                                    } else if (!NameFlag) {
                                                       // Game.rooms[OpenRoom].createFlag(15, 15, 'Squad'+SquadNumber+'-PowerMining0', 10);
                                                        //Game.notify('Сквард '+SquadNumber+' направлен в комнату ' + PowerBank[0].pos.roomName+' на добычу банки с '+PowerBank[0].power+' силы.');
                                                        break;
                                                    }
                                                }
                                                
                                                
                                            }
                                        }
                                    }
                                }
                            //} catch (e) {
                        //        console.log(e);
                           // }
                        }
                    }
                    
                    
                    process.time = process.time + 1;
                } else {
                    process.time = 0;
                }
            }  
        }
    } 
}   


module.exports = serviceObserver;