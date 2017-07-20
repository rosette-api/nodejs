[![Build Status](https://travis-ci.org/rosette-api/nodejs.svg?branch=master)](https://travis-ci.org/rosette-api/nodejs)

# rosette-api

This is the Rosette API client binding for node.js.

## Getting Started
Install the module with: `npm install rosette-api`

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
| content                    | categories, entities, language, morphology, relationships, sentences, sentiment, tokens, transliteration            | Either content or contentUri required, transliteration requires content only |
| contentUri                      | categories, entities, language, morphology, relationships, sentences, sentiment, tokens       | Either content or contentUri required |
| language                          | categories, entities, language, morphology, relationships, sentences, sentiment, tokens, name similarity                    | No |
| documentFile                      | categories, entities, language, morphology, relationships, sentences, sentiment, tokens                  | No |
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

## Additional Information
See [Rosette API site](https://developer.rosette.com/)
