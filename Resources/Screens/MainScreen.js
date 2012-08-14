Titanium.include('Constants.js');

// To get current window
var win = Ti.UI.currentWindow;
if (platform == 'android') {
	win.addEventListener('android:back', function(e) {
		win.close();
	});
}
// To add Start, View and End Trip Button
var buttonViewMainScreen = Titanium.UI.createView({
	layout : 'vertical'
});

var startTripButton = Titanium.UI.createButton({
	title : 'Start Trip',
	top : deviceHeight - deviceWidth - 100,
	height : 70,
	width : deviceWidth / 2
});
//To open Start Trip Screen
startTripButton.addEventListener('click', function(e) {
	var startWindow = Titanium.UI.createWindow({
		backgroundColor : 'white',
		width : deviceWidth,
		url : 'StartScreen.js'
	});

	startWindow.open();

});

var viewTripButton = Titanium.UI.createButton({
	title : 'View Trip',
	//	top:120,
	top : 30,
	height : 70,
	width : deviceWidth / 2
});
//To open View Trip Screen
viewTripButton.addEventListener('click', function(e) {
	try {
		var database = Ti.Database.install('/database/GoRoamPODDB.sqlite', 'GoRoamPODDB');
		var tripRow = database.execute('SELECT * FROM Trip_Table');
		if (tripRow.rowCount < 1) {
			alert('Please start a trip');
			return;
		} else {
			var tripDetailWindow = Titanium.UI.createWindow({
				backgroundColor : 'white',
				width : deviceWidth,
				url : 'TripDetailScreen.js',
				orientationModes : [1]
			});
			tripDetailWindow.open();
		}
		tripRow.close();
		database.close();
	} catch(err) {
		alert(err);
	}
});

var endTripButton = Titanium.UI.createButton({
	title : 'End Trip',
	//	top:190,
	top : 30,
	height : 70,
	width : deviceWidth / 2
});
//
endTripButton.addEventListener('click', function(e) {
	try {
		var database = Ti.Database.install('/database/GoRoamPODDB.sqlite', 'GoRoamPODDB');
		var tripRow = database.execute('SELECT * FROM Trip_Table');
		if (tripRow.rowCount < 1) {
			alert('Please start a trip');
			return;
		} else {
			var db = Ti.Database.open('GoRoamPODDB');
			db.execute('DELETE FROM  Trip_Table');
			db.execute('DELETE FROM  Order_Table');
			db.execute('DELETE FROM  Order_Detail_Table');
			db.execute('DELETE FROM  Load_Table');
			db.execute('DELETE FROM  Load_Detail_Table');
			alert('Your trip has been ended successfully.')
			/*	Ti.App.Properties.removeProperty("CompanyCode");
			 Ti.App.Properties.removeProperty("UserName");
			 Ti.App.Properties.removeProperty("Password");
			 Ti.App.Properties.removeProperty("AutoLogin");*/
		}
		tripRow.close();
		database.close();
	} catch(err) {
		alert(err);
	}

});

var tabGroupHorizontalView = Titanium.UI.createView({
	//top:270,
	bottom : 0,
	width : deviceWidth,
	height : 50,
	layout : 'horizontal',
	backgroundColor : 'gray',
});

var syncLabel = Titanium.UI.createLabel({
	height : 50,
	width : deviceWidth / 2,
	text : 'Sync',
	color : 'white',
	textAlign : 'center',
	borderColor : 'black',
	borderWidth : 1,
	backgroundColor : 'gray'
});
syncLabel.addEventListener('click', function(e) {
	syncLabel.setBackgroundColor('darkgray');
	settingsLabel.setBackgroundColor('gray');
	var syncWindow = Titanium.UI.createWindow({
		backgroundColor : 'white',
		width : deviceWidth,
		url : 'SyncScreen.js'
	});

	syncWindow.open();

});

var settingsLabel = Titanium.UI.createLabel({
	height : 50,
	width : deviceWidth / 2,
	text : 'Settings',
	color : 'white',
	textAlign : 'center',
	borderColor : 'black',
	borderWidth : 1,
	backgroundColor : 'gray'
});

settingsLabel.addEventListener('click', function(e) {
	settingsLabel.setBackgroundColor('darkgray');
	syncLabel.setBackgroundColor('gray');
	var settingsWindow = Titanium.UI.createWindow({
		backgroundColor : 'white',
		width : deviceWidth,
		url : 'SettingsScreen.js',

	});

	settingsWindow.open();

});
/*try {
 var database = Ti.Database.install('/database/GoRoamPODDB.sqlite', 'GoRoamPODDB');
 var tripRow = database.execute('SELECT * FROM Trip_Table');
 if (tripRow.rowCount < 1) {
 viewTripButton.enabled = false;
 endTripButton.enabled = false;
 } else {
 viewTripButton.enabled = true;
 endTripButton.enabled = true;
 }
 } catch(err) {
 alert(err);
 }*/

tabGroupHorizontalView.add(syncLabel);
tabGroupHorizontalView.add(settingsLabel);

buttonViewMainScreen.add(startTripButton);
buttonViewMainScreen.add(viewTripButton);
buttonViewMainScreen.add(endTripButton);

win.add(buttonViewMainScreen);
win.add(tabGroupHorizontalView);

