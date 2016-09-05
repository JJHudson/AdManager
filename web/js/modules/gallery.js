define(['autorunner', 'helpers', 'switcher'], function (Autorunner, _helpers, Switcher) {

    function Galleries(options) {

        this.settings = {
            btnClass: 'gallery-btn',
            nextClass: 'gallery-next',
            nextImage: '>',
            prevClass: 'gallery-prev',
            prevImage: '<',
            autoRotateTimer: 0,
            autoRotateLoop: 0
        };

        _helpers.mergeObjects(this.settings, options.gallery);


        var wrapper = $('#' + this.settings['id']),
            btnPrev = $('.' + this.settings.prevClass),
            btnNext = $('.' + this.settings.nextClass),
            imageNames = [],
            rotateSet = false,
            rotateInterval,
            switcher,
            _this = this;
            

        if(this.settings.autoRotateTimer > 0){
            rotateSet = true;
        }

        _this.templateGallery(this.settings);

        wrapper.on('click', btnNext['selector'], function(){
            if(_this.rotateSet){
                _this.rotateInterval.stop();
            }
            _this.goToNextSlide();
        });

        wrapper.on('click', btnPrev['selector'], function(){
            if(_this.rotateSet){
                _this.rotateInterval.stop();
            }
            _this.goToPrevSlide();
        });

    }

    Galleries.prototype.templateGallery = function () {

        var images = [],
            galleryContent = '';

        // Loop through the questions in the JSON and create a section for each
        for(var key in this.settings.images){

            // Add a div for each image
            galleryContent += '<div id="' + key + '" class="js-gallery-item gallery-item">';
            galleryContent += '<img src="' + this.settings.images[key] + '" alt="">';
            galleryContent += '</div>';

            // Add each image to the sections array
            images[key] = {id: key};

        }

        // Add the next and previous buttons to the gallery
        galleryContent += '<div id="js-gallery-prev" class="' + this.settings.prevClass + ' ' + this.settings.btnClass + '">' + this.settings.prevImage + '</div>';
        galleryContent += '<div id="js-gallery-next" class="' + this.settings.nextClass + ' ' + this.settings.btnClass + '">' + this.settings.nextImage + '</div>';

        // Add the images to the DOM
        $('#' + this.settings['id']).html(galleryContent);

        // Create a new instance of the switcher for the quiz section and add previously created sections into it
        this.switcher = new Switcher({
            duration: 500,
            transition: 'slide',
            sections : images
        });

        if(this.rotateSet){
            var noOfLoops = (Object.keys(settings.images).length)*settings.autoRotateLoop;
            this.rotateInterval = new Autorunner(goToNextSlide, settings.autoRotateTimer, noOfLoops);
            this.rotateInterval.start();
        }

    }

    Galleries.prototype.goToNextSlide = function () {
        this.switcher.sections.next.show('left');
    }

    Galleries.prototype.goToPrevSlide = function () {
        this.switcher.sections.prev.show('right');
    }

    return Galleries;

});