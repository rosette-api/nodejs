## Endpoint Examples
Each example file demonstrates one of the capabilities of the Rosette Platform.

Here are some methods for running the examples. Each example will also accept an optional `--url` parameter for
overriding the default URL.

A note on prerequisites. Rosette API only supports TLS 1.2 so ensure your toolchain also supports it.

#### Docker/Latest Release
```
git clone git@github.com:rosette-api/nodejs.git
cd nodejs/examples
docker run -it --entrypoint sh -v $(pwd):/examples node:12-alpine
cd /examples
npm install rosette-api argparse
sed -i s',require("../lib/Api"),require("rosette-api"),' ping.js
node ping.js --key $API_KEY
```

#### Docker/Current Source
```
git clone git@github.com:rosette-api/nodejs.git
cd nodejs
docker run -it --entrypoint sh -v $(pwd):/source node:12-alpine
cd /source
npm install
cd examples
node ping.js --key $API_KEY
```
