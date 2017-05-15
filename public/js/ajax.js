/*
	Author: Daniel Kearsley - 32705474
	Date: 24/04/17
*/

function GetFormData(id){
    var params = '';
    var form = document.getElementById(id).elements;
    var len = form.length;
    
    for(var i=0; i<len; i++){
        if(form[i].name !== null){
			if (form[i].type === 'checkbox' || form[i].type === 'radio') {
                if(form[i].checked === true){
                    params += form[i].name+'='+form[i].value+'&';
                }
            } else {
                params += form[i].name+'='+form[i].value+'&';
            }
        } 
    }

    return params;
}

function PostData(url, id) {
	var params = GetFormData(id);
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
				data = JSON.parse(this.responseText);
				
				if(data != null){
					ConversationPanel.SendConfirmation(data['action'], data['data']);
				}
			}
		};
	xhttp.open("POST", url, true);
	xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xhttp.send(params);
}