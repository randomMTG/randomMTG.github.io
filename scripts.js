jQuery(document).ready( function(){
	const url = 'https://api.scryfall.com/cards/random?format=image&version=art_crop';
	$.get(url,function(data,status){
		console.log(`${data}`)
		// console.log(`${status}`)
	});

	var STATUS = {
		REDIRECT: 280
	};

	$.post('/redirected', {}, function(response, status, request) {
		if (status == STATUS.REDIRECT) {
			// you need to return the redirect url
			console.log(response.redirectUrl);
		} else {
			$('#content').html(request.responseText);
		}
	});

	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			console.log(this.responseText);
			console.log(this.getAllResponseHeaders());
		}
	};

	xhttp.open("GET", url, true);
	xhttp.send();

	// xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	// xhttp.send("fname=Henry&lname=Ford");

});
