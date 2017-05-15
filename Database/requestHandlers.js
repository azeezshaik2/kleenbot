//requestHandlers.js

process.env.TMPVAR = './tmp'; // MUST INCLUDE THIS LINE
var fs = require("fs");
//Formidable for post form handling
var formidable = require("formidable");

//Allow cross origin requests from url
var crossOrigin = 'http://localhost:3000';

function SendCustomer(data, connection){
	var insertCustomerInfoStep1 = 'insert into customerinfo (FirstName) values("'+data['input_1.3']+'")';
	connection.query(insertCustomerInfoStep1, function (err1, res1) {
		if (err1){
			console.log(err1);
		}else{
			console.log("CuctomerInfo1 updated!");
		} 	
	});

	var insertCustomerInfoStep2 = 'UPDATE customerinfo SET title="'+data['input_1.2']+'", lastname="'+data['input_1.6']+'", PhoneNumber="'+data['input_15']+'", EmailAddress="'+data['input_14']+'", DOB="'+data['input_54']+'", StreetAddress="'+data['input_4.1']+'", City="'+data['input_4.3']+'", Postcode="'+data['input_4.5']+'", State="'+data['input_15']+'", LPGCylinderRequire='+data['input_47']+', PromotionalCode="'+data['input_18']+'", IfCylinderExist="'+data['input_29']+'", IfNewInstallation="'+data['input_53']+'", NoticeOfCompletion='+data['firstname']+',Suppliers="'+data['firstname']+'" WHERE FirstName="'+data['firstname']+'"';
	connection.query(insertCustomerInfoStep2, function (err1, res1) {
		if (err1){
			console.log(err1);
		}else{
			console.log("CuctomerInfo2 updated!");
		} 	
	});
}

function SendOrder(data, connection){
	var insertOrderInfoStep1 = 'insert into OrderInfo (AccNumber) values("'+data['firstname']+'")';
	connection.query(insertOrderInfoStep1, function (err1, res1) {
		if (err1){
			console.log(err1);
		}else{
			console.log("OrderInfo1 updated!");
		} 	
	});

	var insertOrderInfoStep2 = 'UPDATE OrderInfo SET OrderInfo="'+data['firstname']+'" WHERE AccNumber='+data['firstname']+'';
	connection.query(insertOrderInfoStep2, function (err1, res1) {
		if (err1){
			console.log(err1);
		}else{
			console.log("OrderInfo2 updated!");
		} 	
	});

}

function SendCreditCard(data, connection){
	var insertCreditCardInfoStep1 = 'insert into CreditCardInfo (OrderID) values("'+data['firstname']+'")';
	connection.query(insertCreditCardInfoStep1, function (err1, res1) {
		if (err1){
			console.log(err1);
		}else{
			console.log("CreditCardInfo1 updated!");
		} 	
	});

	var insertCreditCardInfoStep1 = 'insert into CreditCardInfo (OrderID) values("'+data['firstname']+'")';
	connection.query(insertCreditCardInfoStep1, function (err1, res1) {
		if (err1){
			console.log(err1);
		}else{
			console.log("CreditCardInfo1 updated!");
		} 	
	});
}

//Recieving LPG customerDetails data
function reqCustomerDetails(response, request, connection) {
	console.log("Request handler 'customerDetails' was called.");
	var data;
	var form = new formidable.IncomingForm();
	console.log("Recieved post");
	form.parse(request, function(err, field, file) {
		data = field;
		
		var account = {
			'accountNumber': 123456,
			'accountName': 'Daniel Kearsley',
			'orderId': 123456
		};
		
		var returnData = {
			'title': data['input_1.2'], //title
			'firstname': data['input_1.3'], //firstname
			'lastname': data['input_1.6'], //lastname
			'phonenumber': data['input_15'], //phonenumber
			'email': data['input_14'], //email
			'paperless': data['input_22.1'], //opt to paperless
			'dob': data['input_54'], //dob
			'account': account
		};
		
		var res = {
			'action': 'confirm',
			'data': returnData
		};
		
		console.log(returnData);
		response.writeHead(200, {"Content-Type": "text/html", 'Access-Control-Allow-Origin' : crossOrigin,});
		response.write(JSON.stringify(res));
		response.end();
	});
}

