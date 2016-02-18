"use strict";

var Api = require("../lib/Api");
var ArgumentParser = require("argparse").ArgumentParser;

var parser = new ArgumentParser({
  addHelp: true,
  description: "Translate a name from one language to another"
});
parser.addArgument(["--key"], {help: "Rosette API key", required: true});
var args = parser.parseArgs();
var api = new Api(args.key);
var endpoint = "translatedName";

var translated_name_data = "معمر محمد أبو منيار القذاف";
api.parameters.name = translated_name_data;
api.parameters.entityType = "PERSON";
api.parameters.targetLanguage = "eng";

api.rosette(endpoint, function(err, res){
	if(err){
		console.log(err);
	} else {
		console.log(JSON.stringify(res, null, 2));
	}
});