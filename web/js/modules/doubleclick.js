define(function () {

    var adReadyCallback;

	function Doubleclick(callback) {
        adReadyCallback = callback;
		this.waitForEnablerInit();

        Enabler.addEventListener(studio.events.StudioEvent.COLLAPSE_START, function() {
            Enabler.finishCollapse();
            Enabler.counter("Counter - Ad Collapsed", true);
        });

        Enabler.addEventListener(studio.events.StudioEvent.EXPAND_START, function() {
            Enabler.finishExpand();
            Enabler.counter("Counter - Ad Expanded", true);
        });

        $('body').on('adCollapsed', this.startCollapse );
        $('body').on('adExpanded', this.startExpand );
        $('body').on('videoLoaded', this.trackVideo );
	}

    /**
    * Wait for the enabler to initalize
    */
    Doubleclick.prototype.waitForEnablerInit = function () {
        if (Enabler.isInitialized()) {
            this.waitForPageLoad();
        } else {
            Enabler.addEventListener(studio.events.StudioEvent.INIT, this.waitForPageLoad);
        }
    };

    /**
    * Wait for the parent page to load
    */
    Doubleclick.prototype.waitForPageLoad = function () {
        if (Enabler.isPageLoaded()) {
            adReadyCallback();
        } else {
            Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, adReadyCallback);
        }
    };

    Doubleclick.prototype.startCollapse = function () {

        Enabler.requestCollapse();

    };

    Doubleclick.prototype.startExpand = function () {

        Enabler.requestExpand();

    };

    Doubleclick.prototype.trackVideo = function (e) {

        var id = e['id'][0],
            wrapper = document.getElementById(id);

        Enabler.loadModule(studio.module.ModuleId.VIDEO, function() {
            studio.video.Reporter.attach(id, wrapper);
        });

    };

    return Doubleclick;
});