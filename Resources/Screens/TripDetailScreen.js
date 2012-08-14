Titanium.include('Constants.js');

// To get current window
var tripDetailWindow = Ti.UI.currentWindow;
if (platform == 'android') {
	tripDetailWindow.addEventListener('android:back', function(e) {
		tripDetailWindow.close();
	});
}
// Heading View
var tripDetailHeading = Titanium.UI.createView({
	top : 0,
	height : headingHeight,
	width : deviceWidth,
	layout : 'horizontal',
	backgroundColor : 'gray',
	borderColor : 'black',
	borderWidth : 1
});
// Back Button
var buttonBacktripDetail = Titanium.UI.createButton({
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
buttonBacktripDetail.addEventListener('click', function(e) {
	//tripDetailWindow.close();
	var win = createMainWindow();
	win.open();
});
// Heading text
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

// Response from web service
try {
	var database = Ti.Database.open('GoRoamPODDB');
	var tripRow = database.execute('SELECT * FROM Trip_Table');
	var tripRefIdFromTripRow;
	while (tripRow.isValidRow()) {
		tripRefIdFromTripRow = tripRow.field(0);
		tripRow.next();
	}
	var orderTableRows = database.execute('SELECT * FROM Order_Table WHERE tripRefId = "' + tripRefIdFromTripRow + '"');
	var arrayLength = orderTableRows.rowCount;
	var i = 0;
	//	for (var i = 0; i < arrayLength; i++) {
	while (orderTableRows.isValidRow()) {
		/*var tripDetailVerticalView = Titanium.UI.createView({
			height : 100,
			layout : 'vertical',
			top : 0,
			left : tableLeftSpace,
			width : deviceWidth * 80 / 100
		});*/
		var orderLabel = Titanium.UI.createLabel({
			top : 0,
			height : 25,
			left : tableLeftSpace,
			text : 'Order: ' + orderTableRows.fieldByName('orderNo'),
			//	text : 'Order: ' + orderArray[i].orderNo,
			ellipsize : true,
			wordWrap : false,
			color : 'black',
			width : tripDetailLabelWidth
		});
		var companyLabel = Titanium.UI.createLabel({
			top : 20,
			height : 25,
			left : tableLeftSpace,
			text : orderTableRows.fieldByName('custName'),
			//	text : orderArray[i].custName,
			ellipsize : true,
			wordWrap : false,
			color : 'black',
			width : tripDetailLabelWidth
		});
		var addressLabel = Titanium.UI.createLabel({
			top : 40,
			height : 25,
			left : tableLeftSpace,
			text : orderTableRows.fieldByName('addr1'),
			//	text : orderArray[i].addr1,
			ellipsize : true,
			wordWrap : false,
			color : 'black',
			width : tripDetailLabelWidth
		});
		var eta = orderTableRows.fieldByName('eta');
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
		var time = hours + ":" + minutes + " " + str;
		//alert(time);
		var timeLabel = Titanium.UI.createLabel({
			top : 60,
			height : 25,
			left : tableLeftSpace,
			text : 'ETA: ' + time,
			ellipsize : true,
			wordWrap : false,
			color : 'black',
			width : tripDetailLabelWidth
		});

		/*tripDetailVerticalView.add(orderLabel);
		tripDetailVerticalView.add(companyLabel);
		tripDetailVerticalView.add(addressLabel);
		tripDetailVerticalView.add(timeLabel);*/

		// TableViewRow to add rows in table
		datas[i] = Ti.UI.createTableViewRow({
			selectedBackgroundColor : 'transparent',
			className : i,
			//	hasDetail : true,
			height : 'auto',
			leftImage : titaniumLogo,
			rightImage : '/images/expander_ic_minimized.png'
		});
	//	datas[i].add(tripDetailVerticalView)
		
		datas[i].add(orderLabel)
		datas[i].add(companyLabel)
		datas[i].add(addressLabel)
		datas[i].add(timeLabel)

		// Open View Order Screen on click of TableViewRow
		datas[i].addEventListener('click', function(e) {
			var viewOrderWindow = Titanium.UI.createWindow({
				backgroundColor : 'white',
				width : deviceWidth,
				url : 'ViewOrderScreen.js',
				orientationModes : [1],
				//	ddata : datas[i].data
			});
			viewOrderWindow.open();
		});
		orderTableRows.next();
		i++;
	}
	orderTableRows.close();
	database.close();
} catch(err) {
	alert("Error " + err);
}
/*var returnData = tripDetailWindow.data;
var orderArray = returnData.d.messageData.trip.order;
var arrayLength = orderArray.length;
var orderArrayToPass = new Array();
for (var i = 0; i < arrayLength; i++) {

orderArrayToPass[i] = orderArray[i];
var tripDetailVerticalView = Titanium.UI.createView({
height : 100,
layout : 'vertical',
top : 0,
left : tableLeftSpace,
width : deviceWidth * 80 / 100
});
var orderLabel = Titanium.UI.createLabel({
top : 0,
height : 25,
left : 0,
text : 'Order: ' + orderArray[i].orderNo,
ellipsize : true,
wordWrap : false,
color : 'black',
width : tripDetailLabelWidth
});
var companyLabel = Titanium.UI.createLabel({
top : 0,
height : 25,
left : 0,
text : orderArray[i].custName,
ellipsize : true,
wordWrap : false,
color : 'black',
width : tripDetailLabelWidth
});
var addressLabel = Titanium.UI.createLabel({
top : 0,
height : 25,
left : 0,
text : orderArray[i].addr1,
ellipsize : true,
wordWrap : false,
color : 'black',
width : tripDetailLabelWidth
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
var time = hours + ":" + minutes + " " + str;
//alert(time);
var timeLabel = Titanium.UI.createLabel({
top : 0,
height : 25,
left : 0,
text : 'ETA: ' + time,
ellipsize : true,
wordWrap : false,
color : 'black',
width : tripDetailLabelWidth
});

tripDetailVerticalView.add(orderLabel);
tripDetailVerticalView.add(companyLabel);
tripDetailVerticalView.add(addressLabel);
tripDetailVerticalView.add(timeLabel);

// TableViewRow to add rows in table
datas[i] = Ti.UI.createTableViewRow({
selectedBackgroundColor : 'transparent',
className : i,
//	hasDetail : true,
height : 'auto',
leftImage : titaniumLogo,
rightImage : '/images/expander_ic_minimized.png'
});
datas[i].add(tripDetailVerticalView)

// Open View Order Screen on click of TableViewRow
datas[i].addEventListener('click', function(e) {
var dd = orderArrayToPass[e.index];
var viewOrderWindow = Titanium.UI.createWindow({
backgroundColor : 'white',
width : deviceWidth,
url : 'ViewOrderScreen.js',
orientationModes : [1],
//	ddata : datas[i].data
ddata : dd
});
viewOrderWindow.open();
});
}*/

//tripDetailScrollView.add(tripDetailHeading);

var tripDetailTable = Ti.UI.createTableView({
	data : datas,
	//	height : 100,
	top : headingHeight,
	width : deviceWidth
});

tripDetailWindow.add(tripDetailHeading);
tripDetailWindow.add(tripDetailTable);
