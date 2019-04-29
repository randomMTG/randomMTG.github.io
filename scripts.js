const url = 'https://api.scryfall.com/cards/random?format=image&version=art_crop';
var xhr = new XMLHttpRequest();
var load = "";
var tmp = null;	// Variable to hold click event

jQuery(document).ready( function(){

	// Request random MTG
	xhr.open('GET', url, true);
	xhr.onload = function () {
		console.log(xhr.responseURL);
		$("#mtg").attr('src',xhr.responseURL);
		// Load next image before click to avoid waiting
		newMTG();
	};
	xhr.send(null);

	// Image on click
	$("#mtg").click( function(){

		if(xhr.readyState==4){
			// If loaded, present and load another
			$("#mtg").attr('src',load);
			newMTG();
		} else {
			// Else wait for loading, present and load another
			$("#mtg").attr('src',"pacman.gif"); // Loading GIF
			tmp = $("#mtg").click;
			$("#mtg").click = null;
			xhr.onreadystatechange( function() {
				if(xhr.readyState==4){
					$("#mtg").attr('src',load);
					newMTG();
					$("#mtg").click = tmp;
				}
			});
		}

	});
});

// Request random MTG
function newMTG(){
	xhr.open('GET', url, true);
	xhr.onload = function () {
		console.log(xhr.responseURL);
		load = xhr.responseURL;
	};
	xhr.send(null);
}
