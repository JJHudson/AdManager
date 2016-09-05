define(function () {
    function Autorunner(callback, interval, numberOfTimes) {
        this.callback = callback;
        this.interval = interval;
        this.numberOfTimes = numberOfTimes;
        this.i = 1;
        this.limit = numberOfTimes || -1;
    }

    Autorunner.prototype.start = function () {
        var _this = this;

        this.timer = setInterval(function() {
            if (_this.limit > 0 && _this.i >= _this.limit) {
                _this.stop();
            } else {
                _this.callback.apply(arguments);
                _this.i++;
            }
        }, this.interval);        
    }

    Autorunner.prototype.pause = function () {
        clearInterval(this.timer);
    }

    Autorunner.prototype.stop = function () {
        this.i = 0;
        this.pause();
    }

    Autorunner.prototype.restart = function () {
        this.stop();
        this.start();
    }

    return Autorunner;
});