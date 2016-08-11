


var loc_data;

/******************************************************************
	Ajax Calls
*******************************************************************/

	// Do an ajax call to validate login
	function sendLogin(userID, PW) {
		var valLoginAPI = "http://174.49.32.201/TutorSite/cg/process_login.pl";
		$.getJSON( valLoginAPI, {
			cur_user: $('#username').val(),
			cur_pw: $('#password').val(),
			type:   "login"
		})
			.done(function( data ) {
				$('#output').html(data.ret_val);
			})
			$('#login').html('');
	};


	// Do an ajax call to validate login
	function sendRegister(userID, PW) {
		var valLoginAPI = "http://174.49.32.201/TutorSite/cg/process_login.pl";
		$.getJSON( valLoginAPI, {
			cur_user: $('#username').val(),
			cur_pw: $('#password').val(),
			type:  "register"
		})
			.done(function( data ) {
				$('#output').html(data.ret_val);
			})
			$('#login').html('');
	};

/******************************************************************
	Support Functions
*******************************************************************/

	function login_popup() {

		var popup_html;
		popup_html = "<form name='login' action='' method='post'>" +
			"<center>Username:</center>" +
			"<center><input id='username' name='username' size='14' /></center>" +
			"<center>Password:</center>" +
			"<center><input id='password' name='password' type='password' size='14' /></center>" +
			"<center><input type='button' onclick='sendLogin();' name='submit' value='login' /></center>" +
			"</form>" +
			"<br />";

		$('#login').html(popup_html);

		$( "#login" ).animate({
			marginTop: "0.6in",
			}, 1500 );

	};

	function sleep (time) {
	  return new Promise((resolve) => setTimeout(resolve, time));
	}
	function sleepFor( sleepDuration ){
		var now = new Date().getTime();
		while(new Date().getTime() < now + sleepDuration){ /* do nothing */ } 
	}


$("#h1").keyup(function(event){
console.log("event");
    if(event.keyCode == 13){
        $("#h1").click();
    }
});
//	}
