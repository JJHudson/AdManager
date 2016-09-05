define(function () {

	function PoliteLoad() {

		$('body').on('showing', function(e, section) {

			$(section).children('.js-polite').each(function(){

				var src = $(this).attr('data-polite');
				$(this).attr('src',src);

			});

		});

	}

	return PoliteLoad;

});