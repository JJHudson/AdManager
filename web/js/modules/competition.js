define(['helpers'], function (Helpers) {

	function Competition(options) {

		this.settings = {
			formID: 'form',
			radioName: 'radio',
			requiredClass: 'required'

		};

		Helpers.mergeObjects(this.settings, options);

		thisComp = this;

		$('#'+this.settings.formID).on('submit', function(event) {

			if( thisComp.checkForm() ){
				var data = {"name": $('#name').val(), "emailAddress": $('#email').val(), "answer": $('input[name=answer]:checked').val()};
				ADTECH.captureData(data, '');
			}

			return false;

		});

	}

	Competition.prototype.checkForm = function() {

		var valid = true;

		$('input[type=text], textarea').each(function(){

			if( $(this).val().length === 0 && $(this).hasClass(thisComp.settings.requiredClass) ) {
				valid = false;
				return false;
			}

		});

		$('input[type=email]').each(function(){

			var validEmail = thisComp.validEmail($(this).val());

			if( ( $(this).val().length === 0 || validEmail === false ) && $(this).hasClass(thisComp.settings.requiredClass) ) {
				valid = false;
				return false;
			}

		});

		$('input[type=checkbox]').each(function(){

			if( !$(this).prop('checked') && $(this).hasClass(thisComp.settings.requiredClass) ){
				valid = false;
				return false;
			}

		});

		if( $('input[name='+thisComp.settings.radioName+']:checked').val() === undefined ) {
			valid = false;
			return false;
		}


		return valid;

	};

	Competition.prototype.validEmail = function(val) {

		var filter = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;

		return String(val).search (filter) != -1;

	};


	return Competition;

});