# Ad

This repo contains the most up to date version of the base code for all HTML5 ads. For each new project checkout a new branch from master and use the base code as your starting point.

## Requirements

Each ad requires a number of files in order to function correctly. These files are included as part of the base code ready for you to edit.


| File 	        | Description   						| Link 									|
| ------------- | ------------------------------------- | ------------------------------------- |
| main.css		| The styling for the ad, compiled using sass.				|										|
| jquery.js 	| A Javascript library.					| [jQuery](http://jquery.com/)			|
| require.js 	| A Javascrit module loader.			| [Require JS](http://requirejs.org/) 	|
| main.js 		| The main javascript file.				| 										|


## Naming Convention

### GitHub

To differentiate between those branches containing dev updates and those containing ad builds we have a specific naming convention.

For dev based branches you should prefix the branch with `dev-` flllowed by a description of what the branch is for.

eg: `dev-update-transitions`

For branches containing ad buids you should prefix the beanch with `ad-` followed by the brand, ad format and month/year.

eg: `ad-canon-mpu-0115`

### DoubleClick

DoubleClick Studio requires each ad to be part of a campaign, which in turn is associated with an advertiser.

When creating an ad, contact the ad ops team asking the advertiser name for this set of ads. You can then create the advertiser if it does not already exists. The advertiser name must be **EXACTLY** the same as given to you by the ad ops team.

Once you have the advertiser, you should create a campaign inside the advertiser. There are no specific requirements for the campaign name, just make sure to make it descriptive.

After creating the campaign, you can create the ad. The ad name should contains the following pieces of information

* Advertiser - The advertiser name
* Campaign - The campaign name
* Format - The ad format, eg MPU, Portrait, Billboard etc
* Phase - Used to indicate major content updates
* Version - Number before the point represents the number of client changes. The number after the point represents the number of dev team changes.

eg: `canon - win a camera - mpu - p1 v1.0`


## Formats

The ad repo can create ads in five distinct formats, others can be added but these are the standard sizes:

| Format        | Size (W x H : expand W x expand H)   	|
| ------------- | ------------------------------------- |
| MPU			| 300 x 250								|
| Double MPU	| 300 x 600								|
| Portrait		| 300 x 1050 : 600 x 1050				|
| Instream+		| 300 x 250  : 300 x &infin;			|
| Billboard		| 970 x 250  : 970 x &infin;			|

## Modules

Modules can be placed into any ad format to suit the needs of the current project. Below is a breif description of each module, in depth deails can be found further down the page.

| Module       								| Description																						| Requires
| ----------------------------------------- | ------------------------------------------------------------------------------------------------- |------------------------------ | 
| <a href="#amplify">Amplify</a>			| Two full width/height panels that rotate to show multiple peices of content in one ad.			| Autorunner, Helpers, Switcher |
| <a href="#autoRunner">AutoRunner</a>		| Creates a JS Interval fucntion that will run the a callback which is passed to it.				| 								|
| <a href="#brandswitcher">BrandSwitcher</a>| Determine the website the ad is being hosted on.                                                  |                               |
| <a href="#competition">Competition</a>    | Captures data entry from a user input                                                             | Pictela                       |
| <a href="#custom">Custom</a>              | A module to house all custom Javascript, specific to the current ad                               |                               |
| <a href="#doubleclick">Doubleclick</a>	| Initiates and tracks all interaction for ads served using Google Doubleclick.						| 								|
| <a href="#exits">Exits</a>				| Listens for a click on an exit and fires the exit function.										| 								|
| <a href="#expand">Expand</a> 				| Expands and collapses the ad. 																	| 								|
| <a href="#gallery">Gallery</a> 			| Templates and controls the image galleries.														| Autorunner, Helpers, Switcher |
| <a href="#helpers">Helpers</a>			| A collection of small code snippets that don't require their own full module.						| 								|
| <a href="#imagepan">Image Pan</a>         | Zoom and pan an image                                                                             |                               |
| <a href="#instream">Instream</a>			| Controls the expansion of the Instream+ ad.														| Expand 						|
| <a href="#lightbox">Lightbox</a>          | Controls the expansion of the Lightbox  ad.                                                       | Expand, DoubleClick           |
| <a href="#pictela">Pictela</a>            | Initiates and tracks all interaction for ads served using Pictela.                                |                               |
| <a href="#politeload">PoliteLoad</a>      | Loads in image sonly when they are needed                                                         |                               |
| <a href="#switcher">Switcher</a>			| Used to switch between several pieces of content.													| Transitions					|
| <a href="#transitions">Transitions</a>	| Sets the transiton (Amplify, Slide or Swap) of the switcher items.								| 								|
| <a href="#video">Video</a> 				| Controls the playing of any videos in the ad.														| 								|

---

###Amplify

The amplify unit is primarily used in the Double MPU format, however it can be used in any of the formats. The module takes two panels and slides between them either by user initated clicks or automatically using the <a href="#Autorunner">Autorunner</a> functionality. The two frames give the oppertunity for twice as much content in one ad unit. One slide is usually editorial content whilst the second is advertorial content.

__Markup__

```HTML

	<div id="js-panel-1" class="amplify-panel amplify-panel-1">
		<div class="panel-expand">Expand</div>
        <h1>Panel 1</h1>
	</div>

    <div id="js-panel-2" class="amplify-panel amplify-panel-2">
    	<div class="panel-expand">Expand</div>
        <h1>Panel 2</h1>
	</div>
```

__Init__

```Javascript

	var amplify = new Amplify({
        panels: {
            panel1: 'js-panel-1', 	// ID of panel 1
            panel2: 'js-panel-2'	// ID of panel 2
        },
        autoRotateTimer: 0, 		// OPTIONAL - The interval at which you wish to automatically go to the next panel, in ms. 0 turns off auto-rotation.
        autoRotateLoop: 0			// OPTIONAL - The number of times you wish to automatically switch between panels. 0 turns off auto-rotation.
    });
```

---

###AutoRunner

The autorunner is primarily used by other modules to create a simple JS Interval and run a callback function, however you can also use this in your custom JS code.

__Init__

```Javascript

	this.autorunner = new Autorunner(
		goToNextSlide,		// The callback function you wish to run
		1000,				// The interval at which you wish to run the callback function, in ms
		2 					// OPTIONAL - The number of times you wish to run the callback function, if not set it reverts to infinite
	);
	
	// Start the autorunner
	this.autorunner.start();
	
	// Stop the autorunner
	this.autorunner.stop();
```

---

###BrandSwitcher

This module works out which brands website the ad is being served on giving you the option to show site specific content. You must ensure the <a href="#custom">Custom</a> module is initiated **before** the brandSwitcher 

__Init__

```Javascript

    var brandswitcher = new BrandSwitcher({
        brands: {                                                           // Add the list of brands the ad will be served to
            instyle: 'InStyle',
            look: 'LOOK',
            marieclaire: 'Marie Claire',
        },
        callback: function(brandName, brandSlug){custom.setBrand(brandName, brandSlug);}   // Use a callback to send the brand to the Custom JS file so it can be used across the ad
    });
```

---

###Competition

This module captures data entered into a form by the user and store is securley on an extrnal server. This functionality can only done using Pictela, it is not available using DoubleClick.

__Markup__

```HTML

    <form id="form" class="form">

        <div class="form-field">
            <input type="text" name="name" placeholder="Name" id="name" class="required" />
        </div>

        <div class="form-field">
            <input type="checkbox" name="terms" id="terms" class="required" />
        </div>

        <div class="form-field">
            <input type="email" name="email" placeholder="Email" id="email" />
        </div>

        <div class="form-field answers">
            <input type="radio" name="radio" value="a" /> <span>Answer A</span>
            <input type="radio" name="radio" value="b" /> <span>Answer B</span>
            <input type="radio" name="radio" value="c" /> <span>Answer C</span>
        </div>

        <div class="form-field submit">
            <input type="submit" value="SUBMIT" id="submit" />
        </div>

    </form>
```

__Init__

```Javascript

    var competition = new Competition({
        formID: 'form',             // OPTIONAL - The ID of the form.
        radioName: 'radio',         // OPTIONAL - The name of any radio elements, if you choose to use them.
        requiredClass: 'required'   // OPTIONAL - The class given to any input you wish to be a required field.
    });
```

---

###Custom

In order to keep the modular structure as well as keeping the code clean and orgainised, all custom javascriopt code should be writtin in the Custom js module.

__Init__

```Javascript

    var custom = new Custom();
```

---

###Doubleclick

This module contains all of the DoubleClick Studio initialisations and listeners. All tracking for DCS should be kept in this file and this file only.

The enabler script must be called in order to track in DoubleClick

__Markup__

```HTML

	<script src="//s0.2mdn.net/ads/studio/Enabler.js"></script>
```

__Init__

```Javascript

	var doubleclick = new Doubleclick( function(){
        mainSwitcher.sections.content.show();                   // This paramter is the main content section to show after the load screen
        Enabler.setExpandingPixelOffsets(300, 0, 600, 1050);    // OPTIONAL - If the ad is a portrait add this line. The four numbers represent (Offset Left, Offset Top, Expanded Width, Expanded Height)
    });
```

---

###Exits

All exits must be tracked in an ad, the exit module ensures that this is done correctly. Each exit must be marked up in a specific way in order to be tracked.

__Markup__

```HTML

	<div class="btn exit js-exit" data-exit="exitName">EXIT</div>
```

__Init__

```Javascript

	var exits = new Exits({
        exitName: function(){ Enabler.exit('Exit - Exit Name', ""); },	// The data-exit attr must be the same as the name of item
    });
```

---

###Expand

All expanding ad units use the Exapnd module in order to expand and subsequently collapse. Two buttons should be used, one to call the expand functionality and one to call the collapse functionality. If the ad is a Lightbox or a Portrait the ad type must be set, otherwise it can be left blank.

```HTML

	<div class="btn expand js-expand">EXPAND</div>
	<div class="btn collapse js-collapse">COLLAPSE</div>
```

```Javascript

	var expand = new Expand({
		height: 1000, 	    // OPTIONAL - The height of the expanded ad
		width: 1000, 	    // OPTIONAL - The width of the expanded ad
        type: 'lightbox'    // OPTIONAL - The type of ad. Must be set for 'lightbox' and 'portrait'
        animationSpeed: 500 // OPTIONAL - The speed of the expand animation
	});
```

---

###Gallery

The gallery module will create an simple image gallery, with several option available to you.

__Markup__

```HTML
	
	<div id="js-gallery" class="gallery"></div>
```

__Init__

```Javascript

	var gallery = new Gallery({
        gallery: {
            id: 'js-gallery',								// The ID of the gallery element
            images: {										// An array of images with which to populate the gallery
                image0: 'http://placehold.it/280x280',
                image1: 'http://placehold.it/270x270',
                image2: 'http://placehold.it/260x260'
            },
            btnClass: 'gallery-btn',						// OPTIONAL - Class of the navigation buttons
            nextClass: 'gallery-next',						// OPTIONAL - Class of the button to navigate to the next image
            nextImage: '>',									// OPTIONAL - An image or character to use as the next button
            prevClass: 'gallery-prev',						// OPTIONAL - Class of the button to navigate to the previous image
            prevImage: '<',									// OPTIONAL - An image or character to use as the previous button
            autoRotateTimer: 0,								// OPTIONAL - The interval at which you wish to automatically go to the next image, in ms
            autoRotateLoop: 0								// OPTIONAL - The number of times you wish to automatically rotate to the next image
        }
    });
```

---

###Helpers

This module holds small individual functions that do not require their own module. Currently it only holds one function which merges two object together

__Init__

```Javascript

	helpers.mergeObjects(objectA, objectB);		// Two objects as parameters, ObjectA will overide any duplicates in ObjectB  
```

---

###ImagePan

This module allows the user to zoom into an image and pan around the large version

__Markup__

```HTML

    <div class="image-pan js-image-pan"></div>

    <div class="image-pan-thumbs js-image-pan-thumbs cf"></div>     // OPTIONAL - Add this if you wish to switch between multiple images
```

__Init__

```Javascript

    var imagepan = new ImagePan({
        image: [                        // The image(s) you wish to pan. For a single image, remove array and use single string.
            'img/jeans01.jpg',
            'img/jeans02.jpg',
            'img/jeans03.jpg',
            'img/jeans04.jpg'
        ],
        width: 298,                     // OPTIONAL - Width is pixels of the panable image. Default is 300.
        height: 490,                    // OPTIONAL - Height is pixels of the panable image. Default is 300.
        zoom: 200                       // OPTIONAL - Zoom level in percentage. Default zoom is 200.
    });
```

---

###Instream

The instream module is used on mobile to expand an MPU. The expanded ad pushes down the pages content to reveal links to advertorials.

__Markup__

```HTML

	<div class="mpu-content">
		<div class="btn expand js-expand">EXPAND</div>
    </div>

	<div class="instream-content">
		<div class="btn collapse js-collapse">COLLAPSE</div>
	</div>
```

__Init__

```Javascript

	var instream = new Instream({
        height: 500						// The height you wish to expand to
    });
```

---

###Lightbox

The Lightbox module is an extenison of the DoubleClick module that allows for fullscreen expansions. It must be a spereate module and only called when needed, otherwise DoubleClick will think every ad is a lightbox ad.

To use this module, follow the steps in the <a href="#expand">Expand</a> modules, setting the type as lightbox.


__Init__

```Javascript

    var lightbox = new Lightbox();
```

---

###Pictela

This module contains all of the Pictela initialisations and listeners. All tracking for Pictela should be kept in this file and this file only.

The Pictela JS Library must be called in order to track in Pictela

__Markup__

```HTML

    <script src="http://ads.pictela.com/ads/jsapi/ADTECH.js"></script>
```

__Init__

```Javascript

    var pictela = new Pictela( function(){
        mainSwitcher.sections.content.show();   // This paramter is the main content section to show after the load screen
    });
```

---

###PoliteLoad

This module effects all images with the class _js-polite_ that appear as children of the currently loading section. The module takes the data attribute _data-polite_ of the images and sets that value to the source of the image, ensuring only images the user wants to see are loaded.

__Markup__

```HTML

    <img src="" class="js-polite" data-polite="http://www.fillmurray.com/g/200/300" alt="Bill Murray" />

```

__Init__

```Javascript

    var politeload = new PoliteLoad();
```

---

###Switcher

The Switcher modules allows you to define two or more section and switch between them. The first section is shown on load and the rest are hidden.

__Markup__

```HTML

	<section id="loading-section" class="section loading-section" >
            
		// Loading content goes here

    </section>

	<section id="content-section" class="section section--hidden content-section">

		// Main content goes here

	</section>

```

__Init__

```Javascript

	var mainSwitcher = new Switcher({
        duration: 1000,						// The duration of the transition between sections
        transition: 'swap',					// The transition you wish to use; Amplify, Slide or Swap
        sections : {						// An array of sections you wish to swap between
            loading: {	
                id: 'loading-section'		// The ID of the section
            },
            content: {
                id: 'content-section'
            }
        }
    });
```

---

###Transitions

This module is used only by the <a href="#switcher">Switcher</a> module to define it's transitions.

---

###Video

This module shows the poster image for any video, only showing the video when clicked. It also controls the video when exits are clicked or other interactions have taken place.

__Markup__

```HTML

	<div id="video-wrapper-1" class="video-wrapper">

		<img src="img/poster.jpg" alt="" class="poster js-poster">

		<video id="video1" class="video js-video" controls="controls" preload="auto" poster="img/poster.jpg">
			<source src="vid/video.mp4" type='video/mp4' />
            <source src="vid/video.webm" type='video/webm' />
		</video>

	</div>
```

__Init__

```Javascript

	var video = new Video({
        width: 300,						// OPTIONAL - The width of the video
        id: 'video1',					// The ID of the video element
        wrapper: 'video-wrapper-1'		// The ID of the element wrapping the video and poster
    });
```
