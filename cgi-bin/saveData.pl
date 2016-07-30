#!/usr/bin/perl
use CGI;
use JSON;
use DBI;
use Data::Dumper;
########################################################################
#
# Save the data info for the current worksheet
#
#	Worksheet data
#	Worksheet problem data
#
########################################################################
my ($dbh, $ws_sth, $ws_data_sth);
my ($row, $num_problems, $ws_sql, $ws_data_sql);

# Open Log file
open FILE,">/var/www/TutorSite/cgi-bin/gradedata.txt";

# Get CGI data
my $q    = new CGI;
my $grade = $q->param( "cur_grade" ) || shift;
my $user = $q->param( "cur_user" ) || shift;
my $type = $q->param( "cur_type" ) || shift;
my $data_array = $q->param( "cur_wsd" ) || shift;
$data_array = decode_json($data_array);

# Get database connection
$dbh = &get_dbh();


# Save worksheet data
$ws_sql = "insert into worksheets set type=?, user=?, grade=?";
$ws_sth = &get_sth($dbh, $ws_sql);
$ws_sth->execute($type,$user,$grade);

# Get the worksheet ID
my $last_ws_id = $ws_sth->{'mysql_insertid'};



# Save problem data
$ws_data_sql = "insert into worksheetdata set WorkSheetID=?, problem=?, val_order=?, value=?";
$ws_data_sth = &get_sth($dbh, $ws_data_sql);


$problem_num = 1;
foreach $row (@$data_array){
   my $numerator = $row->{numerator};
   my $denominator = $row->{denominator};
   my $result = $row->{result};
	eval {
		$ws_data_sth->execute($last_ws_id,$problem_num,"1",$numerator);
		$ws_data_sth->execute($last_ws_id,$problem_num,"2",$denominator);
	};
	if ($@){
		print FILE "DB ws_data_sth execute failed: $@\n";
		die $DBI::errstr;
	}

	$problem_num++;
}

$ws_data_sth->finish();
$ws_sth->finish();


print FILE "Type: $type\tUser: $user\tGrade: $grade\n";
print FILE "Worksheet Data: " . Dumper($data_array) . "\n";



my @retval;
push @retval, "hello";

my $json = encode_json \@retval;

print "Content-type: text/html\r\n\r\n";
print " ";
print "$json\n";


sub get_dbh {
	my $dbh;

	eval {
		$dbh = DBI->connect('dbi:mysql:database=TutorSite','root','prov2717',{AutoCommit=>1,RaiseError=>1,PrintError=>0});
	};
	if ($@){
		print FILE "DB connect to TutorSite failed: $@\n";
		die $DBI::errstr;
	}
	return $dbh;
}


sub get_sth {
	my ($dbh, $sql) = @_;
	my $sth;

	eval {
		$sth = $dbh->prepare($sql);
	};
	if ($@){
		print FILE "DB prepare for $sql failed: $@\n";
		die $DBI::errstr;
	}
	return $sth;
}
