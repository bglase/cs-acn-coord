var HID = require('node-hid');
//var REPL = require('repl');

//var repl = REPL.start('node-hid> ');
var device = new HID.HID(1118, 654);

//console.log('features', hid.getFeatureReport(0xf2, 17));
device.on("data", function(data) {
    console.log('got xbox data', data);

});

device.on("error", function(err) {
	console.log( err );
});
/*
hid.gotData = function (err, data) {
    console.log('got xbox data', data);
    this.read(this.gotData.bind(this));
}*/

//hid.read(hid.gotData.bind(hid));

//repl.context.hid = hid;
