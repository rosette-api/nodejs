"use strict"

var assert = require('chai').assert;
var mocha = require('mocha');
var nock = require('nock');
var fs = require('fs');

var language = require("../language");
var relationships = require("../relationships");
var matchedName = require("../matchedName");
var translatedName = require("../translatedName");
var sentiment = require("../sentiment");
var categories = require("../categories");
var entities = require("../entities");
var morphology = require("../morphology");
var tokens = require("../tokens");
var sentences = require("../sentences");
var paramObj = require("../parameters");
//nock.recorder.rec();

var requestArray, statusArray, responseArray;

before(function() {
    // get the names of all the mock data files
    requestArray = fs.readdirSync('../../../mock-data/request/');
    statusArray = fs.readdirSync('../../../mock-data/status/');
    responseArray = fs.readdirSync('../../../mock-data/response/');

});

// recursion function
function langTests(index, done) {
    var substring = "language";

    if (index < requestArray.length) {
        if (requestArray[index].indexOf(substring) > -1) {

            var lang = new language();
            var param = new paramObj();
            var request = fs.readFileSync('../../../mock-data/request/' + requestArray[index]);
            var status = fs.readFileSync('../../../mock-data/status/' + statusArray[index]);
            var response = fs.readFileSync('../../../mock-data/response/' + responseArray[index]);
            var expected = JSON.parse(response.toString());

            // nock interceptor for endpoint 
            nock('https://api.rosette.com', {
                    "encodedQueryParams": true
                })
                .persist()
                .post('/rest/v1/language', JSON.parse(request.toString()))
                .reply(status, response);

            request = JSON.parse(request);
            param.content = request.content;
            if (request.contentUri != undefined) {
                param.contentUri = request.contentUri;
            }
            param.unit = request.unit;
            param.language = request.language;

            lang.getResults(param, '1234567890', 'https://api.rosette.com/rest/v1/', function(err, res) {
                index++;
                console.log(index);
                //console.log(JSON.stringify(expected, null, 1));
                //console.log(JSON.stringify(res, null, 1))
                //console.log(expected)
                //console.log(res)
                //assert.deepEqual(expected, res);
                assert.deepEqual(JSON.stringify(expected, null, 1), JSON.stringify(res, null, 1));
                setTimeout(function() {
                    return langTests(index, done);
                }, 700);
            });

        } else {
            index++;
            return langTests(index, done);
        }
    } else {
        console.log("done");
        done();
    }

}

// recursion function
function sentTests(index, done) {
    var substring = "sentiment";

    if (index < requestArray.length) {
        if (requestArray[index].indexOf(substring) > -1) {

            var sent = new sentiment();
            var param = new paramObj();
            var request = fs.readFileSync('../../../mock-data/request/' + requestArray[index]);
            var status = fs.readFileSync('../../../mock-data/status/' + statusArray[index]);
            var response = fs.readFileSync('../../../mock-data/response/' + responseArray[index]);
            var expected = JSON.parse(response.toString());

            // nock interceptor for endpoint 
            nock('https://api.rosette.com', {
                    "encodedQueryParams": true
                })
                .persist()
                .post('/rest/v1/sentiment', JSON.parse(request.toString()))
                .reply(status, response);

            request = JSON.parse(request);
            param.content = request.content;
            if (request.contentUri != undefined) {
                param.contentUri = request.contentUri;
            }
            param.unit = request.unit;
            param.language = request.language;

            sent.getResults(param, '1234567890', 'https://api.rosette.com/rest/v1/', function(err, res) {
                index++;
                console.log(index);
                //console.log(JSON.stringify(expected, null, 1));
                //console.log(JSON.stringify(res, null, 1))
                //console.log(expected)
                //console.log(res)
                //assert.deepEqual(expected, res);
                assert.deepEqual(JSON.stringify(expected, null, 1), JSON.stringify(res, null, 1));
                setTimeout(function() {
                    return sentTests(index, done);
                }, 700);
            });

        } else {
            index++;
            return sentTests(index, done);
        }
    } else {
        console.log("done");
        done();
    }

}

