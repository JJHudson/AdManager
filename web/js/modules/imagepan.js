define(['helpers', 'autorunner'], function (Helpers, AutoRunner) {

	function ImagePan(options) {

		this.settings = {
			width: 300,
			height: 300,
			zoom: 200
		};

		Helpers.mergeObjects(this.settings, options);

		this.elem = $('.js-image-pan');
		this.thumbElems = $('.js-image-pan-thumbs');

		this.setupImagePan();

		this.elem.on('mousemove', this.getMousePos.bind(this));

		this.elem.hover(this.zoomIn.bind(this), this.zoomOut.bind(this));

		$('.image-pan-thumb').on('click', this.changeImage);

		_thisPan = this;

	}

	ImagePan.prototype.setupImagePan = function(e) {

		if(typeof this.settings.image === 'object'){

			this.imageURL = this.settings.image[0];

			for(i=0;i<this.settings.image.length;i++){
				if(i === 0){
					this.thumbElems.append('<img class="image-pan-thumb js-image-pan-thumb active" src="'+this.settings.image[i]+'" width="25%" />');
				}else{
					this.thumbElems.append('<img class="image-pan-thumb js-image-pan-thumb" src="'+this.settings.image[i]+'" width="25%" />');
				}
			}

		}else{

			this.imageURL = this.settings.image;

		}

		this.elem.css({
			'width':this.settings.width,
			'height':this.settings.height,
			'background-image': 'url('+this.imageURL+')',
			'background-position': '50% 50%',
			'background-repeat': 'no-repeat',
			'background-size': '100% auto',
			'overflow': 'hidden'
		});

	};

	ImagePan.prototype.changeImage = function(e) {

		var newImage = $(this).attr('src');

		$('.image-pan-thumb').removeClass('active');
		$(this).addClass('active');

		_thisPan.elem.css({
			'background-image': 'url('+newImage+')',
		});

	};

	ImagePan.prototype.getMousePos = function (e) {

		this.x = ((e.pageX - this.elem.offset().left) / this.settings.width) * 100;
		this.y = ((e.pageY - this.elem.offset().top) / this.settings.height) * 100;

		this.elem.css({
			'background-position-x': this.x + '%',
			'background-position-y': this.y + '%',
		});

	};

	ImagePan.prototype.zoomIn = function (e) {

		this.elem.animate({
			'background-size': this.settings.zoom + '%'
		},500);

		$('.logo').fadeOut();

	};

	ImagePan.prototype.zoomOut = function (e) {

		this.elem.animate({
			'background-size': '100%'
		},500);

		$('.logo').fadeIn();

	};


	return ImagePan;

});