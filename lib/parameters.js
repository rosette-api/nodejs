/**
 * Rosette API.
 *
 * @copyright 2014-2015 Basis Technology Corporation.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at
 * @license http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is
 * distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and limitations under the License.
 **/
"use strict"

var RosetteException = require("./rosetteExceptions");
var RosetteConstants = require("./rosetteConstants");
var fs = require("fs");
var path = require("path");
var Multipart = require('multipart-stream')
var URL = require("url");
var http = require("http");
var https = require("https");
var zlib = require("zlib");

/**
 * Compatible server version.
 *
 * @type string
 */
var BINDING_VERSION = "1.1";

/**
 * @class
 *
 * @copyright 2014-2015 Basis Technology Corporation.
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
function parameters() {

    // generic parameters
    this.content = null;
    this.contentUri = null;
    this.language = null;
    this.documentFile = null;
    this.genre = null;

    // name matching parameters
    this.name1 = null;
    this.name2 = null;

    // name translation parameters
    this.name = null;
    this.targetLanguage = null;
    this.entityType = null;
    this.sourceLanguageOfOrigin = null;
    this.sourceLanguageOfUse = null;
    this.sourceScript = null;
    this.targetScript = null;
    this.targetScheme = null;

    //relationships parameters
    this.options = null;
    this.accuracyMode = null;

    //entities parameters
    this.linked = null;

    //sentiment parameters
    this.explain = null;
    this.shortString = null;

    //morphology
    this.morphology = null;

    //headers
    this.customHeaders = null;

}

/**
 * Loads all non-null parameters into a new JSON that will be used as parameters for a Rosette API endpoint
 * Parameters that start with '_' are internal and not included in the endpoint request
 */
parameters.prototype.loadParams = function() {
    var tempJSON = {};
    var paramJSON = {
        "content": this.content,
        "contentUri": this.contentUri,
        "language": this.language,
        "genre": this.genre,
        "name1": this.name1,
        "name2": this.name2,
        "name": this.name,
        "targetLanguage": this.targetLanguage,
        "entityType": this.entityType,
        "sourceLanguageOfOrigin": this.sourceLanguageOfOrigin,
        "sourceLanguageOfUse": this.sourceLanguageOfUse,
        "sourceScript": this.sourceScript,
        "targetScript": this.targetScript,
        "targetScheme": this.targetScheme,
        "options": this.options,
        "explain": this.explain,
        "short-string": this.shortString,
        "_customHeaders": this.customHeaders
    };

    for (var key in paramJSON) {
        if (key.substring(0, 1) !== '_' && paramJSON[key] != null && key != "customHeaders") {
            tempJSON[key] = paramJSON[key];
        }
    }

    return tempJSON;
};

/**
 * Reads a file and sets the content, and unit parameters accordingly
 *@param {file} filePath - The file path from which the desired file will be loaded
 */
parameters.prototype.loadFile = function(filePath, loadedParameters, userKey, protocol, serviceURL, endpoint, callback) {
    var str = fs.readFileSync(filePath, "utf8");
    var mp = new Multipart()

    mp.addPart({
        headers: {
            "Content-Type": "application/json",
            "Content-Disposition": "mixed; name=\"request\""
        },
        body: JSON.stringify(loadedParameters.loadParams())
    })

    mp.addPart({
        headers: {
            "Content-Type": "text/plain",
            "Content-Disposition": "mixed; name=\"content\"; filename=\"" + path.basename(filePath) + "\""
        },
        body: str.toString()
    })

    var data = ''
    mp.on('data', function(d) {
        data += d
    }).on('end', function() {

        var urlParts = URL.parse(serviceURL + endpoint);

        var headers = {
            "accept": 'application/json',
            "accept-encoding": "gzip",
            "content-type": 'multipart/mixed',
            "user-agent": "rosetteapinode/" + BINDING_VERSION, 
            "X-RosetteAPI-Binding": "nodejs",
            "X-RosetteAPI-Binding-Version": BINDING_VERSION
        }
        headers["X-RosetteAPI-Key"] = userKey;

        var result = new Buffer("");

        var options = {
            hostname: urlParts.hostname,
            path: urlParts.path,
            method: 'POST',
            headers: headers,
            agent: false
        };

        if (urlParts.port) {
            options.port = urlParts.port;
        }

        // execute the http/https request
        var req = protocol.request(options, function(res) {
            res.on("data", function(docs) {
                result = Buffer.concat([result, docs]);
            });

            res.on("end", function(err) {
                if (err) {
                    console.log(err)
                }
                // will need for other endpoints
                if (res.headers["content-encoding"] === "gzip") {
                    result = zlib.gunzipSync(result);
                }

                result = JSON.parse(result);
                result.headers = res.headers;
                result = JSON.stringify(result);

                if (res.statusCode === 200) {
                    return callback(err, JSON.parse(result.toString()));
                } else if (res.statusCode != 200) {
                    return callback(err, JSON.parse(result.toString()));
                }
            });
        });

        // error catching for request
        req.on("error", function(e) {
            return console.log(e)
        });

        req.write(data);

        req.end();

    })

}

module.exports = parameters;
