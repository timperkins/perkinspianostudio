$(function() {
	$('body').timNav({
		combos: [{
				link: $('.logo-link'),
				section: $('.main-section'),
			}, {
				link: $('.about-link'),
				section: $('.quote-section'),
			}, {
				link: $('.gallery-link'),
				section: $('.gallery-section')
			}, {
				link: $('.studio-link'),
				section: $('.details-section')
			}, {
				link: $('.adult-lessons-link'),
				section: $('.adult-lessons-section')
			}, {
				link: $('.contact-link'),
				section: $('.contact-section')
			}],
		offset: $('.header').height(),
		navLink: $('.nav-link'),
		nav: $('.nav')
	});

	$('.audio-player').timAud();

	$('.main-section').timLoad();

	// Set the main-section height to the window height
	// so that the page isn't choppy on ios when the search bar
	// is hidden
	$('.main-section').height($(window).height());
});