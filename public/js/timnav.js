(function($) {
	$.fn.timNav = function(opts) {
		opts = $.extend({
			combos: {},
			activeClass: 'active',
			offset: 0,
			navLink: null,
			nav: null
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

		opts.navLink.on('click', function(e) {
			e.preventDefault();
			e.stopPropagation();
			opts.nav.slideToggle(500, function() {
				if (opts.nav.is(':hidden')) {
					opts.nav.removeAttr('style');
				}
			});
		});

		$(window).on('click', function(e) {
			if (opts.nav.is(':visible') && opts.navLink.is(':visible')) {
				opts.nav.slideToggle(500, function() {
					if (opts.nav.is(':hidden')) {
						opts.nav.removeAttr('style');
					}
				});
			}
		});

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
				if (!timeoutId) {
					timeoutId = setTimeout(function() {
						fn.call(fn, e);
						timeoutId = null;
					}, delay);
				}
			};
		}
	};
})(jQuery);