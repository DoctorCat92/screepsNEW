var roleTerminal = {

    
    run: function(structure) {
        let string = Game.time;
        let stringTime = String(string);
        let FiveHundred = stringTime.indexOf('99', stringTime.length-2);

        if (FiveHundred > -1) {
            let RandomNumber = Math.random();
          //  Game.rooms[structure.pos.roomName].createFlag(44, 16, 'Trade' + RandomNumber);
        }
        
        let Trade =_.find(Game.flags, i => i.name.startsWith('Trade') && i.pos.roomName == structure.pos.roomName); 
        let Buy =_.find(Game.flags, f => f.name.startsWith('Buy')); 

        if (Trade && structure.cooldown == 0) {
            let posFlag = Trade.pos.roomName; 
            
            let posTerminal = structure.pos.roomName;
            let targetRoom = posTerminal;
            let str = Trade.name;
            let sign  = str.indexOf('-', 4);
            if (sign == -1) {
                console.log('TRADE');
                if (posFlag == posTerminal) {
                    for(const resourceStore in structure.store) {
                        if (resourceStore !== 'energy') {
                            let Orders = Game.market.getAllOrders(order => order.resourceType == resourceStore && order.type == ORDER_BUY && Game.market.calcTransactionCost(1000, targetRoom, order.roomName) < 2000);
                            let OrdersSort = _.sortBy(Orders, ['price']);
                            let Maximum = OrdersSort.length - 1;
                            if (OrdersSort.length > 0) {
                               // Game.market.deal(OrdersSort[Maximum].id,OrdersSort[Maximum].amount,posTerminal);
                                console.log('Trade = '+Game.market.deal(OrdersSort[Maximum].id, OrdersSort[Maximum].amount,posTerminal));
                            } 
                            if (OrdersSort.length == 0) {
                                Trade.remove();
                            } else if ( (Game.market.deal(OrdersSort[Maximum].id,OrdersSort[Maximum].amount,posTerminal) == ERR_NOT_ENOUGH_RESOURCES)) {
                                Trade.remove();
                            }
                            
                        }
                    }
                    
                }
            } else if (sign !== -1) { 
                let Res = str.slice(6, sign-1);
                let Amount = Number(str.slice(sign+1));
                let posFlag = Trade.pos.roomName;
                let posTerminal = structure.pos.roomName;
                let targetRoom = posTerminal;
                
                if (Res == 'pixel' || Res == 'token' || Res == 'cpuUnlock' || Res == 'accessKey') {  
                    let Orders = Game.market.getAllOrders(order => order.resourceType == Res && order.type == ORDER_BUY);
                    let OrdersSort = _.sortBy(Orders, ['price']);
                    if (OrdersSort.length > 0) {
                        let t = OrdersSort.length-1;
                            for (let i=OrdersSort.length-1; i>0 ; i--) {
                                if (Game.market.deal(OrdersSort[i].id, OrdersSort[i].amount ,posTerminal) == OK) {
                                    new RoomVisual().text('Продано '+OrdersSort[i].amount+' '+Res+' По цене '+OrdersSort[i].price, structure.pos.x-1, structure.pos.y-1, {align: 'left'}); 
                                    break;
                                }
                            }                            
                    }
                } else {
                    
                }
                
            }
        }

        if (Buy && structure.cooldown == 0) {
            let str = Buy.name;
            let sign  = str.indexOf('-', 4);
            let Res = str.slice(4, sign-1);
            let Amount = Number(str.slice(sign+1));
            let posFlag = Buy.pos.roomName;
            let posTerminal = structure.pos.roomName;
            let targetRoom = posTerminal;

            console.log('Название ресурса '+'+'+Res+'+');
            console.log('Колличество ресурса '+ Amount);
            if (posFlag == posTerminal) {
   
                let Orders = Game.market.getAllOrders(order => order.resourceType == Res && order.type == ORDER_SELL);
                let OrdersSort = _.sortBy(Orders, ['price']);
                console.log('Колличество ордеров по цене '+ Orders.length);
                
                
                
                if (Res == 'pixel' || Res == 'token' || Res == 'cpuUnlock' || Res == 'accessKey') {
                    if (Game.market.deal(OrdersSort[0].id, OrdersSort[0].amount ,posTerminal) == OK) {
                        Game.notify('Куплено '+Amount+' '+OrdersSort[0].resourceType+' по цене '+OrdersSort[0].price, 0);            
                       // Buy.remove();
                    } 
                } else {
                    if (structure.store[Res] >= Amount) {
                       Buy.remove();
                       Game.notify('Куплено '+Amount+' '+ObjectCalcCostBuy.resourceType+' по цене '+ObjectCalcCostBuy.price+', на это затрачено энергии '+CalcNumber, 0);            

                    } else if (structure.store[Res] < Amount) {
                        if (Amount > OrdersSort[0].amount) {
                            Amount = OrdersSort[0].amount;
                        }
                        if (OrdersSort.length > 0) { 
                            console.log('Отсортированных ордеров '+ OrdersSort.length);
                            var CalcNumber = Game.market.calcTransactionCost(Amount, structure.pos.roomName, OrdersSort[0].roomName);
                           
                            if (CalcNumber !== undefined) {
                                console.log('Первоночальное расстрояние '+CalcNumber);
                                for (let key in OrdersSort) {
                                
                                    let NoCalcNumber = Game.market.calcTransactionCost(Amount, structure.pos.roomName, OrdersSort[key].roomName);
                                    console.log('Косты '+ NoCalcNumber);
                                    if (NoCalcNumber < CalcNumber) {
                                        console.log('Этот кост меньше предыдущего '+ NoCalcNumber);
                                        
                                        CalcNumber = NoCalcNumber;
                                        var ObjectCalcCostBuy = OrdersSort[key];
                                    }
                                }
            
                                if (ObjectCalcCostBuy) {
                                    if (Game.market.deal(ObjectCalcCostBuy.id, OrdersSort[0].amount ,posTerminal) == OK) {
                                      // Game.notify('Куплено '+Amount+' '+ObjectCalcCostBuy.resourceType+' по цене '+ObjectCalcCostBuy.price+', на это затрачено энергии '+CalcNumber, 0);            
                                    }   
                                }
                            }  
                        }
                    }
                }                     
            }
        }


        
        
	}
};

module.exports = roleTerminal;  