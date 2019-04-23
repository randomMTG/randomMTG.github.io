const url = 'https://api.scryfall.com/cards/random?format=image&version=art_crop';

jQuery(document).ready(
	$.get(url,function(data,status){
		console.log(`${data}`);
		console.log(`${status}`);
	});
);
