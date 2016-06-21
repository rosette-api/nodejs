---
# Docker Image for Node.js Examples
---
### Summary
To simplify the running of the Node.js examples, the Dockerfile will build an image where the examples can be tested against the development source. The unit tests will also be ran using the mock data, the development source will be linted and code coverage will be determined.

### Basic Usage
Build the docker image, e.g. `docker build -t basistech/nodejs:1.1 .`

Run an example as `docker run -e API_KEY=api-key -v "path-to-local-nodejs-dir:/source" basistech/nodejs:1.1`

To test against a specific source file, add `-e FILENAME=filename` before the `-v`, to test against an alternate url, add `-e ALT_URL=alternate_url`.