function ConvertSpeech(audioFile){
	//--------------Speech To Text------------
	var SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
	var fs = require('fs');

	var speech_to_text = new SpeechToTextV1 ({
	  username: process.env.SPEECH_TO_TEXT_USERNAME,
	   password: process.env.SPEECH_TO_TEXT_PASSWORD
	});
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
	recognizeStream.on('close', fu
	nction(event) { onEvent('Close:', event); });
	recognizeStream.on('speaker_labels', function(event) { onEvent('Speaker_Labels:', event); });
}

// Displays events on the console.
function onEvent(name, event) {
  console.log(name, JSON.stringify(event, null, 2));
};

