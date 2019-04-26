const url = 'https://api.scryfall.com/cards/random?format=image&version=art_crop';
var xhr = new XMLHttpRequest();

jQuery(document).ready( function(){

	// Image on load
	newMTG();

	// Image on click
	$("#mtg").click( newMTG );
});

function newMTG(){

	// Load GIF
	$("#mtg").attr('src',"pacman.gif");

	// Request random MTG
	xhr.open('GET', url, true);
	xhr.onload = function () {
		console.log(xhr.responseURL);
		$("#mtg").attr('src',xhr.responseURL);
	};
	xhr.send(null);
}
