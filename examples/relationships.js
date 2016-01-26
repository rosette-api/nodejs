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
var args = parser.parseArgs();

var relationshipsParams = new RelationshipsParameters();
var relationships_text_data = "Bill Murray is in the new Ghostbusters film!";
var content = relationships_text_data;

relationshipsParams.setItem("content", content);

var api = new Api(args.key);
api.relationships(relationshipsParams, function(err, res) {
  if (err) {
    throw err;
  }
  else {
    console.log(JSON.stringify(res, null, 2));
  }
});
