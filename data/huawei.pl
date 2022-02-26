#!/usr/bin/perl

use warnings;
use strict;
use DBI;

my $filename = '/home/guilh/guilhermelopeseng/challeng-virtex/data/OntInfo - Huawei.txt';

open(FH, '<', $filename) or die $!;

my $db = DBI->connect("DBI:mysql:virtex:127.0.0.1:3306", 'root', 'virtex');
my $sth = $db->prepare("DROP TABLE Huawei");
$sth->execute();
$sth = $db->prepare("CREATE TABLE Huawei(
		OntId INT NOT NULL UNIQUE AUTO_INCREMENT,
		SnKey VARCHAR(255) NOT NULL,
		Slot INT,
		Port INT,
		Status VARCHAR(255)
	);");
$sth->execute();


while (<FH>) {
	my $data = $_;

	my @data = $data =~ /(\d)\s*\/\s*(\d)\s*\/\s*(\d)\s*(\d+)\s*(\w+).*?(online|offiline)/;

	my ($flame, $slot, $port, $ont_id, $sn, $status) = @data;

	print "@data\n" if defined $slot ne '' and defined $port ne '';

	if(defined $slot ne '' and defined $port ne ''){
		my $query = "INSERT INTO Huawei (OntId, SnKey, Slot, Port, Status) VALUES ('$ont_id', '$sn', '$slot', '$port', '$status');";
		print "$query\n";
		$sth = $db->prepare($query);
		$sth->execute();
	}
}

close(FH);