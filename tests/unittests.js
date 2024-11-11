"use strict";

var chai = require('chai');
var mocha = require('mocha');
var nock = require('nock');
var fs = require('fs');

var Api = require("../lib/Api");
var addressSimilarity = require("../lib/addressSimilarity");
var language = require("../lib/language");
var relationships = require("../lib/relationships");
var nameDeduplication = require("../lib/nameDeduplication");
var nameSimilarity = require("../lib/nameSimilarity");
var nameTranslation = require("../lib/nameTranslation");
var sentiment = require("../lib/sentiment");
var categories = require("../lib/categories");
var entities = require("../lib/entities");
var morphology = require("../lib/morphology");
var tokens = require("../lib/tokens");
var topics = require("../lib/topics");
var sentences = require("../lib/sentences");
var similarTerms = require("../lib/similarTerms");
var semanticVectors = require("../lib/semanticVectors");
var info = require("../lib/info");
var ping = require("../lib/ping");
var syntax_dependencies = require("../lib/syntax_dependencies");
var paramObj = require("../lib/parameters");
var rosetteException = require("../lib/rosetteExceptions");
var rosetteRequest = require("../lib/rosetteRequest.js");

describe("User Agent", function() {
    it("correctly constructs the User-Agent", function() {
        var req = new rosetteRequest();
        var testUserAgent = "Babel-Street-Analytics-API-Node/" + req.bindingVersion() + "/" + process.version;

        req.userAgent(function(err, res) {
                chai.expect(res.name).to.equal(testUserAgent);
        });
    });
});

describe("Language Endpoint", function() {
    beforeEach(function(done) {
        var mockResponse = JSON.stringify({'name': 'Rosette API', 'versionChecked': true});

        nock('https://analytics.babelstreet.com', {"encodedQueryParams": true })
           .post('/rest/v1/info')
           .reply(200, JSON.parse(mockResponse));

        nock('https://analytics.babelstreet.com', {"encodedQueryParams": true })
           .post('/rest/v1/language')
           .reply(200, JSON.parse(mockResponse));
        done();
    });

    afterEach(function(done) {
        nock.cleanAll();
        done();
    });

    it("successfully calls the language endpoint", function(done) {
        var api = new Api('123456789', 'https://analytics.babelstreet.com/rest/v1');
        api.parameters.content = "Sample Content";

        api.rosette("language", function(err, res) {
            chai.expect(err).to.be.null;
            chai.expect(res.name).to.equal('Rosette API');
            done();
        });

    });

    it("detects content and contentUri are defined", function(done) {
        var api = new Api('123456789', 'https://analytics.babelstreet.com/rest/v1');
        api.parameters.content = "Sample Content";
        api.parameters.contentUri = "http://some.url.com";

        api.rosette("language", function(err, res) {
            chai.expect(err).to.not.be.null;
            chai.expect(err.name).to.equal('RosetteException');
            chai.expect(err.message).to.contain('badArgument');
            done();
        });
    });

    it("detects neither content nor contentUri are defined", function(done) {
        var api = new Api('123456789', 'https://analytics.babelstreet.com/rest/v1');

        api.rosette("language", function(err, res) {
            chai.expect(err).to.not.be.null;
            chai.expect(err.name).to.equal('RosetteException');
            chai.expect(err.message).to.contain('badArgument');
            done();
        });
    });
});

describe("Relationships Endpoint", function() {
    beforeEach(function(done) {
        var mockResponse = JSON.stringify({'name': 'Rosette API', 'versionChecked': true});

        nock('https://analytics.babelstreet.com', {"encodedQueryParams": true })
           .post('/rest/v1/info')
           .reply(200, JSON.parse(mockResponse));

        nock('https://analytics.babelstreet.com', {"encodedQueryParams": true })
           .post('/rest/v1/relationships')
           .reply(200, JSON.parse(mockResponse));
        done();
    });

    afterEach(function(done) {
        nock.cleanAll();
        done();
    });

    it("successfully calls the relationships endpoint", function(done) {
        var api = new Api('123456789', 'https://analytics.babelstreet.com/rest/v1');
        api.parameters.content = "Sample Content";

        api.rosette("relationships", function(err, res) {
            chai.expect(err).to.be.null;
            chai.expect(res.name).to.equal('Rosette API');
            done();
        });

    });

    it("detects correct accuracy mode", function(done) {
        var api = new Api('123456789', 'https://analytics.babelstreet.com/rest/v1');
        api.parameters.content = "Sample Content";
        var option = { accuracyMode: "PRECISION" };
        api.parameters.options = JSON.stringify(option);

        api.rosette("relationships", function(err, res) {
            chai.expect(err).to.be.null;
            chai.expect(res.name).to.equal('Rosette API');
            done();
        });
    });
});

