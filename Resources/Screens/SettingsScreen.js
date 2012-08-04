Titanium.include('Constants.js');

var settingsWindow = Ti.UI.currentWindow;

var settingsViewHeading = Titanium.UI.createView({
	top : 0,
	height : headingHeight,
	width : deviceWidth,
	layout : 'horizontal',
	backgroundColor : 'gray',
	borderColor : 'black',
	borderWidth : 1
});

var buttonBackSettings = Titanium.UI.createButton({
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

buttonBackSettings.addEventListener('click', function(e) {
	settingsWindow.close();
});

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

var logoutHorizontalView = Titanium.UI.createView({
	top : 235,
	height : 50,
	width : deviceWidth - 20,
	layout : 'horizontal'
});

var logoutEndTripLabel = Titanium.UI.createLabel({
	text : 'Logout or End Trip',
	top : 10,
	left : 10,
	height : 'auto',
	width : deviceWidth / 2 - 10 - 20 ,
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
	width :'auto',
	top : textFieldTop,
	left : checkBoxButtonLeft
});

logoutCB.addEventListener('click',function(e){
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
logoutHorizontalView.add(logoutEndTripLabel);
logoutHorizontalView.add(logoutCB);

var serverURLLabel = Titanium.UI.createLabel({
	top : 290,
	left : 10,
	width : deviceWidth - 10 - 20,
	text : 'Server URL',
	color : 'black',
	height : 30
});

var textAreaSettings = Titanium.UI.createTextArea({
	height : 70,
	width : deviceWidth - 30,
	top : 320,
	borderColor :borderColorForTextArea
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
