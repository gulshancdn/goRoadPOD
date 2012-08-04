Titanium.include('Constants.js');

var tripDetailWindow = Ti.UI.currentWindow;

var tripDetailScrollView = Titanium.UI.createScrollView({
	contentWidth : 'auto',
	contentHeight : 'auto',
	top : headingHeight,
	showVerticalScrollIndicator : true,
	showHorizontalScrollIndicator : true
});

var tripDetailHeading = Titanium.UI.createView({
	top : 0,
	height : headingHeight,
	width : deviceWidth,
	layout : 'horizontal',
	backgroundColor : 'gray',
	borderColor : 'black',
	borderWidth : 1
});

var buttonBacktripDetail = Titanium.UI.createButton({
	title : 'BACK',
	width : buttonWidth,
	height : buttonHeight,
	top : topDistanceForButton,
	left : 5,
	font : {
		fontSize : 15
	},
//	style : Titanium.UI.iPhone.SystemButtonStyle.PLAIN
});

buttonBacktripDetail.addEventListener('click', function(e) {
	tripDetailWindow.close();
});

var headingtripDetail = Titanium.UI.createLabel({
	top : 7,
	text : 'Trip Details',
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

tripDetailHeading.add(buttonBacktripDetail);
tripDetailHeading.add(headingtripDetail);

var datas = [];
var number = 0;
for (var i = 0; i < 15; i++) {

	/*var tripDetailView = Titanium.UI.createView({
		width : 'auto',
		height : 100,
		layout : 'horizontal',
		top : 0,
		borderColor : 'black',
		borderWidth : 1,
		backgroundColor : 'white'
	});*/

	/*var icon = Titanium.UI.createImageView({
		image : '/images/titanium_logo.png',
		height : 50,
		width : 50,
		left : 20,
		top : 25
	});*/
	
	var tripDetailVerticalView = Titanium.UI.createView({
		height : 100,
		layout : 'vertical',
		top : 0,
		left : 20,
		width : deviceWidth - 150
	});
	var orderLabel = Titanium.UI.createLabel({
		top : 0,
		height : 25,
		left : 0,
		text : 'Order:1234',
		color : 'black'
	});
	var companyLabel = Titanium.UI.createLabel({
		top : 0,
		height : 25,
		left : 0,
		text : 'Company:ABC',
		color : 'black'
	});
	var addressLabel = Titanium.UI.createLabel({
		top : 0,
		height : 25,
		left : 0,
		text : 'Address:Main Street',
		color : 'black'
	});
	var timeLabel = Titanium.UI.createLabel({
		top : 0,
		height : 25,
		left : 0,
		text : 'Time:9:55 AM',
		color : 'black',
	//	textAlign : 'center',
	});

	tripDetailVerticalView.add(orderLabel);
	tripDetailVerticalView.add(companyLabel);
	tripDetailVerticalView.add(addressLabel);
	tripDetailVerticalView.add(timeLabel);

	/*var arrowIcon = Titanium.UI.createImageView({
		//image : '/images/arrow.png',
		image : '/images/expander_ic_minimized.png',
		height : 50,
		width : 50,
		top : 25
	});*/

//	tripDetailView.add(icon);
//	tripDetailView.add(tripDetailVerticalView);
	//tripDetailView.add(arrowIcon);

	

	datas[i] = Ti.UI.createTableViewRow({
		selectedBackgroundColor : 'transparent',
		className : i,
	//	hasDetail : true,
		leftImage : '/images/titanium_logo.png',
		rightImage :'/images/expander_ic_minimized.png'
	});
	datas[i].add(tripDetailVerticalView)
	
	datas[i].addEventListener('click', function(e) {
		var viewOrderWindow = Titanium.UI.createWindow({
			backgroundColor : 'white',
			width : deviceWidth,
			url : 'ViewOrderScreen.js',
			orientationModes : [1]
		});

		viewOrderWindow.open();
	});

//	tripDetailScrollView.add(tripDetailView);
//	number += 100;
}

//tripDetailScrollView.add(tripDetailHeading);


var tripDetailTable = Ti.UI.createTableView({
	data : datas,
//	height : 100,
	top : headingHeight,
	width : deviceWidth
});

//tripDetailScrollView.add(tripDetailTable);

tripDetailWindow.add(tripDetailHeading);
//tripDetailWindow.add(tripDetailScrollView);
tripDetailWindow.add(tripDetailTable);
