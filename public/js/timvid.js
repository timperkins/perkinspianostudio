(function($) {
	$.fn.timVid = function() {
		var $section = this;
		var $video = this.find('[data-timvid-video]');
		var $poster = this.find('[data-timvid-poster]');
		var $controls = this.find('[data-timvid-controls]');
		var aspectRatio = $poster.height()/$poster.width();

		// Load YouTube API
		var tag = document.createElement('script');
		tag.src = "http://www.youtube.com/iframe_api";
		var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

		var player;
		window.onYouTubeIframeAPIReady = function() {
			player = new YT.Player($video.get(0), {
				events: {
					onReady: onPlayerReady
				},
			});
		};

		function onPlayerReady() {
			initFluidWidth();
			$controls.on('click', onPosterClick);
			$controls.addClass('ready');
		}

		function onPosterClick() {
			$video.fadeIn(200);
			player.playVideo();
			$controls.off('click', onPosterClick);
		}

		function initFluidWidth() {
			$(window).on('resize', debounce(resizeStuff, 200));
			resizeStuff();
		}

		function resizeStuff() {
			var newWidth = $section.width();
			var newHeight = newWidth * aspectRatio;
			$video.width(newWidth).height(newHeight);
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

	$('[data-timvid]').timVid();

})(jQuery);