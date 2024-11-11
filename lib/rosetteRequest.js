/**
 * Analytics API.
 *
 * @copyright 2016-2024 Basis Technology Corporation.
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

var querystring = require('querystring');

/**
 * Compatible server version.
 *
 * @type string
 */
var BINDING_VERSION = rosetteConstants.BINDING_VERSION;
var USER_AGENT = `Babel-Street-Analytics-API-Node/${BINDING_VERSION}/${process.version}`;

/**
 * @class
 *
 * @copyright 2016-2024 Basis Technology Corporation.
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
function rosetteRequest() {
// constructor function
}

rosetteRequest.prototype.bindingVersion = function() {
    return BINDING_VERSION;
}
rosetteRequest.prototype.userAgent = function() {
    return USER_AGENT;
}

/**
 * Makes an HTTP request to the specified Analytics API endpoint and returns the result
 * @param {string} requestType - GET/POST
 * @param {string} userKey - The Analytics API user access key
 * @param {object} urlParts - Structure containing the url parameters
 * @param {object} parameters - Structure containing the API parameters
 * @param {function} callback - Callback function to be executed after the function to which it is passed is complete
 */
rosetteRequest.prototype.makeRequest = function(requestType, userKey, protocol, urlParts, parameters, callback) {
    var headers = {
        "accept": "application/json",
        "accept-encoding": "gzip",
        "content-type": "application/json",
        "user-agent": USER_AGENT,
        "X-BabelStreetAPI-Binding": "nodejs",
        "X-BabelStreetAPI-Binding-Version": BINDING_VERSION,
        //todo remove these in the future
        "X-RosetteAPI-Binding": "nodejs",
        "X-RosetteAPI-Binding-Version": BINDING_VERSION
    }

    if (userKey != null) {
        headers["X-BabelStreetAPI-Key"] = userKey;
    }

    // to see custom headers format example in languages examples
    if (parameters.customHeaders != null) {
        parameters.customHeaders.forEach(function(element, index) {
            headers[element[0]] = element[1];
        });

    }

    var path = urlParts.path;

    if (parameters.urlParameters != null) {
        path = `${path}?${querystring.stringify(parameters.urlParameters)}`;
    }

    var options = {
        hostname: urlParts.hostname,
        path: path,
        method: requestType,
        headers: headers,
        agent: false
    };

    if (urlParts.port) {
        options.port = urlParts.port;
    }

    requestTask(protocol, options, parameters, callback);
};

function requestTask(protocol, options, parameters, callback) {
    var result = Buffer.from("");
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
}

rosetteRequest.prototype.makeDocumentRequest = function(endpoint, parameters, userKey, protocol, serviceURL, callback) {
    if (parameters.documentFile != null) {
        parameters.loadFile(parameters.documentFile, parameters, userKey, protocol, serviceURL, endpoint, callback);
    } else {
        // validate parameters
        if (!parameters.loadParams().content && !parameters.loadParams().contentUri) {
            return callback(new RosetteException("badArgument", "Must supply one of content or contentUri", "bad arguments"));
        } else if (parameters.loadParams().content != null && parameters.loadParams().contentUri != null) {
            return callback(new RosetteException("badArgument", "Cannot supply content and contentUri", "bad arguments"));
        } else {
            // configure URL
            var urlParts = URL.parse(serviceURL + endpoint);
            var req = new rosetteRequest();
            req.makeRequest('POST', userKey, protocol, urlParts, parameters, callback);
        }
    }
}

module.exports = rosetteRequest;