describe("Address Similarity Endpoint", function() {
    beforeEach(function(done) {
        var mockResponse = JSON.stringify({'name': 'Rosette API', 'versionChecked': true});

        nock('https://analytics.babelstreet.com', {"encodedQueryParams": true })
            .post('/rest/v1/info')
            .reply(200, JSON.parse(mockResponse));

        nock('https://analytics.babelstreet.com', {"encodedQueryParams": true })
            .post('/rest/v1/address-similarity')
            .reply(200, JSON.parse(mockResponse));
        done();
    });

    afterEach(function(done) {
        nock.cleanAll();
        done();
    });

    it("successfully calls the address similarity endpoint", function(done) {
        var api = new Api('123456789', 'https://analytics.babelstreet.com/rest/v1');

        api.parameters.address1 = {"city": "cambridge", "state": "ma"};
        api.parameters.address2 = {"city": "Cambridge", "road": "1 Kendall sq."};

        api.rosette("addressSimilarity", function(err, res) {
            chai.expect(err).to.be.null;
            chai.expect(res.name).to.equal('Rosette API');
            done();
        });

    });

    it("detects missing name parameter", function(done) {
        var api = new Api('123456789', 'https://analytics.babelstreet.com/rest/v1');

        api.parameters.address1 = {"city": "cambridge", "state": "ma"};

        api.rosette("addressSimilarity", function(err, res) {
            chai.expect(err).to.not.be.null;
            chai.expect(err.name).to.equal('RosetteException');
            chai.expect(err.message).to.contain('badArgument');
            done();
        });
    });
});

describe("Name Deduplication Endpoint", function() {
    beforeEach(function(done) {
        var mockResponse = JSON.stringify({'name': 'Rosette API', 'versionChecked': true});

        nock('https://analytics.babelstreet.com', {"encodedQueryParams": true })
           .post('/rest/v1/info')
           .reply(200, JSON.parse(mockResponse));

        nock('https://analytics.babelstreet.com', {"encodedQueryParams": true })
           .post('/rest/v1/name-deduplication')
           .reply(200, JSON.parse(mockResponse));
        done();
    });

    afterEach(function(done) {
        nock.cleanAll();
        done();
    });

    it("successfully calls the name deduplication endpoint", function(done) {
        var api = new Api('123456789', 'https://analytics.babelstreet.com/rest/v1');

        api.parameters.names = [
            {"text": "John Smith", "language": "eng", "entityType": "PERSON"},
            {"text": "Johnathon Smith", "language": "eng", "entityType": "PERSON"},
            {"text": "Fred Jones Smith", "language": "eng", "entityType": "PERSON"}
        ];
        api.parameters.threshold = 0.75;

        api.rosette("nameDeduplication", function(err, res) {
            chai.expect(err).to.be.null;
            chai.expect(res.name).to.equal('Rosette API');
            done();
        });
    });

    it("successfully calls the name deduplication endpoint without threshold", function(done) {
        var api = new Api('123456789', 'https://analytics.babelstreet.com/rest/v1');

        api.parameters.names = [
            {"text": "John Smith", "language": "eng", "entityType": "PERSON"},
            {"text": "Johnathon Smith", "language": "eng", "entityType": "PERSON"},
            {"text": "Fred Jones Smith", "language": "eng", "entityType": "PERSON"}
        ];

        api.rosette("nameDeduplication", function(err, res) {
            chai.expect(err).to.be.null;
            chai.expect(res.name).to.equal('Rosette API');
            done();
        });
    });

    it("detects missing names parameter", function(done) {
        var api = new Api('123456789', 'https://analytics.babelstreet.com/rest/v1');

        api.rosette("nameSimilarity", function(err, res) {
            chai.expect(err).to.not.be.null;
            chai.expect(err.name).to.equal('RosetteException');
            chai.expect(err.message).to.contain('badArgument');
            done();
        });
    });
});

describe("Name Similarity Endpoint", function() {
    beforeEach(function(done) {
        var mockResponse = JSON.stringify({'name': 'Rosette API', 'versionChecked': true});

        nock('https://analytics.babelstreet.com', {"encodedQueryParams": true })
           .post('/rest/v1/info')
           .reply(200, JSON.parse(mockResponse));

        nock('https://analytics.babelstreet.com', {"encodedQueryParams": true })
           .post('/rest/v1/name-similarity')
           .reply(200, JSON.parse(mockResponse));
        done();
    });

    afterEach(function(done) {
        nock.cleanAll();
        done();
    });

    it("successfully calls the name similarity endpoint", function(done) {
        var api = new Api('123456789', 'https://analytics.babelstreet.com/rest/v1');
        var name_similarity_data1 = "Michael Jackson";
        var name_similarity_data2 = "迈克尔·杰克逊";

        api.parameters.name1 = {"text": name_similarity_data1, "language": "eng", "entityType": "PERSON"};
        api.parameters.name2 = {"text": name_similarity_data2, "entityType": "PERSON"};

        api.rosette("nameSimilarity", function(err, res) {
            chai.expect(err).to.be.null;
            chai.expect(res.name).to.equal('Rosette API');
            done();
        });

    });

    it("detects missing name parameter", function(done) {
        var api = new Api('123456789', 'https://analytics.babelstreet.com/rest/v1');
        var name_similarity_data1 = "Michael Jackson";

        api.parameters.name1 = {"text": name_similarity_data1, "language": "eng", "entityType": "PERSON"};

        api.rosette("nameSimilarity", function(err, res) {
            chai.expect(err).to.not.be.null;
            chai.expect(err.name).to.equal('RosetteException');
            chai.expect(err.message).to.contain('badArgument');
            done();
        });
    });
});

