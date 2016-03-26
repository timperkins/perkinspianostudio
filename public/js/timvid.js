(function($) {
	$.fn.timVid = function(opts) {
		opts = $.extend({
			autoplay: false,
			video: '',
			playPauseControl: '',
			playButton: '',
			pauseButton: ''
		}, opts);

		var $parentEl = this;
		var $video = $parentEl.find(opts.video);
		var video = $video[0];
		var $playPauseControl = $parentEl.find(opts.playPauseControl);
		var $playButton = $parentEl.find(opts.playButton);
		var $pauseButton = $parentEl.find(opts.pauseButton);

		if (opts.autoplay) {
			video.play();
		}

		$playPauseControl.on('click', togglePlay.bind(this));
		$video.on('ended', videoEnded.bind(this));

		function togglePlay() {
			if ($playButton.is(':visible')) {
				play();
			} else {
				pause();
			}
		}

		function play() {
			$playButton.hide();
			$pauseButton.show();
			video.play();
			$parentEl.addClass('is-playing');
		}

		function pause() {
			$playButton.show();
			$pauseButton.hide();
			video.pause();
			$parentEl.removeClass('is-playing');
		}

		function videoEnded() {
			pause();
			video.currentTime = 0;
		}
	};
})(jQuery);