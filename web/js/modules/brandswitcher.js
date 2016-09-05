
define(function () {

	function BrandSwitcher(options) {

		window.addEventListener('message', this.setBrand.bind(this));

		this.callback = options.callback;
		this.brands = options.brands;
		this.requestBrandSite();
	}

	BrandSwitcher.prototype.getBrandNameFromURL = function(url) {
		var matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
		var domain = matches && matches[1];

		if (domain) {
			domain = domain.replace('.co.uk', '').replace('.com', '').split('.');
			domain = domain[domain.length - 1];
		}

		return domain;
	};

	BrandSwitcher.prototype.getRandomBrand = function() {
		var index = Math.floor(Math.random() * Object.keys(this.brands).length);
		var brandSlug = Object.keys(this.brands)[index];
		
		return brandSlug;
	};

	BrandSwitcher.prototype.requestBrandSite = function() {
		var dartID = Enabler.getDartAssetId();

		if(dartID !== null){
			var adId =  dartID + '.if';
			Enabler.invokeExternalJsFunction('document.getElementById("' + adId + '").contentWindow.postMessage("timeBrandSite", "*")');
		}else{
			var message = {data: 'timeBrandSite', origin: 'http://www.timeincuk.com'};
			this.setBrand(message);
		}
	};

	BrandSwitcher.prototype.setBrand = function(message) {

		if (message.data == 'timeBrandSite') {
			var brandName;
			var brandSlug = this.getBrandNameFromURL(message.origin);

			for (var property in this.brands) {
				if (this.brands.hasOwnProperty(property)) {
					if (property == brandSlug) {
						brandSlug = property;
						brandName = this.brands[property];
					}
				}
			}

			// If we don't have a brand name at this points, it means we're outside of our brand sites. We'll choose a random brand in that case.
			if (!brandName) {
				brandSlug = this.getRandomBrand();
				brandName = this.brands[brandSlug];
			}

			this.brandName = brandName;
			this.brandSlug = brandSlug;

			this.callback(brandName, brandSlug);
		}
	};

	return BrandSwitcher;

});