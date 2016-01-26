/*
 * Example code to call Rosette API to get sentences in a piece of text.
 */

"use strict";

var Api = require("rosette-api").Api;
var ArgumentParser = require("argparse").ArgumentParser;
var DocumentParameters = require("rosette-api").DocumentParameters;

var parser = new ArgumentParser({
  addHelp: true,
  description: "Get sentences from a piece of text"
});
parser.addArgument(["--key"], {help: "Rosette API key", required: true});
var args = parser.parseArgs();

var docParams = new DocumentParameters();
var sentences_data = "This land is your land. This land is my land\nFrom California to the New York island;\nFrom the red wood forest to the Gulf Stream waters\n\nThis land was made for you and Me.\n\nAs I was walking that ribbon of highway,\nI saw above me that endless skyway:\nI saw below me that golden valley:\nThis land was made for you and me.";
var content = sentences_data;

docParams.setItem("content", content);

var api = new Api(args.key);
api.sentences(docParams, function(err, res) {
  if (err) {
    throw err;
  }
  else {
    console.log(JSON.stringify(res, null, 2));
  }
});
