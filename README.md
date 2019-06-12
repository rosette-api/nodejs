[![Build Status](https://travis-ci.org/rosette-api/nodejs.svg?branch=develop)](https://travis-ci.org/rosette-api/nodejs) [![npm version](https://badge.fury.io/js/rosette-api.svg)](https://badge.fury.io/js/rosette-api)

# Node.js client Binding for Rosette API #

## Rosette API
The Rosette Text Analytics Platform uses natural language processing, statistical modeling, and machine learning to
analyze unstructured and semi-structured text across 364 language-encoding-script combinations, revealing valuable
information and actionable data. Rosette provides endpoints for extracting entities and relationships, translating and
comparing the similarity of names, categorizing and adding linguistic tags to text and more.

## Rosette API Access
- Rosette Cloud [Sign Up](https://developer.rosette.com/signup)
- Rosette Enterprise [Evaluation](https://www.rosette.com/product-eval/)

## Quick Start ##

### Installation ###

`npm install rosette-api`

To check your installed version:

- `npm list rosette-api` for local installation
- `npm list -g rosette-api` for global installation

https://www.npmjs.com/package/rosette-api

#### Examples
View small example programs for each Rosette endpoint
in the [examples](https://github.com/rosette-api/nodejs/tree/develop/examples) directory.

#### Documentation & Support
- [Binding API](https://rosette-api.github.io/nodejs/)
- [Rosette Platform API](https://developer.rosette.com/features-and-functions)
- [Binding Release Notes](https://github.com/rosette-api/nodejs/wiki/Release-Notes)
- [Rosette Platform Release Notes](https://support.rosette.com/hc/en-us/articles/360018354971-Release-Notes)
- [Binding/Rosette Platform Compatibility](https://developer.rosette.com/features-and-functions?nodejs#)
- [Support](https://support.rosette.com)
- [Binding License: Apache 2.0](https://github.com/rosette-api/nodejs/blob/develop/LICENSE.txt)

## Binding Developer Information
If you are modifying the binding code, please refer to the [developer README](https://github.com/rosette-api/nodejs/tree/develop/DEVELOPER.md) file.












# rosette-api

This is the Rosette API client binding for node.js.

## Getting Started
Install the module with: `npm install rosette-api`

If the version you are using is not [the latest from npm](https://www.npmjs.com/package/rosette-api) (or `npm show rosette-api@* version`),
please check for its [**compatibilty with api.rosette.com**](https://developer.rosette.com/features-and-functions?javascript).
If you have an on-premise version of Rosette API server, please contact support for
binding compatibility with your installation.

To check your installed version:

- `npm list rosette-api` for local installation
- `npm list -g rosette-api` for global installation

https://www.npmjs.com/package/rosette-api

## Docker ##
A Docker image for running the examples against the compiled source library is available on Docker Hub.

Command: `docker run -e API_KEY=api-key -v "<binding root directory>:/source" rosetteapi/docker-nodejs`

Additional environment settings:
`-e ALT_URL=<alternative URL>`
`-e FILENAME=<single filename>`


## Example using the Rosette API language detection endpoint
```javascript
var Api = require('rosette-api');

var api = new Api(API_KEY);
var endpoint = "language";
var content = "Por favor Señorita, says the man.";
api.parameters.content = content;

api.rosette(endpoint, function(err, res){
	if(err){
		console.log(err);
	} else {
		console.log(JSON.stringify(res, null, 2));
	}
});
```
## API Parameters
| Parameter                     | Endpoint                                            | Required
| -------------                 |-------------                                        |-------------
| content                    | categories, entities, language, morphology, relationships, sentences, sentiment, tokens, topics, transliteration | Either content or contentUri required, transliteration requires content only |
| contentUri                      | categories, entities, language, morphology, relationships, sentences, sentiment, tokens, topics | Either content or contentUri required |
| language                          | categories, entities, language, morphology, relationships, sentences, sentiment, tokens, topics, name similarity | No |
| documentFile                      | categories, entities, language, morphology, relationships, sentences, sentiment, tokens, topics | No |
| name1                 | name similarity               | Yes |
| name2               | name similarity| Yes |
| name    | name translation     | Yes |
| names   | name deduplication   | Yes |
| targetLanguage           | name translation, transliteration (No)          | Yes |
| entityType                 | name translation         | No |
| sourceLanguageOfOrigin        | name translation | No |
| sourceLanguageOfUse                         | name translation       | No |
| sourceLanguage  | transliteration | No |
| sourceScript                     | name translation, transliteration              | No |
| targetScript                     | name translation, transliteration                    | No |
| targetScheme                        | name translation          | No |
| options              | relationships        | No |
| accuracyMode              | relationships        | Yes |
| explain              | sentiment        | No |
| morphology             | morphology        | Yes |

## Additional Examples
See [examples](examples).

## API Documentation
See [documentation](http://rosette-api.github.io/nodejs)

## Release Notes
See [wiki](https://github.com/rosette-api/nodejs/wiki/Release-Notes)

## Additional Information
See [Rosette API site](https://developer.rosette.com/)
