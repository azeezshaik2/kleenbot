//index.js

var server = require("./server");
var router = require("./router");
//Include request handlers
var requestHandlers = require("./requestHandlers");
// create ‘handle’ object literal
var handle = {};
// using associative array notation
// each array key points to an appropriate request handler

handle["/finalOrder"] = requestHandlers.reqFinalOrder;

//Login form request handler
handle["/loginForm"] = requestHandlers.reqloginForm;

handle["/customerDetails"] = requestHandlers.reqCustomerDetails;

handle["/createPassword"] = requestHandlers.reqCreatePassword;

handle["/addressForm"] = requestHandlers.reqAddressForm;

handle["/post"] = requestHandlers.reqPost;

handle["/upload"] = requestHandlers.reqUpload;

//Natural Gas
handle["/switchAddress"] = requestHandlers.reqSwitchAddress;

handle["/moveAddress"] = requestHandlers.reqMoveAddress;

handle["/naturalGas"] = requestHandlers.reqNaturalGas;

handle["/creditCard"] = requestHandlers.reqCreditCard;

handle["/directDebit"] = requestHandlers.reqDebitCard;
// pass handle object (and route function) to server

//Running the server and passing in the routing functions
server.startServer(router.route, handle);