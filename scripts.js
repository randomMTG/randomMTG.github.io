// Load navbar
jQuery(document).ready(
	function ($){
		$("#navbar").load("/Selvevaluering/navbar.html");
		$("#navbarControl").load("/Selvevaluering/control/navbar.html");
	}
);

// Tjek radio input
function checkRadio() {
	var all_answered = true;
	$("input:radio").each(function(){
		var name = $(this).attr("name");
		if($("input:radio[name="+name+"]:checked").length == 0)
		{
			all_answered = false;
			$( "div[name=" + name + "Header]" ).removeClass('bg-primary').addClass('bg-danger');
		} else {
			$( "div[name=" + name + "Header]" ).removeClass('bg-danger').addClass('bg-primary');
		}
	});

	// Mangler en radiogruppe
	if(!all_answered){
		var element = document.getElementById("radioError");
		element.innerHTML = "Alle emner skal vurderes!";
	}
}

// Tjek om form er ved at blive behandlet
$('form.submit-once').submit(function(e){
	if( $(this).hasClass('form-submitted') ){
		e.preventDefault();
		return;
	}
	$(this).addClass('form-submitted');
	$('#submitbutton').css("visibility","hidden");
	$('#load').css("visibility","visible");
});

// Initialize controlpanel
function ini_control(){

	$(document).keydown(function(event) {
		if (event.keyCode == 27) {
			$('#myModal').modal('hide');
		}
	});

	// Modals til læringsmål
	$('.modalopen').on("click",function(){

		var a = $(this); // element that triggered the modal

		$('#myModal').on('show.bs.modal', function () {
			var hold = a.data('hold');
			var emne = a.data('emne');
			var style = "overflow:hidden;overflow-x:hidden;overflow-y:hidden;height:100%;width:100%;position:absolute;top:0px;left:0px;right:0px;bottom:0px";
			$('#myModal .modal-body').html('<iframe src="/Selvevaluering/control/goals_view.php?hold=' + hold + '&emne=' + emne + '&bruger=admin" style="' + style + '" width="100%" height="90vh" frameborder="0"></iframe>');
		});
		$('#myModal').modal('show');
	});

	// Modals til brugeroversigter
	$('.modalopenUsers').on("click",function(){

		var a = $(this); // element that triggered the modal

		$('#myModal').on('show.bs.modal', function () {
			var hold = a.data('hold');
			var style = "overflow:hidden;overflow-x:hidden;overflow-y:hidden;height:100%;width:100%;position:absolute;top:0px;left:0px;right:0px;bottom:0px";
			$('#myModal .modal-body').html('<iframe src="/Selvevaluering/control/users_view.php?hold=' + hold + '&bruger=admin" style="' + style + '" width="100%" height="90vh" frameborder="0"></iframe>')
		});
		$('#myModal').modal('show');
	});

	// Modals til at kopiere emnet
	$('.modalopenCopy').on("click",function(){

		var a = $(this); // element that triggered the modal

		$('#myModal').on('show.bs.modal', function () {
			var hold = a.data('hold');
			var emne = a.data('emne');
			var style = "overflow:hidden;overflow-x:hidden;overflow-y:hidden;height:100%;width:100%;position:absolute;top:0px;left:0px;right:0px;bottom:0px";
			$('#myModal .modal-body').html('<iframe src="/Selvevaluering/control/kopierEmne.php?hold=' + hold + '&emne=' + emne + '&bruger=admin" style="' + style + '" width="100%" height="90vh" frameborder="0"></iframe>');
		});
		$('#myModal').modal('show');
	});

	// Knapper til at fjerne/tilføje tilladelse af brugeroprettelser
	$('.newUser').on("click",function(){

		var hold = $(this).data('hold');
		var tilladt = $(this).data('nye');
		var btn = $(this);

		obj = { "hold":hold, "nye": (1-tilladt)};
		dbParam = JSON.stringify(obj);

		xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				if (tilladt==1) {
					btn.removeClass("text-success");
					btn.addClass("text-danger");
					btn.data('nye',0);
				} else {
					btn.removeClass("text-danger");
					btn.addClass("text-success");
					btn.data('nye',1);
				}
			}
		};

		xmlhttp.open("GET", "/Selvevaluering/control/toggle_brugerOpret.php?x=" + dbParam, true);
		xmlhttp.send();

	});
}

