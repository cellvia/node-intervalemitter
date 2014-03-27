var IntervalEmitter = require('events').EventEmitter,
	timestring = require('timestring');

IntervalEmitter.prototype.interval = function(interval, cb){
	var original = interval;

	if(isNaN(interval))
		interval = interval.parseTime()*1000;

	if( !interval || interval === 0 ) {
		console.log("error assigning IntervalEmitter "+interval);
		process.exit();
	}

	if(interval < 1000){
		console.log("interval too short, minimum one second (1000): "+interval);
		process.exit();
	}

	console.log("refreshing every " + original + " (" + interval + " ms)")

	interval = ""+interval;

	this.on(interval, cb);
	if(!this[interval])
		this[interval] = setInterval( this.emit.bind(this, interval), +interval );
}

module.exports = new IntervalEmitter();