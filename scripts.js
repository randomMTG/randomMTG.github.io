jQuery(document).ready( function(){
	const url = 'https://api.scryfall.com/cards/random?format=image&version=art_crop';
	// $.get(url,function(data,status){
	// 	console.log(`${data}`)
	// 	// console.log(`${status}`)
	// });

	var STATUS = {
		REDIRECT: 280
	};

	$.get(url, function(data, status, dataType) {
		console.log(JSON.stringify(data, null, 4));
		console.log(`${status}`);
		console.log(`${dataType}`);
		// $("#mtg").attr('src',${data});
	});

	var xhr = new XMLHttpRequest();

	$.ajax({
		url: url,
		type: 'get',
		xhr: function() {
			return xhr;
		}
		success: function () {
			console.log(xhr.responseURL);
		}
	});
	


});
