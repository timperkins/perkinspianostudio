(function($) {
	$.fn.timLoad = function(opts) {
		this.each(function() {
			initialize($(this));
		});
		function initialize($el) {
			opts = opts || {};
			opts = $.extend({}, opts);

			var $overlay = $('<div class="tim-load-overlay"></div>').appendTo($el);
			var $spinner = $('<i class="fa fa-circle-o-notch fa-spin tim-load-spinner"></i>').appendTo($overlay).fadeIn(1000);

			var src = $el.css('background-image')
				.replace('url("', '')
				.replace('")', '');
			$('<img/>').attr('src', src).on('load', function() {
				$(this).remove();
				$overlay.fadeOut(200);
			});
		}
	};
})(jQuery);