//Recieving LPG addressForm data
function reqAddressForm(response, request, connection) {
	console.log("Request handler 'addressForm' was called.");
	var data;
	var form = new formidable.IncomingForm();
	console.log("Recieved post");
	form.parse(request, function(err, field, file) {
		data = field;
		
		var returnData = {
			'streetAddress': data['input_4.1'], //street address
			'city': data['input_4.3'], //city
			'postcode': data['input_4.5'], //postcode
			'state': data['input_51'], //state
		};
		
		var res = {
			'action': 'confirm',
			'data': returnData
		};
		
		console.log(returnData);
		response.writeHead(200, {"Content-Type": "text/html", 'Access-Control-Allow-Origin' : crossOrigin,});
		response.write(JSON.stringify(res));
		response.end();
	});
}

//Recieving LPG loginForm data
function reqloginForm(response, request, connection) {
	console.log("Request handler 'loginForm' was called.");
	var data;
	var form = new formidable.IncomingForm();
	console.log("Recieved post");
	form.parse(request, function(err, field, file) {
		data = field;
		
		var date = new Date().getTime();
		if(date.getDay === 6){
			var myDate = new Date(date+(4*24*60*60*1000));
		} else if(date.getDay === 0){
			var myDate = new Date(date+(3*24*60*60*1000));
		} else {
			var myDate = new Date(date+(2*24*60*60*1000));
		}
		myDate = myDate.toLocaleDateString("en-AU")
		
		var returnData = {
			'AccountNumber': data['AccountNumber'], //account number
			'Postcode': data['Postcode'], //postcode
			'accountName': 'Daniel Kearsley', //Account name
			'accountType': 'Residential', //Account type
			'billingAddress' : '1 Smith street Murdoch', //Billing address
			'contact' : '0412456789', //Contact
			'email' : 'daniel@gmail.com.au', //Email
			'deliveryAddresses': ['1 Smith street Murdoch', '2 Smith street Murdoch'],//Delivery Addresses
			'deliveryDate': myDate //Delivery Date
		};
		
		var res = {
			'action': 'confirm',
			'data': returnData
		};
		
		console.log(data);
		response.writeHead(200, {"Content-Type": "text/html", 'Access-Control-Allow-Origin' : crossOrigin,});
		response.write(JSON.stringify(res));
		response.end();
	});
}

//Recieving the createPassword data
function reqCreatePassword(response, request, connection) {
	console.log("Request handler 'createPassword' was called.");
	var data;
	var form = new formidable.IncomingForm();
	console.log("Recieved post");
	form.parse(request, function(err, field, file) {
		data = field;
		
		var returnData = {
			'username': data['username'], //username
			'password': data['password'] //password
		};
		
		var res = {
			'action': 'confirm',
			'data': {}
		};
		
		console.log(returnData);
		response.writeHead(200, {"Content-Type": "text/html", 'Access-Control-Allow-Origin' : crossOrigin,});
		response.write(JSON.stringify(res));
		response.end();
	});
}

