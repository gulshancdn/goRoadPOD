Titanium.include('Constants.js');
// To get current window
var signatureFormWindow = Ti.UI.currentWindow;
// Heading View
var signatureFormHeading = Titanium.UI.createView({
	top : 0,
	height : headingHeight,
	width : deviceWidth,
	backgroundColor : 'gray',
	borderColor : 'black',
	borderWidth : 1
});
// Back Button
var buttonBackSignatureForm = Titanium.UI.createButton({
	title : 'BACK',
	width : buttonWidth,
	height : buttonHeight,
	top : topDistanceForButton,
	left : 5,
	font : {
		fontSize : 15
	}
});
// To close current window and store digital sign in store
buttonBackSignatureForm.addEventListener('click', function(e) {
	if (platform == 'android') {
		try {
			//    var fileName = 'Painting-' + new Date().getTime() + '.png';
			//var fileName = 'Painting-1.png';

			imageFile = Ti.Filesystem.getFile('file:///store/').exists() ? Ti.Filesystem.getFile('file:///store/', fileName) : Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, fileName);
			imageFile.write(paintView.toImage().media);

			//   image = paintView.toImage().media;

			//     alert(paintView.toImage().media);
			// 		digitalSign.image = paintView.toImage().media;

			Ti.Media.Android.scanMediaFiles([imageFile.nativePath], null, saveSuccess);
		} catch (err) {
			saveFailure(err);
		}
	}
	else {
        Ti.Media.saveToPhotoGallery(paintView.toImage(), {
            success: saveSuccess,
            failure: saveFailure
        });
       
    }
	signatureFormWindow.close();

});

function saveSuccess() {
	Ti.API.info('Image saved Successfully');
	/*  Ti.UI.createAlertDialog({
	 title: 'Success',
	 message: 'Your drawing was saved to the photo gallery.'
	 }).show();*/
}

function saveFailure(err) {
	Ti.API.info('Image could not be saved');
	/*  Ti.UI.createAlertDialog({
	 title: 'Failure',
	 message: 'We had some trouble saving it: ' + err + '.'
	 }).show();*/
}

var buttonClearSignatureForm = Titanium.UI.createButton({
	title : 'CLEAR',
	width : buttonWidth,
	height : buttonHeight,
	right : 5,
	top : topDistanceForButton,
	font : {
		fontSize : 15
	}
});
// To clear digital sign
buttonClearSignatureForm.addEventListener('click', function(e) {
	paintView.clear();
});

signatureFormHeading.add(buttonBackSignatureForm);
signatureFormHeading.add(buttonClearSignatureForm);

//var Paint = require('ti.paint');

/*var paintView = Paint.createPaintView({
 top : 55,
 right : 0,
 bottom : 35,
 left : 0,
 // strokeWidth (float), strokeColor (string), strokeAlpha (int, 0-255)
 strokeColor : '#0f0',
 strokeAlpha : 255,
 strokeWidth : 10,
 eraseMode : false
 });*/

var signHereLabel = Ti.UI.createLabel({
	text : 'SIGN HERE',
	height : 'auto',
	width : 'auto',
	left : 15,
	bottom : 15,
	color : 'black'
});

var horizontalLineViewForSignatureForm = Titanium.UI.createView({
	bottom : 10,
	backgroundColor : 'black',
	height : 1,
	width : deviceWidth * 85 / 100,
	left : 15
});

var signatureView = Ti.UI.createView({
	backgroundColor : 'black',
	right : 7,
	bottom : 40,
	height : 150,
	left : 7,
});

signatureView.add(paintView);

signatureFormWindow.add(signatureFormHeading);
signatureFormWindow.add(signatureView);
signatureFormWindow.add(signHereLabel);
signatureFormWindow.add(horizontalLineViewForSignatureForm);

