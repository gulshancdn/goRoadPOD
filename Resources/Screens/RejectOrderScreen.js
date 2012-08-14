Titanium.include('Constants.js');

// To get current window
var rejectOrderWindow = Ti.UI.currentWindow;
if (platform == 'android') {
	rejectOrderWindow.addEventListener('android:back', function(e) {
		rejectOrderWindow.close();
	});
}
// Heading View
var rejectOrderViewHeading = Titanium.UI.createView({
	top : 0,
	height : headingHeight,
	width : deviceWidth,
	layout : 'horizontal',
	backgroundColor : 'gray',
	borderColor : 'black',
	borderWidth : 1
});
// Back Button
var buttonBackRejectOrder = Titanium.UI.createButton({
	title : 'BACK',
	width : buttonWidth,
	height : buttonHeight,
	top : topDistanceForButton,
	left : 5,
	font : {
		fontSize : 15
	}
});
// To close current window
buttonBackRejectOrder.addEventListener('click', function(e) {
	rejectOrderWindow.close();
});
// Heading text
var headingRejectOrder = Titanium.UI.createLabel({
	top : 7,
	text : 'Reject Order',
	height : 40,
	//	width : deviceWidth - 120,
	width : 150,
	color : 'black',
	left : deviceWidth / 2 - headingLeftSpace,
	font : {
		fontSize : 20,
		fontFamily : 'Helvetica Neue',
		fontWeight : 'bold'
	},
});

rejectOrderViewHeading.add(buttonBackRejectOrder);
rejectOrderViewHeading.add(headingRejectOrder);

var reasonLabel = Titanium.UI.createLabel({
	top : 10,
	left : 25,
	height : 'auto',
	text : 'Reason',
	color : 'black'
});

/*var scrollViewForRejectOrder = Titanium.UI.createScrollView({
	contentWidth : 'auto',
	contentHeight : 'auto',
	width : deviceWidth - deviceWidth / 8,
	height : 280,
	top : 10,
	showVerticalScrollIndicator : true,
	showHorizontalScrollIndicator : true,
	backgroundColor : 'gray'
});*/

var strings = ['Not at Home', 'Refused', 'Wrong Product'];
var k = 0;
var top = 0;
var rejectOrderData = [];
for (var i = 0; i < 20; i++) {
	if (k == 3) {
		k = 0;
	}
	/*var scrollViewLabel_1 = Titanium.UI.createLabel({
		top : top,
		color : 'white',
		text : strings[k],
		borderColor : 'white',
		height : 50,
		width : deviceWidth - deviceWidth / 8,
		textAlign : 'center',
		borderWidth : 1,
		backgroundColor : 'gray'
	});
	k++;
	top += 50;

	scrollViewForRejectOrder.add(scrollViewLabel_1);*/
	rejectOrderData[i] = Ti.UI.createTableViewRow({
		selectedBackgroundColor : 'transparent',
		className : i,
		color : 'white',
		backgroundColor : 'gray',
		title : strings[k]
	});
	k++;
}

var rejectOrderTable = Ti.UI.createTableView({
	data : rejectOrderData,
//	height : 100,
	top : 10,
	width : deviceWidth - deviceWidth / 8,
	height : 280,
	backgroundColor : 'gray',
	separatorColor : 'white'
});

var saveButton = Titanium.UI.createButton({
	//bottom:deviceHeight*25/100,
	top : 10,
	height : buttonHeightForAll,
	width : deviceWidth / 4,
	title : 'Save'
});

saveButton.addEventListener('click', function(e) {
	var tripDetailWindow = Titanium.UI.createWindow({
		backgroundColor : 'white',
		width : deviceWidth,
		url : 'TripDetailScreen.js',
		orientationModes : [1]
	});

	tripDetailWindow.open();
});

rejectOrderWindow.add(rejectOrderViewHeading);
rejectOrderWindow.add(reasonLabel);
//rejectOrderWindow.add(scrollViewForRejectOrder);
rejectOrderWindow.add(rejectOrderTable);
rejectOrderWindow.add(saveButton);
