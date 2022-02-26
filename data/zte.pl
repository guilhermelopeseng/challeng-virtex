#!/usr/bin/perl

use warnings;
use strict;
use DBI;
use Data::Dumper;

my $filename_states = './OntInfo - ZTE - SNs - State.txt';
my $filename_zte = './OntInfo - ZTE - SNs.txt';

open(FHS, '<', $filename_states) or die $!;
open(FHZ, '<', $filename_zte) or die $!;

my $db = DBI->connect("DBI:mysql:virtex:127.0.0.1:3306", 'root', 'virtex');
my $sth = $db->prepare("DROP TABLE Zte");
$sth->execute();
$sth = $db->prepare("CREATE TABLE Zte(
		OntId INT NOT NULL UNIQUE AUTO_INCREMENT,
		SnKey VARCHAR(255) NOT NULL,
		Slot INT,
		Port INT,
		Status VARCHAR(255)
	);");
$sth->execute();

my $hash;

while (<FHZ>) {
	my $data = $_;

	my @data = $data =~ /\/\s*(\d)\s*\/\s*(\d)\s*:\s*(\d+).*?SN:(\w*)/;

	my ($slot, $port, $ont_id, $sn) = @data;

	if(defined $slot ne '' and defined $port ne ''){
		$hash->{$ont_id}->{'slot'} = $slot;
		$hash->{$ont_id}->{'port'} = $port;
		$hash->{$ont_id}->{'sn'} = $sn;
	}

}

while (<FHS>) {
	my $data = $_;

	my ($ont_id, $state) = $data =~ /:(\d+).*?(Offline|Online|working|DyingGasp)/i;

	$hash->{$ont_id}->{'state'} = $state if defined $ont_id ne '' and defined $state ne '';

}

foreach my $key (keys %{$hash}) {

	my $sn = $hash->{$key}->{'sn'};
	my $slot = $hash->{$key}->{'slot'};
	my $port = $hash->{$key}->{'port'};
	my $state = $hash->{$key}->{'state'};

	my $query = "INSERT INTO Zte (OntId, SnKey, Slot, Port, Status) VALUES ('$key', '$sn', '$slot', '$port', '$state');";
	print "$query\n";
	$sth = $db->prepare($query);
	$sth->execute();
}

close(FHZ);
close(FHS);
