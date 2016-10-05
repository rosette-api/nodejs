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

var rosetteConstants = require("./rosetteConstants");
var RosetteException = require("./rosetteExceptions");
var paramObj = require("./parameters");

var categories = require("./categories");
var entities = require("./entities");
var info = require("./info");
var language = require("./language");
var matchedName = require("./nameSimilarity");
var morphology = require("./morphology");
var ping = require("./ping");
var relationships = require("./relationships");
var sentences = require("./sentences");
var sentiment = require("./sentiment");
var textEmbedding = require("./textEmbedding");
var translatedName = require("./nameTranslation");
var tokens = require("./tokens");
var syntax_dependencies = require("./syntax_dependencies");

/**
 * @class
 *
 * Node.js Client Binding API; representation of a Api server.
 * Call instance methods upon this object to communicate with particular
 * Api server endpoints.
 *
 * @example var api = new API(userKey, serviceUrl);
 * @copyright 2014-2015 Basis Technology Corporation.
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
function Api(userKey, serviceURL) {
    /**
     * @type {string}
     * @desc The Rosette API key used for authentication
     */
    this.userKey = userKey;

    /**
     * @type {object}
     * @desc The Rosette API endpoint parameters
     */
    this.parameters = new paramObj();

    /**
     * @type {object}
     * @desc The HTTP(S) object
     */
    this.protocol = https;

    /**
     * @type {string}
     * @desc URL of the API
     * @default
     */
    if (serviceURL) {
        if (serviceURL.slice(-1) != '/') {
            serviceURL = serviceURL.concat('/')
            this.serviceURL = serviceURL;
        } else {
            this.serviceURL = serviceURL;
        }
    } else {
        this.serviceURL = "https://api.rosette.com/rest/v1/";
    }
    var urlParts = URL.parse(this.serviceURL);
    if (urlParts.protocol === "http:") {
        this.protocol = http;
    }

};

/**
 * @type {string}
 * @desc Accepts a Rosette API endpoint name and forwards user parameters to the endpoint
 * @param {string} endpoint - The Rosette API endpoint to be utilized
 */
Api.prototype.rosette = function(endpoint, callback) {

    var api = this;
    endpoint = require("./" + endpoint);
    var e = new endpoint();

            // send parameters to the specified endpoint
    e.getResults(api.parameters, api.userKey, api.protocol, api.serviceURL, function(err, res) {
        if (err) {
            return callback(err);
        } else {
            return callback(null, res);
        }
    });
};

module.exports = Api;
