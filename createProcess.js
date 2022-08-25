var createProcess = {

    run: function(Name,nameModule,state,prority,roomNumber,memory) {
  
      
      
      if (Memory.processor === undefined) {
        Memory.processor = {};
        if (Memory.processor[Name] === undefined) { 
             Memory.processor[Name] = {Name: Name,NameProcess: Name, NameModule: nameModule, Status: true, Room: roomNumber, BusyTarget:[], List:{}, time: 0, Memory:memory};
        }
        //processTest.run(Memory.processor[Name]);
      } else {
        if (Memory.processor[Name] === undefined) { 
            Memory.processor[Name] = {Name: Name,NameProcess: Name, NameModule: nameModule, Status: true, Room: roomNumber, BusyTarget:[], List:{}, time: 0, Memory:memory};
            console.log('test Create proc '+Memory.processor[Name]);
        }
         // processTest.run(Memory.processor[Name]);
      }
        
    }   
}
module.exports = createProcess;