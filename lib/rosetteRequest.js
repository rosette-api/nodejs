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
"use strict";

var http = require("http");
var https = require("https");
var URL = require("url");
var zlib = require("zlib");

var rosetteConstants = require("./rosetteConstants");
var RosetteException = require("./rosetteExceptions");

/**
 * Compatible server version.
 *
 * @type string
 */
var BINDING_VERSION = "1.4.0";

/**
 * @class
 *
 * @copyright 2014-2015 Basis Technology Corporation.
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
function rosetteRequest() {

};

rosetteRequest.prototype.bindingVersion = function() { return BINDING_VERSION; }

/**
 * Makes an HTTP request to the specified Rosette API endpoint and returns the result
 * @param {string} requestType - GET/POST
 * @param {string} userKey - The Rosette API user access key
 * @param {object} urlParts - Structure containing the url parameters
 * @param {object} parameters - Structure containing the API parameters
 * @param {function} callback - Callback function to be exectuted after the function to which it is passed is complete
 */
rosetteRequest.prototype.makeRequest = function(requestType, userKey, protocol, urlParts, parameters, callback) {
    var headers = {
        "accept": "application/json",
        "accept-encoding": "gzip",
        "content-type": "application/json",
        "user-agent": "rosetteapinode/" + BINDING_VERSION,
        "X-RosetteAPI-Binding": "nodejs",
        "X-RosetteAPI-Binding-Version": BINDING_VERSION
    }

    if (userKey != null) {
        headers["X-RosetteAPI-Key"] = userKey;
    }

    if (parameters.customHeaders != null) {
        parameters.customHeaders.forEach(function(element, index) {
            headers[element[0]] = element[1];
        });

    }

    var options = {
        hostname: urlParts.hostname,
        path: urlParts.path,
        method: requestType,
        headers: headers,
        agent: false 
    };

    if (urlParts.port) {
        options.port = urlParts.port;
    }

    var requestTask = function(callback) {
        var result = new Buffer("");
        // execute the http/https request
        var req = protocol.request(options, function(res) {
            res.on("data", function(docs) {
                result = Buffer.concat([result, docs]);
            });

            res.on("end", function(err) {
                if (err) {
                    return callback(err)
                }

                if (res.headers["content-encoding"] === "gzip") {
                    result = zlib.gunzipSync(result);
                }

                result = JSON.parse(result);
                result.headers = res.headers;
                result = JSON.stringify(result);

                if (res.statusCode === 200) {
                    return callback(null, JSON.parse(result.toString()));
                } else {
                    return callback(new RosetteException(res.statusCode, result.toString()));
                }
            });
        });

        req.on("error", function(e) {
            console.log(e)
            return callback(e);
        });

        if (parameters !== null) {
            req.write(JSON.stringify(parameters.loadParams()));
        }

        req.end();
    };

    requestTask(callback);

};

module.exports = rosetteRequest;
