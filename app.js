 

newWorksheet();

var loc_data;

	// Do an ajax call for data and create a new worksheet.
	function newWorksheet() {
	var worksheetAPI = "http://174.49.32.201/TutorSite/cg/newWorkSheet.pl";
	var string='';
	$.getJSON( worksheetAPI, {
		tags: "mount rainier",
		tagmode: "any",
		format: "json"
	})
		.done(function( data ) {
			//console.log( 'hellos2' );
			console.log( data[0].numerator );
			loc_data = data;

			var iterator=0;
			for (let problem of data) {
				paraId= iterator;
				string += "<div>" + problem.numerator + ' + ' + problem.denominator + 
						" = <input id=h" +iterator+" onclick='"+ 'addition(event,"'+paraId+'")' + "'><br><p id=r"+iterator+">&nbsp;</p></div>";
				iterator=iterator+1;
			}
			$('#prob1').html(string);
		})

	};


	function addition (event,id){
	var ret_val;
	var loc_index;
//	console.log ("add: "+id);

		$("#h"+id).keyup(function(event){
		console.log("event");
			 if(event.keyCode == 13){
					if ($('#h'+id).val() == loc_data[id].numerator + loc_data[id].denominator){
						$("#r"+id).html("Whoo Hooo");
					} else {
						$("#r"+id).html("Sorry");
					}

			 }
		});


	}

//	function hello (event) {

$("#h1").keyup(function(event){
console.log("event");
    if(event.keyCode == 13){
        $("#h1").click();
    }
});
//	}
