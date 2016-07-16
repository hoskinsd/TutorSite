#!/usr/bin/perl

use DBI;
use DBD::mysql;
use strict;

print "Content-type: text/html \n\n";

# CONFIG VARIABLES
my ($platform, $database, $host, $port, $tablename, $user, $pw, $dsn);
my ($dbh, $sth, $delete_sth, $sql, $delete_sql);
my ($cnt, $inner_cnt, $max, $inner_max);

$platform = "mysql";
$database = "TutorSite";
$host = "localhost";
$port = "3306";
$tablename = "operator";
$user = "root";
$pw = "prov2717";

#DATA SOURCE NAME
$dsn = "dbi:mysql:$database:localhost:3306";


eval{$dbh = DBI->connect($dsn, $user, $pw);};
if ($@){
	print "DB Connection Error: $@\n";
} else {
	print "DB Connection Succeeded\n";
}


#Gen Operator
$delete_sql = "Delete from operator";
$sql = "Insert into operator Set wsdID=?,sequence=?,value=?";

$delete_sth = $dbh->prepare($delete_sql);
$delete_sth->execute;

$sth = $dbh->prepare($sql);
if ($dbh->err){
	print "Table operator 'prepare' failed\n";
	exit;
}

$cnt=1;
$max=10;
while ($cnt < $max) {

	$sth->execute($cnt,"1","+");
	if ($dbh->err){
		print "Table operator 'execute' failed\n";
		exit;
	}
	$cnt++;
}

#Gen Value

$delete_sql = "Delete from value";
$sql = "Insert into value Set wsdID=?,sequence=?,value=?";

$delete_sth = $dbh->prepare($delete_sql);
$delete_sth->execute;

$sth = $dbh->prepare($sql);
if ($dbh->err){
	print "Table value 'prepare' failed\n";
	exit;
}

$cnt=1;
$max=10;
while ($cnt < $max) {
	$inner_cnt=0;
	$inner_max=2;
	while ($inner_cnt < $inner_max){
		$sth->execute($cnt,$inner_cnt+1,$cnt+$inner_cnt);
		if ($dbh->err){
			print "Table operator 'execute' failed\n";
			exit;
		}
		$inner_cnt++;
	}
	$cnt++;
}







