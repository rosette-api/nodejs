"use strict";

var Api = require("../lib/Api");
var ArgumentParser = require("argparse").ArgumentParser;

var parser = new ArgumentParser({
  add_help: true,
  description: "Get the similarity score of two names"
});
parser.add_argument("--key", {help: "Analytics API key", required: true});
parser.add_argument("--url", {help: "Analytics API alt-url", required: false});
var args = parser.parse_args();
var api = new Api(args.key, args.url);
var endpoint = "addressSimilarity";

api.parameters.address1 = {"houseNumber": "1600", "road": "Pennsylvania Ave NW", "city": "Washington", "state": "DC", "postCode": "20500"}
api.parameters.address2 = "160 Pennsilvana Avenue, Washington, D.C., 20500"

api.rosette(endpoint, function(err, res){
  if(err){
    console.log(err);
  } else {
    console.log(JSON.stringify(res, null, 2));
  }
});
