Titanium.include('/Screens/Constants.js');

var LOGIN_CON = 1;
var DOMAIN_URL = 'http://ss2.test.bizspeed.com/SS2.MobileHub/SyncMobileSuiteJSON.asmx';

function getConnection(url, request, showInd) {
	if (showInd) {
		activityInd.show();
	}
	var client = Ti.Network.createHTTPClient();
	client.timeout = 3000;
	client.onload = function() {
		var response = JSON.parse(this.responseText);
		alert('Response ' + response);
		callback(this.responseText, this.status);
	};
	client.onerror = function() {
		alert('Error Status =' + this.status + 'Response =' + this.responseText);
	};
	if (showInd) {
		activityInd.hide();
	}
	url = url +"/BrokerMessageJSON";
	client.open('POST', url);
	client.setRequestHeader('Content-Type', 'application/json');
	client.send(request);

//	var httpResponse = client.getResponseText;
//	alert('Response ' + httpResponse);
}

function doLogin() {
	var url = DOMAIN_URL;
	var request = "<soapenv:Envelope xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:SOAP-ENC=\"http://schemas.xmlsoap.org/soap/encoding/\" xmlns:urn=\"urn:soapservice\"><soapenv:Header/><soapenv:Body><urn:getNearbySight soapenv:encodingStyle=\"http://schemas.xmlsoap.org/soap/encoding/\"><urn:username xsi:type=\"xsd:string\" xs:type=\"type:string\" xmlns:xs=\"http://www.w3.org/2000/XMLSchema-instance\">feeditch</urn:username><urn:password xsi:type=\"xsd:string\" xs:type=\"type:string\" xmlns:xs=\"http://www.w3.org/2000/XMLSchema-instance\">cdn123</urn:password><urn:user_id xsi:type=\"xsd:string\" xs:type=\"type:string\" xmlns:xs=\"http://www.w3.org/2000/XMLSchema-instance\">189</urn:user_id><urn:latitude xsi:type=\"xsd:string\" xs:type=\"type:string\" xmlns:xs=\"http://www.w3.org/2000/XMLSchema-instance\">22.725808</urn:latitude><urn:longitude xsi:type=\"xsd:string\" xs:type=\"type:string\" xmlns:xs=\"http://www.w3.org/2000/XMLSchema-instance\">75.887210</urn:longitude></urn:getNearbySight></soapenv:Body></soapenv:Envelope>";
	get(url, request, true);
}
