#!/usr/bin/perl
use CGI;
use JSON;
use Data::Dumper;

=comment
Save returned data
=cut
my $q    = new CGI;
my $loc_mode = $q->param( "mode" ) || shift;


=comment
Open Log file
=cut
open FILE,">/var/www/TutorSite/cgi-bin/param.txt";
print FILE "Loc_mode: $loc_mode \n Dumper: " .Dumper($q)."\n";

=build new data
=cut
my @rec_array;
my $cnt = 0;
my $max = 20;
my $save_val;

while ( $cnt < $max) {
	my %rec_hash = ('numerator' => int(rand(20)), 'denominator' => int(rand(20)), 'result' => int(rand(20)));
	if ($rec_hash{'numerator'} < $rec_hash{'denominator'}){
		$save_val = $rec_hash{'numerator'};
		$rec_hash{'numerator'} = $rec_hash{'denominator'};
		$rec_hash{'denominator'} = $save_val;
	}
	push @rec_array, \%rec_hash;
	$cnt += 1;
}

my $json = encode_json \@rec_array;
print "Content-type: text/html\r\n\r\n";
print "$json\n";

