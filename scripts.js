jQuery(document).ready( function(){
	const url = 'https://api.scryfall.com/cards/random?format=image&version=art_crop';

	var xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);
	xhr.onload = function () {
		console.log(xhr.responseURL); // http://example.com/test
		$("#mtg").attr('src',xhr.responseURL);
	};
	xhr.send(null);

	// var xhr = new XMLHttpRequest();
	// $.ajax({
	// 	url: url,
	// 	type: 'get',
	// 	xhr: function() {
	// 		return xhr;
	// 	},
	// 	success: function () {
	// 		console.log(xhr.responseURL);
	// 		$("#mtg").attr('src',xhr.responseURL);
	// 	}
	// });
});
