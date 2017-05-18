/*
	Author: Daniel Kearsley - 32705474
	Date: 24/04/17
*/

/*
//Gets elements from a form and constructs form data object
function GetFormData(id){
    var params = new FormData();
    var form = document.getElementById(id).elements;
    var len = form.length;
    
	//Loops through the form and constructs
	//a name and value for each input field
    for(var i=0; i<len; i++){
        if(form[i].name !== null){
            if(form[i].type === 'file'){
                var files = form[i].files.length;
                for(var j=0; j<files; j++){
                    params.append(form[i].name, form[i].files[j], form[i].files[j].name);
                }
            } else if (form[i].type === 'checkbox' || form[i].type === 'radio') {
                if(form[i].checked === true){
                    params.append(form[i].name, form[i].value);
                }
            } else {
                params.append(form[i].name, form[i].value);
            }
        }   
    }
    
    return params;
}*/

//Convert file to base64
function getBase64(form) {
    var reader = new FileReader();
    reader.readAsDataURL(form.files[0]);
    reader.onload = function () {
		var params = '';
        base64 = reader.result;
		params += form.name+'='+base64+'&';
		
		var url = 'http://localhost:4000/upload';
		
		var latestResponse = Api.getResponsePayload();
		params += 'data='+JSON.stringify(latestResponse.context['order']);
		
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
					data = JSON.parse(this.responseText);
					
					//Sends confirmation data to the chatbot to progress to the
					//next step
					if(data != null){
						ConversationPanel.SendConfirmation(data['action'], data['data']);
					}
				}
			};
		xhttp.open("POST", url, true);
		xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		xhttp.send(params);
    };
}

//Gets elements from a form and constructs form data string
function SendFile(id){
    var form = document.getElementById(id).elements;
    var len = form.length;
    
	//Loops through the form and constructs
	//a name and value for each input field
    for(var i=0; i<len; i++){
        if(form[i].name !== null){
			if(form[i].type === 'file'){
				getBase64(form[i]);
            }
        } 
    }
	document.getElementById(id).id = "";
}

//Gets elements from a form and constructs form data string
function GetFormData(id){
    var params = '';
    var form = document.getElementById(id).elements;
    var len = form.length;
    
	//Loops through the form and constructs
	//a name and value for each input field
    for(var i=0; i<len; i++){
        if(form[i].name !== null){
			if (form[i].type === 'checkbox' || form[i].type === 'radio') {
                if(form[i].checked === true){
                    params += form[i].name+'='+form[i].value+'&';
                }
            } else if(form[i].type === 'file'){
				params += form[i].name+'='+getBase64(form[i].files[0])+'&';
				alert(params);
            } else {
                params += form[i].name+'='+form[i].value+'&';
            }
        } 
    }

	document.getElementById(id).id = "";
    return params;
}

function PostData(url, id) {
	var params = GetFormData(id);
	var latestResponse = Api.getResponsePayload();
	params += 'data='+JSON.stringify(latestResponse.context['order']);
	
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
				data = JSON.parse(this.responseText);
				
				//Sends confirmation data to the chatbot to progress to the
				//next step
				if(data != null){
					ConversationPanel.SendConfirmation(data['action'], data['data']);
				}
			}
		};
	xhttp.open("POST", url, true);
	xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xhttp.send(params);
}