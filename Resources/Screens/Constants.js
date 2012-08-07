var deviceWidth = Titanium.Platform.displayCaps.platformWidth;
var deviceHeight = Titanium.Platform.displayCaps.platformHeight;
var platform = Ti.Platform.name;
//var parameters = new Array();
var dataOfListTripForStartScreen = new Array();

if(platform == 'android')
{
	headingHeight = 50;
	topDistanceForButton = 5;
	buttonHeight = 45;
	buttonWidth = 100,
	headingLeftSpace = 150;
	headingLeftSpaceForShortHeadings = 120;
	headingLeftSpaceForMedHeadings = 140;
	checkBoxButtonLeft = 0;
	//tableHeight = 260;
	tableHeight = Ti.UI.SIZE;
	sslLabelTop = 25;
	borderColorForTextArea = 'transparent';
	buttonHeightForAll = 50;
	textFieldTop = 5;
	if(deviceWidth == 320)
	{
		dropDownImage = '/images/bigdropdown1.png';
	}
	else
	{
		dropDownImage = '/images/bigdropdown.png';
	}
}
else
{
	headingHeight = deviceHeight*10/100;
	topDistanceForButton = 10;
	buttonHeight = 30;
	buttonWidth = 70,
	headingLeftSpace = 120;
	headingLeftSpaceForShortHeadings = 100;
	headingLeftSpaceForMedHeadings = 115;
	checkBoxButtonLeft = - 10;
	tableHeight = 180;
	sslLabelTop = 7;
	borderColorForTextArea = 'black';
	buttonHeightForAll = 40;
	textFieldTop = 15;
	dropDownImage = '/images/iphone-dpb-1.png';
}

var imageInDatabase = false;
var fileName = 'Painting-1.png';

var imageFile = Ti.Filesystem.getFile('file:///store/').exists() ? Ti.Filesystem.getFile('file:///store/', fileName) : Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, fileName);

var digitalSign = Titanium.UI.createImageView({
	//image : '/images/tick-mark-no.png',
	height : 45,
	width : 90,
	top : 0,
	backgroundColor : 'transparent',
	zIndex : 1
});

var Paint = require('ti.paint');

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

var activityInd = Titanium.UI.createActivityIndicator({
			message: 'Loading...'
});