// Funktion til nyt hold
function newHold() {

	var hold = prompt("Navngiv nyt hold", "");

	if (hold != null) {
	// alert(hold);
		obj = { "hold":hold};
		dbParam = JSON.stringify(obj);

		xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				if ( this.responseText === "fejl" ) {
					alert("Holdet eksisterer allerede!");
				} else {
					location.reload();
				}
			}
		};

		xmlhttp.open("GET", "/Selvevaluering/control/nyt_hold.php?x=" + dbParam, true);
		xmlhttp.send();
	}
}

// Funktion til nyt emne
function newEmne(hold) {
	var emne = prompt("Navngiv nyt emne", "");
	if (emne != null) {

		obj = { "hold":hold, "emne": emne};
		dbParam = JSON.stringify(obj);

		xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				if ( this.responseText === "fejl" ) {
					alert("Emnet eksisterer allerede for dette hold!");
				} else {
					location.reload();
				}
			}
		};

		xmlhttp.open("GET", "/Selvevaluering/control/nyt_emne.php?x=" + dbParam, true);
		xmlhttp.send();
	}
}

// Funktion til at slette emne
function sletEmne(obj){

	// alert(JSON.stringify(obj));
	if (confirm("Vil du fjerne emnet? Dette kan ikke fortrydes!")) {

		if (confirm("Helt sikker?")) {

			dbParam = JSON.stringify(obj);
			dbParam.replace(/\+/g," ");

			xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					location.reload();
				}
			};

			xmlhttp.open("GET", "/Selvevaluering/control/fjern_emne.php?x=" + dbParam, true);
			xmlhttp.send();
		}
	}
}

// Funktion til at kopiere emne
function kopierEmne(obj){

	var person = prompt("Please enter your name", "Harry Potter");

	// alert(JSON.stringify(obj));
	if (confirm("Vil du fjerne emnet? Dette kan ikke fortrydes!")) {

		if (confirm("Helt sikker?")) {

			// dbParam = JSON.stringify(obj);
			// dbParam.replace(/\+/g," ");
			//
			// xmlhttp = new XMLHttpRequest();
			// xmlhttp.onreadystatechange = function() {
			// 	if (this.readyState == 4 && this.status == 200) {
			// 		location.reload();
			// 	}
			// };
			//
			// xmlhttp.open("GET", "/Selvevaluering/control/fjern_emne.php?x=" + dbParam, true);
			// xmlhttp.send();
		}
	}
}

