define(function () {

    function Video(options) {

        this.settings = options;
        this.wrapper = $("#"+this.settings['wrapper']);
        this.poster = this.wrapper.children('.js-poster');
        this.videoElem = this.wrapper.children('.js-video').get(0);
        var _this = this;

        $(this.poster).on('click', function(){
            _this.playVideo();
        });

        $('body').on('collapseAd', function(){
            if(!_this.videoElem.paused){
               _this.pauseVideo();
            }
        });

        setTimeout(function(){
           $('body').trigger({
                type: 'videoLoaded',
                id: [_this.settings['id']]
            });
        },10);

        if(this.settings.type === 'quiz') {

            $(this.videoElem).on('click', this.playPause.bind(this));

        }

    }

    Video.prototype.playVideo = function () {

        $("body").trigger('videoPlay');

        this.videoElem.play();
        $(this.videoElem).css('display','block');
        $(this.poster).css('display','none');

    };

    Video.prototype.pauseVideo = function () {

        $("body").trigger('videoPause');

        this.videoElem.pause();
        $(this.videoElem).css('display','none');
        $(this.poster).css('display','block');

    };

    Video.prototype.playPause = function() {

        if(!this.videoElem.paused){
            this.videoElem.pause();
        }else{
            this.videoElem.play();
        }

    };

    return Video;

});
