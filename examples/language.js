"use strict";

var Api = require("../lib/Api");
var ArgumentParser = require("argparse").ArgumentParser;

var parser = new ArgumentParser({
  addHelp: true,
  description: "Determine the language of a piece of text"
});
parser.addArgument(["--key"], {help: "Rosette API key", required: true});
parser.addArgument(["--url"], {help: "Rosette API alt-url", required: false});
var args = parser.parseArgs();
var api = new Api(args.key, args.url);
var endpoint = "language";
var appHeader = [];
appHeader[0] = "X-RosetteAPI-App"
appHeader[1] = "app";
api.parameters.customHeaders = [appHeader];

var language_data = "Por favor Señorita, says the man.";

api.parameters.content = language_data;
var appHeader = [];
appHeader[0] = "X-RosetteAPI-App"
appHeader[1] = "app";
api.parameters.customHeaders = [appHeader];

api.rosette(endpoint, function(err, res){
	if(err){
		console.log(err);
	} else {
		console.log(JSON.stringify(res, null, 2));
	}
});