// Opsæt elev-charts
function ini_charts(hold, bruger, emne, antal) {

	// Hide containers while loading
	$('#content').css("visibility","hidden");

	// Set chart scales
	Chart.scaleService.updateScaleDefaults('linear', {
		ticks: {
			min: 0,
			max: 5,
			stepSize: 1
		}
	});
	Chart.scaleService.updateScaleDefaults('radialLinear', {
		ticks: {
			min: 0,
			max: 5,
			stepSize: 1
		}
	});

	// Get db data
	var obj, dbParam, xmlhttp, myObj, x, txt = "", k = 0, oldstr = "", datostr, n = 0, j;
	var LABELS = [], DATASETLABEL, DATA = [], SNIT = [], GOALS = [], NSVAR, oldN = 0;
	obj = { "hold":hold, "bruger": bruger, "emne": emne};
	dbParam = JSON.stringify(obj);

	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			myObj = JSON.parse(this.responseText);
			for (x in myObj) {
				datostr = myObj[x].dato.substring(0,16);
				NSVAR = myObj[x].Nsvar;

				// Ny besvarelse
				if ( !(NSVAR === oldN) && (k > 0) ) {

					// Print gammel besvarelse
					print_chart(n, LABELS, DATASETLABEL, DATA, 0, GOALS);

					// Collapse alle undtagen seneste
					$("#collapse" + n).collapse({"toggle": true, 'parent': '#accordion' + n});

					// Event til at fjerne evaluering
					$("#delete" + n).click({hold: hold, bruger: bruger, emne: emne, nsvar: oldN, n:n},fjern_svar);

					// +1 til fremtidige index
					n += 1;

					// Gem snit
					if ( n  < 2 ) {
						for ( j in DATA ) {
							SNIT.push( Number(DATA[j]) );
						}
					} else {
						for ( j in DATA ) {
							SNIT[j] += Number(DATA[j]);
						}
					}

					// alert(  "3 SNIT:" +  SNIT.toString() );

					// Reset arrays
					LABELS = [];
					DATA = [];
					GOALS = [];
					k = 0;


				}

				// Tilføj data til arrays
				k += 1;
				oldstr = datostr;
				oldN = NSVAR;
				DATA.push(myObj[x].Score);
				LABELS.push(k);
				DATASETLABEL = myObj[x].dato;
				GOALS.push(myObj[x].Goalid);
			}

			// Udregn snit
			for ( j in DATA ) {
				SNIT[j] = SNIT[j]/n;
				SNIT[j] = SNIT[j].toFixed(2);
			}

			// Print sidste besvarelse
			if ( k > 0 ) {
				if ( n > 0 ) {
					print_chart(n, LABELS, DATASETLABEL, DATA, SNIT, GOALS);
				} else {
					print_chart(n, LABELS, DATASETLABEL, DATA, 0, GOALS);
				}
			}

			// Hide loader and show containers after loading
			$('#load').css("visibility","hidden");
			$('#content').css("visibility","visible");


			// Event til at fjerne evaluering
			$("#delete" + n).click({hold: hold, bruger: bruger, emne: emne, nsvar: NSVAR, n:n},fjern_svar);

		}
	};

	// alert("/Selvevaluering/get_svar.php?x=" + dbParam);
	xmlhttp.open("GET", "/Selvevaluering/get_svar.php?x=" + dbParam, true);
	xmlhttp.send();
}

// Fjern svar
function fjern_svar( e ) {

	if (confirm("Vil du fjerne denne evaluering? Dette kan ikke fortrydes!")) {

		obj = { "hold":e.data.hold, "bruger": e.data.bruger, "emne": e.data.emne, "nsvar": e.data.nsvar};
		dbParam = JSON.stringify(obj);

		xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				$("#accordion" + e.data.n).remove();
			}
		};

		xmlhttp.open("GET", "/Selvevaluering/fjern_svar.php?x=" + dbParam, true);
		xmlhttp.send();
	}
}

