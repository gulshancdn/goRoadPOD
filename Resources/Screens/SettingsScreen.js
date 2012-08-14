Titanium.include('Constants.js');
Titanium.include('/controller/Controller.js');
// To get current window
var settingsWindow = Ti.UI.currentWindow;
if (platform == 'android') {
	settingsWindow.addEventListener('android:back', function(e) {
		settingsWindow.close();
	});
}

// Heading View
var settingsViewHeading = Titanium.UI.createView({
	top : 0,
	height : headingHeight,
	width : deviceWidth,
	layout : 'horizontal',
	backgroundColor : 'gray',
	borderColor : 'black',
	borderWidth : 1
});
// Back Button
var buttonBackSettings = Titanium.UI.createButton({
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
buttonBackSettings.addEventListener('click', function(e) {
	settingsWindow.close();
});
// Heading text
var headingSettings = Titanium.UI.createLabel({
	top : 7,
	text : 'Settings',
	height : 40,
	//	width : deviceWidth - 120,
	width : 100,
	color : 'black',
	left : deviceWidth / 2 - headingLeftSpaceForMedHeadings,
	font : {
		fontSize : 20,
		fontFamily : 'Helvetica Neue',
		fontWeight : 'bold'
	},
});

settingsViewHeading.add(buttonBackSettings);
settingsViewHeading.add(headingSettings);

// Scroll View to add full content of screen
var scrollViewSettings = Titanium.UI.createScrollView({
	contentWidth : 'auto',
	contentHeight : 'auto',
	top : 50,
	width : deviceWidth - 20,
	showVerticalScrollIndicator : true,
	showHorizontalScrollIndicator : true
});

var companyCodeSettingsHorizontalView = Titanium.UI.createView({
	top : 5,
	height : 55,
	width : deviceWidth - 20,
	layout : 'horizontal'
});

var companyCodeSettingsLabel = Titanium.UI.createLabel({
	top : 15,
	left : 10,
	text : 'Company Code',
	height : 'auto',
	width : deviceWidth / 2 - 10 - 20,
	color : 'black'
});

var companyCodeSettingsTF = Titanium.UI.createTextField({
	top : textFieldTop,
	height : buttonHeightForAll,
	width : deviceWidth / 2,
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});

companyCodeSettingsHorizontalView.add(companyCodeSettingsLabel);
companyCodeSettingsHorizontalView.add(companyCodeSettingsTF);

var userNameSettingsHorizontalView = Titanium.UI.createView({
	top : 65,
	height : 55,
	width : deviceWidth - 20,
	layout : 'horizontal'
});

var userNameSettingsLabel = Titanium.UI.createLabel({
	top : 15,
	left : 10,
	height : 'auto',
	text : 'User Name',
	width : deviceWidth / 2 - 10 - 20,
	color : 'black'
});

var userNameSettingsTF = Titanium.UI.createTextField({
	top : textFieldTop,
	height : buttonHeightForAll,
	width : deviceWidth / 2,
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});

userNameSettingsHorizontalView.add(userNameSettingsLabel);
userNameSettingsHorizontalView.add(userNameSettingsTF);

var passwordSettingsHorizontalView = Titanium.UI.createView({
	top : 120,
	height : 55,
	width : deviceWidth - 20,
	layout : 'horizontal'
});

var passwordSettingsLabel = Titanium.UI.createLabel({
	top : 15,
	left : 10,
	height : 'auto',
	text : 'Password',
	width : deviceWidth / 2 - 10 - 20,
	color : 'black'
});

var passwordSettingsTF = Titanium.UI.createTextField({
	top : textFieldTop,
	height : buttonHeightForAll,
	width : deviceWidth / 2,
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	passwordMask : true
});

passwordSettingsHorizontalView.add(passwordSettingsLabel);
passwordSettingsHorizontalView.add(passwordSettingsTF);

var verifyButton = Titanium.UI.createButton({
	top : 185,
	height : buttonHeightForAll,
	width : deviceWidth / 4,
	title : 'Verify'
});
verifyButton.addEventListener('click', function(e) {
	var paramsForSettingScreen = new Array();

	paramsForSettingScreen[0] = companyCodeSettingsTF.value;
	paramsForSettingScreen[1] = userNameSettingsTF.value;
	paramsForSettingScreen[2] = passwordSettingsTF.value;
	paramsForSettingScreen[3] = textAreaSettings.value;

	if (validateVerification(paramsForSettingScreen[0], paramsForSettingScreen[1], paramsForSettingScreen[2])) {

		/*Ti.App.Properties.setString("Settings_CompanyCode",paramsForSettingScreen[0]);
		 Ti.App.Properties.setString("Settings_UserName",paramsForSettingScreen[1]);
		 Ti.App.Properties.setString("Settings_Password",paramsForSettingScreen[2]);*/
		Ti.App.Properties.setString("Settings_Server_URL", paramsForSettingScreen[3]);
		Ti.App.Properties.setBool("Setting_SSL", sslCB.value);

		doAction(VERIFY_LOGIN, paramsForSettingScreen);
	}
});

var logoutHorizontalView = Titanium.UI.createView({
	top : 235,
	height : 50,
	width : deviceWidth - 20,
	layout : 'horizontal'
});

var logoutEndTripLabel = Titanium.UI.createLabel({
	text : 'logout on end trip',
	top : 10,
	left : 10,
	height : 'auto',
	width : deviceWidth / 2 - 10,
	color : 'black'
});

/*var logoutCB = Titanium.UI.createSwitch({
 style : Titanium.UI.Android.SWITCH_STYLE_CHECKBOX,
 value : false,
 left : -deviceWidth / 80,
 width : deviceWidth / 2 - 20,
 top : 5
 });*/

var logoutCB = Titanium.UI.createImageView({
	image : '/images/btn_check_off.png',
	value : false,
	height : buttonHeightForAll,
	width : 'auto',
	top : textFieldTop,
	left : checkBoxButtonLeft
});

logoutCB.addEventListener('click', function(e) {
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
logoutHorizontalView.add(logoutEndTripLabel);
//logoutHorizontalView.add(logoutCB);

var serverURLLabel = Titanium.UI.createLabel({
	top : 290,
	left : 10,
	width : deviceWidth - 10 - 20,
	text : 'Server URL',
	color : 'black',
	height : 30
});

var textAreaSettings = Titanium.UI.createTextArea({
	//	value : 'http://ss2.test.bizspeed.com/syncmobilesuitejson.asmx',
	height : 70,
	width : deviceWidth - 30,
	top : 320,
	borderColor : borderColorForTextArea
});

var sslHorizontalView = Titanium.UI.createView({
	top : 395,
	height : 100,
	width : deviceWidth - 20,
	layout : 'horizontal'
});

var sslLabel = Titanium.UI.createLabel({
	text : 'SSL',
	top : sslLabelTop,
	left : 10,
	height : 'auto',
	width : deviceWidth / 2 - 10 - 20,
	color : 'black'
});

var sslCB = Titanium.UI.createSwitch({
	//	style : Titanium.UI.Android.SWITCH_STYLE_TOGGLEBUTTON,
	value : false,
	left : checkBoxButtonLeft,
	//	width:deviceWidth/2 - 20,
	titleOff : 'Off',
	titleOn : 'On',
	top : 5
});
sslHorizontalView.add(sslLabel);
sslHorizontalView.add(sslCB);

var companyCodeLocalStorage_setting = Ti.App.Properties.getString("Settings_CompanyCode");
if (companyCodeLocalStorage_setting != '') {
	companyCodeSettingsTF.value = companyCodeLocalStorage_setting;
}
var userNameLocalStorage_setting = Ti.App.Properties.getString("Settings_UserName");
if (userNameLocalStorage_setting != '') {
	userNameSettingsTF.value = userNameLocalStorage_setting;
}
/*var passwordLocalStorage_setting = Ti.App.Properties.getString("Settings_Password");
 if (passwordLocalStorage_setting != '') {
 passwordSettingsTF.value = passwordLocalStorage_setting;
 };*/
var textArea_setting = Ti.App.Properties.getString("Settings_Server_URL");
if (textArea_setting != '') {
	textAreaSettings.value = textArea_setting;
}
var sslValue_setting = Ti.App.Properties.getBool("Setting_SSL");
if (sslValue_setting) {
	sslCB.value = true;
}

//scrollViewSettings.add(settingsViewHeading);
scrollViewSettings.add(companyCodeSettingsHorizontalView);
scrollViewSettings.add(userNameSettingsHorizontalView);
scrollViewSettings.add(passwordSettingsHorizontalView);
scrollViewSettings.add(verifyButton);
scrollViewSettings.add(logoutHorizontalView);
scrollViewSettings.add(serverURLLabel);
scrollViewSettings.add(textAreaSettings);
scrollViewSettings.add(sslHorizontalView);

settingsWindow.add(settingsViewHeading);
settingsWindow.add(scrollViewSettings);

function validateVerification(companyCode, userName, password) {
	if (companyCode != null && companyCode.trim().length > 0) {
		if (userName != null && userName.trim().length > 0) {
			if (password != null && password.trim().length > 0) {
				return true;
			} else {
				alert('Please enter Password.');
			}
		} else {
			alert('Please enter User Name.');
		}
	} else {
		alert('Please enter Company Code.');
	}
	return false;
}
