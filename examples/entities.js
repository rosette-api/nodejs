"use strict";

var Api = require("../lib/Api");
var ArgumentParser = require("argparse").ArgumentParser;

var parser = new ArgumentParser({
  addHelp: true,
  description: "Get the entities from a piece of text"
});
parser.addArgument(["--key"], {help: "Analytics API key", required: true});
parser.addArgument(["--url"], {help: "Analytics API alt-url", required: false});
var args = parser.parseArgs();

var api = new Api(args.key, args.url);
var endpoint = "entities";
var entities_text_data = "The Securities and Exchange Commission today announced the leadership of the agency’s trial unit.  Bridget Fitzpatrick has been named Chief Litigation Counsel of the SEC and David Gottesman will continue to serve as the agency’s Deputy Chief Litigation Counsel. Since December 2016, Ms. Fitzpatrick and Mr. Gottesman have served as Co-Acting Chief Litigation Counsel.  In that role, they were jointly responsible for supervising the trial unit at the agency’s Washington D.C. headquarters as well as coordinating with litigators in the SEC’s 11 regional offices around the country.";

//api.parameters.content = entities_text_data;

var result = api.rosette(endpoint, function(err, res){
    console.log("In examples callback");
	if(err){
	    console.log("Returning error");
		return err;
	} else {
	    return res;
	}
});

console.log(result);