// Opsæt lærer-charts
function ini_charts_status(hold, emne, antal) {

	// Hide containers while loading
	$('#content').css("visibility","hidden");

	// Set chart scales
	Chart.scaleService.updateScaleDefaults('linear', {
		ticks: {
			min: 0,
			max: 5,
			stepSize: 1
		}
	});
	Chart.scaleService.updateScaleDefaults('radialLinear', {
		ticks: {
			min: 0,
			max: 5,
			stepSize: 1
		}
	});

	// Get db data
	var obj, dbParam, xmlhttp, myObj, x, txt = "", k = 0, oldstr = "", datostr, n = 0, j;
	var LABELS = [], DATASETLABEL, DATA = [], SNIT = [], GOALS = [], GOALIDS = [], NSVAR = [], oldN = 0, DAYS = [], BRUGERE = []; NBRUGERE = [], STD = [];
	obj = { "hold":hold, "emne": emne};
	dbParam = JSON.stringify(obj);

	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			myObj = JSON.parse(this.responseText);

			// Lav tabel over svar hvor rækker dækker over dage og kolonner dækker over de forskellige mål
			var lookup = {};
			var lookupdays = {};
			var rows = -1, r, cols = -1, c;
			for (var item, i = 0; item = myObj[i++];) {

				var isnew = false;

				datostr = item.dato.substring(0,10);
				if (!(datostr in lookupdays)) {
					lookupdays[datostr] = 1;
					DAYS.push(datostr);
					rows++;
					r = rows;
					DATA[r] = [];
					NSVAR[r] = [];
					BRUGERE[r] = {};
					NBRUGERE[r] = 0;
					STD[r]=[];
				} else {
					r = DAYS.indexOf(datostr);
				}

				var GID = item.Goalid;

				if (!(GID in lookup)) {
					lookup[GID] = 1;
					GOALIDS.push(GID);
					GOALS.push(item.Goalname);
					cols++;
					c = cols;
					LABELS.push(c+1);
				} else {
					c = GOALIDS.indexOf(GID);
				}

				if (!NSVAR[r][c]) {
					DATA[r][c] = Number(item.Score);
					NSVAR[r][c] = 1;
					STD[r][c] = 0;
				} else {
					DATA[r][c] += Number(item.Score);
					NSVAR[r][c] ++;
				}

				var bruger = item.Bruger;
				if (!(bruger in BRUGERE[r])) {
					BRUGERE[r][bruger] = 1;
					NBRUGERE[r]++;
				}



				// if ( r > 0 && c > 0){
				// 	alert("[" + r.toString() + "," + c.toString() + "]" + ", Score: " + item.Score.toString() + ", NSVAR: " + NSVAR[r][c].toString() + " isnew: " + isnew.toString());
				// }

			}

			// alert(GOALS.toString());
			// alert(DAYS.toString());
			// alert(DATA.toString());
			// alert(NSVAR.toString());

			// Udregn snit
			for (r = 0; r <= rows; r++) {
				for (c = 0; c <= cols; c++){
					DATA[r][c] = DATA[r][c]/NSVAR[r][c];
					DATA[r][c] = DATA[r][c].toFixed(2);
				}
			}


			for (var item, i = 0; item = myObj[i++];) {

				var isnew = false;

				datostr = item.dato.substring(0,10);
				r = DAYS.indexOf(datostr);

				var GID = item.Goalid;
				c = GOALIDS.indexOf(GID);

				STD[r][c] += (Number(item.Score)-DATA[r][c]) * (Number(item.Score)-DATA[r][c]);
			}

			// Udregn snit for STD
			for (r = 0; r <= rows; r++) {

				for (c = 0; c <= cols; c++){
					STD[r][c] = Math.sqrt(STD[r][c]/NSVAR[r][c]);
					STD[r][c] = STD[r][c].toFixed(2);
				}

				// Sidste dato vises først
				n = rows-r;

				// Print status chart
				print_chart_status(n, LABELS, DATA[r], GOALS, STD[r]);


				// Opdater svar info i header
				$('#svarinfo' + n).text("Elever: " + NBRUGERE[r] + ", Svar: " + NSVAR[r][0]);

				// Collapse alle undtagen seneste
				if (r < rows){
					$("#collapse" + n).collapse({"toggle": true, 'parent': '#accordion' + n});
				}

			}

			// Hide loader and show containers after loading
			$('#load').css("visibility","hidden");
			$('#content').css("visibility","visible");

		}
	};

	// alert("/Selvevaluering/control/get_svar.php?x=" + dbParam);
	xmlhttp.open("GET", "/Selvevaluering/control/get_svar.php?x=" + dbParam, true);
	xmlhttp.send();
}

