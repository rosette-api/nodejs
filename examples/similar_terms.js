 "use strict";

 var Api = require("../lib/Api");
 var ArgumentParser = require("argparse").ArgumentParser;

 var parser = new ArgumentParser({
   add_help: true,
   description: "Get the terms similar to an input in other languages"
 });
 parser.add_argument("--key", {help: "Analytics API key", required: true});
 parser.add_argument("--url", {help: "Analytics API alt-url", required: false});
 var args = parser.parse_args();

 var api = new Api(args.key, args.url);
 var endpoint = "similarTerms";
 var similar_terms_data = "spy"
 var options = {"resultLanguages": ["spa", "deu", "jpn"]}

 api.parameters.content = similar_terms_data;
 api.parameters.options = options;
 api.rosette(endpoint, function(err, res){
    if(err){
        console.log(err);
    } else {
        console.log(JSON.stringify(res, null, 2));
    }
 });