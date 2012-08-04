Titanium.include('Constants.js');

var win = Ti.UI.currentWindow;

var buttonViewMainScreen = Titanium.UI.createView({
	layout : 'vertical'
});

var startTripButton = Titanium.UI.createButton({
	title : 'Start Trip',
	top : deviceHeight - deviceWidth - 100,
	height : 70,
	width : deviceWidth / 2
});
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
viewTripButton.addEventListener('click', function(e) {

	var tripDetailWindow = Titanium.UI.createWindow({
		backgroundColor : 'white',
		width : deviceWidth,
		url : 'TripDetailScreen.js',
		orientationModes : [1]
	});

	tripDetailWindow.open();

});

var endTripButton = Titanium.UI.createButton({
	title : 'End Trip',
	//	top:190,
	top : 30,
	height : 70,
	width : deviceWidth / 2
});
endTripButton.addEventListener('click', function(e) {
		Ti.App.Properties.removeProperty("CompanyCode");
		Ti.App.Properties.removeProperty("UserName");
		Ti.App.Properties.removeProperty("Password");
		Ti.App.Properties.removeProperty("AutoLogin");
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
		url : 'SettingsScreen.js'
	});

	settingsWindow.open();

});

tabGroupHorizontalView.add(syncLabel);
tabGroupHorizontalView.add(settingsLabel);

buttonViewMainScreen.add(startTripButton);
buttonViewMainScreen.add(viewTripButton);
buttonViewMainScreen.add(endTripButton);

win.add(buttonViewMainScreen);
win.add(tabGroupHorizontalView);