// recursion function
function catTests(index, done) {
    var substring = "categories";

    if (index < requestArray.length) {
        if (requestArray[index].indexOf(substring) > -1) {

            var cat = new categories();
            var param = new paramObj();
            var request = fs.readFileSync('../../../mock-data/request/' + requestArray[index]);
            var status = fs.readFileSync('../../../mock-data/status/' + statusArray[index]);
            var response = fs.readFileSync('../../../mock-data/response/' + responseArray[index]);
            var expected = JSON.parse(response.toString());

            // nock interceptor for endpoint 
            nock('https://api.rosette.com', {
                    "encodedQueryParams": true
                })
                .persist()
                .post('/rest/v1/categories', JSON.parse(request.toString()))
                .reply(status, response);

            request = JSON.parse(request);
            param.content = request.content;
            if (request.contentUri != undefined) {
                param.contentUri = request.contentUri;
            }
            param.unit = request.unit;
            param.language = request.language;

            cat.getResults(param, '1234567890', 'https://api.rosette.com/rest/v1/', function(err, res) {
                index++;
                console.log(index);
                //console.log(JSON.stringify(expected, null, 1));
                //console.log(JSON.stringify(res, null, 1))
                //console.log(expected)
                //console.log(res)
                //assert.deepEqual(expected, res);
                assert.deepEqual(JSON.stringify(expected, null, 1), JSON.stringify(res, null, 1));
                setTimeout(function() {
                    return catTests(index, done);
                }, 700);
            });

        } else {
            index++;
            return catTests(index, done);
        }
    } else {
        console.log("done");
        done();
    }

}

// recursion function
function morphTests(index, done) {
    var substring = "morphology";

    if (index < requestArray.length) {
        if (requestArray[index].indexOf(substring) > -1) {

            var morph = new morphology();
            var param = new paramObj();
            var request = fs.readFileSync('../../../mock-data/request/' + requestArray[index]);
            var status = fs.readFileSync('../../../mock-data/status/' + statusArray[index]);
            var response = fs.readFileSync('../../../mock-data/response/' + responseArray[index]);
            var expected = JSON.parse(response.toString());

            // nock interceptor for endpoint 
            nock('https://api.rosette.com', {
                    "encodedQueryParams": true
                })
                .persist()
                .post('/rest/v1/morphology', JSON.parse(request.toString()))
                .reply(status, response);

            request = JSON.parse(request);
            param.content = request.content;
            if (request.contentUri != undefined) {
                param.contentUri = request.contentUri;
            }
            param.unit = request.unit;
            param.language = request.language;

            morph.getResults(param, '1234567890', 'https://api.rosette.com/rest/v1/', function(err, res) {
                index++;
                console.log(index);
                //console.log(JSON.stringify(expected, null, 1));
                //console.log(JSON.stringify(res, null, 1))
                //console.log(res)
                //assert.deepEqual(expected, res);
                //assert.deepEqual(JSON.stringify(expected, null, 1), JSON.stringify(res, null, 1));
                setTimeout(function() {
                    return morphTests(index, done);
                }, 700);
            });

        } else {
            index++;
            return morphTests(index, done);
        }
    } else {
        console.log("done");
        done();
    }

}

// recursion function
function entitiesTests(index, done) {
    var substring = "entities.json";

    if (index < requestArray.length) {
        if (requestArray[index].indexOf(substring) > -1) {

            var entity = new entities();
            var param = new paramObj();
            var request = fs.readFileSync('../../../mock-data/request/' + requestArray[index]);
            var status = fs.readFileSync('../../../mock-data/status/' + statusArray[index]);
            var response = fs.readFileSync('../../../mock-data/response/' + responseArray[index]);
            var expected = JSON.parse(response.toString());

            // nock interceptor for endpoint 
            nock('https://api.rosette.com', {
                    "encodedQueryParams": true
                })
                .persist()
                .post('/rest/v1/entities', JSON.parse(request.toString()))
                .reply(status, response);

            request = JSON.parse(request);
            param.content = request.content;
            if (request.contentUri != undefined) {
                param.contentUri = request.contentUri;
            }
            param.unit = request.unit;
            param.language = request.language;

            entity.getResults(param, '1234567890', 'https://api.rosette.com/rest/v1/', function(err, res) {
                index++;
                console.log(index);
                //console.log(JSON.stringify(expected, null, 1));
                //console.log(JSON.stringify(res, null, 1))
                //console.log(expected)
                //console.log(res)
                //assert.deepEqual(expected, res);
                assert.deepEqual(JSON.stringify(expected, null, 1), JSON.stringify(res, null, 1));
                setTimeout(function() {
                    return entitiesTests(index, done);
                }, 700);
            });

        } else {
            index++;
            return entitiesTests(index, done);
        }
    } else {
        console.log("done");
        done();
    }

}

