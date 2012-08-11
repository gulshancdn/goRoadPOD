Titanium.include('/Screens/Constants.js');
Titanium.include('/util/jsonSerializable.js');

var LOGIN_CON = 1;
var GET_LIST_TRIP = 2;
var _START_TRIP = 3;
var VERIFY_LOGIN_CON = 4;

var DOMAIN_URL = 'http://ss2.test.bizspeed.com/syncmobilesuitejson.asmx';

function getConnection(url, request, showInd, context) {
	if (showInd) {
		activityInd.show();
	}
	var client = Ti.Network.createHTTPClient();
	client.timeout = 3000;
	client.onload = function() {
		callback(this.responseText, this.status, context, true);
	};
	client.onerror = function() {
		alert('Error Status =' + this.status + ' Response =' + this.responseText);
		activityInd.hide();
	};
	/*if (showInd) {
		activityInd.hide();
	}*/
	url = url + "/BrokerMessageJSON";
	client.open('POST', url);
	client.setRequestHeader('Content-Type', 'application/json');
	client.send(request);
}

function doLogin(params) {
	var url = DOMAIN_URL;
	
	var opcode = 'AuthenticateUser'
	var module = 'SS2.MobileHub.SyncMobileSuiteJSON';
	var a = new Object();
	a["InParam1"] = "";

	var request = getJSONString(opcode, a, module, params);
//	alert(request);
	getConnection(url, request, true, LOGIN_CON);
}

function getListOfTrips(params){
	var vehicleId = params[0];
	var tripDate = params[1];
	var url = DOMAIN_URL;
	var opcode = 'ListTrips';
	var module = 'SS2.MobileHub.Classes.SyncMobileHelpers.PODData';
	var a = new Object();
	a["vehicleId"] = vehicleId;
	a["tripDate"] = tripDate;
	var param = new Array();
	param[0] = Ti.App.Properties.getString("CompanyCode");
	param[1] = Ti.App.Properties.getString("UserName");
	param[2] = Ti.App.Properties.getString("Password");
	
	var request = getJSONString(opcode, a, module, param);
	getConnection(url, request, true, GET_LIST_TRIP);
}

function startTrip(params){
	var tripRefId = params[0];
	var vehicleId = params[1];
	var odometer = params[2];
	var notes = params[3];
	
	var url = DOMAIN_URL;
	var opcode = 'StartTrip';
	var module = 'SS2.MobileHub.Classes.SyncMobileHelpers.PODData';
	var a = new Object();
	a["tripRefId"] = tripRefId;
	a["vehicleId"] = vehicleId;
	a["odometer"] = odometer;
	a["notes"] = notes;
	
	var param = new Array();
	param[0] = Ti.App.Properties.getString("CompanyCode");
	param[1] = Ti.App.Properties.getString("UserName");
	param[2] = Ti.App.Properties.getString("Password");
	
	var request = getJSONString(opcode, a, module, param);
	getConnection(url, request, true, _START_TRIP);
}

function verifyLogin(params) {
	var url = params[3];

	var opcode = 'AuthenticateUser'
	var module = 'SS2.MobileHub.SyncMobileSuiteJSON';
	var a = new Object();
	a["InParam1"] = "";

	var request = getJSONString(opcode, a, module, params);
//	alert(request);
	getConnection(url, request, true, VERIFY_LOGIN_CON);
}

function callback(response, statusCode, context, showInd) {
	switch(context) {
		case LOGIN_CON:
			loginCallback(response, statusCode, showInd);
			break;
		case GET_LIST_TRIP:
			listTripsCallback(response, statusCode, showInd);
			break;
		case _START_TRIP:
			startTripCallback(response, statusCode, showInd);
			break;
		case VERIFY_LOGIN_CON:
			verifyLoginCallback(response, statusCode, showInd);
			break;
	}
}

