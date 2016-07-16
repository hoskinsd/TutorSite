#!/usr/bin/perl

print "Content-type: text/html\r\n\r\n";
#print "<!DOCTYPE html>"
print <<EOF;


<html>
<head>
	<script src="http://www.w3schools.com/lib/w3data.js"></script>

	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.23/angular.min.js"></script>
	<script src="app.js"></script>
	<style>
		body {
		  background: url(school.jpeg) no-repeat;
		  background-size: 100%;
		}
	</style>
</head>
<body ng-app="workSheet">
Hello Again
<div>
	<p>
	<center>
		<h1>Math Coach</h1>
		<h2>Professional Help When You Need It Most</h2>
	</center>
	</p>
</div>

<table>
	<tr>
		<td>
			<table>
				<tr>
					<td>
						<br>
						<br>
						<br>
						<br>
						<br>
						Resources:
						<br>
						<a href="about.html">About</a>
					</td>
				</tr>
				<tr>
					<td>
						<a>about</a>
					</td>
				</tr>
				<tr>
					<td>
						Work Sheets
						<br>
						<ul>
							<li><a href="addition.html">Addition</a></li>
							<li><a href="subtraction.html">Subtraction</a></li>
							<li><a href="multiplication.html">Mutiplication</a></li>
							<li><a href="division.html">Division</a></li>
							<li><a href="fractions.html">Fractions</a></li>
							<li><a href="fractions.html">Algebra</a></li>
						</ul>
					</td>
				</tr>
				<tr>
					<td>
						<a>about</a>
					</td>
				</tr>
				<tr>
					<td>
						<a href="contactus.html">Contact Us</a>
					</td>
				</tr>
			</table>
		</td>
		<td>
		</td>
	</tr>
</table>
	<div w3-include-html="header.html"></div>
	<div w3-include-html="content.html"></div>
</body>
</html>


<script>
w3IncludeHTML();
</script>

EOF



