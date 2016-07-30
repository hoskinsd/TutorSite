

//newWorksheet('addition');


var loc_data;

	// Do an ajax call to save grade data
	function gradeWorkSheet(type) {
		var saveDataAPI = "http://174.49.32.201/TutorSite/cg/saveData.pl";
		var string='';
		var grade='';
		var json_grade;
		var user = 'Doug';

		grade = calcGrade(loc_data);
		json_data = JSON.stringify(loc_data);
		console.log('Grade: '+grade);
		$('#output').html("Worksheet Grade is: " + grade + "%");

	};

	// Do an ajax call to save grade data
	function sendGrade(type) {
		var saveDataAPI = "http://174.49.32.201/TutorSite/cg/saveData.pl";
		var string='';
		var grade='';
		var json_grade;
		var user = 'Doug';

		grade = calcGrade(loc_data);
		json_data = JSON.stringify(loc_data);

		$.getJSON( saveDataAPI, {
			cur_grade: grade,
			cur_type: type,
			cur_user: user,
			cur_wsd: json_data
		})
			.done(function( data ) {
				//console.log( 'hellos2' );
			})

//		newWorksheet(type);
	};

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
			var iterator2=0;
			var size = data.length - 1;
			string = "<center><table>";
			for (iterator = 0; iterator < size; iterator+=2) {
				iterator2= iterator + 1;
				string = create_sql(string, data, type, iterator, iterator2);
			}
			string += "</table></center>";
			return string;
	}

	function calc_result (event,id,type){
	var ret_val;
	var loc_index;

		$("#h"+id).keyup(function(event){
			 if((event.keyCode == 13) || (event.keyCode == 9)){
					if (type == "addition"){
						if ($('#h'+id).val() == loc_data[id].numerator + loc_data[id].denominator){
							$("#r"+id).html("CORRECT!");
							loc_data[id].result = 'Correct';
						} else {
							$("#r"+id).html("Sorry");
							loc_data[id].result = 'Wrong';
						}
					} else if (type == "subtraction"){
						if ($('#h'+id).val() == loc_data[id].numerator - loc_data[id].denominator){
							$("#r"+id).html("CORRECT!");
							loc_data[id].result = 'Correct';
						} else {
							$("#r"+id).html("Sorry");
							loc_data[id].result = 'Wrong';
						}
					} else if (type == "multiplication"){
						if ($('#h'+id).val() == loc_data[id].numerator * loc_data[id].denominator){
							$("#r"+id).html("CORRECT!");
							loc_data[id].result = 'Correct';
						} else {
							$("#r"+id).html("Sorry");
							loc_data[id].result = 'Wrong';
						}
					} else if (type == "division"){
						if ($('#h'+id).val() == loc_data[id].numerator / loc_data[id].denominator){
							$("#r"+id).html("CORRECT!");
							loc_data[id].result = 'Correct';
						} else {
							$("#r"+id).html("Sorry");
							loc_data[id].result = 'Wrong';
						}
					}
			 }
		});
	}

	function calcGrade(loc_data) {

		// loop for number of problems
		var num_problems;
		var grade = 0;
		var each_grade = 0;

		each_grade = 100 / loc_data.length;
		for (i = 0; i < loc_data.length; i++) { 
			if (loc_data[i].result == "Correct"){
				grade = grade + each_grade;
			}
		}
		return grade; 
	}

	function create_sql(string, data, type, iterator, iterator2){
		var operator;

		if (type == 'addition'){
			operator = ' + ';
		} else if (type == 'subtraction'){
			operator = ' - ';
		} else if (type == 'multiplication'){
			operator = ' * ';
		} else if (type == 'division'){
			operator = ' / ';
		}

		string += "<center><tr>" + 
							"<td>" + 
									data[iterator].numerator + operator + data[iterator].denominator + " = " + 
							"</td>" + 
							"<td>" + 
									"<input id=h" +iterator+" onclick='"+ 'calc_result(event,"'+iterator+'","'+type+'")' + "'>" + 
							"</td>" + 
							"<td>" + 
									"<div id=r"+iterator+">__________</div>" + 
							"</td>";
		string += "<td>&nbsp;</td>" + 
							"<td>" + 
									data[iterator2].numerator + operator + data[iterator2].denominator + " = " + 
							"</td>" + 
							"<td>" + 
									"<input id=h" +iterator2+" onclick='"+ 'calc_result(event,"'+iterator2+'","'+type+'")' + "'>" + 
							"</td>" + 
							"<td>" + 
									"<div id=r"+iterator2+">__________</div>" + 
							"</td></tr></center>";
/*
		string +=  "<td>&nbsp;</td><td>" + data[iterator2].numerator + operator + data[iterator2].denominator + 
						" = </td><td><input id=h" +iterator2+" onclick='"+ 'calc_result(event,"'+iterator2+'","'+type+'")' + 
						"'></td><td><div id=r"+iterator2+">__________</div></td></tr></center>";
*/
		return string;
	}



$("#h1").keyup(function(event){
console.log("event");
    if(event.keyCode == 13){
        $("#h1").click();
    }
});
//	}
