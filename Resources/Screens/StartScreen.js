Titanium.include('Constants.js');
Titanium.include('/controller/Controller.js');

// To get current window
var startWindow = Ti.UI.currentWindow;
if (platform == 'android') {
	startWindow.addEventListener('android:back', function(e) {
		startWindow.close();
	});
}
var selectedTrip = '';
// To get changed date by user from date picker
var changeDate = new Date();
// To get changed time by user from time picker
var changeTime = new Date();
// To get current date object to set date from changeDate and time from changeTime
var currentDate = new Date();

// Heading View
var startViewHeading = Titanium.UI.createView({
	top : 0,
	height : headingHeight,
	width : deviceWidth,
	layout : 'horizontal',
	backgroundColor : 'gray',
	borderColor : 'black',
	borderWidth : 1
});
// Back Button
var buttonBack = Titanium.UI.createButton({
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
buttonBack.addEventListener('click', function(e) {
	startWindow.close();
});

// Heading text
var heading = Titanium.UI.createLabel({
	top : 7,
	text : 'Start Trip',
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

startViewHeading.add(buttonBack);
startViewHeading.add(heading);

// Scroll View to add full content of screen
var scrollView = Titanium.UI.createScrollView({
	contentWidth : 'auto',
	contentHeight : 'auto',
	top : 55,
	showVerticalScrollIndicator : true,
	showHorizontalScrollIndicator : true,
	layout : 'vertical'
});

var topView = Titanium.UI.createView({
	top : 5,
	width : deviceWidth,
	height : 110
});

var plannedVehicleHorizontalView = Titanium.UI.createView({
	top : 0,
	height : 55,
	width : deviceWidth,
	layout : 'horizontal'
});

var plannedVehicleLabel = Titanium.UI.createLabel({
	top : 0,
	left : 20,
	height : 55,
	text : 'Planned Vehicle',
	width : deviceWidth / 2 - 20,
	color : 'black'
});

var plannedVehicleTF = Titanium.UI.createTextField({
	top : textFieldTop,
	height : buttonHeightForAll,
	width : deviceWidth / 2 - 20,
	borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});

plannedVehicleHorizontalView.add(plannedVehicleLabel);
plannedVehicleHorizontalView.add(plannedVehicleTF);

var actualVehicleHorizontalView = Titanium.UI.createView({
	top : 55,
	height : 55,
	width : deviceWidth,
	layout : 'horizontal'
});

var actualVehicleLabel = Titanium.UI.createLabel({
	top : 0,
	left : 20,
	height : 55,
	text : 'Actual Vehicle',
	width : deviceWidth / 2 - 20,
	color : 'black'
});

var actualVehicleTF = Titanium.UI.createTextField({
	top : textFieldTop,
	width : deviceWidth / 2 - 20,
	height : buttonHeightForAll,
	borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});

actualVehicleHorizontalView.add(actualVehicleLabel);
actualVehicleHorizontalView.add(actualVehicleTF);

// Upper part of date picker i.e. to add planned vehicle and actual vehicle labels and textfields
topView.add(plannedVehicleHorizontalView);
topView.add(actualVehicleHorizontalView);

// Date Picker
var picker = Ti.UI.createPicker({
	type : Ti.UI.PICKER_TYPE_DATE,
	minDate : new Date(2012, 0, 1),
	maxDate : new Date(2014, 11, 31),
	value : new Date(),
	top : 25,
	height : 200,
	width : deviceWidth - 20
});
// To get changed date by user
picker.addEventListener("change", function(e) {
	changeDate = e.value;
});

//Time Picker
var timePicker = Ti.UI.createPicker({
	type : Ti.UI.PICKER_TYPE_TIME,
	height : 200,
	width : deviceWidth - 20,
	top : 30

});
// To get changed time by user
timePicker.addEventListener("change", function(e) {
	changeTime = e.value;
});
// View to add lower than time picker
var bottomView = Titanium.UI.createView({
	top : 25,
	height : 430,
	width : deviceWidth
});
var listTripsButton = Titanium.UI.createButton({
	top : 0,
	height : buttonHeightForAll,
	width : deviceWidth / 4,
	title : 'List Trips'
});

var data = [];
listTripsButton.addEventListener('click', function(e) {
	//table.setData(data);

	currentDate.setDate(changeDate.getDate());
	currentDate.setMonth(changeDate.getMonth());
	currentDate.setFullYear(changeDate.getFullYear());
	currentDate.setHours(changeTime.getHours());
	currentDate.setMinutes(changeTime.getMinutes());
	//currentDate.setSeconds(changeTime.getSeconds());
	var offset = currentDate.getTimezoneOffset();
	var offsetD = Math.abs(parseInt(offset / 60));
	var offsetR = Math.abs(offset % 60);
	var off = offsetD + '' + offsetR;
	var ddForRequest = "/Date(" + currentDate.getTime() + "-" + off + ")/";
	var params = new Array();
	//	params[0] = "b340";
	if (plannedVehicleTF.value == '') {
		alert('Please enter planned vehicle number.');
		return;
	} else {
		params[0] = plannedVehicleTF.value;
	}
	//	params[1] = "/Date(1343880000000-0400)/";
	params[1] = ddForRequest;
	doAction(LIST_TRIPS, params, function(back) {
		/*alert("Callback Return :\n" + back);
		 return;*/
		if (back.length > 0) {
			for (var i = 0; i < back.length; i++) {
				data[i] = {
					title : back[0].trip.tripCode,
					ref : back[0].trip.tripRefId
				};
			}
			table.setData(data);
			selectTripSelectBox.setTitle(data[0].title);
			selectTripSelectBox.setEnabled(true);
			selectedTrip = data[0].title;
		} else {
			data.length = 0;
			table.setData('');
			selectTripSelectBox.setTitle('');
			selectTripSelectBox.setEnabled(false);
			alert('No Records Found.');
		}

	});

});

var selectTripLabel = Titanium.UI.createLabel({
	top : 55,
	left : 20,
	height : 30,
	width : deviceWidth - 20,
	text : 'Select Trip',
	color : 'black'
});

var selectTripSelectBox = Titanium.UI.createButton({
	title : '',
	top : 85,
	//	backgroundImage : '/images/btn_dropdown_normal.png',
	backgroundImage : dropDownImage,
	color : 'black',
	width : deviceWidth - 40,
	textAlign : 'left',
	height : 40,
	enabled : false
});

/* Pop up Code starts here */
var selectTripView = Titanium.UI.createView({
	layout : 'vertical',
	backgroundColor : 'black',
	//	opacity : 0.5,
	width : deviceWidth - 20,
	height : 250,
	borderColor : 'white',
	borderWidth : 1
});

var selectTripButtonView = Titanium.UI.createView({
	//	width : 200,
	height : 50,
	top : 5,
	left : 10,
	right : 10,
});
var cancelButton = Titanium.UI.createButton({
	top : 0,
	title : 'Cancel',
	width : 100,
	left : 10,
	height : 50
});

cancelButton.addEventListener('click', function(e) {
	dialog.hide();
});

var doneButton = Titanium.UI.createButton({
	top : 0,
	title : 'Done',
	width : 100,
	right : 10,
	height : 50
});

doneButton.addEventListener('click', function(e) {
	selectTripSelectBox.setTitle(selectedTrip);
	/*	if(selectedRow != ''){
	 selectedRow.setBackgroundColor('gray');
	 }*/
	dialog.hide();
});

selectTripButtonView.add(cancelButton);
selectTripButtonView.add(doneButton);

var selectTripLabelInDialog = Titanium.UI.createLabel({
	top : 0,
	height : 30,
	left : 20,
	width : deviceWidth - 20,
	text : 'Trips',
	color : 'white'
});

var table = Titanium.UI.createTableView({
	//data : data,
	top : 5,
	left : 20,
	right : 20,
	bottom : 10,
	height : 150,
	width : deviceWidth - 60
});

table.addEventListener('click', function(e) {
	/*if(selectedRow != ''){
	 selectedRow.setBackgroundColor('transparent');
	 }
	 e.source.setBackgroundColor('gray');
	 selectedTrip = e.rowData.title;
	 selectedRow = e.source;*/

	var l = [];
	l = table.data[0].getRows();
	for (var i = 0; i < l.length; i++) {
		if (i == e.index) {
			l[i].setBackgroundColor('gray');
		} else {
			l[i].setBackgroundColor('transparent');
		}
	}

	selectedTrip = e.rowData.title;

});
selectTripView.add(selectTripButtonView);
selectTripView.add(selectTripLabelInDialog);
selectTripView.add(table);
/* Pop up Code ends here */

/*var dialog = Titanium.UI.createOptionDialog({
androidView : selectTripView,
cancel : 1
});*/

// To set background when pop up open
var translucent = Titanium.UI.createView({
	top : 0,
	backgroundColor : 'black',
	opacity : 0.5,
	//	width : deviceWidth - 20,
	//	height : 'auto',
	bottom : 0,
	left : 0,
	right : 0
});

// View which is not visible for popup it will be visible when Select Trip Drop down box - click event
var dialog = Ti.UI.createView({
	backgroundColor : '#00000000',
	top : 0,
	bottom : 0,
	left : 0,
	right : 0,
	visible : false,
});

selectTripSelectBox.addEventListener('click', function(e) {
	var l = [];
	l = table.data[0].getRows();
	for (var i = 0; i < data.length; i++) {
		if (selectTripSelectBox.title == data[i].title) {
			l[i].setBackgroundColor('gray');
		} else {
			l[i].setBackgroundColor('transparent');
		}
	}
	dialog.show();
});

var odometerHorizontalView = Titanium.UI.createView({
	top : 135,
	height : 55,
	width : deviceWidth,
	layout : 'horizontal'
});

var odometerVehicleLabel = Titanium.UI.createLabel({
	top : 10,
	left : 20,
	height : 45,
	text : 'Odometer',
	width : deviceWidth / 2 - 20,
	color : 'black'
});

var odometerVehicleTF = Titanium.UI.createTextField({
	top : textFieldTop,
	height : buttonHeightForAll,
	width : deviceWidth / 2 - 20,
	keyboardType : Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION,
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});

odometerHorizontalView.add(odometerVehicleLabel);
odometerHorizontalView.add(odometerVehicleTF);

var safetyInspectionHorizontalView = Titanium.UI.createView({
	top : 185,
	height : 55,
	width : deviceWidth,
	layout : 'horizontal'
});

var safetyInspectionLabel = Titanium.UI.createLabel({
	top : 10,
	left : 20,
	text : 'Safety Inspection',
	height : 45,
	width : deviceWidth / 2 - 20,
	color : 'black'
});

/*var safetyInspectionCB = Titanium.UI.createSwitch({
 style : Titanium.UI.Android.SWITCH_STYLE_CHECKBOX,
 value : false,
 top : 5,
 left : -deviceWidth / 80
 });*/

var safetyInspectionCB = Titanium.UI.createImageView({
	image : '/images/btn_check_off.png',
	value : false,
	height : buttonHeightForAll,
	left : checkBoxButtonLeft,
	width : 50,
	top : textFieldTop
});

safetyInspectionCB.addEventListener('click', function(e) {
	if (this.value == false) {
		this.value = true;
		this.image = '/images/btn_check_on.png';
		return;
	}
	if (this.value == true) {
		this.value = false;
		this.image = '/images/btn_check_off.png';
		return;
	}
});

safetyInspectionHorizontalView.add(safetyInspectionLabel);
safetyInspectionHorizontalView.add(safetyInspectionCB);

var noteLabel = Titanium.UI.createLabel({
	top : 240,
	left : 20,
	text : 'Note',
	color : 'black',
	height : 30,
	width : deviceWidth - 20
});

var textArea = Titanium.UI.createTextArea({
	height : 80,
	width : deviceWidth - 40,
	top : 275,
	borderColor : borderColorForTextArea
});

var startButton = Titanium.UI.createButton({
	top : 360,
	height : buttonHeightForAll,
	width : deviceWidth / 4,
	title : 'Start'
});

startButton.addEventListener('click', function(e) {
	// To open database
	var database = Ti.Database.install('/database/GoRoamPODDB.sqlite', 'GoRoamPODDB');
	var tripRow = database.execute('SELECT * FROM Trip_Table');
	var rowCount = tripRow.rowCount;
	tripRow.close();
	database.close();
	if (rowCount > 0) {
		alertDialogForCurrentTrip.show();
	} else {
		startTripFunction(true);
	}

});
function startTripFunction(booleanForShowIndicator) {
	var param = new Array();
	//param[0] = "313B89EF-7ACD-4A5E-8BA3-9E7D977ABE89";
	//	param[1] = "1001";
	//param[2] = "336";
	//param[3] = "test notes";
	if (data.length > 0) {
		var l = [];
		l = table.data[0].getRows();
		for (var i = 0; i < data.length; i++) {
			if (selectTripSelectBox.title == data[i].title) {
				param[0] = data[i].ref;
				i = data.length;
			}
		}
	} else {
		alert('Please Select Trip.');
		return;
	}
	if (plannedVehicleTF.value == '') {
		alert('Please enter planned vehicle number.');
		return;
	} else {
		param[1] = plannedVehicleTF.value;
	}
	if (odometerVehicleTF.value == '') {
		alert('Please enter Odometer Value.');
		return;
	} else {
		param[2] = odometerVehicleTF.value;
	}
	param[3] = textArea.value;
	param[4] = booleanForShowIndicator;

	doAction(START_TRIP, param);
}

var alertDialogForCurrentTrip = Titanium.UI.createAlertDialog({
	message : 'Only one trip can be active at once. Do you want to cancel the current trip and start a new one?',
	buttonNames : ['Yes', 'No']
});

alertDialogForCurrentTrip.addEventListener('click', function(e) {
	if (e.index == 0) {
		activityInd.show();
		var db = Ti.Database.open('GoRoamPODDB');
		db.execute('DELETE FROM  Trip_Table');
		db.execute('DELETE FROM  Order_Table');
		db.execute('DELETE FROM  Order_Detail_Table');
		db.execute('DELETE FROM  Load_Table');
		db.execute('DELETE FROM  Load_Detail_Table');
		db.close();
		startTripFunction(false);

	} else if (e.index == 1) {
		// Do Nothing
	}
});

// Dialog(View) to add dull background and Popup
dialog.add(translucent);
dialog.add(selectTripView);

bottomView.add(listTripsButton);
bottomView.add(selectTripLabel);
bottomView.add(selectTripSelectBox);
bottomView.add(odometerHorizontalView);
bottomView.add(safetyInspectionHorizontalView);
bottomView.add(noteLabel);
bottomView.add(textArea);
bottomView.add(startButton);

scrollView.add(topView);
scrollView.add(picker);
scrollView.add(timePicker);
scrollView.add(bottomView);

startWindow.add(startViewHeading);
startWindow.add(scrollView);
startWindow.add(dialog);

