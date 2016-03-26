$(function() {
	$('body').timNav({
		combos: [{
				link: $('.about-link'),
				section: $('.quote-section'),
			}, {
				link: $('.gallery-link'),
				section: $('.gallery-section')
			}],
		offset: $('.header').height()
	});

	$('.gallery-section').timVid({
		video: '.gallery-video',
		playPauseControl: '.video-controls',
		playButton: '.play-button',
		pauseButton: '.pause-button'
	});
});