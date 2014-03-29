/*
Copyright © 2014 Bodo Akdeniz <cypher_ab@gmx.de>
This work is free. You can redistribute it and/or modify it under the
terms of the Do What The Fuck You Want To Public License, Version 2,
as published by Sam Hocevar. See http://www.wtfpl.net/ for more details.
*/

/* This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://www.wtfpl.net/ for more details.
 */

(function( $ ) {
	
	var stickyClass = 'sticky';
	var _debug = false;

	/**
	 * Function: stickyfooterbar
	 * 
	 * Use it on a container at the bottom of your document to make it "sticky".
	 *
	 * Parameters:
	 *
	 *    heightOrObj - If this is a number it is used as height for the fixed
	 *                  footer bar. If it's a jQuery-selector-string or a jQuery-object
	 *                  the height of the object is used (calculated by $obj.outerHeight())
	 *                  Default: height of the object stickyfooterbar is used on
	 *    classname   - A css class which is add to the object this function is used on,
	 *                  if it is made sticky.
	 *                  Deault: 'sticky'
	 *
	 * Issues:
	 *    In CSS margins are 'collapsing'. That's why the height of the footer may
	 *    not be calculated correctly. A solution is to add a border to affected elements
	 *    or use padding instead of margin to format the footer.
	 */

	$.fn.stickyfooterbar = function(heightOrObj, classname) {
		
		/* initialize */
		var $footer = $(this);
		var footerHeight = $footer.outerHeight(); /* collapsing margins may cause problems */
		var footerOffset = $footer.offset().top;

		debug("footer height: "+footerHeight);

		/* check param */
		var footerBarHeight = $footer.outerHeight(); /* default value */
		var paramType = typeof heightOrObj;
		debug("type of parameter: '" + paramType + "'");
		
		switch (paramType) {
			case 'number' : /* use the given number as height */
				footerBarHeight = heightOrObj;
				break;
			case 'string' : /* use the height of the jQuery object given by the jQuery selector string */
				var $obj = $(heightOrObj);
				if ($obj.length > 0) {
					footerBarHeight = $obj.outerHeight(true);
				}
				break;
			case 'object' : /* use the height of the given jQuery object */
				if (heightOrObj instanceof jQuery && heightOrObj.length > 0) {
					footerBarHeight = heightOrObj.outerHeight(true);
				}
				break;
		}

		if (typeof classname == 'string') {
			stickyClass = classname;
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

		/* reconfigure on resize */
		$(window).resize( function() {
			if ($footer.hasClass(stickyClass)) { /* if footer is sticky */
				makeItFloaty(); /* make it floaty, because if the position is fixed the offset is wrong */
				footerOffset = $footer.offset().top;
				makeItSticky();
			}
			else {
				footerOffset = $footer.offset().top;
			}
		});

		function makeItSticky() {
			if (footerOffset-footerBarHeight < $(window).height()) { /* do nothing if window is too small */
				return;
			}
			if ($(window).height()/2 < footerBarHeight) { /* do nothing if window is too small TODO: improve this */
				return;
			}
			if ($footer.hasClass(stickyClass)) { /* do nothing if footer is already sticky */
				return;
			}
			$footer.addClass(stickyClass);
			$footer.css({
				'position': 'fixed',
				'bottom': -footerHeight+footerBarHeight
			});
			$footer.after('<div id="stickyfooterbarplaceholder">&nbsp;</div>');
			$('#stickyfooterbarplaceholder').height(footerHeight);
		}

		function makeItFloaty() {
			if (!$footer.hasClass(stickyClass)) { /* do nothing if footer is already floaty */
				return;
			}
			$footer.removeClass(stickyClass);
			$footer.css({
				'position': '',
				'bottom': ''
			});
			$('#stickyfooterbarplaceholder').remove();
		}

	};

	function debug(msg) {
		if (_debug) {
			console.log('stickyfooterbar: ' + msg);
		}
	}

}( jQuery ));
