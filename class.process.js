class process {

    constructor(n,p) {
        this.name = n;
        this.priority = p;
    }

    start () {
        if (Memory.processor === undefined) {
            Memory.processor = {};
        }

        if (Memory.processor[this.name] === undefined) { 
            Memory.processor[this.name] = {Name: this.name,  folder:{}, time: 0}; //Opt:this.opt,
        }
    }

    stop () {
        delete Memory.processor[this.name];
    }
}

module.exports = process;