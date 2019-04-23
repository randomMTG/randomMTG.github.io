jQuery(document).ready( function(){
	const url = 'https://api.scryfall.com/cards/random?format=image&version=art_crop';
	// $.get(url,function(data,status){
	// 	console.log(`${data}`)
	// 	// console.log(`${status}`)
	// });

	var STATUS = {
		REDIRECT: 280
	};

	$.post(url, {}, function(response, status, request) {
		console.log(response.redirectUrl);
		console.log(request.responseText);
		if (status == STATUS.REDIRECT) {
			// you need to return the redirect url
			console.log(response.redirectUrl);
		} else {
			console.log(request.responseText);
		}
	});

	// var xhttp = new XMLHttpRequest();
	//
	// xhttp.onreadystatechange = function() {
	// 	if (this.readyState == 4 && this.status == 200) {
	// 		console.log(this.responseText);
	// 		console.log(this.getAllResponseHeaders());
	// 		console.log(this.responseXML);
	// 	}
	// };
	//
	// xhttp.open("GET", url, true);
	// xhttp.send();

	// xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	// xhttp.send("fname=Henry&lname=Ford");

});
