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

var name_dedupe_data = "John Smith,Johnathon Smith,Fred Jones";

api.parameters.names = name_dedupe_data.split(",").map(function(name) {
	return {"text": name, "language": "eng", "entityType": "PERSON"}
});
api.parameters.threshold = 0.75;

api.rosette(endpoint, function(err, res){
	if(err){
		console.log(err);
	} else {
		console.log(JSON.stringify(res, null, 2));
	}
});
