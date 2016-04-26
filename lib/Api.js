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

var rosetteConstants = require("./rosetteConstants");
var RosetteException = require("./rosetteExceptions");
var paramObj = require("./parameters");

var relationships = require("./relationships");
var matchedName = require("./nameSimilarity");
var translatedName = require("./nameTranslation");
var sentiment = require("./sentiment");
var categories = require("./categories");
var entities = require("./entities");
var morphology = require("./morphology");
var tokens = require("./tokens");
var sentences = require("./sentences");
var language = require("./language");
var ping = require("./ping");
var info = require("./info");
var checkVersion = require("./checkVersion");

/**
 * Compatible server version.
 *
 * @type string
 */
var BINDING_VERSION = "1.1";

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

    this.versionChecked = false;

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
    var c = new checkVersion();

    // check if server and client API versions match
    c.check(api.parameters, this.userKey, this.serviceURL, function(err, res) {
        if (err) {
            return callback(err);
        } else if (!res.versionChecked) {
            return callback(new RosetteException("incompatibleVersion", "The server version is not compatible with binding version " + BINDING_VERSION, res.Version));
        } else {
            // mark api binding version as checked
            api.versionChecked = true;

            // send parameters to the specified endpoint
            e.getResults(api.parameters, api.userKey, api.serviceURL, function(err, res) {
                if (err) {
                    return callback(err);
                } else {
                    return callback(null, res);
                }
            });
        }
    });
};

module.exports = Api;
