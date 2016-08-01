#!/usr/bin/perl
use CGI;
use JSON;
use Data::Dumper;

=comment
Save returned data
=cut
my $q    = new CGI;
my $loc_type = $q->param( "type" ) || shift;


=comment
Open Log file
=cut
open FILE,">/var/www/TutorSite/cgi-bin/param.txt";
print FILE "Loc_type: $loc_type \n Dumper: " .Dumper($q)."\n";

=build new data
=cut
my @rec_array;
my $cnt = 0;
my $max = 20;
my $save_val;

# Limit the first value to multiples of the second number for division data
if ($loc_type =~ m/division/){
	while ( $cnt < $max) {
		my %rec_hash = ('numerator' => int(rand(10)), 'denominator' => int(rand(10)), 'result' => int(rand(20)));
		$rec_hash{'numerator'} = int(rand(10)) while ($rec_hash{'numerator'} == 0);
		$rec_hash{'denominator'} = int(rand(10)) while ($rec_hash{'denominator'} == 0);
		$rec_hash{'numerator'} *= $rec_hash{'denominator'};
		push @rec_array, \%rec_hash;
		$cnt += 1;
	}
} else {
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
}
my $json = encode_json \@rec_array;
print "Content-type: text/html\r\n\r\n";
print "$json\n";

