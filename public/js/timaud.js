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
			var elOpts = $.extend({
				title: $el.data('title') || '',
				src: $el.data('src') || ''
			}, opts);

			$el.addClass('tim-aud');
			var $playButton = $('<i class="fa fa-play tim-aud-play-button"></i>').appendTo($el);
			var $pauseButton = $('<i class="fa fa-pause tim-aud-pause-button"></i>').appendTo($el);

			var $title = $('<p class="tim-aud-song-title">' + elOpts.title + '</p>').appendTo($el);
			var $sliderWrap = $('<div class="tim-aud-slider-wrap"></div>').appendTo($title);
			var $slider = $('<div class="tim-aud-slider"></div>').appendTo($sliderWrap);
			var $sliderBar = $('<div class="tim-aud-slider-bar"></div>').appendTo($slider);
			var $sliderHandle = $('<div class="tim-aud-slider-handle"></div>').appendTo($sliderBar);
			var $timeRemaining = $('<p class="tim-aud-time-remaining"></p>').appendTo($slider);

			var $audio = $('<audio src="' + elOpts.src + '" preload="none"></audio>').appendTo($el);
			var audio = $audio[0];

			$playButton.on('click', play);
			$pauseButton.on('click', pause);
			$sliderHandle.on('mousedown', startHandleMove);
			$sliderBar.on('mousedown', moveHandle);
			$audio.on('ended', onEnded);
			var handleIsMoving = false;
			var interval;

			function play() {
				changeState(PLAY_STATE);
				interval = setInterval(updateTime, 50);
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

			function onEnded(e) {
				changeState(INITIAL_STATE);
				clearInterval(interval);
				_pauseCurrentAudio = function(){};
				audio.currentTime = 0;
			}

			function updateTime() {
				var pos = Math.min(99, (100 * audio.currentTime / audio.duration).toFixed(1));
				if (updateTime.pos !== pos && !handleIsMoving) {
					updateTime.pos = pos;
					$sliderHandle.css('left', pos + '%');
				}

				var timeRemaining = formatTime(audio.duration - audio.currentTime);
				if (updateTime.timeRemaining != timeRemaining) {
					updateTime.timeRemaining = timeRemaining;
					$timeRemaining.text(timeRemaining);
				}
				updateBufferIndicators();
			}

			function startHandleMove(e) {
				e.stopPropagation();
				handleIsMoving = true;
				$(window).on('mousemove', handleMove);
				$(window).on('mouseup', stopHandleMove);
			}

			function handleMove(e) {
				var xPos = e.pageX - $sliderBar.offset().left;
				xPos = Math.max(0, xPos);
				xPos = Math.min($sliderBar.width()-10, xPos);
				$sliderHandle.css('left', (xPos - 5) + 'px');
			}

			function stopHandleMove(e) {
				var pos = parseInt($sliderHandle.css('left')) / $sliderBar.width();
				handleIsMoving = false;
				$(window).off('mousemove', handleMove);
				$(window).off('mouseup', stopHandleMove);
				audio.currentTime = parseInt(audio.duration * pos);
			}

			function moveHandle(e) {
				handleMove(e);
				stopHandleMove(e);
			}

			var bufferIndicators = [];
			function updateBufferIndicators() {
				for (var i=bufferIndicators.length; i<audio.buffered.length; i++) {
					// Create new buffer indicators
					var $b = $('<div class="tim-aud-buffer-indicator"></div>').appendTo($sliderBar);
					bufferIndicators.push($b);
				}
				bufferIndicators.length = audio.buffered.length;
				for (var i=0; i<audio.buffered.length; i++) {
					var start = 100 * audio.buffered.start(i) / audio.duration;
					var end = Math.min(100, 100 * audio.buffered.end(i) / audio.duration);
					bufferIndicators[i].css({
						left: start + '%',
						width: (end - start) + '%'
					});
				}
			}

			function changeState(toState) {
				$el.removeClass(stateClasses.join(' '));
				$el.addClass(toState);

				if (toState == PLAY_STATE) {
					$sliderWrap.stop(true, true).fadeIn(500);
				} else {
					$sliderWrap.stop(true, true).fadeOut(500);
				}
			}
			changeState(INITIAL_STATE);
		}

		function formatTime(sec) {
			var hours = parseInt(sec/3600) || 0;
			var minutes = parseInt(sec/60) || 0;
			var seconds = parseInt(sec%60) || 0;
			var time = [minutes, seconds];
			if (hours) {
				time.unshift(hours);
			}
			if (hours === 0 && minutes === 0 && seconds === 0) {
				return '';
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