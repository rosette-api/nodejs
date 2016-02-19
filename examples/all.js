"use strict";

var Api = require("../lib/Api");
var ArgumentParser = require("argparse").ArgumentParser;
var tmp = require("temporary");

var parser = new ArgumentParser({
  addHelp: true,
  description: "Determine the language of a piece of text"
});
parser.addArgument(["--key"], {help: "Rosette API key", required: true});
var args = parser.parseArgs();
var api = new Api(args.key);
var endpoint = "language";

var content = "Por favor Señorita, says the man.";

api.parameters.content = content;

api.rosette(endpoint, function(err, res){
	if(err){
		console.log(err);
	} else {
		console.log(JSON.stringify(res, null, 2));
		var spi = new Api(args.key);
		endpoint = "categories";
        var categories_url_data = "http://www.onlocationvacations.com/2015/03/05/the-new-ghostbusters-movie-begins-filming-in-boston-in-june/";
        spi.parameters.contentUri = categories_url_data;
        spi.parameters.content = null;

        spi.rosette(endpoint, function(err, res){
	        if(err){
		         console.log(err);
	        } else {
		        console.log(JSON.stringify(res, null, 2));
		        endpoint = "entities";
		        var dpi = new Api(args.key);
               dpi.parameters.content = "Bill Murray will appear in new Ghostbusters film: Dr. Peter Venkman was spotted filming a cameo in Boston this… http://dlvr.it/BnsFfS";
               dpi.parameters.contentUri = null;

               dpi.rosette(endpoint, function(err, res){
	               if(err){
		               console.log(err);
	               } else {
		               console.log(JSON.stringify(res, null, 2));

		               endpoint  = "entities";
						var fpi = new Api(args.key);
                       fpi.parameters.content = "Last month director Paul Feig announced the movie will have an all-star female cast including Kristen Wiig, Melissa McCarthy, Leslie Jones and Kate McKinnon.";
                       fpi.parameters.linked = true;

                       fpi.rosette(endpoint, function(err, res){
	                       if(err){
		                       console.log(err);
	                       } else {
		                       console.log(JSON.stringify(res, null, 2));
                               var gpi = new Api(args.key);
		                       endpoint = "info";
		                       gpi.parameters.linked = false;

                               gpi.rosette(endpoint, function(err, res){
	                               if(err){
		                               console.log(err);
	                               } else {
		                               console.log(JSON.stringify(res, null, 2));
                                       var hpi = new Api(args.key);
		                               endpoint = "matchedName";

                                       var matched_name_data1 = "Michael Jackson";
                                       var matched_name_data2 = "迈克尔·杰克逊";

                                       hpi.parameters.name1 = {"text": matched_name_data1, "language": "eng", "entityType": "PERSON"};
                                       hpi.parameters.name2 = {"text": matched_name_data2, "entityType": "PERSON"};

                                       hpi.rosette(endpoint, function(err, res){
	                                       if(err){
		                                       console.log(err);
	                                       } else {
		                                       console.log(JSON.stringify(res, null, 2));
                                               var jpi = new Api(args.key);
		                                       jpi.parameters.name1 = null;
                                               jpi.parameters.name2 = null;

                                               endpoint = "morphology";

                                               var morphology_complete_data = "The quick brown fox jumped over the lazy dog. Yes he did.";
                                               var content = morphology_complete_data;

                                               jpi.parameters.content = content;
                                               jpi.parameters.morphology = "complete";

                                               jpi.rosette(endpoint, function(err, res){
	                                               if(err){
		                                               console.log(err);
	                                               } else {
		                                               console.log(JSON.stringify(res, null, 2));
                                                       var kpi = new Api(args.key);
		                                               var morphology_han_readings_data = "北京大学生物系主任办公室内部会议";
                                                       content = morphology_han_readings_data;

                                                       kpi.parameters.content = content;
                                                       kpi.parameters.morphology = "han-readings";

                                                       kpi.rosette(endpoint, function(err, res){
	                                                       if(err){
		                                                       console.log(err);
	                                                       } else {
		                                                       console.log(JSON.stringify(res, null, 2));
                                                               var lpi = new Api(args.key);
		                                                       var morphology_lemmas_data = "The fact is that the geese just went back to get a rest and I'm not banking on their return soon";
                                                               content = morphology_lemmas_data;

                                                               lpi.parameters.content = content;
                                                               lpi.parameters.morphology = "lemmas";

                                                               lpi.rosette(endpoint, function(err, res){
	                                                               if(err){
		                                                               console.log(err);
	                                                               } else {
		                                                               console.log(JSON.stringify(res, null, 2));
                                                                       var zpi = new Api(args.key);
		                                                               var morphology_parts_of_speech_data = "The fact is that the geese just went back to get a rest and I'm not banking on their return soon";
                                                                       content = morphology_parts_of_speech_data;

                                                                        zpi.parameters.content = content;
																		zpi.parameters.morphology = "parts-of-speech";

																		zpi.rosette(endpoint, function(err, res){
																			if(err){
																				console.log(err);
																			} else {
																				console.log(JSON.stringify(res, null, 2));
																				var xpi = new Api(args.key);
																				endpoint = "ping";

																				xpi.rosette(endpoint, function(err, res){
																					if(err){
																						console.log(err)
																					} else {
																						console.log(JSON.stringify(res, null, 2));
                                                                                        var cpi = new Api(args.key);
																						endpoint = "relationships";

																						var relationships_text_data = "Bill Murray is in the new Ghostbusters film!";
																						var content = relationships_text_data;

																						cpi.parameters.content = content;
																						cpi.parameters.accuracyMode = "precision";

																						cpi.rosette(endpoint, function(err, res){
																							if(err){
																								console.log(err);
																							} else {
																								console.log(JSON.stringify(res, null, 2));
                                                                                                var vpi = new Api(args.key);
																								endpoint = "sentences";

																								var sentences_data = "This land is your land. This land is my land\nFrom California to the New York island;\nFrom the red wood forest to the Gulf Stream waters\n\nThis land was made for you and Me.\n\nAs I was walking that ribbon of highway,\nI saw above me that endless skyway:\nI saw below me that golden valley:\nThis land was made for you and me.";
																								var content = sentences_data;

																								vpi.parameters.content = content;

																								vpi.rosette(endpoint, function(err, res){
																									if(err){
																										console.log(err);
																									} else {
																										console.log(JSON.stringify(res, null, 2));
																										var bpi = new Api(args.key);
																										var file = new tmp.File();
																										var sentiment_file_data = "<html><head><title>New Ghostbusters Film</title></head><body><p>Original Ghostbuster Dan Aykroyd, who also co-wrote the 1984 Ghostbusters film, couldn’t be more pleased with the new all-female Ghostbusters cast, telling The Hollywood Reporter, “The Aykroyd family is delighted by this inheritance of the Ghostbusters torch by these most magnificent women in comedy.”</p></body></html>";
																										var fileContents = sentiment_file_data;

																										file.writeFileSync(fileContents);

																										endpoint = "sentiment";

																										bpi.parameters.documentFile = file.path;

																										bpi.rosette(endpoint, function(err, res){
																											if(err){
																												console.log(err);
																											} else {
																												console.log(JSON.stringify(res, null, 2));
                                                                                                                var npi = new Api(args.key);
																												endpoint = "tokens";

																												var tokens_data = "北京大学生物系主任办公室内部会议";
																												content = tokens_data;
																												npi.parameters.content = content;

																												npi.rosette(endpoint, function(err, res){
																													if(err){
																														console.log(err);
																													} else {
																														console.log(JSON.stringify(res, null, 2));
																														var mpi = new Api(args.key);
																														endpoint = "translatedName";

																														var translated_name_data = "معمر محمد أبو منيار القذاف";
																														mpi.parameters.name = translated_name_data;
																														mpi.parameters.entityType = "PERSON";
																														mpi.parameters.targetLanguage = "eng";

																														mpi.rosette(endpoint, function(err, res){
																															if(err){
																																console.log(err);
																															} else {
																																console.log(JSON.stringify(res, null, 2));
																															}
																														});
																													}
																												});
																											}
																										});


																									}
																								});
																							}
																						});
																					}
																				});
																			}
																		});
	                                                               }
                                                               });
	                                                       }
                                                       });
	                                               }
                                               });
	                                       }
                                       });
	                               }
                               });
	                       }
                       });
	               }
                });
	        }
        });
	}
});