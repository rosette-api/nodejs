"use strict";

var Api = require("../lib/Api");
var ArgumentParser = require("argparse").ArgumentParser;

var parser = new ArgumentParser({
    addHelp: true,
    description: "Get the transliteration from a piece of text"
});
parser.addArgument(["--key"], {help: "Rosette API key", required: true});
parser.addArgument(["--url"], {help: "Rosette API alt-url", required: false});
var args = parser.parseArgs();

var api = new Api(args.key, args.url);
var endpoint = "transliteration";

var transliteration_data = "Bill Gates, Microsoft's former CEO, is a philanthropist.";
var content = transliteration_data;

api.parameters.content = content;
api.parameters.targetLanguage = "eng";
api.parameters.targetScript = "Latn";
api.parameters.sourceLanguage = "eng";
api.parameters.sourceScript = "Latn";

api.rosette(endpoint, function(err, res) {
    if (err) {
        console.log(err);
    } else {
        console.log(JSON.stringify(res, null, 2));
    }
});
