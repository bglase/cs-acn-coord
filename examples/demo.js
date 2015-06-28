
var AcnCoordinator = require('./cs-acn-coord');
var coord = new AcnCoordinator();

console.log(coord.serialNumber + ' online');

// Include a console server for interactive use
var REPL = require("repl");

// Start the console evaluator
var repl = REPL.start('acn-coord> ');

// Make the coordinator object available in the console as variable 'co'
repl.context.co = coord;



//Setup & Connection event handlers
coord.on('connected', function() {
  console.log('Coordinator connected');
});

coord.on('not-found', function() {
  console.log('Coordinator could not be found');
});


// operational event handlers
coord.on('a:press', function (key) {
  var message = JSON.stringify({ serialNumber: coord.serialNumber, button: 'a', action:'press' });
  console.log(message);
});

coord.on('a:release', function(key) {
  var message = JSON.stringify({ serialNumber: coord.serialNumber, button: 'a', action:'release' });
  console.log(message);
});


