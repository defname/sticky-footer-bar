(function( $ ) {
	
	$.fn.stickyfooterbar = function() {

		/* initialize */
		var $footer = this;
		var footer_height = $footer.height();
		var footer_bar_height = 30;
		var body_padding_bottom = parseInt($('body').css('padding-bottom'));
		var footer_offset = $footer.offset().top;

		$footer.css({
			'position': 'fixed',
			'bottom': -footer_height
		});
		$('body').css('padding-bottom', body_padding_bottom+footer_bar_height);

		
		$(window).scroll( function() {
			/* current (scroll-) position from the bottom of the document */
			var scroll_bottom = $(window).scrollTop()+$(window).height();

			if (scroll_bottom-footer_bar_height >= footer_offset) {
				$footer.removeClass('sticky');
				$footer.css({
					'position': '',
					'bottom': ''
				});
				$('body').css('padding-bottom', '');
			}
			else {
				$footer.addClass('sticky');
				$footer.css({
					'position': 'fixed',
					'bottom': -footer_height
				});
				$('body').css('padding-bottom', body_padding_bottom+footer_bar_height);	
			}

		});

	};

}( jQuery ));
