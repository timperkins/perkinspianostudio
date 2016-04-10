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
			$('<img/>')
				.attr('src', src)
				.on('load', function() {
					alert(1);
					show($(this));
				}).each(function() {
					alert(3);
					if ($(this).isLoaded()) {
						alert(2);
						show($(this));
					}
				});
			function show($img) {
				$img.remove();
				$overlay.fadeOut(200);
			}
		}
	};
	$.fn.isLoaded = function() {
		var img = this.get(0);
		if (!img.complete) {
			return false;
		}
		if (typeof img.naturalWidth !== "undefined" && img.naturalWidth === 0) {
			return false;
		}
		return true;
	}
})(jQuery);