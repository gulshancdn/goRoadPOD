Titanium.include('Constants.js');
// To get current window
var syncWindow = Ti.UI.currentWindow;
if (platform == 'android') {
	syncWindow.addEventListener('android:back', function(e) {
		syncWindow.close();
	});
}
// Heading View
var syncViewHeading = Titanium.UI.createView({
	top : 0,
	height : headingHeight,
	width : deviceWidth,
	layout : 'horizontal',
	backgroundColor : 'gray',
	borderColor : 'black',
	borderWidth : 1
});
// Back Button
var buttonBackSync = Titanium.UI.createButton({
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
buttonBackSync.addEventListener('click', function(e) {
	syncWindow.close();
});
// Heading text
var headingSync = Titanium.UI.createLabel({
	top : 7,
	text : 'Sync',
	height : 40,
	//	width : deviceWidth - 120,
	width : 100,
	color : 'black',
	left : deviceWidth / 2 - headingLeftSpaceForShortHeadings,
	font : {
		fontSize : 20,
		fontFamily : 'Helvetica Neue',
		fontWeight : 'bold'
	},
});

syncViewHeading.add(buttonBackSync);
syncViewHeading.add(headingSync);

var syncButton = Titanium.UI.createButton({
	top : 60,
	height : buttonHeightForAll,
	width : deviceWidth / 4,
	title : 'Sync'
});
syncButton.addEventListener('click', function(e) {

});
/*var scrollViewForSync = Titanium.UI.createScrollView({
	contentWidth : 'auto',
	contentHeight : 'auto',
	width : deviceWidth - deviceWidth / 8,
	//height:deviceHeight - 250,
	bottom : 20,
	top : 120,
	showVerticalScrollIndicator : true,
	showHorizontalScrollIndicator : true,
	backgroundColor : 'gray'
});*/

var strings = ['Connected', 'Logged On', 'Sending Orders', 'Receiving Orders'];
var k = 0;
var top = 0;
var syncData = [];
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

	scrollViewForSync.add(scrollViewLabel_1);*/
	
	syncData[i] = Ti.UI.createTableViewRow({
		selectedBackgroundColor : 'transparent',
		className : i,
		color : 'white',
		backgroundColor : 'gray',
		title : strings[k]
	});
	k++;
}

var syncTable = Ti.UI.createTableView({
	data : syncData,
//	height : 100,
	top : 120,
	width : deviceWidth - deviceWidth / 8,
	bottom : 20,
	backgroundColor : 'gray',
	separatorColor : 'white'
});

syncWindow.add(syncViewHeading);
syncWindow.add(syncButton);
//syncWindow.add(scrollViewForSync);
syncWindow.add(syncTable);
