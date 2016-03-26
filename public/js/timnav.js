(function($) {
	$.fn.timNav = function(opts) {
		opts = $.extend({
			combos: {},
			activeClass: 'active',
			offset: 0
		}, opts);

		var $el = this;
		var activeSection, activeLink;

		opts.combos.forEach(function(combo) {
			combo.link.on('click', function(e) {
				e.preventDefault();
				$('html, body').animate({
					scrollTop: combo.section.offset().top - opts.offset
				}, 500);
				activate(combo.link);
				// if (activeLink) {
				// 	activeLink.removeClass(opts.activeClass);

				// }
			});
		});

		$(window).on('scroll', debounce(onScroll, 20));
		onScroll();

		function onScroll() {
			var scrollHeight = $(window).scrollTop() + opts.offset;
			var closestSectionTop = 0;
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
			// if (!closestLink) {
			// 	if (activeLink) {
			// 		activeLink.removeClass(opts.activeClass);
			// 		activeLink = null;
			// 	}
			// 	return;
			// }
			// if (!closestLink.is(activeLink)) {
			// 	if (activeLink) {
			// 		activeLink.removeClass(opts.activeClass);
			// 	}
			// 	activeLink = closestLink;
			// 	activeLink.addClass(opts.activeClass);
			// }
			// if (!closestSection.is(activeSection)) {
			// 	activeSection = closestSection;
			// }
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