// Charts til elever
function print_chart(id, LABELS, DATASETLABEL, DATA, SNIT, GOALS) {

	// alert("id: " + id + "- labels:" + LABELS.toString() + "- Datalabels:" +  DATASETLABEL.toString() + "- data:" +  DATA.toString() + "- SNIT:" +  SNIT.toString() + " - GOALS:" + GOALS.toString()); // debug alert

	var ctx = document.getElementById("radarChart" + id);
	var myChart = new Chart(ctx, {
		type: 'polarArea',
		data: {
			labels: LABELS,
			datasets: [{
				label: DATASETLABEL,
				data: DATA,
				backgroundColor: [
					'rgba(255,99,132, 0.6)',
					'rgba(54, 162, 235, 0.6)',
					'rgba(255, 206, 86, 0.6)',
					'rgba(75, 192, 192, 0.6)',
					'rgba(153, 102, 255, 0.6)',
					'rgba(255, 159, 64, 0.6)',
					'rgba(155,0,32, 0.6)',
					'rgba(0, 62, 135, 0.6)',
					'rgba(155, 106, 0, 0.6)',
					'rgba(0, 92, 92, 0.6)',
					'rgba(53, 2, 155, 0.6)',
					'rgba(155, 59, 0, 0.6)',
					'rgba(155,99,132, 0.6)',
					'rgba(154, 162, 235, 0.6)',
					'rgba(155, 206, 86, 0.6)',
					'rgba(175, 192, 192, 0.6)',
					'rgba(53, 102, 255, 0.6)',
					'rgba(155, 159, 64, 0.6)',
					'rgba(105,49,82, 0.6)',
					'rgba(104, 112, 185, 0.6)',
					'rgba(105, 156, 36, 0.6)',
					'rgba(125, 142, 142, 0.6)',
					'rgba(3, 52, 205, 0.6)',
					'rgba(105, 109, 14, 0.6)'
				]
			}]
		},
		options: {
			responsive: true,
			animation: {
				animateRotate: false,
				animateScale: true
			},
			tooltips: {
				callbacks: {
					title: function(tooltipItem, data) {
						return GOALS[ data['labels'][tooltipItem[0]['index']] - 1 ];
					},
					label: function(tooltipItem, data) {
						return data['datasets'][0]['data'][tooltipItem['index']];
					}
				}
			}
		}
	});


	var ctx = document.getElementById("barChart" + id);
	if ( !Array.isArray(SNIT) ){
		var myChart = new Chart(ctx, {
			type: 'bar',
			data: {
				labels: LABELS,
				datasets: [{
					label: "Denne evaluering",
					data: DATA,
					backgroundColor: [
						'rgba(255,99,132, 0.8)',
						'rgba(54, 162, 235, 0.8)',
						'rgba(255, 206, 86, 0.8)',
						'rgba(75, 192, 192, 0.8)',
						'rgba(153, 102, 255, 0.8)',
						'rgba(255, 159, 64, 0.8)',
						'rgba(155,0,32, 0.8)',
						'rgba(0, 62, 135, 0.8)',
						'rgba(155, 106, 0, 0.8)',
						'rgba(0, 92, 92, 0.8)',
						'rgba(53, 2, 155, 0.8)',
						'rgba(155, 59, 0, 0.8)',
						'rgba(155,99,132, 0.8)',
						'rgba(154, 162, 235, 0.8)',
						'rgba(155, 206, 86, 0.8)',
						'rgba(175, 192, 192, 0.8)',
						'rgba(53, 102, 255, 0.8)',
						'rgba(155, 159, 64, 0.8)',
						'rgba(105,49,82, 0.8)',
						'rgba(104, 112, 185, 0.8)',
						'rgba(105, 156, 36, 0.8)',
						'rgba(125, 142, 142, 0.8)',
						'rgba(3, 52, 205, 0.8)',
						'rgba(105, 109, 14, 0.8)'
					]
				}]
			},
			options: {
				tooltips: {
					callbacks: {
						title: function(tooltipItem, data) {
							return GOALS[ data['labels'][tooltipItem[0]['index']] - 1 ];
						},
						label: function(tooltipItem, data) {
							return data['datasets'][0]['data'][tooltipItem['index']];
						}
					}
				}
			}
		});
	} else {
		var myChart = new Chart(ctx, {
			type: 'bar',
			data: {
				labels: LABELS,
				datasets: [{
					label: "Gennemsnit af tidligere evalueringer",
					data: SNIT,
					type: "line",
					backgroundColor: 'rgba(150,150,150, 0.1)',
					pointBackgroundColor: 'rgba(100,100,100, 1)'
				},{
					label: "Denne evaluering",
					data: DATA,
					backgroundColor: [
						'rgba(255,99,132, 0.8)',
						'rgba(54, 162, 235, 0.8)',
						'rgba(255, 206, 86, 0.8)',
						'rgba(75, 192, 192, 0.8)',
						'rgba(153, 102, 255, 0.8)',
						'rgba(255, 159, 64, 0.8)',
						'rgba(155,0,32, 0.8)',
						'rgba(0, 62, 135, 0.8)',
						'rgba(155, 106, 0, 0.8)',
						'rgba(0, 92, 92, 0.8)',
						'rgba(53, 2, 155, 0.8)',
						'rgba(155, 59, 0, 0.8)',
						'rgba(155,99,132, 0.8)',
						'rgba(154, 162, 235, 0.8)',
						'rgba(155, 206, 86, 0.8)',
						'rgba(175, 192, 192, 0.8)',
						'rgba(53, 102, 255, 0.8)',
						'rgba(155, 159, 64, 0.8)',
						'rgba(105,49,82, 0.8)',
						'rgba(104, 112, 185, 0.8)',
						'rgba(105, 156, 36, 0.8)',
						'rgba(125, 142, 142, 0.8)',
						'rgba(3, 52, 205, 0.8)',
						'rgba(105, 109, 14, 0.8)'
					]
				}]
			},
			options: {
				tooltips: {
					callbacks: {
						title: function(tooltipItem, data) {
							return GOALS[ data['labels'][tooltipItem[0]['index']] - 1 ];
						},
						label: function(tooltipItem, data) {
							return data['datasets'][tooltipItem['datasetIndex']]['data'][tooltipItem['index']];
						}
					}
				}
			}
		});
	}
}

