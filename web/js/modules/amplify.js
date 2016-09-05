define(['autorunner', 'helpers', 'switcher'], function (Autorunner, _helpers, Switcher) {
	function Amplify(options) {
		var _this = this;

		this.settings = {
			autoRotateTimer: 3000,
			autoRotateLoop: 2
		};

		_helpers.mergeObjects(this.settings, options);

		this.createPanelSwitcher();

		$('body').on('click', '.panel-expand', function () {

			if (_this.settings.autoRotateTimer > 0) {
				_this.panelInterval.stop();
			}

			_this.rotatePanels();
		});
	}

	Amplify.prototype.rotatePanels = function () {
		this.switcher.sections.next.show();
	}	

	Amplify.prototype.createPanelSwitcher = function () {
		var panels = {};

		for (var panel in this.settings.panels) {
			panels[panel] = {id: this.settings.panels[panel]};
		}

		this.switcher = new Switcher({
            duration: 1000,
            transition: 'amplify',
            sections: panels
        });

        if (this.settings.autoRotateTimer > 0) {
			var noOfLoops = (Object.keys(this.settings.panels).length) * this.settings.autoRotateLoop;
			this.panelInterval = new Autorunner(this.rotatePanels.bind(this), this.settings.autoRotateTimer, noOfLoops);
			this.panelInterval.start();
		}
	}

	return Amplify;
});