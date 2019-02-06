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

var relationships_text_data = "FLIR Systems is headquartered in Oregon and produces thermal imaging, night vision, and infrared cameras and sensor systems.  According to the SEC’s order instituting a settled administrative proceeding, FLIR entered into a multi-million dollar contract to provide thermal binoculars to the Saudi government in November 2008.  Timms and Ramahi were the primary sales employees responsible for the contract, and also were involved in negotiations to sell FLIR’s security cameras to the same government officials.  At the time, Timms was the head of FLIR’s Middle East office in Dubai.";
var content = relationships_text_data;

api.parameters.content = content;

api.rosette(endpoint, function(err, res) {
    if (err) {
        console.log(err);
    } else {
        console.log(JSON.stringify(res, null, 2));
    }
});