describe("Record Similarity Endpoint", function() {
    beforeEach(function(done) {
        var mockResponse = JSON.stringify({'name': 'Rosette API', 'versionChecked': true});

        nock('https://analytics.babelstreet.com', {"encodedQueryParams": true })
           .post('/rest/v1/info')
           .reply(200, JSON.parse(mockResponse));

        nock('https://analytics.babelstreet.com', {"encodedQueryParams": true })
           .post('/rest/v1/record-similarity')
           .reply(200, JSON.parse(mockResponse));
        done();
    });

    afterEach(function(done) {
        nock.cleanAll();
        done();
    });

    it("successfully calls the record similarity endpoint", function(done) {
        var api = new Api('123456789', 'https://analytics.babelstreet.com/rest/v1');
        var records = [];
        var fields = {};

        api.parameters.records = records;
        api.parameters.fields = fields;

        api.rosette("recordSimilarity", function(err, res) {
            chai.expect(err).to.be.null;
            chai.expect(res.name).to.equal('Rosette API');
            done();
        });

    });

    it("detects missing records parameter", function(done) {
        var api = new Api('123456789', 'https://analytics.babelstreet.com/rest/v1');

        api.rosette("recordSimilarity", function(err, res) {
            chai.expect(err).to.not.be.null;
            chai.expect(err.name).to.equal('RosetteException');
            chai.expect(err.message).to.contain('badArgument');
            done();
        });
    });

    it("detects missing fields parameter", function(done) {
        var api = new Api('123456789', 'https://analytics.babelstreet.com/rest/v1');

        var records = [];
        api.parameters.records = records;

        api.rosette("recordSimilarity", function(err, res) {
            chai.expect(err).to.not.be.null;
            chai.expect(err.name).to.equal('RosetteException');
            chai.expect(err.message).to.contain('badArgument');
            done();
        });
    });
});

describe("Name Translation Endpoint", function() {
    beforeEach(function(done) {
        var mockResponse = JSON.stringify({'name': 'Rosette API', 'versionChecked': true});

        nock('https://analytics.babelstreet.com', {"encodedQueryParams": true })
           .post('/rest/v1/info')
           .reply(200, JSON.parse(mockResponse));

        nock('https://analytics.babelstreet.com', {"encodedQueryParams": true })
           .post('/rest/v1/name-translation')
           .reply(200, JSON.parse(mockResponse));
        done();
    });

    afterEach(function(done) {
        nock.cleanAll();
        done();
    });

    it("successfully calls the name translation endpoint", function(done) {
        var api = new Api('123456789', 'https://analytics.babelstreet.com/rest/v1');
        api.parameters.name = "Some Name";
        api.parameters.targetLanguage = "zho";

        api.rosette("nameTranslation", function(err, res) {
            chai.expect(err).to.be.null;
            chai.expect(res.name).to.equal('Rosette API');
            done();
        });

    });

    it("detects missing name parameter", function(done) {
        var api = new Api('123456789', 'https://analytics.babelstreet.com/rest/v1');
        api.parameters.name = null;
        api.parameters.targetLanguage = null;

        api.rosette("nameTranslation", function(err, res) {
            chai.expect(err).to.not.be.null;
            chai.expect(err.name).to.equal('RosetteException');
            chai.expect(err.message).to.contain('badArgument');
            chai.expect(err.message).to.contain('name parameter');
            done();
        });
    });

    it("detects missing targetLanguage parameter", function(done) {
        var api = new Api('123456789', 'https://analytics.babelstreet.com/rest/v1');
        api.parameters.name = "Some Name";

        api.rosette("nameTranslation", function(err, res) {
            chai.expect(err).to.not.be.null;
            chai.expect(err.name).to.equal('RosetteException');
            chai.expect(err.message).to.contain('badArgument');
            chai.expect(err.message).to.contain('target language');
            done();
        });
    });
});

