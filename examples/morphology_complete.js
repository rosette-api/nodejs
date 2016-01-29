/*
 * Example code to call Rosette API to get the complete set of morphological analysis
 * results for a piece of text.
 */

"use strict";

var Api = require("rosette-api").Api;
var ArgumentParser = require("argparse").ArgumentParser;
var DocumentParameters = require("rosette-api").DocumentParameters;

var parser = new ArgumentParser({
  addHelp: true,
  description: "Get the complete morphological analysis of a piece of text"
});
parser.addArgument(["--key"], {help: "Rosette API key", required: true});
parser.addArgument(["--url"], {help: "Alternate URL (optional)", defaultValue: "https://api.rosette.com/rest/v1"}); 
var args = parser.parseArgs();

var docParams = new DocumentParameters();
var morphology_complete_data = "The quick brown fox jumped over the lazy dog. Yes he did.";
var content = morphology_complete_data;
docParams.setItem("content", content);

var api = new Api(args.key, args.url);
api.morphology(docParams, null, function(err, res) {
  if (err) {
    throw err;
  }
  else {
    console.log(JSON.stringify(res, null, 2));
  }
});
