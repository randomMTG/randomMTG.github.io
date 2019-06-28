const url = 'https://api.scryfall.com/cards/random?format=image&version=art_crop';
var xhr = new XMLHttpRequest();
var load = "";
var tmp = null;				// Variable to hold click event
var im = new Image(); 		// Image object to preload image
im.src = "pacman.gif";

jQuery(document).ready( function(){

	// Request random MTG
	xhr.open('GET', url, true);
	xhr.onload = function () {
		console.log(xhr.responseURL);
		$("#mtg").attr('src',xhr.responseURL);

		// Load next image before click to avoid waiting
		newMTG();

		// Image on click - available after loading first image
		$("#mtg").click( function(){

			console.log(xhr.readyState);

			if(xhr.readyState==4 && load != ""){
				// If loaded, present and load another
				$("#mtg").attr('src',load);
				newMTG();
			} else {
				// Else wait for loading, present and load another
				$("#mtg").attr('src',"pacman.gif"); // Loading GIF
				tmp = $("#mtg").click;
				$("#mtg").click = null;
				xhr.onreadystatechange = function() {
					if(xhr.readyState==4){
						$("#mtg").attr('src',xhr.responseURL);
						$("#mtg").click = tmp;
						xhr.onreadystatechange = null;
						newMTG();
					}
				};
			}

		});
	};
	xhr.send(null);

});

// Request random MTG
function newMTG(){
	xhr.open('GET', url, true);
	xhr.onload = function () {
		console.log(xhr.responseURL);
		load = xhr.responseURL;
		im.src = load;
	};
	xhr.send(null);
}
