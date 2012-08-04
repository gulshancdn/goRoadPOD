Titanium.include('Constants.js');

var viewOrderWindow = Ti.UI.currentWindow;

var viewOrderHeading = Titanium.UI.createView({
	top : 0,
	height : headingHeight,
	width : deviceWidth,
	layout : 'horizontal',
	backgroundColor : 'gray',
	borderColor : 'black',
	borderWidth : 1
});

var buttonBackViewOrder = Titanium.UI.createButton({
	title : 'BACK',
	width : buttonWidth,
	height : buttonHeight,
	top : topDistanceForButton,
	left : 5,
	font : {
		fontSize : 15
	},
	//style : Titanium.UI.iPhone.SystemButtonStyle.PLAIN
});

buttonBackViewOrder.addEventListener('click', function(e) {
	viewOrderWindow.close();
});

var headingViewOrder = Titanium.UI.createLabel({
	top : 7,
	text : 'View Order',
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

viewOrderHeading.add(buttonBackViewOrder);
viewOrderHeading.add(headingViewOrder);

var scrollViewForViewOrder = Titanium.UI.createScrollView({
	contentWidth : 'auto',
	contentHeight : 'auto',
	top : 50,
	showVerticalScrollIndicator : true,
	showHorizontalScrollIndicator : true,
	layout : 'vertical'
});

var orderHorizontalView = Titanium.UI.createView({
	top : 10,
	//	height : 55,
	height : 55,
	width : deviceWidth,
	layout : 'horizontal'
});

var orderLabel = Titanium.UI.createLabel({
	top : 5,
	left : 20,
	height : 'auto',
	text : 'Order:',
	width : deviceWidth / 2 - 25 - 20,
	color : 'black'
});

var orderValueLabel = Titanium.UI.createLabel({
	top : 5,
	height : 'auto',
	//left:deviceWidth/8,
	text : '12345',
	width : deviceWidth / 2 - 35,
	color : 'black'
});

orderHorizontalView.add(orderLabel);
orderHorizontalView.add(orderValueLabel);

var customerHorizontalView = Titanium.UI.createView({
	top : 10,
	//	height : 65,
	height : 55,
	width : deviceWidth,
	layout : 'horizontal'
});

var customerLabel = Titanium.UI.createLabel({
	top : 5,
	left : 20,
	text : 'Customer:',
	height : 'auto',
	width : deviceWidth / 2 - 25 - 20,
	color : 'black',
	//	font:{fontSize:21,fontFamily:'Helvetica Neue'},
});

var customerValueLabel = Titanium.UI.createLabel({
	top : 5,
	//	left:deviceWidth/8,
	text : 'ABC Co 555 Main St. Atlanta 6A 30022',
	height : 'auto',
	width : deviceWidth / 2 - 35,
	color : 'black'
});

customerHorizontalView.add(customerLabel);
customerHorizontalView.add(customerValueLabel);

var phoneHorizontalView = Titanium.UI.createView({
	top : 20,
	//	height : 55,
	height : 55,
	width : deviceWidth,
	layout : 'horizontal'
});

var phoneLabel = Titanium.UI.createLabel({
	top : 20,
	left : 20,
	text : 'Phone:',
	height : 'auto',
	width : deviceWidth / 2 - 25 - 20,
	color : 'black'
});

var phoneValueLabel = Titanium.UI.createLabel({
	top : 20,
	//	left:deviceWidth/8,
	text : '678-555-1234',
	height : 'auto',
	width : deviceWidth / 2 - 35,
	color : 'black'
});

phoneHorizontalView.add(phoneLabel);
phoneHorizontalView.add(phoneValueLabel);

var contactHorizontalView = Titanium.UI.createView({
	top : 10,
	//	height : 55,
	height : 55,
	width : deviceWidth,
	layout : 'horizontal'
});

var contactLabel = Titanium.UI.createLabel({
	top : 5,
	left : 20,
	text : 'Contact:',
	height : 'auto',
	width : deviceWidth / 2 - 25 - 20,
	color : 'black'
});

var contactValueLabel = Titanium.UI.createLabel({
	top : 5,
	//	left:deviceWidth/8,
	text : 'Jeff-Smith',
	height : 'auto',
	width : deviceWidth / 2 - 35,
	color : 'black'
});

contactHorizontalView.add(contactLabel);
contactHorizontalView.add(contactValueLabel);

var myRows = [];

myRows[0] = Ti.UI.createTableViewRow({
	selectedBackgroundColor : 'transparent',
	className : 'Order Number'
});
//myRows[0].add(orderHorizontalView);
myRows[0].add(orderLabel);
myRows[0].add(orderValueLabel);

myRows[1] = Ti.UI.createTableViewRow({
	className : 'customer Detail',
	selectedBackgroundColor : 'transparent'
});
//myRows[1].add(customerHorizontalView);
myRows[1].add(customerLabel);
myRows[1].add(customerValueLabel);

myRows[2] = Ti.UI.createTableViewRow({
	className : 'Phone Number',
	selectedBackgroundColor : 'transparent'
});
//myRows[2].add(phoneHorizontalView);
myRows[2].add(phoneLabel);
myRows[2].add(phoneValueLabel);

myRows[3] = Ti.UI.createTableViewRow({
	className : 'Contact',
	selectedBackgroundColor : 'transparent'
});
//myRows[3].add(contactHorizontalView);
myRows[3].add(contactLabel);
myRows[3].add(contactValueLabel);

var data = [{
	title : "Order: 12345",
	title : "Order: 12345"
}, {
	title : "Row 2",
	title : "Row 5"
}];

var tableViewOrder = Titanium.UI.createTableView({
	data : myRows,
	height : tableHeight,
//	height : Ti.UI.SIZE,
	separatorColor : 'transparent'
});

var instructionLabel = Titanium.UI.createLabel({
	top : 5,
	left : 20,
	height : 'auto',
	width :deviceWidth - 25,
	text : 'Instructions:',
	color : 'black'
});

var textAreaViewOrder = Titanium.UI.createTextArea({
	height : 70,
	width : deviceWidth - 30,
	top : 10,
	editable : false,
	value : 'Instructions will go here...',
	borderColor : borderColorForTextArea
});

var rejectButton = Titanium.UI.createButton({
	top : 10,
	height : buttonHeightForAll,
	width : deviceWidth / 4,
	title : 'Reject'
});

rejectButton.addEventListener('click', function(e) {
	var rejectOrderWindow = Titanium.UI.createWindow({
		backgroundColor : 'white',
		width : deviceWidth,
		url : 'RejectOrderScreen.js',
		layout : 'vertical',
		orientationModes : [1]
	});
	rejectOrderWindow.open();
});

var startButton = Titanium.UI.createButton({
	top : 10,
	height : buttonHeightForAll,
	width : deviceWidth / 4,
	title : 'Start'
});

startButton.addEventListener('click', function(e) {
	var editOrderWindow = Titanium.UI.createWindow({
		backgroundColor : 'white',
		width : deviceWidth,
		url : 'EditOrderScreen.js',
		orientationModes : [1]
	});
	editOrderWindow.open();
});

scrollViewForViewOrder.add(tableViewOrder);
scrollViewForViewOrder.add(instructionLabel);
scrollViewForViewOrder.add(textAreaViewOrder);
scrollViewForViewOrder.add(rejectButton);
scrollViewForViewOrder.add(startButton);

viewOrderWindow.add(viewOrderHeading);
viewOrderWindow.add(scrollViewForViewOrder);