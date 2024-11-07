"use strict";

var Api = require("../lib/Api");
var ArgumentParser = require("argparse").ArgumentParser;

var parser = new ArgumentParser({
  addHelp: true,
  description: "Deduplicate a list of names"
});
parser.addArgument(["--key"], {help: "Analytics API key", required: true});
parser.addArgument(["--url"], {help: "Analytics API alt-url", required: false});
var args = parser.parseArgs();
var api = new Api(args.key, args.url);
var endpoint = "nameDeduplication";

var name_dedupe_data = "Alice Terry,Alice Thierry,Betty Grable,Betty Gable,Norma Shearer,Norm Shearer,Brigitte Helm,Bridget Helem,Judy Holliday,Julie Halliday";

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
