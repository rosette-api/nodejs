/*
 * Example code to call Rosette API to get a document's sentiment from a local file.
 */

"use strict";

var Api = require("rosette-api").Api;
var ArgumentParser = require("argparse").ArgumentParser;
var DocumentParameters = require("rosette-api").DocumentParameters;
var tmp = require("temporary");

var parser = new ArgumentParser({
  addHelp: true,
  description: "Get the sentiment of the text in a local file"
});
parser.addArgument(["--key"], {help: "Rosette API key", required: true});
parser.addArgument(["--url"], {help: "Alternate URL (optional)", defaultValue: "https://api.rosette.com/rest/v1"}); 
var args = parser.parseArgs();

var docParams = new DocumentParameters();

var file = new tmp.File();
var sentiment_file_data = "<html><head><title>New Ghostbusters Film</title></head><body><p>Original Ghostbuster Dan Aykroyd, who also co-wrote the 1984 Ghostbusters film, couldn’t be more pleased with the new all-female Ghostbusters cast, telling The Hollywood Reporter, “The Aykroyd family is delighted by this inheritance of the Ghostbusters torch by these most magnificent women in comedy.”</p></body></html>";
var fileContents = sentiment_file_data;

file.writeFileSync(fileContents);

docParams.loadDocumentFile(file.path);
file.unlink();

var api = new Api(args.key, args.url);
api.sentiment(docParams, function(err, res) {
  if (err) {
    throw err;
  }
  else {
    console.log(JSON.stringify(res, null, 2));
  }
});
