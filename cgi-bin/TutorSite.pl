#!/usr/bin/perl

print "Content-type: text/html\r\n\r\n";
#print "<!DOCTYPE html>"
print <<EOF;


<html>
<head>
	<script src="http://www.w3schools.com/lib/w3data.js"></script>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
	<link rel="import" href="http://174.49.32.201/TutorSite/html_head.html">
	<script type = "text/javascript" src="http://174.49.32.201/TutorSite/jquery-3.0.0.js"></script>
	<script type = "text/javascript"  src="http://174.49.32.201/TutorSite/main_page.js"></script>

	<style>
		body {
		  background: url(http://174.49.32.201/TutorSite/school.jpeg) no-repeat;
		  background-size: 100%;
		}
		
		#login{
		  top: 0;
		  left: 80%;
		  width: 10%;
		  height: 10%;
		  position: relative;
		}

		#header,
		#content {
		  width: 100%;
		  height: 80%;
		  position: absolute;
		  top: 0;
		  left: 0;
		}

		#inbutton{
		  top: 65%;
		  left: 10;
		  height: 10%;
		  width: 10%;
		  position: absolute;
		}
		#login {
		  z-index: 10;
		}
		#output{
		  top: 70%;
		  left: 10;
		  height: 10%;
		  width: 10%;
		  position: absolute;
		}
	</style>
</head>
<body ng-app="workSheet">

		<div id="login"></div>
		<div id='header' w3-include-html="http://174.49.32.201/TutorSite/header.html"></div>
		<div id='content' w3-include-html="http://174.49.32.201/TutorSite/content.html"></div>
	
		<div id='inbutton'>	<input id="loginbutton" type="button" value="Login" onclick="login_popup();" /></div>
		<div id='output'></div>
</body>
</html>


<script>
w3IncludeHTML();
</script>

EOF



