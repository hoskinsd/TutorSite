

//newWorksheet('addition');


var loc_data;

	// Do an ajax call for data and create a new worksheet.
	function newWorksheet(type) {
	var worksheetAPI = "http://174.49.32.201/TutorSite/cg/newWorkSheet.pl";
	var string='';
	$.getJSON( worksheetAPI, {
		mode: "random",
		type: "rando"
	})
		.done(function( data ) {
			//console.log( 'hellos2' );
			console.log( data[0].numerator );
			loc_data = data;
			string = create_html(data,type);
			$('#prob1').html(string);
		})

	};


	function create_html (data,type){
			var string='';
			var iterator=0;
			var iterator;
			for (let problem of data) {
//				iterator= iterator;
				if (type == 'addition'){
					string += "<div>" + problem.numerator + ' + ' + problem.denominator + 
						" = <input id=h" +iterator+" onclick='"+ 'addition(event,"'+iterator+'")' + "'><br><p id=r"+iterator+">&nbsp;</p></div>";
				} else {
					string += "<div>" + problem.numerator + ' - ' + problem.denominator + 
						" = <input id=h" +iterator+" onclick='"+ 'subtraction(event,"'+iterator+'")' + "'><br><p id=r"+iterator+">&nbsp;</p></div>";
				}
				iterator=iterator+1;
			}
			return string;
	}

	function addition (event,id){
	var ret_val;
	var loc_index;
//	console.log ("add: "+id);

		$("#h"+id).keyup(function(event){
		console.log("event");
			 if((event.keyCode == 13) || (event.keyCode == 9)){
					if ($('#h'+id).val() == loc_data[id].numerator + loc_data[id].denominator){
						$("#r"+id).html("Whoo Hooo");
					} else {
						$("#r"+id).html("Sorry");
					}
					loc_data[id].result = 'Correct';
		console.log("Result: "+loc_data[id].result);
			 }
		});


	}

	function subtraction (event,id){
	var ret_val;
	var loc_index;
//	console.log ("add: "+id);

		$("#h"+id).keyup(function(event){
		console.log("event");
			 if((event.keyCode == 13) || (event.keyCode == 9)){
					if ($('#h'+id).val() == loc_data[id].numerator - loc_data[id].denominator){
						$("#r"+id).html("Whoo Hooo");
					} else {
						$("#r"+id).html("Sorry");
					}

			 }
		});
	}

	function gradeWorksheet() {

		// loop for number of problems
		// add up score
		// display score
		// send score back to the server

	}

//	function hello (event) {

$("#h1").keyup(function(event){
console.log("event");
    if(event.keyCode == 13){
        $("#h1").click();
    }
});
//	}
