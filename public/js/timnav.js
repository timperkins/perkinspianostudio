(function($) {
	$.fn.timNav = function(opts) {
		opts = $.extend({
			combos: {},
			activeClass: 'active',
			offset: 0
		}, opts);

		var $el = this;
		var animationInProgress = false;
		var activeLink;

		opts.combos.forEach(function(combo) {
			combo.link.on('click', function(e) {
				e.preventDefault();
				if (animationInProgress) { return; }
				animationInProgress = true;
				$('html, body').animate({
					scrollTop: combo.section.offset().top - opts.offset
				}, {
					duration: 500,
					complete: function() {
						animationInProgress = false;
					}
				});
				activate(combo.link);
			});
		});

		$(window).on('scroll', debounce(onScroll, 20));
		onScroll();

		function onScroll() {
			if (animationInProgress) { return; }
			var scrollHeight = $(window).scrollTop() + opts.offset;
			var closestSectionTop = -1;
			var closestLink, closestSection;
			opts.combos.forEach(function(o) {
				var sectionTop = o.section.offset().top;
				if (sectionTop <= scrollHeight && sectionTop > closestSectionTop) {
					closestSectionTop = sectionTop;
					closestSection = o.section;
					closestLink = o.link;
				}
			});
			activate(closestLink);
		}

		function activate(link) {
			// Do nothing if the link is already active
			if (link && link.is(activeLink)) { return; }

			if (activeLink) {
				activeLink.removeClass(opts.activeClass);
			}

			activeLink = link;

			if (activeLink) {
				activeLink.addClass(opts.activeClass);
			}
		}

		function debounce(fn, delay) {
			var timeoutId;
			return function(e) {
				if (timeoutId) {
					clearTimeout(timeoutId);
				}
				timeoutId = setTimeout(function() {
					fn.call(fn, e);
					timeoutId = null;
				}, delay);
			};
		}
	};
})(jQuery);