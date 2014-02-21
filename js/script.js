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
	});

	
	/* Func: ActivateMenus
	 * Desc: Get the menus going
	 * Args: none
	 */
	function activateMenus() {
		$('#search-menu').delegate('.menu-button', 'click', function (e) {
			e.stopPropagation();
			e.preventDefault();
			$('body').toggleClass('sideNav');
		});

		$('nav li:has(.mega, .sub) > a').click(function (e) {
			e.preventDefault();

			var li = $(this).parent();

			// Only close menu if user clicked to open it
			if (li.hasClass('hover') && clickOpened) {
				li.removeClass('hover');
			}
			else {
				li.addClass('hover');
				$('nav li').not(li).removeClass('hover');
				clickOpened = true;
			}
			return false;
		});

		$('nav li:has(.mega, .sub)').click(function (e) {
			e.stopPropagation();
		});

		/* Positions menu divs */
		$('nav li .sub').each(function () {
			var mega = $(this);
			var left = mega.parent().position().left;
			if (left > mega.parent().parent().outerWidth() - mega.outerWidth()) {
				mega.css('right', 0);
			}
		});

		//Listener for if screen is resized to close sideNav
		$(window).resize(function (){
			fixNavForDrupalAdmin();	
		
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
			$(".hover").removeClass("hover");
		}); 
		
		$("#content").click(function(){
			$("body").removeClass("sideNav");
		});
		
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