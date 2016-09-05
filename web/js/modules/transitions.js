define(function () {

    function Transitions(options) {

        var animaiting = false,
            type = options.type;

            switch(type){
                case 'amplify':
                    this.amplify(options.from, options.to, options.duration, options.onComplete);
                    break;
                case 'consecutive':
                    this.consecutive(options.to, options.duration, options.onComplete);
                    break;
                case 'slide':
                    this.slide(options.from, options.to, options.duration, options.direction, options.onComplete);
                    break;
                case 'swap':
                    this.swap(options.from, options.to, options.duration, options.onComplete);
                    break;
            }
            
    }

    Transitions.prototype.amplify = function(from, to, duration, onComplete) {

        if(!this.animaiting) {

            this.animaiting = true;
            
            $(from).animate({ top: '-100%'}, duration, function(){
                $(from).css({
                    top: '100%',
                    zIndex: '99'
                }).delay(0.25).animate({ top: '93%' });
            });

            $(to).animate({ top: '-7%'}, duration, function(){
                $(to).css({ zIndex: '9' });
                this.animaiting = false;
            });

            this.fireCallback.call(this, onComplete);

        }

    };

    Transitions.prototype.consecutive = function(to, duration, onComplete) {

        if(!this.animaiting) {

            this.animaiting = true;

            $(to).fadeIn(duration, function(){
                this.animaiting = false;
            });

            this.fireCallback.call(this, onComplete);

        }

    };

    Transitions.prototype.fireCallback = function(callback) {

        if (typeof callback === 'function') {
            callback.call(this, arguments);
        }

    };

    Transitions.prototype.slide = function(from, to, duration, direction, onComplete) {

        if(!this.animaiting) {

            this.animaiting = true;
            
            if(direction === 'up'){

                $(from).animate({ top: '-100%'}, duration, function(){ $(from).hide(); this.animaiting = false; });
                $(to).css({ top: '100%' }).show().animate({ top: '0%'}, duration);

            }else if(direction === 'down'){

                $(from).animate({ top: '100%'}, duration, function(){ $(from).hide(); this.animaiting = false; });
                $(to).css({ top: '-100%' }).show().animate({ top: '0%'}, duration);

            }else if(direction === 'left'){

                $(from).animate({ left: '-100%'}, duration, function(){ $(from).hide(); this.animaiting = false; });
                $(to).css({ left: '100%' }).show().animate({ left: '0%'}, duration);

            }else if(direction === 'right'){

                $(from).animate({ left: '100%'}, duration, function(){ $(from).hide(); this.animaiting = false; });
                $(to).css({ left: '-100%' }).show().animate({ left: '0%'}, duration);

            }

        }
        
    };

    Transitions.prototype.swap = function(from, to, duration, onComplete) {

        if(!this.animaiting) {

            this.animaiting = true;
            
            $(to).fadeIn(duration);
            
            $(from).fadeOut(duration, function(){
                this.animaiting = false;
            });

            this.fireCallback.call(this, onComplete);

        }

    };

    return Transitions;

});