describe("Sentiment Endpoint", function() {
    beforeEach(function(done) {
        var mockResponse = JSON.stringify({'name': 'Rosette API', 'versionChecked': true});

        nock('https://analytics.babelstreet.com', {"encodedQueryParams": true })
           .post('/rest/v1/info')
           .reply(200, JSON.parse(mockResponse));

        nock('https://analytics.babelstreet.com', {"encodedQueryParams": true })
           .post('/rest/v1/sentiment')
           .reply(200, JSON.parse(mockResponse));
        done();
    });

    afterEach(function(done) {
        nock.cleanAll();
        done();
    });

    it("successfully calls the sentiment endpoint", function(done) {
        var api = new Api('123456789', 'https://analytics.babelstreet.com/rest/v1');
        api.parameters.content = "Some Content";

        api.rosette("sentiment", function(err, res) {
            chai.expect(err).to.be.null;
            chai.expect(res.name).to.equal('Rosette API');
            done();
        });

    });

    it("detects content and contentUri are defined", function(done) {
        var api = new Api('123456789', 'https://analytics.babelstreet.com/rest/v1');
        api.parameters.content = "Sample Content";
        api.parameters.contentUri = "http://some.url.com";

        api.rosette("sentiment", function(err, res) {
            chai.expect(err).to.not.be.null;
            chai.expect(err.name).to.equal('RosetteException');
            chai.expect(err.message).to.contain('badArgument');
            done();
        });
    });

    it("detects neither content nor contentUri are defined", function(done) {
        var api = new Api('123456789', 'https://analytics.babelstreet.com/rest/v1');

        api.rosette("sentiment", function(err, res) {
            chai.expect(err).to.not.be.null;
            chai.expect(err.name).to.equal('RosetteException');
            chai.expect(err.message).to.contain('badArgument');
            done();
        });
    });
});

describe("Categories Endpoint", function() {
    beforeEach(function(done) {
        var mockResponse = JSON.stringify({'name': 'Rosette API', 'versionChecked': true});

        nock('https://analytics.babelstreet.com', {"encodedQueryParams": true })
           .post('/rest/v1/info')
           .reply(200, JSON.parse(mockResponse));

        nock('https://analytics.babelstreet.com', {"encodedQueryParams": true })
           .post('/rest/v1/categories')
           .reply(200, JSON.parse(mockResponse));
        done();
    });

    afterEach(function(done) {
        nock.cleanAll();
        done();
    });

    it("successfully calls the categories endpoint", function(done) {
        var api = new Api('123456789', 'https://analytics.babelstreet.com/rest/v1');
        api.parameters.content = "Some Content";

        api.rosette("categories", function(err, res) {
            chai.expect(err).to.be.null;
            chai.expect(res.name).to.equal('Rosette API');
            done();
        });

    });

    it("detects content and contentUri are defined", function(done) {
        var api = new Api('123456789', 'https://analytics.babelstreet.com/rest/v1');
        api.parameters.content = "Sample Content";
        api.parameters.contentUri = "http://some.url.com";

        api.rosette("categories", function(err, res) {
            chai.expect(err).to.not.be.null;
            chai.expect(err.name).to.equal('RosetteException');
            chai.expect(err.message).to.contain('badArgument');
            done();
        });
    });

    it("detects neither content nor contentUri are defined", function(done) {
        var api = new Api('123456789', 'https://analytics.babelstreet.com/rest/v1');

        api.rosette("categories", function(err, res) {
            chai.expect(err).to.not.be.null;
            chai.expect(err.name).to.equal('RosetteException');
            chai.expect(err.message).to.contain('badArgument');
            done();
        });
    });

});

describe("Entities Endpoint", function() {
    beforeEach(function(done) {
        var mockResponse = JSON.stringify({'name': 'Rosette API', 'versionChecked': true});

        nock('https://analytics.babelstreet.com', {"encodedQueryParams": true })
           .post('/rest/v1/info')
           .reply(200, JSON.parse(mockResponse));

        nock('https://analytics.babelstreet.com', {"encodedQueryParams": true })
           .post('/rest/v1/entities')
           .reply(200, JSON.parse(mockResponse));
        done();
    });

    afterEach(function(done) {
        nock.cleanAll();
        done();
    });

    it("successfully calls the entities endpoint", function(done) {
        var api = new Api('123456789', 'https://analytics.babelstreet.com/rest/v1');
        api.parameters.content = "Some Content";

        api.rosette("entities", function(err, res) {
            chai.expect(err).to.be.null;
            chai.expect(res.name).to.equal('Rosette API');
            done();
        });

    });

    it("detects content and contentUri are defined", function(done) {
        var api = new Api('123456789', 'https://analytics.babelstreet.com/rest/v1');
        api.parameters.content = "Sample Content";
        api.parameters.contentUri = "http://some.url.com";

        api.rosette("entities", function(err, res) {
            chai.expect(err).to.not.be.null;
            chai.expect(err.name).to.equal('RosetteException');
            chai.expect(err.message).to.contain('badArgument');
            done();
        });
    });

    it("detects neither content nor contentUri are defined", function(done) {
        var api = new Api('123456789', 'https://analytics.babelstreet.com/rest/v1');

        api.rosette("entities", function(err, res) {
            chai.expect(err).to.not.be.null;
            chai.expect(err.name).to.equal('RosetteException');
            chai.expect(err.message).to.contain('badArgument');
            done();
        });
    });
});

