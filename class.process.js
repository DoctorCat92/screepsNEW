class process {

    constructor(Name,nameModule,state,prority,roomNumber,memory) {
        this.Name = Name;
        this.NameProcess = Name+roomNumber;
        this.nameModule = nameModule;
        this.Status = state, 
        this.Room = roomNumber, 
        this.Memory= memory,
        this.BusyTarget = [], 
        this.List = {}, 
        this.time = 0,
    }

    start () { 
        if (Memory.processor === undefined) {
            Memory.processor = {};
        }

        if (Memory.processor[this.Name] === undefined) { 
            Memory.processor[this.Name] = {Name: Name,NameProcess: Name, NameModule: nameModule, Status: true, Room: roomNumber, BusyTarget:[], List:{}, time: 0, Memory:memory}; //Opt:this.opt,
        }
    }

    stop () {
        delete Memory.processor[this.Name];
    }
}

module.exports = process;