/*
 * Example code to call Rosette API to get entities from a piece of text.
 */

"use strict";

var Api = require("rosette-api").Api;
var ArgumentParser = require("argparse").ArgumentParser;
var DocumentParameters = require("rosette-api").DocumentParameters;
var rosetteConstants = require("rosette-api").rosetteConstants

var parser = new ArgumentParser({
  addHelp: true,
  description: "Get the entities from a piece of text"
});
parser.addArgument(["--key"], {help: "Rosette API key", required: true});
parser.addArgument(["--url"], {help: "Alternate URL (optional)", defaultValue: "https://api.rosette.com/rest/v1"}); 
var args = parser.parseArgs();

var docParams = new DocumentParameters();
var entities_text_data = "Bill Murray will appear in new Ghostbusters film: Dr. Peter Venkman was spotted filming a cameo in Boston this… http://dlvr.it/BnsFfS";
var content = new Buffer(entities_text_data).toString('base64');

docParams.setItem("content", content);
docParams.setItem("contentType", rosetteConstants.dataFormat.UNSPECIFIED);

var api = new Api(args.key, args.url);
api.entities(docParams, false, function(err, res) {
  if (err) {
    throw err;
  }
  else {
    console.log(JSON.stringify(res, null, 2));
  }
});
