Titanium.include('Constants.js');

var editItemWindow = Ti.UI.currentWindow;

var editItemViewHeading = Titanium.UI.createView({
	top : 0,
	height : headingHeight,
	width : deviceWidth,
	layout : 'horizontal',
	backgroundColor : 'gray',
	borderColor : 'black',
	borderWidth : 1
});

var buttonBackEditItem = Titanium.UI.createButton({
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

buttonBackEditItem.addEventListener('click', function(e) {
	editItemWindow.close();
});

var headingEditItem = Titanium.UI.createLabel({
	top : 7,
	text : 'Edit Item',
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

editItemViewHeading.add(buttonBackEditItem);
editItemViewHeading.add(headingEditItem);

var scrollViewForEditItem = Titanium.UI.createScrollView({
	contentWidth : 'auto',
	contentHeight : 'auto',
	width : deviceWidth,
	top : 50,
	showVerticalScrollIndicator : true,
	showHorizontalScrollIndicator : true,
	layout : 'vertical'
});

var itemHorizontalView = Titanium.UI.createView({
	top : 5,
	height : 35,
	width : deviceWidth,
	layout : 'horizontal'
});

var itemLabel = Titanium.UI.createLabel({
	top : 5,
	left : 20,
	height : 'auto',
	text : 'Item:',
	width : deviceWidth / 2 - 20,
	color : 'black'
});
var itemValueLabel = Titanium.UI.createLabel({
	top : 5,
	text : '621',
	height : 'auto',
	left : 5,
	width : deviceWidth / 2 - 20,
	color : 'black'
});

itemHorizontalView.add(itemLabel);
itemHorizontalView.add(itemValueLabel);

var descriptionHorizontalView = Titanium.UI.createView({
	top : 5,
	height : 35,
	width : deviceWidth,
	layout : 'horizontal'
});

var descriptionLabel = Titanium.UI.createLabel({
	top : 5,
	left : 20,
	height : 'auto',
	text : 'Description:',
	width : deviceWidth / 2 - 20,
	color : 'black'
});
var descriptionValueLabel = Titanium.UI.createLabel({
	top : 5,
	text : 'White Oil Base',
	height : 'auto',
	left : 5,
	width : deviceWidth / 2 - 20,
	color : 'black'
});

descriptionHorizontalView.add(descriptionLabel);
descriptionHorizontalView.add(descriptionValueLabel);

var udmHorizontalView = Titanium.UI.createView({
	top : 5,
	height : 35,
	width : deviceWidth,
	layout : 'horizontal'
});

var udmLabel = Titanium.UI.createLabel({
	top : 5,
	left : 20,
	height : 'auto',
	text : 'UDM:',
	width : deviceWidth / 2 - 20,
	color : 'black'
});
var udmValueLabel = Titanium.UI.createLabel({
	top : 5,
	text : '100 EA',
	height : 'auto',
	left : 5,
	width : deviceWidth / 2 - 20,
	color : 'black'
});

udmHorizontalView.add(udmLabel);
udmHorizontalView.add(udmValueLabel);

var orderQtyHorizontalView = Titanium.UI.createView({
	top : 5,
	height : 35,
	width : deviceWidth,
	layout : 'horizontal'
});

var orderLabel = Titanium.UI.createLabel({
	top : 5,
	left : 20,
	height : 'auto',
	text : 'Order Quantity:',
	width : deviceWidth / 2 - 20,
	color : 'black'
});
var orderValueLabel = Titanium.UI.createLabel({
	top : 5,
	text : '55',
	height : 'auto',
	left : 5,
	width : deviceWidth / 2 - 20,
	color : 'black'
});

orderQtyHorizontalView.add(orderLabel);
orderQtyHorizontalView.add(orderValueLabel);

var deliverdQtyHorizontalView = Titanium.UI.createView({
	top : 5,
	height : 50,
	width : deviceWidth,
	layout : 'horizontal'
});

var deliveredLabel = Titanium.UI.createLabel({
	top : 15,
	left : 20,
	height : 'auto',
	text : 'Delivered Quantity:',
	width : deviceWidth / 2 - 20,
	color : 'black'
});
var deliveredOrderTextField = Titanium.UI.createTextField({
	height : buttonHeightForAll,
	top : textFieldTop,
	width : deviceWidth / 2 - 20,
	keyboardType : Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION,
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});

deliverdQtyHorizontalView.add(deliveredLabel);
deliverdQtyHorizontalView.add(deliveredOrderTextField);

var pickUpHorizontalView = Titanium.UI.createView({
	top : 5,
	height : 55,
	width : deviceWidth,
	layout : 'horizontal'
});

var pickUpLabel = Titanium.UI.createLabel({
	top : 15,
	left : 20,
	height : 'auto',
	text : 'Pick Up',
	width : deviceWidth / 2 - 20,
	color : 'black'
});

/*var pickUpCB = Titanium.UI.createSwitch({
	style : Titanium.UI.Android.SWITCH_STYLE_CHECKBOX,
	value : false,
	top : 5,
	left : -deviceWidth / 80
});*/

var pickUpCB = Titanium.UI.createImageView({
	image : '/images/btn_check_off.png',
	value : false,
	height : buttonHeightForAll,
	width :'auto',
	top : textFieldTop,
	left : checkBoxButtonLeft
});

pickUpCB.addEventListener('click',function(e){
	if(this.value == false)
	{
		this.value = true;
		this.image = '/images/btn_check_on.png';
		return;
	}
	if(this.value == true)
	{
		this.value = false;
		this.image = '/images/btn_check_off.png';
		return;
	}
	
	
});

pickUpHorizontalView.add(pickUpLabel);
pickUpHorizontalView.add(pickUpCB);

var saveButtonEditItem = Titanium.UI.createButton({
	top : 5,
	height : buttonHeightForAll,
	width : deviceWidth / 4,
	title : 'Save'
});

saveButtonEditItem.addEventListener('click', function(e) {
	editItemWindow.close();
});

scrollViewForEditItem.add(itemHorizontalView);
scrollViewForEditItem.add(descriptionHorizontalView);
scrollViewForEditItem.add(udmHorizontalView);
scrollViewForEditItem.add(orderQtyHorizontalView);
scrollViewForEditItem.add(deliverdQtyHorizontalView);
scrollViewForEditItem.add(pickUpHorizontalView);
scrollViewForEditItem.add(saveButtonEditItem);

editItemWindow.add(editItemViewHeading);
editItemWindow.add(scrollViewForEditItem);

