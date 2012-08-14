Titanium.include('/controller/Controller.js');
Titanium.include('/Screens/Constants.js')

var w = Titanium.UI.createWindow({
	url : 'Screens/LoginScreen.js',
	backgroundColor : 'white',
	width : deviceWidth,
	layout : 'vertical',
	exitOnClose : true,
	modal : modalValue,
	orientationModes : [1]
});

// To check from local storage.
var params = new Array();
var companyCodeLocalStorage = Ti.App.Properties.getString("CompanyCode");
var userNameLocalStorage = Ti.App.Properties.getString("UserName");
var passwordLocalStorage = Ti.App.Properties.getString("Password");
var autoLoginStatus = Ti.App.Properties.getBool("AutoLogin");
if (companyCodeLocalStorage != '' && userNameLocalStorage != '' && passwordLocalStorage != '') {
	// To Check Remember me option
	if (autoLoginStatus) {
		params[0] = companyCodeLocalStorage;
		params[1] = userNameLocalStorage;
		params[2] = passwordLocalStorage;
		//	doAction(ACTION_LOGIN, params);
		var win = createMainWindow();
		win.open();
	} else {
		// To open Login window
		w.open();
	}
} else {
	// To open Login window
	w.open();
}

