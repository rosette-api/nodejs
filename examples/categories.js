/*
 * Example code to call Rosette API to get a document's (located at given URL) category.
 */

"use strict";

var Api = require("rosette-api").Api;
var ArgumentParser = require("argparse").ArgumentParser;
var DocumentParameters = require("rosette-api").DocumentParameters;

var parser = new ArgumentParser({
  addHelp: true,
  description: "Get the category of a piece of a document at a URL"
});
var categories_url_data = "http://www.onlocationvacations.com/2015/03/05/the-new-ghostbusters-movie-begins-filming-in-boston-in-june/";
parser.addArgument(["--key"], {help: "Rosette API key", required: true});
parser.addArgument(["--url"], {help: "Alternate URL (optional)", defaultValue: "https://api.rosette.com/rest/v1"}); 
var args = parser.parseArgs();

var docParams = new DocumentParameters();
docParams.setItem("contentUri", categories_url_data);

var api = new Api(args.key, args.url);
api.categories(docParams, function(err, res) {
  if (err) {
    throw err;
  }
  else {
    console.log(JSON.stringify(res, null, 2));
  }
});
