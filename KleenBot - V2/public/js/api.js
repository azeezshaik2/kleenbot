// The Api module is designed to handle all interactions with the server

var Api = (function() {
  var requestPayload;
  var responsePayload;
  var messageEndpoint = '/api/message';

  // Publicly accessible methods defined
  return {
    sendRequest: sendRequest,
	sendSecretRequest: sendSecretRequest,

    // The request/response getters/setters are defined here to prevent internal methods
    // from calling the methods without any of the callbacks that are added elsewhere.
    getRequestPayload: function() {
      return requestPayload;
    },
    setRequestPayload: function(newPayloadStr) {
      requestPayload = JSON.parse(newPayloadStr);
    },
    getResponsePayload: function() {
      return responsePayload;
    },
    setResponsePayload: function(newPayloadStr) {
      responsePayload = JSON.parse(newPayloadStr);
    }
  };

  // Send a message request to the server
  function sendRequest(text, context) {
    // Build request payload
    var payloadToWatson = {};
    if (text) {
      payloadToWatson.input = {
        text: text
      };
    }
    if (context) {
      payloadToWatson.context = context;
    }

    // Built http request
    var http = new XMLHttpRequest();
    http.open('POST', messageEndpoint, true);
    http.setRequestHeader('Content-type', 'application/json');
    http.onreadystatechange = function() {
      if (http.readyState === 4 && http.status === 200 && http.responseText) {
		  //Checking for context variables from the chatbots json queries
		  var data = JSON.parse(http.responseText);
		  if(data['context'] != undefined){
			  //Checking if the chatbot requires confirmation from the server
			  if(data['context']['confirmation'] === "true"){
				  //Sending post data to the database for validation
				  var sendData = new XMLHttpRequest();
					sendData.open('POST', 'http://localhost:4000/post', true);
					sendData.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
					var param = 'data='+JSON.stringify(data['context']);
					sendData.send(param);

					sendData.onreadystatechange = function() {
					if (this.readyState == 4 && this.status == 200) {
							var dat = JSON.parse(this.responseText);
							
							//Returning a confirmation if data is recieved or valid/invalid
							if(dat != null){
								ConversationPanel.SendConfirmation(dat['action'], dat['data']);
							}
						}
					};
					//Changing confirmation to false
					data['context']['confirmation'] = "false";
			  }
		  }
        Api.setResponsePayload(JSON.stringify(data));
      }
    };

    var params = JSON.stringify(payloadToWatson);
    // Stored in variable (publicly visible through Api.getRequestPayload)
    // to be used throughout the application
    if (Object.getOwnPropertyNames(payloadToWatson).length !== 0) {
      Api.setRequestPayload(params);
    }

    // Send request
    http.send(params);
  }
  
  // Sends a secret message to server
  function sendSecretRequest(text, context) {

    // Build request payload
    var payloadToWatson = {};
    if (text) {
      payloadToWatson.input = {
        text: text
      };
    }
    if (context) {
      payloadToWatson.context = context;
    }

    // Built http request
    var http = new XMLHttpRequest();
    http.open('POST', messageEndpoint, true);
    http.setRequestHeader('Content-type', 'application/json');
    http.onreadystatechange = function() {
      if (http.readyState === 4 && http.status === 200 && http.responseText) {
		  var data = JSON.parse(http.responseText);
		  if(data['context'] != undefined){
			  //Checks for confirmation node from chatbot
			  if(data['context']['confirmation'] === "true"){
					var sendData = new XMLHttpRequest();
					sendData.open('POST', 'http://localhost:4000/post', true);
					sendData.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
					var param = 'data='+JSON.stringify(data['context']);
					sendData.send(param);

					sendData.onreadystatechange = function() {
					if (this.readyState == 4 && this.status == 200) {
							var dat = JSON.parse(this.responseText);
							
							if(dat != null){
								ConversationPanel.SendConfirmation(dat['action'], dat['data']);
							}
						}
					};
					data['context']['confirmation'] = "false";
			  }
			  //Checks for final order node from chatbot
			  if(data['context']['finalOrder'] === "true"){
					var sendData = new XMLHttpRequest();
					sendData.open('POST', 'http://localhost:4000/finalOrder', true);
					sendData.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
					var param = 'data='+JSON.stringify(data['context']);
					sendData.send(param);

					sendData.onreadystatechange = function() {
					if (this.readyState == 4 && this.status == 200) {
							var dat = JSON.parse(this.responseText);
							
							if(dat != null){
								ConversationPanel.SendConfirmation(dat['action'], dat['data']);
							}
						}
					};
					data['context']['finalOrder'] = "false";
			  }
		  }
        Api.setResponsePayload(http.responseText);
      }
    };

    var params = JSON.stringify(payloadToWatson);
    // Stored in variable (publicly visible through Api.getRequestPayload)
    // to be used throughout the application
    if (Object.getOwnPropertyNames(payloadToWatson).length !== 0) {
      Api.setRequestPayload(params);
    }

    // Send request
    http.send(params);
  }
}());
