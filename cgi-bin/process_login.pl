#!/usr/bin/perl
use CGI;
use JSON;
use DBI;
use Data::Dumper;
########################################################################
#
# Validate the user login
#
#
########################################################################
my ($dbh, $update_sth, $update_sql, $login_data_sth, $login_data_sql);
my ($row, $login_data);

$| = 1;

open FILE,">/var/www/TutorSite/cgi-bin/param.txt";


########################################################################
# Get CGI data
my $q    = new CGI;
my $user = $q->param( "cur_user" ) || shift;
my $password = $q->param( "cur_pw" ) || shift;
my $type = $q->param( "type" ) || shift;

print FILE "User: $user\tPassword: $password\n";
########################################################################
# Get database connection
$dbh = &get_dbh();


eval {
########################################################################
# Check login
	$login_data_sql = "select * from Users where username=? and password=?";
	$login_data_sth = &get_sth($dbh, $login_data_sql);
	$login_data_sth->execute($user,$password);
};
if ($@) {
	print "Select Error: $@\n"
}

########################################################################
# Set the loggedin value for this user
$success = 0;
# check for the user record
#if (my $row = $login_data_sth->fetchrow_hashref ){

	eval {
		# create update sql
		if ($type =~ m/login/){
			$update_sql = "update Users set loggedin='Y' where username=? and password=?";
		} else {
			$update_sql = "Replace Into Users set loggedin='Y',username=?,password=?";
		}
		$update_sth = &get_sth($dbh, $update_sql);
		$update_sth->execute($user,$password);


		$update_sql = "Select loggedin From Users where username=? and password=?";
		$update_sth = &get_sth($dbh, $update_sql);
		$update_sth->execute($user,$password);
		$success = 1 if ($update_sth->rows() > 0);

	};
	if ($@) {
		print "Update Error: $@\n"
	}
#}

$login_data_sth->finish();
$update_sth->finish();

########################################################################
# Create and send json
my $ret_array->{'ret_val'} = $success;
my $json = encode_json $ret_array;
print "Content-type: text/html\r\n\r\n";
#print " ";
print "$json\n";





########################################################################
# Support subroutines

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


