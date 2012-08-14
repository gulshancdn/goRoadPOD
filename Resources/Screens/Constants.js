// To get Device Width
var deviceWidth = Titanium.Platform.displayCaps.platformWidth;
// To get Device Height
var deviceHeight = Titanium.Platform.displayCaps.platformHeight;
// To get platform name eiter android or iphone
var platform = Ti.Platform.name;

var mainWindow = null;
// For the single instance of Main Screen
function createMainWindow() {
	if (mainWindow != null) {
		return mainWindow;
	}
	mainWindow = Titanium.UI.createWindow({
		backgroundColor : 'white',
		width : deviceWidth,
		url : '/Screens/MainScreen.js',
		modal : modalValue,
		exitOnClose : true,
		orientationModes : [1]
	});

	return mainWindow;

}

// Some parameters for android platform
if (platform == 'android') {
	headingHeight = 50;
	topDistanceForButton = 5;
	buttonHeight = 45;
	buttonWidth = 100, headingLeftSpace = 150;
	headingLeftSpaceForShortHeadings = 120;
	headingLeftSpaceForMedHeadings = 140;
	checkBoxButtonLeft = 0;
	//tableHeight = 220;
	// 260
	tableHeight = Ti.UI.SIZE;
	sslLabelTop = 25;
	borderColorForTextArea = 'transparent';
	buttonHeightForAll = 50;
	textFieldTop = 5;
	if (deviceWidth == 320) {
		dropDownImage = '/images/bigdropdown1.png';
	} else {
		dropDownImage = '/images/bigdropdown.png';
	}
	if (deviceWidth == 320) {
		tripDetailLabelWidth = deviceWidth * 50 / 100;
	} else {
		tripDetailLabelWidth = deviceWidth * 80 / 100;
	}
	tableLeftSpace = 5;
	titaniumLogo = '/images/titanium_logo.png';
	leftSpaceForEditOrder = 10;
	modalValue = true;
}
// Some parameters for iphone platform
else {
	headingHeight = deviceHeight * 10 / 100;
	topDistanceForButton = 10;
	buttonHeight = 30;
	buttonWidth = 70, headingLeftSpace = 120;
	headingLeftSpaceForShortHeadings = 100;
	headingLeftSpaceForMedHeadings = 115;
	checkBoxButtonLeft = -10;
	tableHeight = 180;
	sslLabelTop = 7;
	borderColorForTextArea = 'black';
	buttonHeightForAll = 40;
	textFieldTop = 15;
	dropDownImage = '/images/iphone-dpb-1.png';
	tableLeftSpace = 90;
	titaniumLogo = '/images/titanium_logo_iphone.png';
	tripDetailLabelWidth = deviceWidth * 50 / 100;
	leftSpaceForEditOrder = 50;
	modalValue = false;
}

var imageInDatabase = false;
// File name to store digital signature
var fileName = 'Painting-1.png';
// File path
var imageFile = Ti.Filesystem.getFile('file:///store/').exists() ? Ti.Filesystem.getFile('file:///store/', fileName) : Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, fileName);
// Digital Sign as a image view for Edit Order Screen
var digitalSign = Titanium.UI.createImageView({
	//image : '/images/tick-mark-no.png',
	height : 45,
	width : 90,
	top : 0,
	backgroundColor : 'transparent',
	zIndex : 1
});
// Paint Module for digital sign
var Paint = require('ti.paint');
// Paint View for Signature form
var paintView = Paint.createPaintView({
	//top : 55,
	right : 5,
	top : 5,
	bottom : 5,
	left : 5,
	backgroundColor : 'white',
	// strokeWidth (float), strokeColor (string), strokeAlpha (int, 0-255)
	strokeColor : '#0f0',
	strokeAlpha : 255,
	strokeWidth : 10,
	eraseMode : false
});
// Activity Indicator
var activityInd = Titanium.UI.createActivityIndicator({
	message : 'Loading...'
});
