"use strict";

var Api = require("../lib/Api");
var ArgumentParser = require("argparse").ArgumentParser;

var parser = new ArgumentParser({
    add_help: true,
    description: "Get the transliteration from a piece of text"
});
parser.add_argument("--key", {help: "Analytics API key", required: true});
parser.add_argument("--url", {help: "Analytics API alt-url", required: false});
var args = parser.parse_args();

var api = new Api(args.key, args.url);
var endpoint = "transliteration";

var transliteration_data = "ana r2ye7 el gam3a el sa3a 3 el 3asr";

api.parameters.content = transliteration_data;

api.rosette(endpoint, function(err, res) {
    if (err) {
        console.log(err);
    } else {
        console.log(JSON.stringify(res, null, 2));
    }
});
