"use strict";

var Api = require("../lib/Api");
var ArgumentParser = require("argparse").ArgumentParser;

var parser = new ArgumentParser({
  add_help: true,
  description: "Get the pairwise similarity score of two list records"
});
parser.add_argument("--key", {help: "Analytics API key", required: true});
parser.add_argument("--url", {help: "Analytics API alt-url", required: false});
var args = parser.parse_args();
var api = new Api(args.key, args.url);
var endpoint = "recordSimilarity";
var fields = {
    "primaryName": {
        "type": "rni_name",
        "weight": 0.5
    },
    "dob": {
        "type": "rni_date",
        "weight": 0.2
    },
    "addr": {
        "type": "rni_address",
        "weight": 0.5
    },
    "dob2": {
        "type": "rni_date",
        "weight": 0.1
    },
    "jobTitle": {
        "type": "rni_string",
        "weight": 0.2
    },
    "age": {
        "type": "rni_number",
        "weight": 0.4
    },
    "isRetired": {
        "type": "rni_boolean",
        "weight": 0.05
    }
}
var records = {
    "left": [
        {
            "primaryName": {
                "text": "Ethan R",
                "entityType": "PERSON",
                "language": "eng",
                "languageOfOrigin": "eng",
                "script": "Latn"
            },
            "dob": "1993-04-16",
            "addr": "123 Roadlane Ave",
            "dob2": {
                "date": "04161993",
                "format": "MMddyyyy"
            },
            "jobTitle": "software engineer"
        },
        {
            "dob": {
                "date": "1993-04-16"
            },
            "primaryName": {
                "text": "Evan R"
            },
            "age": 47,
            "isRetired": false
        }
    ],
    "right": [
        {
            "dob": {
                "date": "1993-04-16"
            },
            "primaryName": {
                "text": "Seth R",
                "language": "eng"
            },
            "jobTitle": "manager",
            "isRetired": true
        },
        {
            "primaryName": "Ivan R",
            "dob": {
                "date": "1993-04-16"
            },
            "addr": {
              "houseNumber": "123",
              "road": "Roadlane Ave"
            },
            "dob2": {
                "date": "1993/04/16"
            },
            "age": 72,
            "isRetired": true
        }
    ]
}
var properties = {
    "parameters": {
        "rightBoostTokens": 1,
        "staticBoostValue": 5
    },
    "includeExplainInfo": true
}

api.parameters.records = records;
api.parameters.fields = fields;
api.parameters.properties = properties;

api.rosette(endpoint, function(err, res){
	if(err){
		console.log(err);
	} else {
		console.log(JSON.stringify(res, null, 2));
	}
});
