# sticky-footer-bar

## What it does

This little [jQuery](http://jquery.com/)-plugin displays the footer of a website fixed on
the bottom of the screen. When you scroll down to its actual position the footer is  put back
in the context, so it scrolls together with the rest.

Have a look the [project website](http://defname.github.io/sticky-footer-bar/) which is also
a example page to understand what I mean.

## How to use

Add

	<script type="text/javascript" src="jquery-1.11.0.js"></script>
	<script type="text/javascript" src="jquery.stickyfooterbar.js"></script>

to the header of your document and run the plugin with

	$('#yourfooter').stickyfooterbar();

The function takes two optional parameter

1. a number, string or jQuery-object, that defines the height of the footer bar which will
   be displayed 
2. a CSS class (given as string) that is added to the footer, if it is in "sticky"-mode
   (default: 'sticky')
