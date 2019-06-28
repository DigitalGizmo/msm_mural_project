/* timout to attract animation */

$(document).ready(function(){

	// Assign timer to a variable
	var timeoutHandle;
	// Minutes for this page
	var numMinutes = .5;

	function startTheTimer() {
		timeoutHandle = window.setTimeout(function(){
		  window.location.href='/attract/';
		}, (numMinutes * 60 * 1000));
	}

	// Any click should restart timer
	$(document).click(function() {
		// call clearTimeout
		window.clearTimeout(timeoutHandle);
		// then call setTimeout again to reset the timer
		startTheTimer();
	});

	// Start on page load.
	startTheTimer();

}); // end doc ready
