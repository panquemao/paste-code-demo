// Memory
function ASCI() {
    Memory.call(this);

    /////////////////////////////////////////////

    this.next = function () {
        this._pointer += 1;
        return this;
    }

    this.previous = function () {
        this._pointer -= 1;
        return this;
    }

    this.get = function () {
        if (typeof this._data[this._pointer] !== 'undefined') {
            return this._data[this._pointer];
        } else {
            return 0;
        }
    }

    this.set = function (_value) {
        if (_value < 0) {
            _value = 0;
        }
        this._data[this._pointer] = _value % 256;
        return this;
    }
    
    this.increase = function () {
        if (typeof this._data[this._pointer] !== 'undefined') {
            this._data[this._pointer] += 1;
            this._data[this._pointer] = this._data[this._pointer] % 256;
        } else {
            this._data[this._pointer] = 1;
        }
        return this;
    }
    
    this.decrease = function () {
        if (typeof this._data[this._pointer] !== 'undefined') {
            this._data[this._pointer] = this._data[this._pointer] > 1 ? this._data[this._pointer] - 1 : 0;
        } else {
            this._data[this._pointer] = 0;
        }
        return this;
    }
};

ASCI.prototype = Object.create(Memory);
ASCI.prototype.constructor = ASCI;

function Memory() {
    this._pointer = 0;
    this._data = {};

    /////////////////////////////////////////////

    this.reset = function () {
        this._pointer = 0;
    }
    
    this.clear = function () {
        this._pointer = 0;
        this._data = {};
    }
}
function Infinite() {
    Memory.call(this);

    /////////////////////////////////////////////

    this.next = function () {
        this._pointer += 1;
        return this;
    }

    this.previous = function () {
        this._pointer -= 1;
        return this;
    }

    this.get = function () {
        if (typeof this._data[this._pointer] !== 'undefined') {
            return this._data[this._pointer];
        } else {
            return 0;
        }
    }

    this.set = function (_value) {
        this._data[this._pointer] = _value;
        return this;
    }
    
    this.increase = function () {
        if (typeof this._data[this._pointer] !== 'undefined') {
            this._data[this._pointer] += 1;
        } else {
            this._data[this._pointer] = 1;
        }
        return this;
    }
    
    this.decrease = function () {
        if (typeof this._data[this._pointer] !== 'undefined') {
            this._data[this._pointer] -= 1;
        } else {
            this._data[this._pointer] = -1;
        }
        return this;
    }
};

Infinite.prototype = Object.create(Memory);
Infinite.prototype.constructor = Infinite;





// Code =========

function Code() {
    this._pointer = 0;
    this._source = {};
    this._brackets = {};

    /////////////////////////////////////////////

    this.get = function () {
        if (this._pointer >= this._source.length) {
            return undefined;
        } else {
            return this._source[this._pointer];
        }
    }

    this.next = function () {
        this._pointer += 1;
        return this.get();
    }

    this.previous = function () {
        this._pointer -= 1;
        return this.get();
    }

    this.jumpMatching = function () {
        if (typeof this._brackets[this._pointer] !== 'undefined') {
            this._pointer = this._brackets[this._pointer];
        }
        return this;
    }

    this.reset = function () {
        this._pointer = 0;
    }
    
    this.clear = function () {
        this._pointer = 0;
        this._source = {};
    }

    this.source = function (_source) {
        if (typeof _source !== 'undefined') {
            this._source = _source;
            this._optimize();
            return this;
        } else {
            return this._source;
        }
    }

    /////////////////////////////////////////////

    this._optimize = function () {
        var i,
            opening,
            opened = [];
        
        this._brackets = {};

        for (i = 0; i < this._source.length; i += 1) {
            
            if (this._source[i] === '[') {
                opened.push(i);
            } else if (this._source[i] === ']') {
                opening = opened.pop();
                this._brackets[opening] = i;
                this._brackets[i] = opening;
            }
        }
    }
}

function Brainfuck(_memory) {
    this.memory = _memory;
    this.code = new Code();
    this._stop = false;
    this._isRunning = false;

    this._onOutput = function (_o) {
        process.stdout.write(String.fromCharCode(_o));
     };
    
    this.onOutput = function (_func) {
        this._onOutput = _func;
        return this;
    }
    this.onInput = function (_func) {
        this._onInput = _func;
        return this;
    }

    this.stop = function () {
        this._stop = true;
    }

    this.isRunning = function () {
        return this._isRunning;
    }

    this.reset = function () {
        this.memory.reset = 0;
        this.code.reset();
        return this;
    };

    this.step = function (_callback) {
        var cmd = this.code.get();

        if (typeof cmd === 'undefined') {
            this._run(_callback, false);
            return false;
        } else {
            if (cmd === '>') {
                this.memory.next();
            } else if (cmd === '<') {
                this.memory.previous();
            } else if (cmd === '+') {
                this.memory.increase();
            } else if (cmd === '-') {
                this.memory.decrease();
            } else if (cmd === '.') {
                this._runAsync(this._onOutput, this.memory.get());
            } else if (cmd === ',') {
                this.memory.set(this._run(this._onInput));
            } else if (cmd === '[' && this.memory.get() === 0) {
                this.code.jumpMatching();
            } else if (cmd === ']') {
                this.code.jumpMatching();
                this.code.previous();
            }

            this.code.next();
            this._run(_callback, true);
            return true;
        }
    }

    this.run = function (_callback) {
        
        this._isRunning = true;

        if (this._stop) {
            this._isRunning = false;
            this._run(_callback);
        } else {
            this._stop = this._stop || !this.step();
            this._runAsync(this.run, _callback);                
        } 
    }

    this._runAsync = function (/*_func, _arg1, _arg2...*/) {
        var that = this,
            args = Array.prototype.slice.call(arguments),
            func = args.shift();
        
        func.apply(that, args);
    }

    this._run = function (/*_func, _arg1, _arg2...*/) {
        var args = args = Array.prototype.slice.call(arguments),
            func = args.shift();
        if (typeof func === 'function') {
            return func.apply(this, args);
        }
    }
};