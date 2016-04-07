(function($) {
	var EMAIL = 'tjp503@gmail.com';
	$.fn.timForm = function(opts) {
		this.each(function() {
			initialize($(this));
		});

		function initialize($el) {
			opts = opts || {};
			opts = $.extend({}, opts);

			$el.on('submit', onSubmit);
		
			function onSubmit(e) {
				e.preventDefault();
				$.ajax({
					url: 'https://formspree.io/' + EMAIL,
					method: 'POST',
					data: $el.serialize(),
					dataType: 'json',
					success: function() {
						clearForm();
						showSuccessMessage();
					}
				});
			}

			function clearForm() {
				$el.find('input:not([type="submit"], [type="hidden"]), textarea').val('');
			}

			function showSuccessMessage() {
				$el.find('[type="submit"]').hide();
				$el.find('[data-timform-success]').show();
			}
		}
	};

	$(function() {
		$('[data-timform]').timForm();
	});
})(jQuery);