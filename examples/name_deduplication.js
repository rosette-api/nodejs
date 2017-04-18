"use strict";

var Api = require("../lib/Api");
var ArgumentParser = require("argparse").ArgumentParser;

var parser = new ArgumentParser({
  addHelp: true,
  description: "Deduplicate a list of names"
});
parser.addArgument(["--key"], {help: "Rosette API key", required: true});
parser.addArgument(["--url"], {help: "Rosette API alt-url", required: false});
var args = parser.parseArgs();
var api = new Api(args.key, args.url);
var endpoint = "nameDeduplication";

api.parameters.names = [
	{"text": "John Smith", "language": "eng", "entityType": "PERSON"},
	{"text": "Johnathon Smith", "language": "eng", "entityType": "PERSON"},
	{"text": "Fred Jones Smith", "language": "eng", "entityType": "PERSON"}
];
api.parameters.threshold = 0.75;

api.rosette(endpoint, function(err, res){
	if(err){
		console.log(err);
	} else {
		console.log(JSON.stringify(res, null, 2));
	}
});
