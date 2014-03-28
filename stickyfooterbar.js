(function( $ ) {
	
	var defFooterBarHeight = 50;
	var stickyClass = 'sticky';
	
	$.fn.stickyfooterbar = function(heightOrObj) {
		
		/* initialize */
		var $footer = $(this);
		var footerHeight = $footer.outerHeight();
		var bodyPaddingBottom = parseInt($('body').css('padding-bottom'));
		var footerOffset = $footer.offset().top;
		debug("footer height: "+footerHeight);
		debug("body padding-bottom: "+bodyPaddingBottom);


		/* check param */
		var footerBarHeight = $footer.outerHeight();
		var paramType = typeof heightOrObj;
		debug("type of parameter: '" + paramType + "'");
		
		switch (paramType) {
			case 'number' :
				footerBarHeight = heightOrObj;
				break;
			case 'string' :
				var $obj = $(heightOrObj);
				if ($obj.length > 0) {
					footerBarHeight = $obj.outerHeight(true);
				}
				break;
			case 'object' :
				if (heightOrObj instanceof jQuery && heightOrObj.length > 0) {
					footerBarHeight = heightOrObj.outerHeight();
				}
				break;
		}

		debug ("footerBarHeight: " + footerBarHeight);
		
		
		makeItSticky();

		
		$(window).scroll( function() {
			var scrollBottom = $(window).scrollTop()+$(window).height();

			if (scrollBottom-footerBarHeight >= footerOffset) {
				makeItFloaty();
			}
			else {
				makeItSticky();
			}

		});

		function makeItSticky() {
			$footer.addClass(stickyClass);
			$footer.css({
				'position': 'fixed',
				'bottom': -footerHeight+footerBarHeight
			});
			$('body').css('padding-bottom', bodyPaddingBottom+footerBarHeight);
		}

		function makeItFloaty() {
			$footer.removeClass(stickyClass);
			$footer.css({
				'position': '',
				'bottom': ''
			});
			$('body').css('padding-bottom', bodyPaddingBottom);
		}

	};

}( jQuery ));

function debug(msg) {
	console.log('stickyfooterbar: ' + msg);
}