// recursion function
function entitiesLinkedTests(index, done) {
    var substring = "entities_linked";

    if (index < requestArray.length) {
        if (requestArray[index].indexOf(substring) > -1) {

            var entity = new entities();
            var param = new paramObj();
            var request = fs.readFileSync('../../../mock-data/request/' + requestArray[index]);
            var status = fs.readFileSync('../../../mock-data/status/' + statusArray[index]);
            var response = fs.readFileSync('../../../mock-data/response/' + responseArray[index]);
            var expected = JSON.parse(response.toString());

            // nock interceptor for endpoint 
            nock('https://api.rosette.com', {
                    "encodedQueryParams": true
                })
                .persist()
                .post('/rest/v1/entities', JSON.parse(request.toString()))
                .reply(status, response);

            request = JSON.parse(request);
            param.content = request.content;
            if (request.contentUri != undefined) {
                param.contentUri = request.contentUri;
            }
            param.unit = request.unit;
            param.language = request.language;

            entity.getResults(param, '1234567890', 'https://api.rosette.com/rest/v1/', function(err, res) {
                index++;
                console.log(index);
                //console.log(JSON.stringify(expected, null, 1));
                //console.log(JSON.stringify(res, null, 1))
                //console.log(expected)
                console.log(res)
                //assert.deepEqual(expected, res);
                assert.deepEqual(JSON.stringify(expected, null, 1), JSON.stringify(res, null, 1));
                setTimeout(function() {
                    return entitiesLinkedTests(index, done);
                }, 700);
            });

        } else {
            index++;
            return entitiesLinkedTests(index, done);
        }
    } else {
        console.log("done");
        done();
    }

}

// recursion function
function relationshipsTests(index, done) {
    var substring = "relationships";

    if (index < requestArray.length) {
        if (requestArray[index].indexOf(substring) > -1) {

            var relationship = new relationships();
            var param = new paramObj();
            var request = fs.readFileSync('../../../mock-data/request/' + requestArray[index]);
            var status = fs.readFileSync('../../../mock-data/status/' + statusArray[index]);
            var response = fs.readFileSync('../../../mock-data/response/' + responseArray[index]);
            var expected = JSON.parse(response.toString());

            // nock interceptor for endpoint 
            nock('https://api.rosette.com', {
                    "encodedQueryParams": true
                })
                .persist()
                .post('/rest/v1/relationships', JSON.parse(request.toString()))
                .reply(status, response);

            request = JSON.parse(request);
            param.content = request.content;
            if (request.contentUri != undefined) {
                param.contentUri = request.contentUri;
            }
            param.unit = request.unit;
            param.language = request.language;

            relationship.getResults(param, '1234567890', 'https://api.rosette.com/rest/v1/', function(err, res) {
                index++;
                console.log(index);
                //console.log(JSON.stringify(expected, null, 1));
                //console.log(JSON.stringify(res, null, 1))
                //console.log(expected)
                //console.log(res)
                //assert.deepEqual(expected, res);
                assert.deepEqual(JSON.stringify(expected, null, 1), JSON.stringify(res, null, 1));
                setTimeout(function() {
                    return relationshipsTests(index, done);
                }, 700);
            });

        } else {
            index++;
            return relationshipsTests(index, done);
        }
    } else {
        console.log("done");
        done();
    }

}

// recursion function
function matchedNameTests(index, done) {
    var substring = "matched-name";

    if (index < requestArray.length) {
        if (requestArray[index].indexOf(substring) > -1) {

            var name = new matchedName();
            var param = new paramObj();
            var request = fs.readFileSync('../../../mock-data/request/' + requestArray[index]);
            var status = fs.readFileSync('../../../mock-data/status/' + statusArray[index]);
            var response = fs.readFileSync('../../../mock-data/response/' + responseArray[index]);
            var expected = JSON.parse(response.toString());

            // nock interceptor for endpoint 
            nock('https://api.rosette.com', {
                    "encodedQueryParams": true
                })
                .persist()
                .post('/rest/v1/matched-name', JSON.parse(request.toString()))
                .reply(status, response);

            request = JSON.parse(request);
            param.content = request.content;
            if (request.contentUri != undefined) {
                param.contentUri = request.contentUri;
            }
            param.unit = request.unit;
            param.language = request.language;
            param.name1 = request.name1;
            param.name2 = request.name2;

            name.getResults(param, '1234567890', 'https://api.rosette.com/rest/v1/', function(err, res) {
                index++;
                console.log(index);
                //console.log(JSON.stringify(expected, null, 1));
                //console.log(JSON.stringify(res, null, 1))
                //console.log(expected)
                //console.log(res)
                //assert.deepEqual(expected, res);
                assert.deepEqual(JSON.stringify(expected, null, 1), JSON.stringify(res, null, 1));
                setTimeout(function() {
                    return matchedNameTests(index, done);
                }, 700);
            });

        } else {
            index++;
            return matchedNameTests(index, done);
        }
    } else {
        console.log("done");
        done();
    }

}

