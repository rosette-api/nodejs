## Binding Developer Info

#### Build and Release Instructions
TBD
Include notes on updating Travis test versions, keeping `package.json` fresh.
Maybe some notes on updating dependency versions, linting, dependency vulnerabilities, etc.
There appears to be some mixed whitespace that should be tidied up.


#### Old Docker Info From Examples
If we want to keep this, let's clean it up.

`runAll.sh` is testing a string instead of an http code.
`runAl.sh` and `Dockerfile` may need to be consolidated with the other example scripts.

Here are the old instructions from examples/README.

##### Docker
A Docker image for running the examples against the compiled source library is available on Docker Hub.

Command: `docker run -e API_KEY=api-key -v "<binding root directory>:/source" rosetteapi/docker-nodejs`

Additional environment settings:
`-e ALT_URL=<alternative URL>`
`-e FILENAME=<single filename>`

##### Example using the Rosette API language detection endpoint
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
