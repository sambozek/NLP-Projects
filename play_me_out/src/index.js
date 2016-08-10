/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask Space Geek for a space Ragtime"
 *  Alexa: "Here's your space Ragtime: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = undefined; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * Array containing Ragtimes.
 */
var RAGTIME = [
    '<audio src="https://s3.amazonaws.com/playmeout/entertainer30s.mp3" />',
    '<audio src="https://s3.amazonaws.com/playmeout/frogleg30s.mp3" />',
    '<audio src="https://s3.amazonaws.com/playmeout/mapleleaf30s.mp3" />',
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * SpaceGeek is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var Ragtime = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Ragtime.prototype = Object.create(AlexaSkill.prototype);
Ragtime.prototype.constructor = Ragtime;

Ragtime.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    //console.log("onSessionStarted requestId: " + sessionStartedRequest.requestId + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

Ragtime.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    //console.log("onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewRagtimeRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
Ragtime.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    //console.log("onSessionEnded requestId: " + sessionEndedRequest.requestId + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

Ragtime.prototype.intentHandlers = {
    "GetRagtimeIntent": function (intent, session, response) {
        handleNewRagtimeRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can ask for ragtime, or, you can say cancel.");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Canceling";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new Ragtime from the list and returns to the user.
 */
function handleNewRagtimeRequest(response) {
    // Get a random space Ragtime from the space Ragtimes list
    var ragIndex = Math.floor(Math.random() * RAGTIME.length);
    var randomRag = Ragtime[ragIndex];

    // Create speech output
    var speechOutput = randomRag;
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the SpaceGeek skill.
    var ragtime = new Ragtime();
    ragtime.execute(event, context);
};