// recursion function
function translatedNameTests(index, done) {
    var substring = "translated-name";

    if (index < requestArray.length) {
        if (requestArray[index].indexOf(substring) > -1) {

            var name = new translatedName();
            var param = new paramObj();
            var request = fs.readFileSync('../../../mock-data/request/' + requestArray[index]);
            var status = fs.readFileSync('../../../mock-data/status/' + statusArray[index]);
            var response = fs.readFileSync('../../../mock-data/response/' + responseArray[index]);
            var expected = JSON.parse(response.toString());

            // nock interceptor for endpoint 
            nock('https://api.rosette.com', {
                    "encodedQueryParams": true
                })
                .persist()
                .post('/rest/v1/translated-name', JSON.parse(request.toString()))
                .reply(status, response);

            request = JSON.parse(request);
            param.content = request.content;
            if (request.contentUri != undefined) {
                param.contentUri = request.contentUri;
            }
            param.unit = request.unit;
            param.language = request.language;
            param.entityType = request.entityType;
            param.name = request.name;
            param.sourceLanguageOfOrigin = request.sourceLanguageOfOrigin;
            param.sourceLanguageOfUse = request.sourceLanguageOfUse;
            param.sourceScript = request.sourceScript;
            param.targetLanguage = request.targetLanguage;
            param.targetScheme = request.targetScheme;
            param.targetScript = request.targetScript;

            name.getResults(param, '1234567890', 'https://api.rosette.com/rest/v1/', function(err, res) {
                index++;
                console.log(index);
                //console.log(JSON.stringify(expected, null, 1));
                //console.log(JSON.stringify(res, null, 1))
                //console.log(expected)
                console.log(res)
                //assert.deepEqual(expected, res);
                assert.deepEqual(JSON.stringify(expected, null, 1), JSON.stringify(res, null, 1));
                setTimeout(function() {
                    return translatedNameTests(index, done);
                }, 700);
            });

        } else {
            index++;
            return translatedNameTests(index, done);
        }
    } else {
        console.log("done");
        done();
    }

}


describe('Rosette API language endpoint', function() {
    this.timeout(150000);
    it('should make a request and return a response', function(done) {
        langTests(0, function() {
            done();
        });
    });
});

describe('Rosette API sentiment endpoint', function() {
    this.timeout(150000);
    it('should make a request and return a response', function(done) {
        sentTests(0, function() {
            done();
        });
    });
});

describe('Rosette API categories endpoint', function() {
    this.timeout(150000);
    it('should make a request and return a response', function(done) {
        catTests(0, function() {
            done();
        });
    });
});


describe('Rosette API morphology endpoint', function() {
    this.timeout(150000);
    it('should make a request and return a response', function(done) {
        morphTests(0, function() {
            done();
        });
    });
});

describe('Rosette API entities endpoint', function() {
    this.timeout(150000);
    it('should make a request and return a response', function(done) {
        entitiesTests(0, function() {
            done();
        });
    });
});

describe('Rosette API entities linked endpoint', function() {
    this.timeout(150000);
    it('should make a request and return a response', function(done) {
        entitiesLinkedTests(0, function() {
            done();
        });
    });
});

describe('Rosette API relationships endpoint', function() {
    this.timeout(150000);
    it('should make a request and return a response', function(done) {
        relationshipsTests(0, function() {
            done();
        });
    });
});

describe('Rosette API matched name endpoint', function() {
    this.timeout(150000);
    it('should make a request and return a response', function(done) {
        matchedNameTests(0, function() {
            done();
        });
    });
});

describe('Rosette API translated name endpoint', function() {
    this.timeout(150000);
    it('should make a request and return a response', function(done) {
        translatedNameTests(0, function() {
            done();
        });
    });
});