define(function () {

	function Lightbox() {

        Enabler.addEventListener(studio.events.StudioEvent.FULLSCREEN_COLLAPSE_START, function() {
            Enabler.finishFullscreenCollapse();
            Enabler.counter("Counter - Ad Collapsed", true);
        });

        Enabler.addEventListener(studio.events.StudioEvent.FULLSCREEN_COLLAPSE_FINISH, function() {});

        Enabler.addEventListener(studio.events.StudioEvent.FULLSCREEN_EXPAND_START, function() {
            Enabler.finishFullscreenExpand();
            Enabler.counter("Counter - Ad Expanded", true);
        });

        Enabler.addEventListener(studio.events.StudioEvent.FULLSCREEN_EXPAND_FINISH, function() {});

        $('body').on('adCollapsedFullscreen', this.startCollapseFullscreen );
        $('body').on('adExpandedFullscreen', this.startExpandFullscreen );
	}

    Lightbox.prototype.startCollapseFullscreen = function () {

        Enabler.requestFullscreenCollapse();

    };

    Lightbox.prototype.startExpandFullscreen = function () {

        Enabler.requestFullscreenExpand();

    };

    return Lightbox;
});