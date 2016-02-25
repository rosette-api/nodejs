/*
 * Example code to call Rosette API to get relationships from a piece of text.
 */

"use strict";

var Api = require("rosette-api").Api;
var ArgumentParser = require("argparse").ArgumentParser;
var RelationshipsParameters = require("rosette-api").RelationshipsParameters;

var parser = new ArgumentParser({
  addHelp: true,
  description: "Get the relationships from a piece of text"
});
parser.addArgument(["--key"], {help: "Rosette API key", required: true});
parser.addArgument(["--url"], {help: "Alternate URL (optional)", defaultValue: "https://api.rosette.com/rest/v1"}); 
var args = parser.parseArgs();

var relationshipsParams = new RelationshipsParameters();
var relationships_text_data = "The Ghostbusters movie was filmed in Boston.";
var content = relationships_text_data;

relationshipsParams.setItem("content", content);

var api = new Api(args.key, args.url);
api.relationships(relationshipsParams, function(err, res) {
  if (err) {
    throw err;
  }
  else {
    console.log(JSON.stringify(res, null, 2));
  }
});
