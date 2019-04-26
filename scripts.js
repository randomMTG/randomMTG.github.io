jQuery(document).ready( function(){
	const url = 'https://api.scryfall.com/cards/random?format=image&version=art_crop';

	var xhr = new XMLHttpRequest();
	newMTG();

	$("#mtg").click( newMTG() );
});

function newMTG(){
	$("#mtg").attr('src',"pacman.gif");
	xhr.open('GET', url, true);
	xhr.onload = function () {
		console.log(xhr.responseURL);
		$("#mtg").attr('src',xhr.responseURL);
	};
	xhr.send(null);
}
