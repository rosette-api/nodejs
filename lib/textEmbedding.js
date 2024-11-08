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

var URL = require("url");

var rosetteConstants = require("./rosetteConstants");
var RosetteException = require("./rosetteExceptions");
var rosetteRequest = require("./rosetteRequest");

/**
 * @class
 *
 * @copyright 2016-2024 Basis Technology Corporation.
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
function textEmbedding() {

};

/**
 * Makes an HTTP request to the specified Analytics API endpoint and returns the result
 * @param {string} parameters - The Analytics API endpoint parameters
 * @param {string} userKey - The Analytics API user access key
 * @param {string} serviceURL - The base service URL to be used to access the Analytics API
 * @param {function} callback - Callback function to be executed after the function to which it is passed is complete
 */
textEmbedding.prototype.getResults = function(parameters, userKey, protocol, serviceURL, callback) {

    if (parameters.documentFile != null) {
        parameters.loadFile(parameters.documentFile, parameters, userKey, protocol, serviceURL, "text-embedding", callback);
    } else {
        // validate parameters
        if (!parameters.loadParams().content && !parameters.loadParams().contentUri) {
            return callback(new RosetteException("badArgument", "Must supply one of Content or ContentUri", "bad arguments"));
        } else if (parameters.loadParams().content && parameters.loadParams().contentUri) {
            return callback(new RosetteException("badArgument", "Cannot supply both Content and ContentUri", "bad arguments"));
        } else {
            // configure URL
            var urlParts = URL.parse(serviceURL + "text-embedding");
            var req = new rosetteRequest();
            req.makeRequest('POST', userKey, protocol, urlParts, parameters, callback);
        }
    }
};

module.exports = textEmbedding;
