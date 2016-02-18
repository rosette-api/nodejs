"use strict";

var Api = require("../lib/Api");
var ArgumentParser = require("argparse").ArgumentParser;

var parser = new ArgumentParser({
  addHelp: true,
  description: "Send ping to check for reachability of Rosette API"
});
parser.addArgument(["--key"], {help: "Rosette API key", required: true});
var args = parser.parseArgs();

var api = new Api(args.key);
var endpoint = "ping";

api.rosette(endpoint, function(err, res){
	if(err){
		console.log(err)
	} else {
		console.log(JSON.stringify(res, null, 2));
	}
});