describe("Events Endpoint", function() {
    beforeEach(function(done) {
        var mockResponse = JSON.stringify({'name': 'Rosette API', 'versionChecked': true});

        nock('https://analytics.babelstreet.com', {"encodedQueryParams": true })
           .post('/rest/v1/info')
           .reply(200, JSON.parse(mockResponse));

        nock('https://analytics.babelstreet.com', {"encodedQueryParams": true })
           .post('/rest/v1/events')
           .reply(200, JSON.parse(mockResponse));
        done();
    });

    afterEach(function(done) {
        nock.cleanAll();
        done();
    });

    it("successfully calls the events endpoint", function(done) {
        var api = new Api('123456789', 'https://analytics.babelstreet.com/rest/v1');
        api.parameters.content = "Some Content";

        api.rosette("events", function(err, res) {
            chai.expect(err).to.be.null;
            chai.expect(res.name).to.equal('Rosette API');
            done();
        });

    });

    it("detects content and contentUri are defined", function(done) {
        var api = new Api('123456789', 'https://analytics.babelstreet.com/rest/v1');
        api.parameters.content = "Sample Content";
        api.parameters.contentUri = "http://some.url.com";

        api.rosette("events", function(err, res) {
            chai.expect(err).to.not.be.null;
            chai.expect(err.name).to.equal('RosetteException');
            chai.expect(err.message).to.contain('badArgument');
            done();
        });
    });

    it("detects neither content nor contentUri are defined", function(done) {
        var api = new Api('123456789', 'https://analytics.babelstreet.com/rest/v1');

        api.rosette("events", function(err, res) {
            chai.expect(err).to.not.be.null;
            chai.expect(err.name).to.equal('RosetteException');
            chai.expect(err.message).to.contain('badArgument');
            done();
        });
    });
});

describe("Morphology Endpoint (suite covers all features)", function() {
    beforeEach(function(done) {
        var mockResponse = JSON.stringify({'name': 'Rosette API', 'versionChecked': true});

        nock('https://analytics.babelstreet.com', {"encodedQueryParams": true })
           .post('/rest/v1/info')
           .reply(200, JSON.parse(mockResponse));

        nock('https://analytics.babelstreet.com', {"encodedQueryParams": true })
           .post('/rest/v1/morphology/complete')
           .reply(200, JSON.parse(mockResponse));
        done();
    });

    afterEach(function(done) {
        nock.cleanAll();
        done();
    });

    it("successfully calls the morphology endpoint", function(done) {
        var api = new Api('123456789', 'https://analytics.babelstreet.com/rest/v1');
        api.parameters.content = "Some Content";
        api.parameters.morphology = 'complete';

        api.rosette("morphology", function(err, res) {
            chai.expect(err).to.be.null;
            chai.expect(res.name).to.equal('Rosette API');
            done();
        });

    });

    it("detects content and contentUri are defined", function(done) {
        var api = new Api('123456789', 'https://analytics.babelstreet.com/rest/v1');
        api.parameters.content = "Sample Content";
        api.parameters.contentUri = "http://some.url.com";
        api.parameters.morphology = 'complete';

        api.rosette("morphology", function(err, res) {
            chai.expect(err).to.not.be.null;
            chai.expect(err.name).to.equal('RosetteException');
            chai.expect(err.message).to.contain('badArgument');
            done();
        });
    });

    it("detects neither content nor contentUri are defined", function(done) {
        var api = new Api('123456789', 'https://analytics.babelstreet.com/rest/v1');
        api.parameters.morphology = 'complete';

        api.rosette("morphology", function(err, res) {
            chai.expect(err).to.not.be.null;
            chai.expect(err.name).to.equal('RosetteException');
            chai.expect(err.message).to.contain('badArgument');
            done();
        });
    });

    it("detects morphology feature is defined", function(done) {
        var api = new Api('123456789', 'https://analytics.babelstreet.com/rest/v1');
        api.parameters.content = "Sample Content";

        api.rosette("morphology", function(err, res) {
            chai.expect(err).to.not.be.null;
            chai.expect(err.name).to.equal('RosetteException');
            chai.expect(err.message).to.contain('badArgument');
            chai.expect(err.message).to.contain('morphology');
            done();
        });
    });
});