// Charts til lærer
function print_chart_status(id, LABELS, DATA, GOALS, STD) {

	// alert("id: " + id + "- labels:" + LABELS.toString() + "- Datalabels:" +  DATASETLABEL.toString() + "- data:" +  DATA.toString() + "- SNIT:" +  SNIT.toString() + " - GOALS:" + GOALS.toString()); // debug alert

	// alert(STD.toString());

	// Farvelæg bars efter værdier
	var colors = [], STDcolors = [], STDbot = [], STDtop = [];
	for (var i in DATA) {
		var r = Math.floor( (5-DATA[i])/2 * 255);
		var g = Math.floor( (DATA[i]-1)/2 * 200);
		var b = 5;
		rgba = "rgba(" + r + "," + g + "," + b + ", 1)";
		colors.push(rgba);
		rgba = "rgba(" + Math.floor(r*2/3) + "," + Math.floor(g*2/3) + "," + 3 + ", 1)";
		STDcolors.push(rgba);
		STDbot.push(DATA[i] - STD[i]);
		STDtop.push( Number(DATA[i]) + Number(STD[i]) );
	}

	var ctx = document.getElementById("barChart" + id);

	var myChart = new Chart(ctx, {
		type: 'bar',
		data: {
			labels: LABELS,
			datasets: [{
				label: "Nedre standard afvigelse",
				data: STDbot,
				pointBorderColor: "rgba(0,0,0,1)",
				pointBorderWidth: 3,
				pointRadius: 5,
				type: "line",
				showLine: false,
				pointStyle: "line"
			},{
				label: "Oevre standard afvigelse",
				data: STDtop,
				pointBorderColor: "rgba(0,0,0,1)",
				pointBorderWidth: 3,
				pointRadius: 5,
				type: "line",
				showLine: false,
				pointStyle: "line"
			},{
				label: "Gennemsnit",
				data: DATA,
				backgroundColor: colors
			}]
		},
		options: {
			legend: {
				display: false,
			},
			tooltips: {
				callbacks: {
					title: function(tooltipItem, data) {
						return GOALS[ data['labels'][tooltipItem[0]['index']] - 1 ];
					},
					label: function(tooltipItem, data) {
						return DATA[tooltipItem['index']];
					}
				}
			}
		}
	});
}

