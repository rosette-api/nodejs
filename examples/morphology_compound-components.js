"use strict";

var Api = require("../lib/Api");
var ArgumentParser = require("argparse").ArgumentParser;

var parser = new ArgumentParser({
  add_help: true,
  description: "Get the complete morphological analysis of a piece of text"
});
parser.add_argument("--key", {help: "Analytics API key", required: true});
parser.add_argument("--url", {help: "Analytics API alt-url", required: false});
var args = parser.parse_args();
var api = new Api(args.key, args.url);
var endpoint = "morphology";

var morphology_compound_components_data = "Rechtsschutzversicherungsgesellschaften";
var content = morphology_compound_components_data;

api.parameters.content = content;
api.parameters.morphology = "compound-components";

api.rosette(endpoint, function(err, res){
	if(err){
		console.log(err);
	}
		console.log(JSON.stringify(res, null, 2));

});