//Recieving the post data
function reqPost(response, request, connection) {
	console.log("Request handler 'post' was called.");
	var data;
	var form = new formidable.IncomingForm();
	console.log("Recieved post");
	form.parse(request, function(err, field, file) {
		data = field;
		var context = JSON.parse(data['data']);
		
		console.log('Carrier: '+context['carrier']);
		var res = {};
		
		if(context['carrier'] === "lpgAmount"){
			var lpgAmount = context['order']['lpgAmount'];
			console.log(lpgAmount);
			
		} else if(context['carrier'] === "promo"){
			var promo = context['order']['promoCode'];
			
			console.log(promo);
			if(promo === "1234"){
				res = {
					'action': 'confirm',
					'data': {}
				};
			} else {
				res = {
					'action': 'invalid',
					'data': {}
				};
			}
			console.log(JSON.stringify(res));
			response.writeHead(200, {"Content-Type": "text/html", 'Access-Control-Allow-Origin' : crossOrigin,});
			response.write(JSON.stringify(res));
			response.end();
			
		} else if(context['carrier'] === "existingCylinder"){
			var exist = context['order']['existingCylinder'];
			console.log(exist);
			
		} else if(context['carrier'] === "orderSummary"){
			var qty = parseInt(context['order']['lpgAmount']);
			var unitPrice = 45.92;
			var GST = 10;
			var onlineDiscount = 5;
			
			var cost = unitPrice*qty;
			var discountValue = (cost*onlineDiscount/100);
			var subTotal = cost - discountValue;
			var GSTValue = (cost*GST/100);
			var total = subTotal - GSTValue;
			
			var returnData = {
				'lpgDescription': '45kg Cylinder', //lpgDescription
				'unitPrice': unitPrice, //unitPrice
				'cost': cost, //cost
				'discount': '5% online order discount', //discount
				'discountPrice': discountValue, //discountPrice
				'subTotal': subTotal, //subTotal
				'gst': GSTValue, //gst
				'total': total, //total
			};
			
			if(qty !== null){
				res = {
					'action': 'confirm',
					'data': returnData
				};
			} else {
				res = {
					'action': 'invalid',
					'data': {}
				};
			}
			console.log(JSON.stringify(res));
			response.writeHead(200, {"Content-Type": "text/html", 'Access-Control-Allow-Origin' : crossOrigin,});
			response.write(JSON.stringify(res));
			response.end();
			
		}
	});
}

function reqReturn(response, request, connection) {
	console.log("Request handler 'return' was called.");
	var data;
	var form = new formidable.IncomingForm();
	console.log("Recieved post");
	form.parse(request, function(err, field, file) {
		data = field;
		
		console.log(data);
		response.writeHead(200, {"Content-Type": "text/html", 'Access-Control-Allow-Origin' : crossOrigin,});
		//response.write('Thank You');
		response.end();
	});
}

function reqUpload(response, request) {
	console.log("Request handler 'upload' was called.");
	var form = new formidable.IncomingForm();
	form.uploadDir = "./tmp"
	console.log("... about to parse ...");
	form.parse(request, function(err, field, file) {
		console.log("parsing done");
		console.log(file.name);
		
		var res = {
			'action': 'confirm',
			'data': {"noticeOfCompletion": file.name}
		};
		 
		response.writeHead(200, {"Content-Type": "text/html", 'Access-Control-Allow-Origin' : crossOrigin,});
		response.write(JSON.stringify(res));
		response.end();
	});
}

//------------------------------------------------Natural Gas------------------------------------------------------

//Recieving the switchAddress data
function reqSwitchAddress(response, request, connection) {
	console.log("Request handler 'customerDetails' was called.");
	var data;
	var form = new formidable.IncomingForm();
	console.log("Recieved post");
	form.parse(request, function(err, field, file) {
		data = field;
		
		var account = {
			'accountNumber': 123456,
			'accountName': 'Daniel Kearsley',
			'orderId': 123456
		};
		
		var returnData = {
			'streetAddress': data['ConnectionStreet'], //street address
			'suburb': data['ConnectionSuburb'], //suburb
			'postcode': data['ConnectionPostcode'], //postcode
			'account': account
		};
		
		var res = {
			'action': 'confirm',
			'data': returnData
		};
		
		console.log(returnData);
		response.writeHead(200, {"Content-Type": "text/html", 'Access-Control-Allow-Origin' : crossOrigin,});
		response.write(JSON.stringify(res));
		response.end();
	});
}

//Recieving the MoveAddress data
function reqMoveAddress(response, request, connection) {
	console.log("Request handler 'customerDetails' was called.");
	var data;
	var form = new formidable.IncomingForm();
	console.log("Recieved post");
	form.parse(request, function(err, field, file) {
		data = field;
		
		var account = {
			'accountNumber': 123456,
			'accountName': 'Daniel Kearsley',
			'orderId': 123456
		};
		
		var returnData = {
			'streetAddress': data['ConnectionStreet'], //street address
			'suburb': data['ConnectionSuburb'], //suburb
			'postcode': data['ConnectionPostcode'], //postcode
			'moveInDate': data['MoveInDate'], //Move in date
			'account': account
		};
		
		var res = {
			'action': 'confirm',
			'data': returnData
		};
		
		console.log(returnData);
		response.writeHead(200, {"Content-Type": "text/html", 'Access-Control-Allow-Origin' : crossOrigin,});
		response.write(JSON.stringify(res));
		response.end();
	});
}

