/*! 

* @fileOverview Script.js
* @version 2.0
* 
* @author BYU Web Community
* @see https://github.com/byuweb/
* @see https://github.com/byuweb/byu-responsive-dev/
* @see https://github.com/byuweb/byu-responsive-dev/blob/gh-pages/src/js/script.js
*/


var byu_template = (function ($) {

   "use strict";
   
	var clickOpened = false;
   	
	// Load scripts
	Modernizr.load([
		
		// Next, load scripts that require jQuery. If touch is enabled, load alternate script file with touch support added.
		{
			test: Modernizr.touch,
			yep:  "sites/all/themes/byu/js/script-touch.min.js"
		},
	]);


	// Document ready - Execute on page load
	$( function () {

		// Execute menu activation and search load only after window width exceeds 250px
		executeAfterBreakpoint( [ activateMenus, loadSearch ], 256);
		fixNavForDrupalAdmin();
		checkScroll();

		$(window).scroll( $.throttle(100, checkScroll) );

	});

	


	/* Func: checkScroll
	 * Desc: Check to see where we are in the scrolling
	 * Args: none
	 */
	function checkScroll() {
		var top = $(window).scrollTop();
		var topClass = 'atTop';
		var hasTopClass = $('body').hasClass( topClass );
		var downScrollThreshold = 45;
		var upScrollThreshold = 25;

		if ( top > downScrollThreshold ) {
			$('body').removeClass( topClass );
		} else if ( !hasTopClass && top < upScrollThreshold ) {
			$('body').addClass( topClass );
		}
	}





	/* Func: ActivateMenus
	 * Desc: Get the menus going
	 * Args: none
	 */
	function activateMenus() {

		$('#search-menu').on( 'click', '.menu-button', function (e) {
			e.stopPropagation();
			e.preventDefault();
			$('body').toggleClass('sideNav');
		});

		$('nav li:has(.mega, .sub) > a').on('click', function (e) {
			e.preventDefault();

			var hoverClass = 'hover';
			var li = $(e.target).closest('li');
			var open = li.hasClass( hoverClass );

			// Only close menu if user clicked to open it
			if ( open && clickOpened ) {

				li.removeClass( hoverClass );
				redrawElement( li );
			}
			else {
				$('#primary-nav li.' + hoverClass ).not(li).removeClass('hover').each(function(){
					redrawElement( $(this) );
				});
				li.addClass( hoverClass );
				clickOpened = true;
			}
		});

		$('nav li:has(.mega, .sub)').on('click', function (e) {
			e.stopPropagation();
		});

		//Listener for if screen is resized
		$(window).resize(function (){
			$.throttle(250, fixNavForDrupalAdmin);
			
			// Control side nav vs top nav
			if ($(window).width() > '37.5em'){
				$('body').removeClass('sideNav');
			} else if ($(window).width() < "60em" && $(".hover")[0]){
				$("body").addClass("sideNav");
			}

		});
		
		$(".toolbar-toggle-processed").click(function() {
			fixNavForDrupalAdmin();
		});
		

		$("body").click(function(){
			$(".hover").removeClass("hover").each(function(){
				redrawElement( $(this) );
			});
		}); 
		
		$("#content").click(function(){
			$("body").removeClass("sideNav");
		});
		
	}


	/**
	* Redraw Element
	* Forces a redraw of a DOM element
	*/
	function redrawElement(element) {
		var el = element.get(0);

		el.style.display='none';
		el.offsetHeight; // no need to store this anywhere, the reference is enough
		el.style.display='block';
	}
	
	/**
	* Reposition Menu
	* Repositions the the navigation menu and search bar to accommodate the position on the Drupal toolbar
	*/
	function fixNavForDrupalAdmin(){
		if ($('#toolbar').length){
			var toolbarHeight = $('#toolbar').height();
                $("body").css('padding-top', toolbarHeight );
		}
		setNavTop();
	}



	/* Func: setNavTop
	 * Desc: Set the top of the fixed nav to the right position
	 * Args: none
	 */
	function setNavTop() {
		var contentTop = $('#content').offset().top;
		var header = $('#main-header');
		var headerTop = header.css('top');


		if( contentTop != headerTop ) {
			header.css('top', contentTop);
		}

	}


	
	/* Func: loadSearch
	 * Desc: Load the Google Custom Search
	 * Args: none
	 */
	function loadSearch(){

		// Check for settings, set default if absent
		if ( typeof window.pageSettings == 'undefined') {
			window.pageSettings = {};
		}
		if ( typeof window.pageSettings.gcse_search == 'undefined' || typeof window.pageSettings.gcse_search_id == 'undefined' ) {
			window.pageSettings.gcse_search = false;
		}


		// Run the GCSE search script if set to do so
		if ( window.pageSettings.gcse_search === true ) {

			window.__gcse = {
				callback: function() {
						if (document.readyState == 'complete') {
						// CSE has successfully loaded. Go ahead and hide the basic search.
							$("#basic-search").hide();
						}
					}
			};

			(function() {
				var cx = window.pageSettings.gcse_search_id; // Insert your own Custom Search engine ID here
				var gcse = document.createElement('script'); gcse.type = 'text/javascript'; gcse.async = true;
				gcse.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//www.google.com/cse/cse.js?cx=' + cx;
				var s = document.getElementsByTagName('script')[0];
				s.parentNode.insertBefore(gcse, s);
			})();

		}

	}
	
	/*!
	Func: ExecuteAfterBreakpoint
	Desc: Execute a function once (and only once) after a pixel width has been reached
	Auth: Nate Walton (BYU Web Community Project) */
	window.executeAfterBreakpoint=function(functionObject,breakpoint){"use strict";function checkBreakpoint(){!functionsExecuted&&$(window).width()>breakpoint&&(executeFunctions(),$(window).off("resize",checkBreakpoint))}function executeFunctions(){var len=functions.length;functionsExecuted=!0;for(var x=0;len>x;x++)functions[x]()}var functionsExecuted=!1,functions=functionObject;return"function"==typeof functionObject&&(functions=[functionObject]),!functions instanceof Array?(console.log("ExecuteAfterBreakpoint error: functionObj must be a function or an array of functions"),console.log("Syntax: executeAfterBreakpoint(functionObj, breakpoint)"),console.log("Your argument: "+functionObject),void 0):"number"!=typeof breakpoint?(console.log("ExecuteAfterBreakpoint error: breakpoint must be a number"),console.log("Syntax: executeAfterBreakpoint(functionObj, breakpoint)"),console.log("Your argument: "+breakpoint),void 0):(!functionsExecuted&&$(window).width()>breakpoint?executeFunctions():$(window).resize(checkBreakpoint),void 0)}

	}(jQuery));


/*!
 * jQuery throttle / debounce - v1.1 - 3/7/2010
 * http://benalman.com/projects/jquery-throttle-debounce-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function(b,c){var $=b.jQuery||b.Cowboy||(b.Cowboy={}),a;$.throttle=a=function(e,f,j,i){var h,d=0;if(typeof f!=="boolean"){i=j;j=f;f=c}function g(){var o=this,m=+new Date()-d,n=arguments;function l(){d=+new Date();j.apply(o,n)}function k(){h=c}if(i&&!h){l()}h&&clearTimeout(h);if(i===c&&m>e){l()}else{if(f!==true){h=setTimeout(i?k:l,i===c?e-m:e)}}}if($.guid){g.guid=j.guid=j.guid||$.guid++}return g};$.debounce=function(d,e,f){return f===c?a(d,e,false):a(d,f,e!==false)}})(this);