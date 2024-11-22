/**
 * Container for the Analytics Constants.
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

/**
 * @desc Accepted data formats
 * @type {JSON}
 */
var dataFormat = {
    "SIMPLE": "text/plain",
    "JSON": "application/json",
    "HTML": "text/html",
    "XHTML": "application/xhtml+xml",
    "UNSPECIFIED": "application/octet-stream"
};

/**
 * @desc Accepted morphology output types
 * @type {JSON}
 */
var morphologyOutput = {
    "LEMMAS": "lemmas",
    "PARTS_OF_SPEECH": "parts-of-speech",
    "COMPOUND_COMPONENTS": "compound-components",
    "HAN_READINGS": "han-readings",
    "COMPLETE": "complete"
};

//todo make sure that version is overwritten here in rapid developer tools publishing
var BINDING_VERSION = "1.31.0";

exports.dataFormat = dataFormat;
exports.morpholoyOutput = morphologyOutput;
exports.BINDING_VERSION = BINDING_VERSION;
