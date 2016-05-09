[![Build Status](https://travis-ci.org/rosette-api/nodejs.svg?branch=master)](https://travis-ci.org/rosette-api/nodejs)

# rosette-api

This is the Rosette API client binding for node.js.

## Getting Started
Install the module with: `npm install rosette-api`


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
| content                    | categories, entities, language, morphology, relationships, sentences, sentiment, tokens            | Either content or contentUri required |
| contentUri                      | categories, entities, language, morphology, relationships, sentences, sentiment, tokens       | Either content or contentUri required |
| language                          | categories, entities, language, morphology, relationships, sentences, sentiment, tokens, name similarity                    | No |
| documentFile                      | categories, entities, language, morphology, relationships, sentences, sentiment, tokens                  | No |
| name1                 | name similarity               | Yes |
| name2               | name similarity| Yes |
| name    | name translation     | Yes |
| targetLanguage           | name translation           | Yes |
| entityType                 | name translation         | No |
| sourceLanguageOfOrigin        | name translation | No |
| sourceLanguageOfUse                         | name translation       | No |
| sourceScript                     | name translation               | No |
| targetScript                     | name translation                    | No |
| targetScheme                        | name translation          | No |
| options              | relationships        | No |
| accuracyMode              | relationships        | Yes |
| linked              | entities        | No |
| explain              | sentiment        | No |
| morphology             | morphology        | Yes |

## Additional Examples
See [examples](examples).

## Additional Information
See [Rosette API site](https://developer.rosette.com/)
