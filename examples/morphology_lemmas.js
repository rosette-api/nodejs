/*
 * Example code to call Rosette API to get lemmas for words in a piece of text.
 */

"use strict";

var Api = require("rosette-api").Api;
var ArgumentParser = require("argparse").ArgumentParser;
var DocumentParameters = require("rosette-api").DocumentParameters;
var rosetteConstants = require("rosette-api").rosetteConstants;

var parser = new ArgumentParser({
  addHelp: true,
  description: "Get lemmas for words in a piece of text"
});
parser.addArgument(["--key"], {help: "Rosette API key", required: true});
var args = parser.parseArgs();

var docParams = new DocumentParameters();
var morphology_lemmas_data = "The fact is that the geese just went back to get a rest and I'm not banking on their return soon";
var content = morphology_lemmas_data;
docParams.setItem("content", content);

var api = new Api(args.key);
api.morphology(docParams, rosetteConstants.morpholoyOutput.LEMMAS, function(err, res) {
  if (err) {
    throw err;
  }
  else {
    console.log(JSON.stringify(res, null, 2));
  }
});
