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
var returnData = tripDetailWindow.data;
var orderArray = returnData.d.messageData.trip.order;
var arrayLength = orderArray.length;

for (var i = 0; i < arrayLength; i++) {

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
		text : 'Order: ' + orderArray[i].orderNo,
		color : 'black'
	});
	var companyLabel = Titanium.UI.createLabel({
		top : 0,
		height : 25,
		left : 0,
		text : orderArray[i].custName,
		color : 'black'
	});
	var addressLabel = Titanium.UI.createLabel({
		top : 0,
		height : 25,
		left : 0,
		text : orderArray[i].addr1,
		color : 'black'
	});
	var eta = orderArray[i].eta;
	var subEta = eta.substring(6, eta.length - 2);
	var d = new Date(parseInt(subEta));
	var hours = d.getHours();
	var minutes = d.getMinutes();
	//var seconds = d.getSeconds();
	var str = "AM";
	if (hours > 12) {
		hours = hours - 12;
		str = "PM";
	}
	var time = hours + ":" + minutes+ " " + str;
	//alert(time);
	var timeLabel = Titanium.UI.createLabel({
		top : 0,
		height : 25,
		left : 0,
		text : 'ETA: ' + time,
		color : 'black'
	});

	tripDetailVerticalView.add(orderLabel);
	tripDetailVerticalView.add(companyLabel);
	tripDetailVerticalView.add(addressLabel);
	tripDetailVerticalView.add(timeLabel);

	datas[i] = Ti.UI.createTableViewRow({
		selectedBackgroundColor : 'transparent',
		className : i,
		//	hasDetail : true,
		leftImage : '/images/titanium_logo.png',
		rightImage : '/images/expander_ic_minimized.png'
	});
	datas[i].add(tripDetailVerticalView)

	datas[i].addEventListener('click', function(e) {
		var viewOrderWindow = Titanium.UI.createWindow({
			backgroundColor : 'white',
			width : deviceWidth,
			url : 'ViewOrderScreen.js',
			orientationModes : [1],
	//		data : returnData
		});

		viewOrderWindow.open();
	});
}

//tripDetailScrollView.add(tripDetailHeading);

var tripDetailTable = Ti.UI.createTableView({
	data : datas,
	//	height : 100,
	top : headingHeight,
	width : deviceWidth
});


tripDetailWindow.add(tripDetailHeading);
tripDetailWindow.add(tripDetailTable);
