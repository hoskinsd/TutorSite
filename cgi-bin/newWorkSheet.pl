#!/usr/bin/perl

use JSON;
#use JSON::XS;


my @rec_array;

my %rec_hash1 = ('numerator' => 50, 'denominator' => 20, 'result' => 30);
my %rec_hash2 = ('numerator' => 10, 'denominator' => 20, 'result' => 30);
my %rec_hash3 = ('numerator' => 10, 'denominator' => 20, 'result' => 30);
my %rec_hash4 = ('numerator' => 10, 'denominator' => 20, 'result' => 30);
my %rec_hash5 = ('numerator' => 10, 'denominator' => 20, 'result' => 30);

push @rec_array, \%rec_hash1;
push @rec_array, \%rec_hash2;
push @rec_array, \%rec_hash3;
push @rec_array, \%rec_hash4;
push @rec_array, \%rec_hash5;

my $json = encode_json \@rec_array;
print "Content-type: text/html\r\n\r\n";
print "$json\n";

=comment
print "Content-type: text/html\r\n\r\n";
#print "<!DOCTYPE html>"
print <<EOF;


<id1>
	<numerator>
	10
	</numerator>
	<denominator>
	20
	</denominator>
	<result>
	30
	</result>
</id1>
<id2>
	<numerator>
	10
	</numerator>
	<denominator>
	20
	</denominator>
	<result>
	30
	</result>
</id2>
<id3>
	<numerator>
	10
	</numerator>
	<denominator>
	20
	</denominator>
	<result>
	30
	</result>
</id3>
<id4>
	<numerator>
	10
	</numerator>
	<denominator>
	20
	</denominator>
	<result>
	30
	</result>
</id4>
<id5>
	<numerator>
	10
	</numerator>
	<denominator>
	20
	</denominator>
	<result>
	30
	</result>
</id5>

EOF
=cut


