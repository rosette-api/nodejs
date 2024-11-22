"use strict";

var Api = require("../lib/Api");
var ArgumentParser = require("argparse").ArgumentParser;

var parser = new ArgumentParser({
  add_help: true,
  description: "Get the category of a piece of a document at a URL"
});
parser.add_argument("--key", {help: "Analytics API key", required: true});
parser.add_argument("--url", {help: "Analytics API alt-url", required: false});
var args = parser.parse_args();
var api = new Api(args.key, args.url);
var endpoint = "categories";

var categories_text_data = "If you are a fan of the British television series Downton Abbey and you are planning to be in New York anytime before April 2nd, there is a perfect stop for you while in town.";
api.parameters.content = categories_text_data;

api.rosette(endpoint, function(err, res){
  if(err){
    console.log(err);
  } else {
    console.log(JSON.stringify(res, null, 2));
  }
});