//Recieving the NaturalGas data
function reqNaturalGas(response, request, connection) {
	console.log("Request handler 'customerDetails' was called.");
	var data;
	var form = new formidable.IncomingForm();
	console.log("Recieved post");
	form.parse(request, function(err, field, file) {
		data = field;
		var returnData = {
			'title': data['input_1.2'], //title
			'firstname': data['input_1.3'], //firstname
			'lastname': data['input_1.6'], //lastname
			'phonenumber': data['input_15'], //phonenumber
			'email': data['input_14'], //email
			'username': data['username'], //username
			'password': data['password'] //password
		};
		
		var res = {
			'action': 'confirm',
			'data': returnData
		};
		
		console.log(returnData);
		response.writeHead(200, {"Content-Type": "text/html", 'Access-Control-Allow-Origin' : crossOrigin,});
		response.write(JSON.stringify(res));
		response.end();
	});
}

//Recieving the CreditCard data
function reqCreditCard(response, request, connection) {
	console.log("Request handler 'customerDetails' was called.");
	var data;
	var form = new formidable.IncomingForm();
	console.log("Recieved post");
	form.parse(request, function(err, field, file) {
		data = field;
		var returnData = {
			'card-holder-name': data['card-holder-name'], //street address
			'card-number': data['card-number'], //suburb
			'expiry-month': data['expiry-month'], //postcode
		};
		
		var res = {
			'action': 'confirm',
			'data': returnData
		};
		
		console.log(returnData);
		response.writeHead(200, {"Content-Type": "text/html", 'Access-Control-Allow-Origin' : crossOrigin,});
		response.write(JSON.stringify(res));
		response.end();
	});
}

//Recieving the DebitCard data
function reqDebitCard(response, request, connection) {
	console.log("Request handler 'customerDetails' was called.");
	var data;
	var form = new formidable.IncomingForm();
	console.log("Recieved post");
	form.parse(request, function(err, field, file) {
		data = field;
		var returnData = {
			'bsb': data['bsb'], //bsb
			'account-number': data['account-number'], //account-number
			'account-name': data['account-name'], //account-name
		};
		
		var res = {
			'action': 'confirm',
			'data': returnData
		};
		
		console.log(returnData);
		response.writeHead(200, {"Content-Type": "text/html", 'Access-Control-Allow-Origin' : crossOrigin,});
		response.write(JSON.stringify(res));
		response.end();
	});
}

function reqFinalOrder(response, request, connection) {
	console.log("Request handler 'finalOrder' was called.");
	var data;
	var form = new formidable.IncomingForm();
	console.log("Recieved post");
	form.parse(request, function(err, field, file) {
		data = field;
		
		var context = JSON.parse(data['data']);
		
		if(context['orderType'] === 'LPG'){
			
		} else {
			
		}
		
		var res = {
			'action': 'confirm',
			'data': returnData
		};
		
		console.log(returnData);
		response.writeHead(200, {"Content-Type": "text/html", 'Access-Control-Allow-Origin' : crossOrigin,});
		response.write(JSON.stringify(res));
		response.end();
	});
}

exports.reqFinalOrder = reqFinalOrder;

exports.reqloginForm = reqloginForm;

exports.reqCustomerDetails = reqCustomerDetails;

exports.reqCreatePassword = reqCreatePassword;

exports.reqAddressForm = reqAddressForm;

exports.reqPost = reqPost;

exports.reqUpload = reqUpload;

//----------Natural Gas-------------------------------------
exports.reqSwitchAddress = reqSwitchAddress;

exports.reqMoveAddress = reqMoveAddress;

exports.reqNaturalGas = reqNaturalGas;

exports.reqCreditCard = reqCreditCard;

exports.reqDebitCard = reqDebitCard;