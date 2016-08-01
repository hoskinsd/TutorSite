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

while ( $cnt < $max) {
	my %rec_hash;
	# Limit the first value to multiples of the second number for division data
	if ($loc_type =~ m/division/){
		%rec_hash = ('operand1' => int(rand(10)), 'operand2' => int(rand(10)), 'result' => int(rand(20)));
		$rec_hash{'operand1'} = int(rand(10)) while ($rec_hash{'operand1'} == 0);
		$rec_hash{'operand2'} = int(rand(10)) while ($rec_hash{'operand2'} == 0);
		$rec_hash{'operand1'} *= $rec_hash{'operand2'};
	} else {
		%rec_hash = ('operand1' => int(rand(20)), 'operand2' => int(rand(20)), 'result' => int(rand(20)));
		if ($rec_hash{'operand1'} < $rec_hash{'operand2'}){
			$save_val = $rec_hash{'operand1'};
			$rec_hash{'operand1'} = $rec_hash{'operand2'};
			$rec_hash{'operand2'} = $save_val;
		}
	}
	push @rec_array, \%rec_hash;
	$cnt += 1;
}

my $json = encode_json \@rec_array;
print "Content-type: text/html\r\n\r\n";
print "$json\n";

