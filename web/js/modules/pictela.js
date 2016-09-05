define(function () {

    var adReadyCallback;

	function Pictela(callback) {
        adReadyCallback = callback;
        ADTECH.ready(adReadyCallback);

        $('body').on('adCollapsed', this.startCollapse );
        $('body').on('adExpanded', this.startExpand );
        $('body').on('videoLoaded', this.trackVideo );
	}

    Pictela.prototype.startCollapse = function () {

        ADTECH.contract();
        ADTECH.event('Counter - Ad Collapsed');

    };

    Pictela.prototype.startExpand = function () {

        ADTECH.expand();
        ADTECH.event('Counter - Ad Expanded');

    };

    Pictela.prototype.trackVideo = function (e) {

        var id = e['id'][0],
            wrapper = document.getElementById(id);

        ADTECH.registerVideoPlayer(wrapper, "Video 1");

    };

    return Pictela;
});