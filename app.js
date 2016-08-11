


var loc_data;

/******************************************************************
	Ajax Calls
*******************************************************************/

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
				$('#output').html("Worksheet is Saved");
			})

//		newWorksheet(type);
	};

	// Do an ajax call for data and create a new worksheet.
	function newWorksheet(type) {
		var worksheetAPI = "http://174.49.32.201/TutorSite/cg/newWorkSheet.pl";
		var string='';
		$.getJSON( worksheetAPI, {
			type: type,
		})
			.done(function( data ) {
				//console.log( 'hellos2' );
				console.log( data[0].operand1 );
				loc_data = data;
				string = create_html(data,type);
				$('#prob1').html(string);
			})

	};


/******************************************************************
	Support Functions
*******************************************************************/


	// Grade the current worksheet
	function gradeWorkSheet(type) {
		var grade='';

		grade = calcGrade(loc_data);
//		console.log('Grade: '+grade);
		$('#output').html("Worksheet Grade is: " + grade + "%");

	};

	function create_html (data,type){
			var string='';

			string = "<center><table>";
			string = create_html_problems(string, data, type);
			string += "</table></center>";

			return string;
	}

	function create_html_problems(string, data, type){
		var operator;
		var iterator;
		var num_rows = 2;
		var size = data.length - 1;

		if (type == 'addition'){
			operator = ' + ';
		} else if (type == 'subtraction'){
			operator = ' - ';
		} else if (type == 'multiplication'){
			operator = ' * ';
		} else if (type == 'division'){
			operator = ' / ';
		}

		for (iterator = 0; iterator < size; iterator+=2) {
			string += "<center><tr>";
			for (i = 0; i < num_rows; i++) { 
				string +=	"<td>" + 
									data[iterator+i].operand1 + operator + data[iterator+i].operand2 + " = " + 
								"</td>" + 
								"<td>" + 
									"<input id=h" +(iterator+i)+" onclick='"+ 'calc_result(event,"'+(iterator+i)+'","'+type+'")' + "'>" + 
								"</td>" + 
								"<td>" + 
									"<div id=r"+(iterator+i)+">__________</div>" + 
								"</td>";
			}
			string += "</tr></center>";
		}
		return string;
	}

	function calc_result (event,id,type){
		var ret_val;
		var loc_index;

		$("#h"+id).keyup(function(event){
			 if((event.keyCode == 13) || (event.keyCode == 9)){
					if (type == "addition"){
						$('#h'+id).val() == loc_data[id].operand1 + loc_data[id].operand2 ? $("#r"+id).html("CORRECT!") : $("#r"+id).html("Sorry"); 
						loc_data[id].result = $('#h'+id).val() == loc_data[id].operand1 + loc_data[id].operand2 ? 'Correct' : 'Wrong'; 
					} else if (type == "subtraction"){
						$('#h'+id).val() == loc_data[id].operand1 - loc_data[id].operand2 ? $("#r"+id).html("CORRECT!") : $("#r"+id).html("Sorry"); 
						loc_data[id].result = $('#h'+id).val() == loc_data[id].operand1 - loc_data[id].operand2 ? 'Correct' : 'Wrong'; 
					} else if (type == "multiplication"){
						$('#h'+id).val() == loc_data[id].operand1 * loc_data[id].operand2 ? $("#r"+id).html("CORRECT!") : $("#r"+id).html("Sorry"); 
						loc_data[id].result = $('#h'+id).val() == loc_data[id].operand1 * loc_data[id].operand2 ? 'Correct' : 'Wrong'; 
					} else if (type == "division"){
						$('#h'+id).val() == loc_data[id].operand1 / loc_data[id].operand2 ? $("#r"+id).html("CORRECT!") : $("#r"+id).html("Sorry"); 
						loc_data[id].result = $('#h'+id).val() == loc_data[id].operand1 / loc_data[id].operand2 ? 'Correct' : 'Wrong'; 

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



$("#h1").keyup(function(event){
console.log("event");
    if(event.keyCode == 13){
        $("#h1").click();
    }
});
//	}
