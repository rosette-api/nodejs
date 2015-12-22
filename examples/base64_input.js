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
var args = parser.parseArgs();

var docParams = new DocumentParameters();
var content = new Buffer("Bill Murray will appear in new Ghostbusters film: Dr. Peter Venkman was spotted filming a cameo in Boston this… http://dlvr.it/BnsFfS ").toString('base64');

docParams.setItem("content", content);
docParams.setItem("contentType", rosetteConstants.dataFormat.UNSPECIFIED);

var api = new Api(args.key);
api.entities(docParams, false, function(err, res) {
  if (err) {
    throw err;
  }
  else {
    console.log(res);
  }
});
