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
            Memory.processor[this.name] = {Name: this.name, Opt:this.opt, folder:{}, time: 0};
        }
    }

    stop () {
        delete Memory.processor[this.name];
    }
}

module.exports = process;