describe("Tokens Endpoint", function() {
    beforeEach(function(done) {
        var mockResponse = JSON.stringify({'name': 'Rosette API', 'versionChecked': true});

        nock('https://analytics.babelstreet.com', {"encodedQueryParams": true })
           .post('/rest/v1/info')
           .reply(200, JSON.parse(mockResponse));

        nock('https://analytics.babelstreet.com', {"encodedQueryParams": true })
           .post('/rest/v1/tokens')
           .reply(200, JSON.parse(mockResponse));
        done();
    });

    afterEach(function(done) {
        nock.cleanAll();
        done();
    });

    it("successfully calls the tokens endpoint", function(done) {
        var api = new Api('123456789', 'https://analytics.babelstreet.com/rest/v1');
        api.parameters.content = "Some Content";

        api.rosette("tokens", function(err, res) {
            chai.expect(err).to.be.null;
            chai.expect(res.name).to.equal('Rosette API');
            done();
        });

    });

    it("detects content and contentUri are defined", function(done) {
        var api = new Api('123456789', 'https://analytics.babelstreet.com/rest/v1');
        api.parameters.content = "Sample Content";
        api.parameters.contentUri = "http://some.url.com";

        api.rosette("tokens", function(err, res) {
            chai.expect(err).to.not.be.null;
            chai.expect(err.name).to.equal('RosetteException');
            chai.expect(err.message).to.contain('badArgument');
            done();
        });
    });

    it("detects neither content nor contentUri are defined", function(done) {
        var api = new Api('123456789', 'https://analytics.babelstreet.com/rest/v1');

        api.rosette("tokens", function(err, res) {
            chai.expect(err).to.not.be.null;
            chai.expect(err.name).to.equal('RosetteException');
            chai.expect(err.message).to.contain('badArgument');
            done();
        });
    });
});

describe("Sentences Endpoint", function() {
    beforeEach(function(done) {
        var mockResponse = JSON.stringify({'name': 'Rosette API', 'versionChecked': true});

        nock('https://analytics.babelstreet.com', {"encodedQueryParams": true })
           .post('/rest/v1/info')
           .reply(200, JSON.parse(mockResponse));

        nock('https://analytics.babelstreet.com', {"encodedQueryParams": true })
           .post('/rest/v1/sentences')
           .reply(200, JSON.parse(mockResponse));
        done();
    });

    afterEach(function(done) {
        nock.cleanAll();
        done();
    });

    it("successfully calls the sentences endpoint", function(done) {
        var api = new Api('123456789', 'https://analytics.babelstreet.com/rest/v1');
        api.parameters.content = "Some Content";

        api.rosette("sentences", function(err, res) {
            chai.expect(err).to.be.null;
            chai.expect(res.name).to.equal('Rosette API');
            done();
        });

    });

    it("detects content and contentUri are defined", function(done) {
        var api = new Api('123456789', 'https://analytics.babelstreet.com/rest/v1');
        api.parameters.content = "Sample Content";
        api.parameters.contentUri = "http://some.url.com";

        api.rosette("sentences", function(err, res) {
            chai.expect(err).to.not.be.null;
            chai.expect(err.name).to.equal('RosetteException');
            chai.expect(err.message).to.contain('badArgument');
            done();
        });
    });

    it("detects neither content nor contentUri are defined", function(done) {
        var api = new Api('123456789', 'https://analytics.babelstreet.com/rest/v1');

        api.rosette("sentences", function(err, res) {
            chai.expect(err).to.not.be.null;
            chai.expect(err.name).to.equal('RosetteException');
            chai.expect(err.message).to.contain('badArgument');
            done();
        });
    });
});

describe("Similar Terms Endpoint", function() {
    beforeEach(function(done) {
        var mockResponse = JSON.stringify({'name': 'Rosette API', 'versionChecked': true});

        nock('https://analytics.babelstreet.com', {"encodedQueryParams": true })
           .post('/rest/v1/semantics/similar')
           .reply(200, JSON.parse(mockResponse));
        done()
    });

    afterEach(function(done) {
        nock.cleanAll();
        done();
    });

    it("successfully calls the similarTerms endpoint", function(done) {
        var api = new Api('123456789', 'https://analytics.babelstreet.com/rest/v1');
        api.parameters.content = "Some Content";

        api.rosette("similarTerms", function(err, res) {
            chai.expect(err).to.be.null;
            chai.expect(res.name).to.equal('Rosette API');
            done();
        });

    });

    it("detects content and contentUri are defined", function(done) {
        var api = new Api('123456789', 'https://analytics.babelstreet.com/rest/v1');
        api.parameters.content = "Sample Content";
        api.parameters.contentUri = "http://some.url.com";

        api.rosette("similarTerms", function(err, res) {
            chai.expect(err).to.not.be.null;
            chai.expect(err.name).to.equal('RosetteException');
            chai.expect(err.message).to.contain('badArgument');
            done();
        });
    });

    it("detects neither content nor contentUri are defined", function(done) {
        var api = new Api('123456789', 'https://analytics.babelstreet.com/rest/v1');

        api.rosette("similarTerms", function(err, res) {
            chai.expect(err).to.not.be.null;
            chai.expect(err.name).to.equal('RosetteException');
            chai.expect(err.message).to.contain('badArgument');
            done();
        });
    });
});

