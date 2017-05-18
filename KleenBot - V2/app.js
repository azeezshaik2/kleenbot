/**
 * Copyright 2015 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

var express = require('express'); // app server
var bodyParser = require('body-parser'); // parser for post requests
var watson = require('watson-developer-cloud'); // watson sdk
var Conversation = require('watson-developer-cloud/conversation/v1'); // watson sdk

//--------------Speech To Text------------
var SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
var fs = require('fs');

var speech_to_text = new SpeechToTextV1 ({
  username: process.env.SPEECH_TO_TEXT_USERNAME,
   password: process.env.SPEECH_TO_TEXT_PASSWORD
});

//--------------Language Translator------------
var language_translator = watson.language_translator({
  username: process.env.LANGUAGE_TRANSLATOR_USERNAME,
	password: process.env.LANGUAGE_TRANSLATOR_USERNAME,
  version: 'v2'
});

//--------------Document Conversion------------
var document_conversion = watson.document_conversion({
  username:     process.env.DOCUMENT_CONVERSION_USERNAME,
  password:     process.env.DOCUMENT_CONVERSION_PASSWORD,
  version:      'v1',
  version_date: '2015-12-15'
});
	
var app = express();

// Bootstrap application settings
app.use(express.static('./public')); // load UI from public folder
app.use(bodyParser.json());

// Create the service wrapper
var conversation = new Conversation({
  // If unspecified here, the CONVERSATION_USERNAME and CONVERSATION_PASSWORD env properties will be checked
  // After that, the SDK will fall back to the bluemix-provided VCAP_SERVICES environment property
   username: process.env.CONVERSATION_USERNAME,
   password: process.env.CONVERSATION_PASSWORD,
  url: 'https://gateway.watsonplatform.net/conversation/api',
  version_date: '2017-04-21',
  version: 'v1'
});

// Endpoint to be call from the client side
app.post('/api/message', function(req, res) {
  var workspace = process.env.WORKSPACE_ID || '53ba5db2-481d-4d39-8d9f-89c7d0e73605';
  if (!workspace || workspace === '53ba5db2-481d-4d39-8d9f-89c7d0e73605') {
    return res.json({
      'output': {
        'text': 'The app has not been configured with a <b>WORKSPACE_ID</b> environment variable. Please refer to the ' + '<a href="https://github.com/watson-developer-cloud/conversation-simple">README</a> documentation on how to set this variable. <br>' + 'Once a workspace has been defined the intents may be imported from ' + '<a href="https://github.com/watson-developer-cloud/conversation-simple/blob/master/training/car_workspace.json">here</a> in order to get a working application.'
      }
    });
  }
  var payload = {
    workspace_id: workspace,
    context: req.body.context || {},
    input: req.body.input || {}
  };

  // Send the input to the conversation service
  conversation.message(payload, function(err, data) {
	  //console.log(data.context['order']);
    if (err) {
      return res.status(err.code || 500).json(err);
    }
    return res.json(updateMessage(payload, data));
  });
});

/**
 * Updates the response text using the intent confidence
 * @param  {Object} input The request to the Conversation service
 * @param  {Object} response The response from the Conversation service
 * @return {Object}          The response with the updated message
 */
function updateMessage(input, response) {
  var responseText = null;
  if (!response.output) {
    response.output = {};
  } else {
    return response;
  }
  
  if (response.intents && response.intents[0]) {
    var intent = response.intents[0];
    // Depending on the confidence of the response the app can return different messages.
    // The confidence will vary depending on how well the system is trained. The service will always try to assign
    // a class/intent to the input. If the confidence is low, then it suggests the service is unsure of the
    // user's intent . In these cases it is usually best to return a disambiguation message
    // ('I did not understand your intent, please rephrase your question', etc..)
    if (intent.confidence >= 0.75) {
      responseText = 'I understood your intent was ' + intent.intent;
    } else if (intent.confidence >= 0.5) {
      responseText = 'I think your intent was ' + intent.intent;
    } else {
      responseText = 'I did not understand your intent';
    }
  }
  response.output.text = responseText;
  return response;
}

function ConvertSpeech(audioFile){
	var params = {
	  model: 'en-US_BroadbandModel',
	  content_type: 'audio/flac',
	  continuous: true,
	  'interim_results': true,
	  'max_alternatives': 3,
	  'word_confidence': false,
	  timestamps: false,
	  keywords: ['colorado', 'tornado', 'tornadoes'],
	  'keywords_threshold': 0.5
	};

	// Create the stream.
	var recognizeStream = speech_to_text.createRecognizeStream(params);

	// Pipe in the audio.
	fs.createReadStream(audioFile).pipe(recognizeStream);

	// Pipe out the transcription to a file.
	recognizeStream.pipe(fs.createWriteStream('transcription.txt'));

	// Get strings instead of buffers from 'data' events.
	recognizeStream.setEncoding('utf8');

	// Listen for events.
	recognizeStream.on('results', function(event) { onEvent('Results:', event); });
	recognizeStream.on('data', function(event) { onEvent('Data:', event); });
	recognizeStream.on('error', function(event) { onEvent('Error:', event); });
	recognizeStream.on('close', function(event) { onEvent('Close:', event); });
	recognizeStream.on('speaker_labels', function(event) { onEvent('Speaker_Labels:', event); });
}

function IdentifyLanguage(txt){
	language_translator.identify({ text: txt},
	  function(err, identifiedLanguages) {
		if (err){
		  console.log(err);
		  return err;
		} else {
		  console.log(identifiedLanguages);
		  return identifiedLanguages;
		}
	});
}

function Translate(txt, sourceLang, targetLang){
	language_translator.translate({
		text: txt,
		source: sourceLang,
		target: targetLang
	  }, function(err, translation) {
		if (err){
		  console.log(err);
		  return err;
		} else {
		  console.log(translation);
		  return translation;
		}
	});
}

function ConvertDocument(){
	// custom configuration
	/*var config = {
	  word: {
		heading: {
		  fonts: [
			{ level: 1, min_size: 24 },
			{ level: 2, min_size: 16, max_size: 24 }
		  ]
		}
	  }
	};*/

	document_conversion.convert({
	  file: fs.createReadStream('sample-docx.docx'),
	  conversion_target: 'ANSWER_UNITS',
	  // Use a custom configuration.
	  config: config
	}, function (err, response) {
	  if (err) {
		console.error(err);
	  } else {
		console.log(JSON.stringify(response, null, 2));
	  }
	});
}

// Displays events on the console.
function onEvent(name, event) {
  console.log(name, JSON.stringify(event, null, 2));
};

module.exports = app;
