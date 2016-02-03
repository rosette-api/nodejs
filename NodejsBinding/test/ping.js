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
var BINDING_VERSION = "0.8";

function ping() {

};

/**
 * Makes an HTTP request to the specified Rosette API endpoint and returns the result
 * @param {string} parameters - The Rosette API endpoint parameters
 * @param {string} userKey - The Rosette API user access key
 * @param {string} serviceURL - The base service URL to be used to access the Rosette API
 * @param {function} callback - Callback function to be exectuted after the function to which it is passed is complete
 */
ping.prototype.getResults = function(parameters, userKey, serviceURL, callback) {

    // configure URL
    var urlParts = URL.parse(serviceURL + "ping");
    var protocol = https;
    if (urlParts.protocol === "http") {
        protocol = http;
    }

    var headers = {
        "accept": "application/json",
        "accept-encoding": "gzip",
        "content-type": "application/json",
        "user-agent": "rosetteapinode/" + BINDING_VERSION
    }
    headers["user_key"] = userKey;

    var result = new Buffer("");

    var options = {
        hostname: urlParts.hostname,
        path: urlParts.path,
        method: 'GET',
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
                return callback(err)
            }
            // will need for other endpoints
            if (res.headers["content-encoding"] === "gzip") {
                result = zlib.gunzipSync(result);
            }

            if (res.statusCode === 200) {
                return callback(err, JSON.parse(result.toString()));
            }
        });
    });

    // error catching for request
    req.on("error", function(e) {
        return callback(e);
    });

    req.end();

};

module.exports = ping;