describe("Semantic Vectors Endpoint", function() {
    beforeEach(function(done) {
        var mockResponse = JSON.stringify({'name': 'Rosette API', 'versionChecked': true});

        nock('https://analytics.babelstreet.com', {"encodedQueryParams": true })
           .post('/rest/v1/semantics/vector')
           .reply(200, JSON.parse(mockResponse));
        done();
    });

    afterEach(function(done) {
        nock.cleanAll();
        done();
    });

    it("successfully calls the semanticVectors endpoint", function(done) {
        var api = new Api('123456789', 'https://analytics.babelstreet.com/rest/v1');
        api.parameters.content = "Some Content";

        api.rosette("semanticVectors", function(err, res) {
            chai.expect(err).to.be.null;
            chai.expect(res.name).to.equal('Rosette API');
            done();
        });

    });

    it("detects content and contentUri are defined", function(done) {
        var api = new Api('123456789', 'https://analytics.babelstreet.com/rest/v1');
        api.parameters.content = "Sample Content";
        api.parameters.contentUri = "http://some.url.com";

        api.rosette("semanticVectors", function(err, res) {
            chai.expect(err).to.not.be.null;
            chai.expect(err.name).to.equal('RosetteException');
            chai.expect(err.message).to.contain('badArgument');
            done();
        });
    });

    it("detects neither content nor contentUri are defined", function(done) {
        var api = new Api('123456789', 'https://analytics.babelstreet.com/rest/v1');

        api.rosette("semanticVectors", function(err, res) {
            chai.expect(err).to.not.be.null;
            chai.expect(err.name).to.equal('RosetteException');
            chai.expect(err.message).to.contain('badArgument');
            done();
        });
    });
});

describe("Syntactic Dependencies Endpoint", function() {
    beforeEach(function(done) {
        var mockResponse = JSON.stringify({'name': 'Rosette API', 'versionChecked': true});

        nock('https://analytics.babelstreet.com', {"encodedQueryParams": true })
           .post('/rest/v1/info')
           .reply(200, JSON.parse(mockResponse));

        nock('https://analytics.babelstreet.com', {"encodedQueryParams": true })
           .post('/rest/v1/syntax/dependencies')
           .reply(200, JSON.parse(mockResponse));
        done();
    });

    afterEach(function(done) {
        nock.cleanAll();
        done();
    });

    it("successfully calls the syntactic dependencies endpoint", function(done) {
        var api = new Api('123456789', 'https://analytics.babelstreet.com/rest/v1');
        api.parameters.content = "Some Content";

        api.rosette("syntax_dependencies", function(err, res) {
            chai.expect(err).to.be.null;
            chai.expect(res.name).to.equal('Rosette API');
            done();
        });

    });

    it("detects content and contentUri are defined", function(done) {
        var api = new Api('123456789', 'https://analytics.babelstreet.com/rest/v1');
        api.parameters.content = "Sample Content";
        api.parameters.contentUri = "http://some.url.com";

        api.rosette("syntax_dependencies", function(err, res) {
            chai.expect(err).to.not.be.null;
            chai.expect(err.name).to.equal('RosetteException');
            chai.expect(err.message).to.contain('badArgument');
            done();
        });
    });

    it("detects neither content nor contentUri are defined", function(done) {
        var api = new Api('123456789', 'https://analytics.babelstreet.com/rest/v1');

        api.rosette("syntax_dependencies", function(err, res) {
            chai.expect(err).to.not.be.null;
            chai.expect(err.name).to.equal('RosetteException');
            chai.expect(err.message).to.contain('badArgument');
            done();
        });
    });
});

describe("Transliteration Endpoint", function() {
    beforeEach(function(done) {
        var mockResponse = JSON.stringify({'name': 'Rosette API', 'versionChecked': true});

        nock('https://analytics.babelstreet.com', {"encodedQueryParams": true })
           .post('/rest/v1/info')
           .reply(200, JSON.parse(mockResponse));

        nock('https://analytics.babelstreet.com', {"encodedQueryParams": true })
           .post('/rest/v1/transliteration')
           .reply(200, JSON.parse(mockResponse));
        done();
    });

    afterEach(function(done) {
        nock.cleanAll();
        done();
    });

    it("successfully calls the transliteration endpoint", function(done) {
        var api = new Api('123456789', 'https://analytics.babelstreet.com/rest/v1');
        api.parameters.content = "Some Content";

        api.rosette("transliteration", function(err, res) {
            chai.expect(err).to.be.null;
            chai.expect(res.name).to.equal('Rosette API');
            done();
        });

    });

    it("detects content parameter is not defined", function(done) {
        var api = new Api('123456789', 'https://analytics.babelstreet.com/rest/v1');

        api.rosette("transliteration", function(err, res) {
            chai.expect(err).to.not.be.null;
            chai.expect(err.name).to.equal('RosetteException');
            chai.expect(err.message).to.contain('badArgument');
            done();
        });
    });
});

