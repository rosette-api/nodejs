"use strict";

var Api = require("../lib/Api");
var ArgumentParser = require("argparse").ArgumentParser;

var parser = new ArgumentParser({
  add_help: true,
  description: "Get the entities from a piece of text"
});
parser.add_argument("--key", {help: "Analytics API key", required: true});
parser.add_argument("--url", {help: "Analytics API alt-url", required: false});
var args = parser.parse_args();

var api = new Api(args.key, args.url);
var endpoint = "entities";
var entities_text_data = "The Securities and Exchange Commission today announced the leadership of the agency’s trial unit.  Bridget Fitzpatrick has been named Chief Litigation Counsel of the SEC and David Gottesman will continue to serve as the agency’s Deputy Chief Litigation Counsel. Since December 2016, Ms. Fitzpatrick and Mr. Gottesman have served as Co-Acting Chief Litigation Counsel.  In that role, they were jointly responsible for supervising the trial unit at the agency’s Washington D.C. headquarters as well as coordinating with litigators in the SEC’s 11 regional offices around the country.";

api.parameters.content = entities_text_data;

api.rosette(endpoint, function(err, res){
  if(err){
    console.log(err);
  } else {
    console.log(JSON.stringify(res, null, 2));
  }
});
