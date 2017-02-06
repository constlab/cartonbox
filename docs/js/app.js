(function($) {
	'use strict';

	// Settings
	var options = {
		onStartBefore: function() {
			$('body').addClass('cartonbox-zoom-start');
			$('.cartonbox-body').addClass('cartonbox-go');
		},
		onShowNow: function() {
			$('body').addClass('cartonbox-zoom-finish');
		},
		onShowAfter: function() {
			$('body').removeClass('cartonbox-zoom-start cartonbox-zoom-finish');
		},
		onClosedBefore: function() {
			$('body').addClass('cartonbox-up');
			$('.cartonbox-body').removeClass('cartonbox-go');
		},
		onClosedAfter: function() {
			$('body').removeClass('cartonbox-up');
		}
	}

	// Initialization
	$.cartonbox(options);
})(jQuery);
