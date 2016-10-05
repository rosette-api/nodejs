"use strict";

var Api = require("../lib/Api");
var ArgumentParser = require("argparse").ArgumentParser;

var parser = new ArgumentParser({
    addHelp: true,
    description: "Get the relationships from a piece of text"
});
parser.addArgument(["--key"], {help: "Rosette API key", required: true});
parser.addArgument(["--url"], {help: "Rosette API alt-url", required: false});
var args = parser.parseArgs();

var api = new Api(args.key, args.url);
var endpoint = "relationships";

var relationships_text_data = "Bill Gates, Microsoft's former CEO, is a philanthropist.";
var content = relationships_text_data;

api.parameters.content = content;
api.parameters.options = { "accuracyMode": "PRECISION" };

api.rosette(endpoint, function(err, res) {
    if (err) {
        console.log(err);
    } else {
        console.log(JSON.stringify(res, null, 2));
    }
});
