jQuery(document).ready( function(){
	const url = 'https://api.scryfall.com/cards/random?format=image&version=art_crop';

	var xhr = new XMLHttpRequest();
	$.ajax({
		url: url,
		type: 'get',
		xhr: function() {
			return xhr;
		},
		success: function () {
			console.log(xhr.responseURL);
			$("#mtg").attr('src',xhr.responseURL);
		}
	});
});
