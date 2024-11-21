"use strict";

var Api = require("../lib/Api");
var ArgumentParser = require("argparse").ArgumentParser;

var parser = new ArgumentParser({
  add_help: true,
  description: "Determine the language of a piece of text"
});
parser.add_argument("--key", {help: "Analytics API key", required: true});
parser.add_argument("--url", {help: "Analytics API alt-url", required: false});
var args = parser.parse_args();
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
