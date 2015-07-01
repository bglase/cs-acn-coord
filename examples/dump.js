

// Terminal output formatting
var chalk = require( 'chalk');
var error = chalk.bold.red;
var success = chalk.green;
var heading = chalk.underline;

// Interface to the device
var AcnCoordinator = require('../cs-acn-coord');
var coord = new AcnCoordinator();


console.log(coord.serialNumber + ' online');



// Event occurs when the device is connected
coord.on('connected', function() {

  	console.log( success('Coordinator connected'));
	
	// Retrieve the wireless network status
	coord.getNetwork( function( err, data )) {
		
		console.log( heading( 'Network' ));

		if( err ) {
			console.log( JSON.stringify( err ));
		}
		else {
			console.log( 'Address: 0x' + data.myLongAddress + ' ShortAddr: 0x' + data.myShortAddress );
			console.log( 'PANID: 0x' + data.panId + ' Channel: ' + data.channel );
			
		}

	});

	// Retrieve this device's connection table
	coord.getConnections( function( err, data )) {

		console.log( heading( 'Connections' ));

		if( err ) {
			console.log( JSON.stringify( err ));
		}
		else {
			console.log( 'Handle RX DC PANID ADDR LONG_ADDR        PEER_INFO');

			for( var i = 0; i < data.length; i++ ) {
				console.log( util.format('  %2X   %.1s  %.1s  %.5s %.4s %16s %s', 
					data[i].id,
					data[i].rx,
					data[i].dc,
					data[i].panId,
					data[i].addr,
					data[i].longAddress,
					data[i].peerInfo
					) );
			}

		}

	});

	// Retrieve this device's routing table
	coord.getRoutingTable( function( err, data )) {

		console.log( heading( 'Routing Table' ));

		if( err ) {
			console.log( JSON.stringify( err ));
		}
		else {
			console.log( 'Coordinator NextHop');

			for( var i = 0; i < data.length; i++ ) {
				console.log( util.format('     %2X   %s', 
					data[i].id,
					data[i].nextHop
					) );
			}

		}

	});

});

// The event occurs if the device could not be found
coord.on('not-found', function() {

  console.log( error( 'Coordinator could not be found');

});