describe("Info Endpoint", function() {
    beforeEach(function(done) {
        var mockResponse = JSON.stringify({'name': 'Rosette API', 'versionChecked': true});

        nock('https://analytics.babelstreet.com', {"encodedQueryParams": true })
           .post('/rest/v1/info')
           .reply(200, JSON.parse(mockResponse));

        nock('https://analytics.babelstreet.com')
           .get('/rest/v1/info')
           .reply(200, JSON.parse(mockResponse));
        done();
    });

    afterEach(function(done) {
        nock.cleanAll();
        done();
    });

    it("successfully calls the info endpoint", function(done) {
        var api = new Api('123456789', 'https://analytics.babelstreet.com/rest/v1');

        api.rosette("info", function(err, res) {
            chai.expect(err).to.be.null;
            chai.expect(res.name).to.equal('Rosette API');
            done();
        });
    });
});

describe("Ping Endpoint", function() {
    beforeEach(function(done) {
        var mockResponse = JSON.stringify({'name': 'Rosette API', 'versionChecked': true});

        nock('https://analytics.babelstreet.com', {"encodedQueryParams": true })
           .post('/rest/v1/info')
           .reply(200, JSON.parse(mockResponse));

        nock('https://analytics.babelstreet.com')
           .get('/rest/v1/ping')
           .reply(200, JSON.parse(mockResponse));
        done();
    });

    afterEach(function(done) {
        nock.cleanAll();
        done();
    });

    it("successfully calls the ping endpoint", function(done) {
        var api = new Api('123456789', 'https://analytics.babelstreet.com/rest/v1');

        api.rosette("ping", function(err, res) {
            chai.expect(err).to.be.null;
            chai.expect(res.name).to.equal('Rosette API');
            done();
        });
    });
});

describe("Error 409 Incompatible Binding Check", function() {
    beforeEach(function(done) {
        var mockResponse = JSON.stringify({'code': 'incompatibleBindingVersion', 'message': 'some message'});

        nock('https://analytics.babelstreet.com', {"encodedQueryParams": true })
           .post('/rest/v1/info')
           .reply(409, JSON.parse(mockResponse));

        nock('https://analytics.babelstreet.com')
           .get('/rest/v1/info')
           .reply(409, JSON.parse(mockResponse));
        done();
    });

    afterEach(function(done) {
        nock.cleanAll();
        done();
    });

    it("successfully handles the error", function(done) {
        var api = new Api('123456789', 'https://analytics.babelstreet.com/rest/v1');
        api.rosette("info", function(err, res) {
            chai.expect(err).to.not.be.null;
            chai.expect(err.name).to.equal('RosetteException');
            chai.expect(err.message).to.contain('incompatibleBindingVersion');
            done();
        });
    });
});

describe("Topics Endpoint", function() {
    beforeEach(function(done) {
        var mockResponse = JSON.stringify({'name': 'Rosette API', 'versionChecked': true});

        nock('https://analytics.babelstreet.com', {"encodedQueryParams": true })
           .post('/rest/v1/info')
           .reply(200, JSON.parse(mockResponse));

        nock('https://analytics.babelstreet.com', {"encodedQueryParams": true })
           .post('/rest/v1/topics')
           .reply(200, JSON.parse(mockResponse));
        done();
    });

    afterEach(function(done) {
        nock.cleanAll();
        done();
    });

    it("successfully calls the topics endpoint", function(done) {
        var api = new Api('123456789', 'https://analytics.babelstreet.com/rest/v1');
        api.parameters.content = "Some Content";

        api.rosette("topics", function(err, res) {
            chai.expect(err).to.be.null;
            chai.expect(res.name).to.equal('Rosette API');
            done();
        });

    });

    it("detects content and contentUri are defined", function(done) {
        var api = new Api('123456789', 'https://analytics.babelstreet.com/rest/v1');
        api.parameters.content = "Sample Content";
        api.parameters.contentUri = "http://some.url.com";

        api.rosette("topics", function(err, res) {
            chai.expect(err).to.not.be.null;
            chai.expect(err.name).to.equal('RosetteException');
            chai.expect(err.message).to.contain('badArgument');
            done();
        });
    });

    it("detects neither content nor contentUri are defined", function(done) {
        var api = new Api('123456789', 'https://analytics.babelstreet.com/rest/v1');

        api.rosette("topics", function(err, res) {
            chai.expect(err).to.not.be.null;
            chai.expect(err.name).to.equal('RosetteException');
            chai.expect(err.message).to.contain('badArgument');
            done();
        });
    });
});
