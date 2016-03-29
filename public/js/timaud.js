(function($) {
	$.fn.timAud = function(opts) {
		var INITIAL_STATE = 'state-initial';
		var PLAY_STATE = 'state-play';
		var PAUSE_STATE = 'state-pause';
		var stateClasses = [INITIAL_STATE, PLAY_STATE, PAUSE_STATE];
		var _pauseCurrentAudio;
		var pauseCurrentAudio = function() {
			if (_pauseCurrentAudio) {
				_pauseCurrentAudio();
			}
		};

		this.each(function() {
			initialize($(this));
		});

		function initialize($el) {
			opts = opts || {};
			opts = $.extend({
				title: $el.data('title') || '',
				src: $el.data('src') || ''
			}, opts);

			$el.addClass('tim-aud');
			var $playButton = $('<i class="fa fa-play tim-aud-play-button"></i>').appendTo($el);
			var $pauseButton = $('<i class="fa fa-pause tim-aud-pause-button"></i>').appendTo($el);

			var $title = $('<p class="tim-aud-song-title">' + opts.title + '</p>').appendTo($el);
			var $sliderWrap = $('<div class="tim-aud-slider-wrap"></div>').appendTo($title);
			var $slider = $('<div class="tim-aud-slider"></div>').appendTo($sliderWrap);
			var $sliderBar = $('<div class="tim-aud-slider-bar"></div>').appendTo($slider);
			var $timeRemaining = $('<p class="tim-aud-time-remaining"></p>').appendTo($slider);

			var $audio = $('<audio src="' + opts.src + '"></audio>').appendTo($el);
			var audio = $audio[0];

			$playButton.on('click', play);
			$pauseButton.on('click', pause);
			var interval;

			function play() {
				changeState(PLAY_STATE);
				interval = setInterval(updateTime, 1000);
				updateTime();
				audio.play();

				pauseCurrentAudio();
				_pauseCurrentAudio = pause;
			}

			function pause() {
				changeState(PAUSE_STATE);
				clearInterval(interval);
				audio.pause();
				_pauseCurrentAudio = function(){};
			}

			function updateTime() {
				$timeRemaining.text(formatTime(audio.duration - audio.currentTime));
			}

			function changeState(toState) {
				$el.removeClass(stateClasses.join(' '));
				$el.addClass(toState);

				if (toState == PLAY_STATE) {
					$sliderWrap.stop(true, true).fadeIn();
				} else {
					$sliderWrap.stop(true, true).fadeOut();
				}
			}
			changeState(INITIAL_STATE);
		}

		function formatTime(sec) {
			var hours = parseInt(sec/3600);
			var minutes = parseInt(sec/60);
			var seconds = parseInt(sec%60);
			var time = [minutes, seconds];
			if (hours) {
				time.unshift(hours);
			}
			time = time.map(function(o) {
				o = o.toString();
				if (o.length === 1) {
					o = '0' + o;
				}
				return o;
			});
			return time.join(':');
		}
	};
})(jQuery);