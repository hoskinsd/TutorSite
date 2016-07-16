 

var app = angular.module("workSheet", []);

app.controller('MainCtrl', ['$log', function($log){
    $log.debug('Hello Debug!');
}]);

app.controller("Controller",  function($scope) {

	$scope.value=1;
	$scope.truefalse=1;
	$scope.update = 'hello';



	$scope.chValue = function (value) {
		$scope.fractions[0][denominator]=value;
		$scope.truefalse = "10";
		return $scope.truefalse * value;
	}

	$scope.getTrueFalse = function () {
		return $scope.truefalse;
	}


	$scope.newWorksheet = function(){
console.log("goodby");
		$.post('http://174.49.32.201/TutorSite/cg/newWorkSheet.pl',
				$("#gifForm").serialize(), 
				function(data) {
//					$log.debug(data);
					//Show HTML
					$('#output').html(data);
				}	
		);
	}


	$scope.newestWorksheet = function() {

		$scope.getWorksheetData();
	}


	$scope.getWorksheetData = function() {
console.log( 'hellos' );
  var worksheetAPI = "http://174.49.32.201/TutorSite/cg/newWorkSheet.pl";
  $.getJSON( worksheetAPI, {
    tags: "mount rainier",
    tagmode: "any",
    format: "json"
  })
    .done(function( data ) {
			//console.log( 'hellos2' );
			console.log( data[0].numerator );
			$scope.fractions[0].numerator = data[0].numerator;
			$(#prob1).html=data[0].numerator;

			$('#output').html(data[0].numerator);
    })

	}


	$scope.newWorksheet3 = function(){

		$.post('http://174.49.32.201/TutorSite/cg/newWorkSheet.pl',
				$("#gifForm").serialize(), 
				function(data) {
					//Show HTML
					$('#output').html(data);
				}	
		);
	}




	$scope.fractions =  [
	    {"id":"1",
	      "numerator":"2",
	      "denominator": "8",
	      "result": "10",
	    },
	    {"id":"2",
	      "numerator":"4",
	      "denominator": "8",
	      "result": "12",
	    },
	    {"id":"3",
	      "numerator":"6",
	      "denominator": "8",
	      "result": "14",
	    },
	    {"id":"4",
	      "numerator":"8",
	      "denominator": "8",
	      "result": "16",
	    },
	    {"id":"5",
	      "numerator":"16",
	      "denominator": "8",
	      "result": "24",
	    },
	];
});



app.controller("DoubleController", function($scope) {

	$scope.myvalue='';
	$scope.result='';
	$scope.value='';
	$scope.hello='';


	$scope.addition = function(id,value) {

		if (value == (($scope.fractions[id-1].denominator*1) + ($scope.fractions[id-1].numerator*1))){
			$scope.fractions[id-1].numerator = "40";
			$scope.result = 'Correct! Who Hoo';
		} else if ((value.length > 0) && (value != ($scope.fractions[id-1].denominator + $scope.fractions[id-1].numerator))){
			$scope.result = 'Oops! Try Again';
		} else {
			$scope.result = '';
		}

  };




	$scope.subtraction = function(id,value) {

		if (value == ($scope.fractions[id-1].denominator - $scope.fractions[id-1].numerator)){
			$scope.result = 'Correct! Who Hoo';
		} else if ((value.length > 0) && (value != ($scope.fractions[id-1].denominator - $scope.fractions[id-1].numerator))){
			$scope.result = 'Oops! Try Again';
		} else {
			$scope.result = '';
		}

  };


	$scope.multiplication = function(id,value) {

		if (value == ($scope.fractions[id-1].numerator * $scope.fractions[id-1].denominator)){
			$scope.result = 'Correct! Who Hoo';
		} else if ((value.length > 0) && (value != ($scope.fractions[id-1].numerator * $scope.fractions[id-1].denominator))){
			$scope.result = 'Oops! Try Again';
		} else {
			$scope.result = $scope.fractions[id-1].numerator * $scope.fractions[id-1].denominator;
		}

  };


	$scope.division = function(id,value) {

		if (value == ($scope.fractions[id-1].numerator / $scope.fractions[id-1].denominator)){
			$scope.result = 'Correct! Who Hoo';
		} else if ((value.length > 0) && (value != ($scope.fractions[id-1].numerator / $scope.fractions[id-1].denominator))){
			$scope.result = 'Oops! Try Again';
		} else {
			$scope.result = $scope.fractions[id-1].numerator / $scope.fractions[id-1].denominator;
		}

  };



});




