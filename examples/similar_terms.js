 "use strict";

 var Api = require("../lib/Api");
 var ArgumentParser = require("argparse").ArgumentParser;

 var parser = new ArgumentParser({
   addHelp: true,
   description: "Get the terms similar to an input in other languages"
 });
 parser.addArgument(["--key"], {help: "Rosette API key", required: true});
 parser.addArgument(["--url"], {help: "Rosette API alt-url", required: false});
 var args = parser.parseArgs();

 var api = new Api(args.key, args.url);
 var endpoint = "similarTerms";
 var data = "spy"
 var options = {"resultLanguages": ["spa", "deu", "jpn"]}

 api.parameters.content = data;
 api.parameters.options = options;
 api.rosette(endpoint, function(err, res){
    if(err){
        console.log(err);
    } else {
        console.log(JSON.stringify(res, null, 2));
    }
 });