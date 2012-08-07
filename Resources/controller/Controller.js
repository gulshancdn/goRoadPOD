Titanium.include('/Screens/Constants.js');
Titanium.include('Communicator.js');

var ACTION_LOGIN = 1;
var LIST_TRIPS = 2;
var START_TRIP = 3;
var returnback;

function doAction(action, params, callbck) {
	returnback = callbck;
	switch(action) {
		case ACTION_LOGIN:
			doLogin(params);
			break;
		case LIST_TRIPS:
			getListOfTrips(params);
			break;
		case START_TRIP:
			startTrip(params);
			break;
	}
}

function loginCallback(response, statusCode, showInd) {
	if ((response != null && response.trim().length > 0) || statusCode == '200') {
		//alert(response + ' ' + statusCode);
		if (showInd) {
			activityInd.hide();
		}
		var parsedData = JSON.parse(response);
		if (parsedData != null) {
			try {
				if (parsedData.d.status == 'OK') {
					var win = Titanium.UI.createWindow({
						backgroundColor : 'white',
						width : deviceWidth,
						url : '/Screens/MainScreen.js',
						exitOnClose : true,
						orientationModes : [1]
					});

					win.open();
				} else {
					alert(parsedData.d.messageData.Error);
				}

			} catch(err) {
				alert(err);
			}
		}
	}
}

function listTripsCallback(response, statusCode, showInd) {
	//	alert(response + ' ' + statusCode);
	//	return;
	if ((response != null && response.trim().length > 0) || statusCode == '200') {
		if (showInd) {
			activityInd.hide();
		}
		var parsedData = JSON.parse(response);
		if (parsedData != null) {
			try {
				if (parsedData.d.status == 'OK') {
					var array = parsedData.d.messageData.trips;
					returnback(array);
					/*for(var i = 0;i<array.length;i++){
					 //	alert(array[i].trip.tripRefId);
					 //	alert(array[i].trip.tripCode);
					 }*/
				} else {
					alert(parsedData.d.messageData.Error);
				}

			} catch(err) {
				alert(err);
			}
		}
	}
}

function startTripCallback(response, statusCode, showInd) {
	Ti.API.info(response);
	//	alert(response + ' ' + statusCode);
	//	return;
	if ((response != null && response.trim().length > 0) || statusCode == '200') {
		if (showInd) {
			activityInd.hide();
		}
		var parsedData = JSON.parse(response);
		if (parsedData != null) {
			try {
				if (parsedData.d.status == 'OK') {
					var tripDetailWindow = Titanium.UI.createWindow({
						backgroundColor : 'white',
						width : deviceWidth,
						url : 'TripDetailScreen.js',
						orientationModes : [1],
						data : parsedData
					});
					tripDetailWindow.open();
				} else {
					alert(parsedData.d.messageData.Error);
				}

			} catch(err) {
				alert(err);
			}
		}
	}
}
