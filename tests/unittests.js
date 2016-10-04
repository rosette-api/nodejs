"use strict"

var chai = require('chai');
var mocha = require('mocha');
var nock = require('nock');
var fs = require('fs');

var Api = require("../lib/Api");
var language = require("../lib/language");
var relationships = require("../lib/relationships");
var nameSimilarity = require("../lib/nameSimilarity");
var nameTranslation = require("../lib/nameTranslation");
var sentiment = require("../lib/sentiment");
var categories = require("../lib/categories");
var entities = require("../lib/entities");
var morphology = require("../lib/morphology");
var tokens = require("../lib/tokens");
var sentences = require("../lib/sentences");
var info = require("../lib/info");
var ping = require("../lib/ping");
var syntax_dependencies = require("../lib/syntax_dependencies");
var paramObj = require("../lib/parameters");
var rosetteException = require("../lib/rosetteExceptions");

describe("Language Endpoint", function() {
    beforeEach(function(done) {
        var mockResponse = JSON.stringify({'name': 'Rosette API', 'versionChecked': true});

        nock('https://api.rosette.com', {"encodedQueryParams": true })
           .post('/rest/v1/info')
           .query({"clientVersion": "1.1"})
           .reply(200, JSON.parse(mockResponse));

        nock('https://api.rosette.com', {"encodedQueryParams": true })
           .post('/rest/v1/language')
           .query({"clientVersion": "1.1"})
           .reply(200, JSON.parse(mockResponse));
        done();
    });

    afterEach(function(done) {
        nock.cleanAll();
        done();
    });
    
    it("successfully calls the language endpoint", function(done) {
        var api = new Api('123456789', 'https://api.rosette.com/rest/v1');
        api.parameters.content = "Sample Content";

        api.rosette("language", function(err, res) {
            chai.expect(err).to.be.null;
            chai.expect(res.name).to.equal('Rosette API');
            done();
        });

    });

    it("detects content and contentUri are defined", function(done) {
        var api = new Api('123456789', 'https://api.rosette.com/rest/v1');
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
        var api = new Api('123456789', 'https://api.rosette.com/rest/v1');

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

        nock('https://api.rosette.com', {"encodedQueryParams": true })
           .post('/rest/v1/info')
           .query({"clientVersion": "1.1"})
           .reply(200, JSON.parse(mockResponse));

        nock('https://api.rosette.com', {"encodedQueryParams": true })
           .post('/rest/v1/relationships')
           .query({"clientVersion": "1.1"})
           .reply(200, JSON.parse(mockResponse));
        done();
    });

    afterEach(function(done) {
        nock.cleanAll();
        done();
    });
    
    it("successfully calls the relationships endpoint", function(done) {
        var api = new Api('123456789', 'https://api.rosette.com/rest/v1');
        api.parameters.content = "Sample Content";

        api.rosette("relationships", function(err, res) {
            chai.expect(err).to.be.null;
            chai.expect(res.name).to.equal('Rosette API');
            done();
        });

    });

    it("detects correct accuracy mode", function(done) {
        var api = new Api('123456789', 'https://api.rosette.com/rest/v1');
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

describe("Name Similarity Endpoint", function() {
    beforeEach(function(done) {
        var mockResponse = JSON.stringify({'name': 'Rosette API', 'versionChecked': true});

        nock('https://api.rosette.com', {"encodedQueryParams": true })
           .post('/rest/v1/info')
           .query({"clientVersion": "1.1"})
           .reply(200, JSON.parse(mockResponse));

        nock('https://api.rosette.com', {"encodedQueryParams": true })
           .post('/rest/v1/name-similarity')
           .query({"clientVersion": "1.1"})
           .reply(200, JSON.parse(mockResponse));
        done();
    });

    afterEach(function(done) {
        nock.cleanAll();
        done();
    });
    
    it("successfully calls the name similarity endpoint", function(done) {
        var api = new Api('123456789', 'https://api.rosette.com/rest/v1');
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
        var api = new Api('123456789', 'https://api.rosette.com/rest/v1');
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

describe("Name Translation Endpoint", function() {
    beforeEach(function(done) {
        var mockResponse = JSON.stringify({'name': 'Rosette API', 'versionChecked': true});

        nock('https://api.rosette.com', {"encodedQueryParams": true })
           .post('/rest/v1/info')
           .query({"clientVersion": "1.1"})
           .reply(200, JSON.parse(mockResponse));

        nock('https://api.rosette.com', {"encodedQueryParams": true })
           .post('/rest/v1/name-translation')
           .query({"clientVersion": "1.1"})
           .reply(200, JSON.parse(mockResponse));
        done();
    });

    afterEach(function(done) {
        nock.cleanAll();
        done();
    });
    
    it("successfully calls the name translation endpoint", function(done) {
        var api = new Api('123456789', 'https://api.rosette.com/rest/v1');
        api.parameters.name = "Some Name";
        api.parameters.targetLanguage = "zho";

        api.rosette("nameTranslation", function(err, res) {
            chai.expect(err).to.be.null;
            chai.expect(res.name).to.equal('Rosette API');
            done();
        });

    });

    it("detects missing name parameter", function(done) {
        var api = new Api('123456789', 'https://api.rosette.com/rest/v1');
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
        var api = new Api('123456789', 'https://api.rosette.com/rest/v1');
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

        nock('https://api.rosette.com', {"encodedQueryParams": true })
           .post('/rest/v1/info')
           .query({"clientVersion": "1.1"})
           .reply(200, JSON.parse(mockResponse));

        nock('https://api.rosette.com', {"encodedQueryParams": true })
           .post('/rest/v1/sentiment')
           .query({"clientVersion": "1.1"})
           .reply(200, JSON.parse(mockResponse));
        done();
    });

    afterEach(function(done) {
        nock.cleanAll();
        done();
    });
    
    it("successfully calls the sentiment endpoint", function(done) {
        var api = new Api('123456789', 'https://api.rosette.com/rest/v1');
        api.parameters.content = "Some Content";

        api.rosette("sentiment", function(err, res) {
            chai.expect(err).to.be.null;
            chai.expect(res.name).to.equal('Rosette API');
            done();
        });

    });

    it("detects content and contentUri are defined", function(done) {
        var api = new Api('123456789', 'https://api.rosette.com/rest/v1');
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
        var api = new Api('123456789', 'https://api.rosette.com/rest/v1');

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

        nock('https://api.rosette.com', {"encodedQueryParams": true })
           .post('/rest/v1/info')
           .query({"clientVersion": "1.1"})
           .reply(200, JSON.parse(mockResponse));

        nock('https://api.rosette.com', {"encodedQueryParams": true })
           .post('/rest/v1/categories')
           .query({"clientVersion": "1.1"})
           .reply(200, JSON.parse(mockResponse));
        done();
    });

    afterEach(function(done) {
        nock.cleanAll();
        done();
    });
    
    it("successfully calls the categories endpoint", function(done) {
        var api = new Api('123456789', 'https://api.rosette.com/rest/v1');
        api.parameters.content = "Some Content";

        api.rosette("categories", function(err, res) {
            chai.expect(err).to.be.null;
            chai.expect(res.name).to.equal('Rosette API');
            done();
        });

    });

    it("detects content and contentUri are defined", function(done) {
        var api = new Api('123456789', 'https://api.rosette.com/rest/v1');
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
        var api = new Api('123456789', 'https://api.rosette.com/rest/v1');

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

        nock('https://api.rosette.com', {"encodedQueryParams": true })
           .post('/rest/v1/info')
           .query({"clientVersion": "1.1"})
           .reply(200, JSON.parse(mockResponse));

        nock('https://api.rosette.com', {"encodedQueryParams": true })
           .post('/rest/v1/entities')
           .query({"clientVersion": "1.1"})
           .reply(200, JSON.parse(mockResponse));
        done();
    });

    afterEach(function(done) {
        nock.cleanAll();
        done();
    });
    
    it("successfully calls the entities endpoint", function(done) {
        var api = new Api('123456789', 'https://api.rosette.com/rest/v1');
        api.parameters.content = "Some Content";

        api.rosette("entities", function(err, res) {
            chai.expect(err).to.be.null;
            chai.expect(res.name).to.equal('Rosette API');
            done();
        });

    });

    it("detects content and contentUri are defined", function(done) {
        var api = new Api('123456789', 'https://api.rosette.com/rest/v1');
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
        var api = new Api('123456789', 'https://api.rosette.com/rest/v1');

        api.rosette("entities", function(err, res) {
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

        nock('https://api.rosette.com', {"encodedQueryParams": true })
           .post('/rest/v1/info')
           .query({"clientVersion": "1.1"})
           .reply(200, JSON.parse(mockResponse));

        nock('https://api.rosette.com', {"encodedQueryParams": true })
           .post('/rest/v1/morphology/complete')
           .query({"clientVersion": "1.1"})
           .reply(200, JSON.parse(mockResponse));
        done();
    });

    afterEach(function(done) {
        nock.cleanAll();
        done();
    });
    
    it("successfully calls the morphology endpoint", function(done) {
        var api = new Api('123456789', 'https://api.rosette.com/rest/v1');
        api.parameters.content = "Some Content";
        api.parameters.morphology = 'complete';

        api.rosette("morphology", function(err, res) {
            chai.expect(err).to.be.null;
            chai.expect(res.name).to.equal('Rosette API');
            done();
        });

    });

    it("detects content and contentUri are defined", function(done) {
        var api = new Api('123456789', 'https://api.rosette.com/rest/v1');
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
        var api = new Api('123456789', 'https://api.rosette.com/rest/v1');
        api.parameters.morphology = 'complete';

        api.rosette("morphology", function(err, res) {
            chai.expect(err).to.not.be.null;
            chai.expect(err.name).to.equal('RosetteException');
            chai.expect(err.message).to.contain('badArgument');
            done();
        });
    });

    it("detects morphology feature is defined", function(done) {
        var api = new Api('123456789', 'https://api.rosette.com/rest/v1');
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

        nock('https://api.rosette.com', {"encodedQueryParams": true })
           .post('/rest/v1/info')
           .query({"clientVersion": "1.1"})
           .reply(200, JSON.parse(mockResponse));

        nock('https://api.rosette.com', {"encodedQueryParams": true })
           .post('/rest/v1/tokens')
           .query({"clientVersion": "1.1"})
           .reply(200, JSON.parse(mockResponse));
        done();
    });

    afterEach(function(done) {
        nock.cleanAll();
        done();
    });
    
    it("successfully calls the tokens endpoint", function(done) {
        var api = new Api('123456789', 'https://api.rosette.com/rest/v1');
        api.parameters.content = "Some Content";

        api.rosette("tokens", function(err, res) {
            chai.expect(err).to.be.null;
            chai.expect(res.name).to.equal('Rosette API');
            done();
        });

    });

    it("detects content and contentUri are defined", function(done) {
        var api = new Api('123456789', 'https://api.rosette.com/rest/v1');
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
        var api = new Api('123456789', 'https://api.rosette.com/rest/v1');

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

        nock('https://api.rosette.com', {"encodedQueryParams": true })
           .post('/rest/v1/info')
           .query({"clientVersion": "1.1"})
           .reply(200, JSON.parse(mockResponse));

        nock('https://api.rosette.com', {"encodedQueryParams": true })
           .post('/rest/v1/sentences')
           .query({"clientVersion": "1.1"})
           .reply(200, JSON.parse(mockResponse));
        done();
    });

    afterEach(function(done) {
        nock.cleanAll();
        done();
    });
    
    it("successfully calls the sentences endpoint", function(done) {
        var api = new Api('123456789', 'https://api.rosette.com/rest/v1');
        api.parameters.content = "Some Content";

        api.rosette("sentences", function(err, res) {
            chai.expect(err).to.be.null;
            chai.expect(res.name).to.equal('Rosette API');
            done();
        });

    });

    it("detects content and contentUri are defined", function(done) {
        var api = new Api('123456789', 'https://api.rosette.com/rest/v1');
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
        var api = new Api('123456789', 'https://api.rosette.com/rest/v1');

        api.rosette("sentences", function(err, res) {
            chai.expect(err).to.not.be.null;
            chai.expect(err.name).to.equal('RosetteException');
            chai.expect(err.message).to.contain('badArgument');
            done();
        });
    });

});

describe("Text Embedding Endpoint", function() {
    beforeEach(function(done) {
        var mockResponse = JSON.stringify({'name': 'Rosette API', 'versionChecked': true});

        nock('https://api.rosette.com', {"encodedQueryParams": true })
           .post('/rest/v1/text-embedding')
           .query({"clientVersion": "1.1"})
           .reply(200, JSON.parse(mockResponse));
        done();
    });

    afterEach(function(done) {
        nock.cleanAll();
        done();
    });
    
    it("successfully calls the textEmbedding endpoint", function(done) {
        var api = new Api('123456789', 'https://api.rosette.com/rest/v1');
        api.parameters.content = "Some Content";

        api.rosette("textEmbedding", function(err, res) {
            chai.expect(err).to.be.null;
            chai.expect(res.name).to.equal('Rosette API');
            done();
        });

    });

    it("detects content and contentUri are defined", function(done) {
        var api = new Api('123456789', 'https://api.rosette.com/rest/v1');
        api.parameters.content = "Sample Content";
        api.parameters.contentUri = "http://some.url.com";

        api.rosette("textEmbedding", function(err, res) {
            chai.expect(err).to.not.be.null;
            chai.expect(err.name).to.equal('RosetteException');
            chai.expect(err.message).to.contain('badArgument');
            done();
        });
    });

    it("detects neither content nor contentUri are defined", function(done) {
        var api = new Api('123456789', 'https://api.rosette.com/rest/v1');

        api.rosette("textEmbedding", function(err, res) {
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

        nock('https://api.rosette.com', {"encodedQueryParams": true })
           .post('/rest/v1/info')
           .query({"clientVersion": "1.1"})
           .reply(200, JSON.parse(mockResponse));

        nock('https://api.rosette.com', {"encodedQueryParams": true })
           .post('/rest/v1/syntax/dependencies')
           .query({"clientVersion": "1.1"})
           .reply(200, JSON.parse(mockResponse));
        done();
    });

    afterEach(function(done) {
        nock.cleanAll();
        done();
    });
    
    it("successfully calls the syntactic dependencies endpoint", function(done) {
        var api = new Api('123456789', 'https://api.rosette.com/rest/v1');
        api.parameters.content = "Some Content";

        api.rosette("syntax_dependencies", function(err, res) {
            chai.expect(err).to.be.null;
            chai.expect(res.name).to.equal('Rosette API');
            done();
        });

    });

    it("detects content and contentUri are defined", function(done) {
        var api = new Api('123456789', 'https://api.rosette.com/rest/v1');
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
        var api = new Api('123456789', 'https://api.rosette.com/rest/v1');

        api.rosette("syntax_dependencies", function(err, res) {
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

        nock('https://api.rosette.com', {"encodedQueryParams": true })
           .post('/rest/v1/info')
           .query({"clientVersion": "1.1"})
           .reply(200, JSON.parse(mockResponse));

        nock('https://api.rosette.com')
           .get('/rest/v1/info')
           .reply(200, JSON.parse(mockResponse));
        done();
    });

    afterEach(function(done) {
        nock.cleanAll();
        done();
    });
    
    it("successfully calls the info endpoint", function(done) {
        var api = new Api('123456789', 'https://api.rosette.com/rest/v1');

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

        nock('https://api.rosette.com', {"encodedQueryParams": true })
           .post('/rest/v1/info')
           .query({"clientVersion": "1.1"})
           .reply(200, JSON.parse(mockResponse));

        nock('https://api.rosette.com')
           .get('/rest/v1/ping')
           .reply(200, JSON.parse(mockResponse));
        done();
    });

    afterEach(function(done) {
        nock.cleanAll();
        done();
    });
    
    it("successfully calls the ping endpoint", function(done) {
        var api = new Api('123456789', 'https://api.rosette.com/rest/v1');

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

        nock('https://api.rosette.com', {"encodedQueryParams": true })
           .post('/rest/v1/info')
           .query({"clientVersion": "1.1"})
           .reply(409, JSON.parse(mockResponse));

        nock('https://api.rosette.com')
           .get('/rest/v1/info')
           .reply(409, JSON.parse(mockResponse));
        done();
    });

    afterEach(function(done) {
        nock.cleanAll();
        done();
    });
    
    it("successfully handles the error", function(done) {
        var api = new Api('123456789', 'https://api.rosette.com/rest/v1');
        api.rosette("info", function(err, res) {
            chai.expect(err).to.not.be.null;
            chai.expect(err.name).to.equal('RosetteException');
            chai.expect(err.message).to.contain('incompatibleBindingVersion');
            done();
        });
    });

});
