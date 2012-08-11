Titanium.include('Constants.js');
// To get current window
var editOrderWindow = Ti.UI.currentWindow;
// Heading View
var editOrderViewHeading = Titanium.UI.createView({
	top : 0,
	height : headingHeight,
	width : deviceWidth,
	layout : 'horizontal',
	backgroundColor : 'gray',
	borderColor : 'black',
	borderWidth : 1
});
// Back Button
var buttonBackEditOrder = Titanium.UI.createButton({
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
buttonBackEditOrder.addEventListener('click', function(e) {
	editOrderWindow.close();
});
// Heading text
var headingEditOrder = Titanium.UI.createLabel({
	top : 7,
	text : 'Edit Order',
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

editOrderViewHeading.add(buttonBackEditOrder);
editOrderViewHeading.add(headingEditOrder);

// Scroll View to add full content of screen
var scrollViewForEditOrder = Titanium.UI.createScrollView({
	contentWidth : 'auto',
	contentHeight : 'auto',
	width : deviceWidth,
	//height:deviceHeight*70/100,
	top : 50,
	showVerticalScrollIndicator : true,
	showHorizontalScrollIndicator : true,
	layout : 'vertical'
});

var itemHorizontalView = Titanium.UI.createView({
	top : 5,
	height : 55,
	width : deviceWidth - 20,
	layout : 'horizontal'

});

var itemLabel = Titanium.UI.createLabel({
	top : 10,
	left : 0,
	text : 'Items',
	height :'auto',
	width : deviceWidth / 2 - 20,
	color : 'black'
});

var deliverAsOrderedButton = Titanium.UI.createButton({
	height : buttonHeightForAll,
	width : deviceWidth / 2,
	title : 'Deliver as Ordered'
});

itemHorizontalView.add(itemLabel);
itemHorizontalView.add(deliverAsOrderedButton);

var orderNotesLabel = Titanium.UI.createLabel({
	//	top:280,
	top : 5,
	left : 10,
	width : deviceWidth - 20,
	height : 'auto',
	text : 'Order notes',
	color : 'black'
});

var textAreaEditOrder = Titanium.UI.createTextArea({
	height : 55,
	width : deviceWidth - 20,
	borderColor : borderColorForTextArea
	//    top : 310
});

var signedByHorizontalView = Titanium.UI.createView({
	//	top:380,
	top : 10,
	height : 55,
	width : deviceWidth - 20,
	layout : 'horizontal'
});

var signedByLabel = Titanium.UI.createLabel({
	top : 15,
	left : 0,
	text : 'Signed By',
	height : 'auto',
	width : deviceWidth / 2 - 20,
	color : 'black'
});
var signedByTextField = Titanium.UI.createTextField({
	top : textFieldTop,
	width : deviceWidth / 2,
	height : buttonHeightForAll,
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});

signedByHorizontalView.add(signedByLabel);
signedByHorizontalView.add(signedByTextField);

var signatureHorizontalView = Titanium.UI.createView({
	//	top:440,
	height : 120,
	width : deviceWidth - 20,
	layout : 'horizontal'
});

var signatureLabel = Titanium.UI.createLabel({
	top : 40,
	left : 0,
	text : 'Signature',
	height : 'auto',
	width : deviceWidth / 2 - 20,
	color : 'black'
});

var signatureVerticalView = Titanium.UI.createView({
	//	top:440,
	height : 120,
	//	width : deviceWidth - 20,
	layout : 'vertictal',
	width : deviceWidth / 2 - 40,
	left : 0
});
var signedLabel = Titanium.UI.createLabel({
	top : 18,
	height:'auto',
	text : '(SIGNED)',
	color : 'black',
	//	width : deviceWidth / 3,
	width : 90,
	textAlign : 'center'
});
var horizontalLineView = Titanium.UI.createView({
	top : 50,
	backgroundColor : 'black',
	width : 90,
	height : 1
});
var signatureValueButton = Titanium.UI.createButton({
	top : 59,
	width : 90,
	//left : 0,
	title : 'Sign',
	height : buttonHeightForAll
});


// To open Signature form
signatureValueButton.addEventListener('click', function(e) {
	var signatureFormWindow = Titanium.UI.createWindow({
		backgroundColor : 'white',
		width : deviceWidth,
		url : 'SignatureForm.js'
	});
	signatureFormWindow.open();
});

signatureVerticalView.add(digitalSign);
//signatureVerticalView.add(signedLabel);
signatureVerticalView.add(horizontalLineView);
signatureVerticalView.add(signatureValueButton);

var noIcon = Titanium.UI.createImageView({
	image : '/images/tick-mark-no.png',
	height : 30,
	width : 30,
	left : 5,
	top : 40
});
// To delete digital Sign saved in store
noIcon.addEventListener('click', function(e) {
	digitalSign.image = '';
	//	var imageFile2 = Ti.Filesystem.getFile('file:///store/').exists()
	//               ? Ti.Filesystem.getFile('file:///store/', 'Painting-1.png')
	//               : Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'Painting-1.png');
	imageFile.deleteFile();
	//	imageFile = null;

	//	signatureVerticalView.remove(digitalSign);
	//	signatureVerticalView.add(signedLabel);
});

signatureHorizontalView.add(signatureLabel);
signatureHorizontalView.add(signatureVerticalView);
signatureHorizontalView.add(noIcon);

var saveButtonEditOrder = Titanium.UI.createButton({
	//	top:500,
	top : 10,
	height : buttonHeightForAll,
	width : deviceWidth / 4,
	title : 'Save'
});
saveButtonEditOrder.addEventListener('click', function(e) {

});



var datasForEditOrder = [];
for (var i = 0; i < 5; i++) {

	/*var editOrderItemView = Titanium.UI.createView({
		width : deviceWidth - 20,
		height : 50,
		layout : 'horizontal',
		top : 0,
		borderColor : 'black',
		borderWidth : 1,
		backgroundColor : 'gray'
	});

	var icon = Titanium.UI.createImageView({
		image : '/images/tick-mark-yes.png',
		height : 30,
		width : 30,
		left : 20,
		top : 10
	});*/
	var editOrderVerticalView = Titanium.UI.createView({
		height : 50,
		layout : 'vertical',
		top : 0,
		left : 15,
		width : deviceWidth - 125
	});
	var orderLabel = Titanium.UI.createLabel({
		top : 0,
		left : 0,
		height : 25,
		text : '621: White Oil Base',
		color : 'black'
	});
	var companyLabel = Titanium.UI.createLabel({
		top : 0,
		left : 0,
		height : 25,
		text : 'Order: 30	del: 100 EA',
		color : 'black'
	});

	editOrderVerticalView.add(orderLabel);
	editOrderVerticalView.add(companyLabel);

	/*var arrowIcon = Titanium.UI.createImageView({
		//	image : '/images/arrow.png',
		image : '/images/expander_ic_minimized.png',
		height : 30,
		width : 30,
		top : 10
	});*/

	//editOrderItemView.add(icon);
	//editOrderItemView.add(tripDetailVerticalView);
	//editOrderItemView.add(arrowIcon);

	datasForEditOrder[i] = Ti.UI.createTableViewRow({
		selectedBackgroundColor : 'transparent',
		className : i,
	//	hasDetail : true,
		leftImage : '/images/tick-mark-yes_small.png',
		rightImage :'/images/expander_ic_minimized_small.png'
	});
	datasForEditOrder[i].add(editOrderVerticalView)
	
	datasForEditOrder[i].addEventListener('click', function(e) {
		var editItemWindow = Titanium.UI.createWindow({
			backgroundColor : 'white',
			width : deviceWidth,
			url : 'EditItemScreen.js',
			orientationModes : [1]
		});

		editItemWindow.open();
	});

//	scrollViewForEditOrder.add(editOrderItemView);
}

var editOrderTable = Ti.UI.createTableView({
	data : datasForEditOrder,
	height : 250,
//	height : 'auto',
	width : deviceWidth - 20,
	borderColor : 'black',
	borderWidth : 1
});

//scrollViewForEditOrder.add(editOrderItemsScrollView);
scrollViewForEditOrder.add(itemHorizontalView);
scrollViewForEditOrder.add(editOrderTable);
scrollViewForEditOrder.add(orderNotesLabel);
scrollViewForEditOrder.add(textAreaEditOrder);
scrollViewForEditOrder.add(signedByHorizontalView);
scrollViewForEditOrder.add(signatureHorizontalView);
scrollViewForEditOrder.add(saveButtonEditOrder);

editOrderWindow.add(editOrderViewHeading);
editOrderWindow.add(scrollViewForEditOrder);


// To get digital sign from store on focus event
editOrderWindow.addEventListener('focus', function(e) {
	//var imageFile1 = Ti.Filesystem.getFile('file:///store/').exists()
	//            ? Ti.Filesystem.getFile('file:///store/', 'Painting-1.png')
	//            : Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'Painting-1.png');
	/* if(imageFile != null)
	{*/
	//	alert(imageFile);

	if (platform == 'android') {
		var img = imageFile.read();
		digitalSign.image = img;
	}
	else
	{
		Ti.Media.openPhotoGallery(Ti.Media.MEDIA_TYPE_PHOTO);
	}
	//		signatureVerticalView.remove(signedLabel);

	/*	}*/

});
