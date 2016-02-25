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
    this.contentType = null;
    this.unit = null;
    this.language = null;
    this.documentFile = null;

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

}

/**
 * Loads all non-null parameters into a new JSON that will be used as parameters for a Rosette API endpoint
 */
parameters.prototype.loadParams = function() {
    var tempJSON = {};
    var paramJSON = {
        "content": this.content,
        "contentUri": this.contentUri,
        "contentType": this.contentType,
        "unit": this.unit,
        "language": this.language,
        "documentFile": this.documentFile,
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
        "accuracyMode": this.accuracyMode,
        "linked": this.linked,
        "explain": this.explain,
        "short-string": this.shortString,
        "morphology": this.morphology
    };

    for (var key in paramJSON) {
        if (paramJSON[key] != null) {
            tempJSON[key] = paramJSON[key];
        }
    }

    return tempJSON;
};

/**
 * Reads a file and sets the content, contentType, and unit parameters accordingly
 *@param {file} filePath - The file path from which the desired file will be loaded
 */
parameters.prototype.loadFile = function(filePath) {
    var str = fs.readFileSync(filePath, "base64");

    this.content = str;
    this.contentType = RosetteConstants.dataFormat.UNSPECIFIED;
    this.unit = RosetteConstants.inputUnit.DOC;
}

module.exports = parameters;