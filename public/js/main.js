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
				link: $('.contact-link'),
				section: $('.contact-section')
			}],
		offset: $('.header').height(),
		navLink: $('.nav-link'),
		nav: $('.nav')
	});

	$('.gallery-section').timVid({
		video: '.gallery-video',
		playPauseControl: '.video-controls',
		playButton: '.play-button',
		pauseButton: '.pause-button'
	});

	$('.audio-player').timAud();

	$('.main-section').timLoad();

	// Set the main-section height to the window height
	// so that the page isn't choppy on ios when the search bar
	// is hidden
	$('.main-section').height($(window).height());
});