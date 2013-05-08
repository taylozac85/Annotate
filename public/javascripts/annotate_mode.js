var masterBtn = document.querySelector("#master-btn");

masterBtn.onclick = function(){

	// declare variables
	var allElements = document.getElementsByTagName("*");
	var fullScreen = document.documentElement;

	// add borders to all elements
	(function(){
		for (var i=0; i < allElements.length; i++) {
			// exclude the html element
			if (allElements[i] != document.documentElement) {
				allElements[i].classList.toggle("highlighted");
			}
		};
	}).call(this);

	// toggle the id of the button to indicate annotate mode
	(function(){
		if (masterBtn.id == "master-btn") {
			masterBtn.setAttribute("id", "master-btn-on");
		} else {
			masterBtn.setAttribute("id", "master-btn");
		}
	}).call(this);

	// Add a transparent layer
	// fullScreen.classList.toggle("screen-layer");
		
	// Add a star with the coordinates assigned to where the user clicked
	// http://www.w3.org/TR/WD-positioning-19970819#by-example
	// TO DO: get rid of 
	(function(){
		function getCursorPosition(e){
			var coordinates = new Object();
			if (e.pageX || e.pageY) { 
			  coordinates.x = e.pageX;
			  coordinates.y = e.pageY;
			}
			else { 
			  coordinates.x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
			  coordinates.y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop; 
			}
			return coordinates;
		}

		// Used to prevent clicking on "Annotate" button from triggering event
		var clickCount = 0;

		function starOnClick(e){
			if (clickCount > 0) {
				var position = getCursorPosition(e);
				var star = document.createElement("i");
				star.setAttribute("class", "icon-star");
				star.style.position = "absolute";
				star.style.top = position.y.toString() + "px";
				star.style.left = position.x.toString() + "px";
				document.body.appendChild(star);
			} else {
				clickCount++;
			}
		}

		// Sets onclick handler adding stars and removes if the masterBtn is clicked again
		(function(){
			var body = document.body;
			if (body.onclick == null) {
				body.onclick = starOnClick;
			} else {
				body.onclick = null;
			}
		}).call(this);
	
	}).call(this);
}