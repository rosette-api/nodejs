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

var requestArray, statusArray, responseArray, endpointSubstrings, endpointArray;

before(function(){
  // get the names of all the mock data files
  requestArray = fs.readdirSync('../../../mock-data/request/');
  statusArray = fs.readdirSync('../../../mock-data/status/');
  responseArray = fs.readdirSync('../../../mock-data/response/');

  // array that has endpoint substrings to compare to mock-data file names. Mock data can change but these substrings should be generic enough to always match an endpoint
  endpointSubstrings = ['language', 'sentiment', 'relationships', 'morphology', 'matched', 'translate', 'categories', 'token', 'sentences', 'entities', 'linked']
  endpointArray = ['language', 'relationships', 'matchedName', 'translatedName', 'sentiment', 'categories', 'entities', 'morphology', 'tokens', 'sentences'];
});

// recursion function
function runTests(index, done) {
  if(index<requestArray.length){
    //var lang = new language();
    var param = new paramObj();
    var request = fs.readFileSync('../../../mock-data/request/' + requestArray[index]);
    var status = fs.readFileSync('../../../mock-data/status/' + statusArray[index]);
    var response = fs.readFileSync('../../../mock-data/response/' + responseArray[index]);
    var expected  = JSON.parse(response.toString());
    var endpoint = null;

    // determine the endpoint to be tested
    for(var i = 0; i < endpointSubstrings.length; i++){
      if(requestArray[index].indexOf(endpointSubstrings[i]) > -1){
        endpoint = endpointSubstrings[i];
      }
    }

    if(endpoint != null){
      for(var j = 0; j < endpointArray.length; j++){
        if(requestArray[index].indexOf(endpointSubstrings[j]) > -1){
          endpoint = endpointSubstrings[j];
        }
      }
    }

    // nock interceptor for endpoint 
    nock('https://api.rosette.com', {"encodedQueryParams": true})
      .persist()
      .post('/rest/v1/' + endpoint, JSON.parse(request.toString()))
      .reply(status, response);

    request = JSON.parse(request);
    param.content = request.content;
    if(request.contentUri != undefined){
      param.contentUri = request.contentUri;
    }
    param.unit = request.unit;
    param.language = request.language;
    
    setTimeout(function(){var e = new endpoint();

    e.getResults(param, '1234567890', 'https://api.rosette.com/rest/v1/', function(err, res){
      //console.log(res);
      index++;
      console.log(index);
      //console.log(JSON.stringify(expected, null, 1));
      //console.log(JSON.stringify(res, null, 1))
      //console.log(expected)
      //console.log(res)
      //assert.deepEqual(expected, res);
      //assert.deepEqual(JSON.stringify(expected, null, 1), JSON.stringify(res, null, 1));
      setTimeout(function(){return runTests(index);}, 700);
    });
    }, 400);
  } else{
    console.log("done");
    done();
  }

}

describe('Rosette API endpoint', function(){
  this.timeout(150000);
  it('should make a request and return a response', function(done){
    runTests(0, function(){
      done();
    });
  });
});

/*
function recursive(i, callback){
  if(i < 4){
    i++;
    console.log(i);
    return recursive(i);
  } else{
    //return i;
  }
}

 describe('Rosette API endpoint', function(){
    it('should make a request and return a response', function(done){
//console.log(recursive(0))
    recursive(0);
    done();
    });
});*/