// Opsæt læremål til redigering
function ini_goals(hold, emne, antal) {

	$("#add_row").on("click", function() {
		// Dynamic Rows Code

		// Count rows
		var newid = $( "div.rowinput" ).length;
		newid++;

		var row = $("<div></div>", {
			id: "goal"+newid,
			"data-id": newid,
			"class": "row rowinput"
		});

		// loop through each col div and create new elements with name of newid
		$.each($("#goal1 div.colinput"), function() {

			var cur_div = $(this);

			var children = cur_div.children();

			// add new div and element if it has a name
			if ($(this).data("name") != undefined) {

				var col = $("<div></div>", {
					"data-name": $(cur_div).data("name"),
					"class": $(cur_div).attr("class")
				});

				var c = $(cur_div).find($(children[0]).prop('tagName')).clone().val("");
				c.attr("name", $(cur_div).data("name") + newid);
				c.appendTo($(col));
				col.appendTo($(row));

			}
		});

		// add the new row
		$(row).appendTo($('#tab_logic'));

		// add value
		$(row).find("input").filter(":first").val(newid);

		// remove row button
		$(row).find("button.row-remove").on("click", function() {
			if ( $( "div.rowinput" ).length > 1 ) {
				$(this).closest("div.row").remove();
				update_ids();
			}
		});

		// Id change
		$(row).find("input[type='number']" ).change(function() {
			table_sort();
		});

	});


	// Events for initial rows
	antal = Number(antal);
	if (antal==0){
		antal++;
	}

	for (var k = 1; k <= antal; k++ ){

		// remove initial rows button
		$("#goal"+k).find("button.row-remove").on("click", function() {
			if ( $( "div.rowinput" ).length > 1 ) {
				$(this).closest("div.row").remove();
				update_ids();
			}
		});

		// Id change on inital rows
		$("#goal"+k).find("input[type='number']" ).change(function() {
			table_sort();
		});
	}


	function table_sort() {

		// New table
		var newtable = $("<div></div>", {
			id: "tab_logic",
			"class": "container"
		});

		// Copy header
		var head = $('#tab_logic div.row:first').clone(true,true);
		$(head).appendTo($(newtable));

		// Get list of sorted/unsorted inputs
		var inputs = [];
		$.each($("div.rowinput"), function() {
			var value = Number($(this).find("input").filter(":first").val());
			var idvalue = Number($(this).attr("data-id"));

			// adjust recently changed value to avoid duplicates in current list
			if ( value != idvalue) {
				if ( value < idvalue) {
					value -= 0.5;
				} else {
					value += 0.5;
				}
			}

			inputs.push(value);
		});
		var inputsorted = inputs.slice(0);
		inputsorted.sort(sorter);

		// Put inputrow into new table in right order
		for (var k = 0; k < inputs.length; k++ ) {

			var n = inputs.indexOf(inputsorted[k]) + 1;

			var row = $("#goal"+n).clone(true,true);

			// alert(" new rank:  " + inputsorted[k] + ", Oldrow: " + n + " -> " + $(row).attr("id"));

			$(row).appendTo($(newtable));
		}

		// Replace old table with new
		$('#tab_logic').replaceWith($(newtable));

		// update ids
		update_ids();

	}


	function update_ids() {

		var newid = 0;

		// update all rows
		$.each($("div.rowinput"), function() {

			newid++;

			$(this).attr('id', 'goal'+newid);
			$(this).attr('data-id', newid);

			$(this).find("input").filter(":first").val(newid);

			$.each($(this).find("div.colinput"), function() {

				var cur_div = $(this);
				var children = cur_div.children();

				// update name
				if ($(this).data("name") != undefined) {
					var c = $(cur_div).find($(children[0]));
					c.attr("name", $(cur_div).data("name") + newid);
				}
			});

		});
	}

	function sorter(a, b) {
		if (a < b) return -1;
		if (a > b) return 1;
		return 0;
	}
};
