"use strict";

var Api = require("../lib/Api");
var ArgumentParser = require("argparse").ArgumentParser;

var parser = new ArgumentParser({
  add_help: true,
  description: "Determine the language of a piece of text"
});
parser.add_argument("--key", {help: "Analytics API key", required: true});
parser.add_argument("--url", {help: "Analytics API alt-url", required: false});
var args = parser.parse_args();
var api = new Api(args.key, args.url);
var endpoint = "language";
var appHeader = [];
appHeader[0] = "X-RosetteAPI-App"
appHeader[1] = "app";
api.parameters.customHeaders = [appHeader];

var language_multilingual_data = "On Thursday, as protesters gathered in Washington D.C., the United States Federal Communications Commission under Chairman Ajit Pai voted 3-2 to overturn a 2015 decision, commonly called Net Neutrality, that forbade Internet service providers (ISPs) such as Verizon, Comcast, and AT&T from blocking individual websites or charging websites or customers more for faster load times.  Quatre femmes ont été nommées au Conseil de rédaction de la loi du Qatar. Jeudi, le décret royal du Qatar a annoncé que 28 nouveaux membres ont été nommés pour le Conseil de la Choura du pays.  ذكرت مصادر أمنية يونانية، أن 9 موقوفين من منظمة \"د هـ ك ب ج\" الذين كانت قد أوقفتهم الشرطة اليونانية في وقت سابق كانوا يخططون لاغتيال الرئيس التركي رجب طيب أردوغان.";

api.parameters.content = language_multilingual_data;
var appHeader = [];
appHeader[0] = "X-RosetteAPI-App"
appHeader[1] = "app";
api.parameters.customHeaders = [appHeader];
api.parameters.options = { "multilingual": "true" };

api.rosette(endpoint, function(err, res){
	if(err){
		console.log(err);
	} else {
		console.log(JSON.stringify(res, null, 2));
	}
});
