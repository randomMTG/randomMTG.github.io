jQuery(document).ready(
	const url = 'https://api.scryfall.com/cards/random?format=image&version=art_crop';
	$.get(url,function(data,status){
		console.log(data);
		console.log(status);
	});
);
