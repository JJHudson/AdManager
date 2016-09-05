define(['helpers'], function(Helpers) {

	function Expand(options) {

		this.settings = {
			adBaseHeight: $('#ad').height(),
			adBaseWidth: $('#ad').width(),
			type: '',
			animationSpeed: 500
		};

		Helpers.mergeObjects(this.settings, options);

		this.expanded = false;

		$('body').on('click', '.js-collapse', this.collapse.bind(this) );
		$('body').on('click', '.js-expand', this.expand.bind(this) );
		$('body').on('collapseAd', this.collapse.bind(this) );
		$('body').on('expandAd', this.expand.bind(this) );

	}

	Expand.prototype.collapse = function () {

		if(this.expanded){

			this.expanded = false;

			if(this.settings.type === 'lightbox'){

				$('#ad').css({
					width: this.settings.adBaseWidth,
					height: this.settings.adBaseHeight,
					margin: 0,
					top: 0,
					transform: 'none'
				}, 1000);

				$('body').css({
					background: 'transparent'
				});

				$('body').trigger('adCollapsedFullscreen');

			}else{

				var animateSettings = {};

				if(this.settings.height){
					animateSettings.height = this.settings.adBaseHeight;
				}

				if(this.settings.width){
					animateSettings.width = this.settings.adBaseWidth;
				}

				if(this.settings.type === 'portrait'){
					animateSettings.left = "300px";
					$('#content-section').css('left','0px');
				}

				$('#ad').animate(animateSettings, this.settings.animationSpeed);

				$('body').trigger('adCollapsed');

			}

		}

	};

	Expand.prototype.expand = function () {

		if(!this.expanded){

			this.expanded = true;

			if(this.settings.type === 'lightbox'){

				$('#ad').css({
					width: this.settings.width,
					height: this.settings.height,
					margin: '0 auto',
					top: '50%',
					transform: 'translateY(-50%)'
				}, 1000);

				$('body').css({
					background: 'rgba(0,0,0,0.75)'
				});

				$('body').trigger('adExpandedFullscreen');

			}else{

				var animateSettings = {};

				if(this.settings.height){
					animateSettings.height = this.settings.height;
				}

				if(this.settings.width){
					animateSettings.width = this.settings.width;
				}

				if(this.settings.type === 'portrait'){
					animateSettings.left = "0";
					$('#content-section').css('left','300px');
				}

				$('#ad').animate(animateSettings, this.settings.animationSpeed);

				$('body').trigger('adExpanded');

			}

		}

	};

	return Expand;

});