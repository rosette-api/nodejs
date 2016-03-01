"use strict";

var Api = require("../lib/Api");
var ArgumentParser = require("argparse").ArgumentParser;

var parser = new ArgumentParser({
  addHelp: true,
  description: "Get the complete morphological analysis of a piece of text"
});
parser.addArgument(["--key"], {help: "Rosette API key", required: true});
parser.addArgument(["--url"], {help: "Rosette API alt-url", required: false});
var args = parser.parseArgs();
var api = new Api(args.key, args.url);
var endpoint = "morphology";

var morphology_han_readings_data = "北京大学生物系主任办公室内部会议";
var content = morphology_han_readings_data;

api.parameters.content = content;
api.parameters.morphology = "han-readings";

api.rosette(endpoint, function(err, res){
	if(err){
		console.log(err);
	} else {
		console.log(JSON.stringify(res, null, 2));
	}
});