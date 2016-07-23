#!/usr/bin/perl
use CGI;
use JSON;
#use JSON::XS;
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

my %rec_hash1 = ('numerator' => int(rand(20)), 'denominator' => int(rand(20)), 'result' => int(rand(20)));
my %rec_hash2 = ('numerator' => int(rand(20)), 'denominator' => int(rand(20)), 'result' => int(rand(20)));
my %rec_hash3 = ('numerator' => int(rand(20)), 'denominator' => int(rand(20)), 'result' => int(rand(20)));
my %rec_hash4 = ('numerator' => int(rand(20)), 'denominator' => int(rand(20)), 'result' => int(rand(20)));
my %rec_hash5 = ('numerator' => int(rand(20)), 'denominator' => int(rand(20)), 'result' => int(rand(20)));

push @rec_array, \%rec_hash1;
push @rec_array, \%rec_hash2;
push @rec_array, \%rec_hash3;
push @rec_array, \%rec_hash4;
push @rec_array, \%rec_hash5;

my $json = encode_json \@rec_array;
print "Content-type: text/html\r\n\r\n";
print "$json\n";

