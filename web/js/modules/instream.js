define(['expand'], function (Expand) {

	function Instream(options) {

		this.instreamContent = $('.instream-content');
		this.mpuContent = $('.mpu-content');
		this.settings = options;
		this.expandModule = new Expand({
			height: this.settings.height
		});

		$('body').on('adExpanded', this.expand.bind(this));
		$('body').on('adCollapsed', this.collapse.bind(this) );

	}

	Instream.prototype.expand = function () {

		$(this.mpuContent).fadeOut(500);
		$(this.instreamContent).fadeIn(500).animate({ height: this.settings.height }, 500);

	}

	Instream.prototype.collapse = function () {

		$(this.instreamContent).fadeOut(500).animate({ height: 250 }, 500);
		$(this.mpuContent).fadeIn(500);

	}
	
	return Instream;


});