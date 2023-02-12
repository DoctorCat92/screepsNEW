class process {

    constructor(Name,nameModule,state,priority,roomNumber,memory) {
        this.Name = Name;
        //this.NameProcess = Name+roomNumber;
        this.nameModule = nameModule;
        this.Status = state;
        this.roomNumber = roomNumber; 
        this.Memory= memory;
        this.priority = priority;
        this.BusyTarget = []; 
        this.List = {};
        this.time = 0;
    }

    start () { 
        if (Memory.processor === undefined) {
            Memory.processor = {};
        }

        if (Memory.processor[this.Name] === undefined) { 
            Memory.processor[this.Name] = {Name: this.Name,NameProcess: this.Name, Prority: this.priority, NameModule: this.nameModule, Status: this.Status, Room: this.roomNumber, BusyTarget:[], List:{}, time: 0, Memory:this.Memory}; //Opt:this.opt,
        }
    }

    stop () {
        delete Memory.processor[this.Name];
    }
}

module.exports = process;