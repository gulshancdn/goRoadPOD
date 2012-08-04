Titanium.include('Constants.js');
Titanium.include('/controller/Controller.js');


var win = Ti.UI.currentWindow;

var logo = Titanium.UI.createImageView({
	image : '/images/titanium_logo.png',
	height : 50,
	width : 50,
	top : 20	
});

var companyCodeHorizontalView = Titanium.UI.createView({
	top : 10,
	height : 55,
	width : deviceWidth,
	layout : 'horizontal'
});

var companyCodeLabel = Titanium.UI.createLabel({
	top : 15,
	left : 20,
	text : 'Company Code',
	width : deviceWidth / 2 - 20,
	height: 40,
	color : '#000'
});

var companyCodeTF = Titanium.UI.createTextField({
	top : textFieldTop,
	height: buttonHeightForAll,
	width : deviceWidth / 2 - 20,
	color: 'black',
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});

companyCodeHorizontalView.add(companyCodeLabel);
companyCodeHorizontalView.add(companyCodeTF);

var userNameHorizontalView = Titanium.UI.createView({
	//	top : 155,
	top : 10,
	height : 55,
	width : deviceWidth,
	layout : 'horizontal'
});

var userNameLabel = Titanium.UI.createLabel({
	top : 15,
	left : 20,
	height: 40,
	text : 'User Name',
	width : deviceWidth / 2 - 20,
	color : 'black',
	//	font:{fontSize:21,fontFamily:'Helvetica Neue'},
});

var userNameTF = Titanium.UI.createTextField({
	top : textFieldTop,
	height: buttonHeightForAll,
	width : deviceWidth / 2 - 20,
	borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});

userNameHorizontalView.add(userNameLabel);
userNameHorizontalView.add(userNameTF);

var passwordHorizontalView = Titanium.UI.createView({
	//	top : 205,
	top : 10,
	height : 55,
	width : deviceWidth,
	layout : 'horizontal'
});

var passwordLabel = Titanium.UI.createLabel({
	top : 15,
	left : 20,
	height: 40,
	text : 'Password',
	width : deviceWidth / 2 - 20,
	color : 'black'
	//	font:{fontSize:21,fontFamily:'Helvetica Neue'},
});

var passwordTF = Titanium.UI.createTextField({
	top : textFieldTop,
	height: buttonHeightForAll,
	width : deviceWidth / 2 - 20,
	passwordMask : true,
	borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});

passwordHorizontalView.add(passwordLabel);
passwordHorizontalView.add(passwordTF);

var autoLoginHorizontalView = Titanium.UI.createView({
	//	top : 255,
	top : 10,
	height : 55,
	width : deviceWidth,
	layout : 'horizontal'
});

var autoLoginLabel = Titanium.UI.createLabel({
	top : 15,
	left : 20,
	height: 40,
	text : 'Auto Login',
	width : deviceWidth / 2 - 20,
	color : 'black'

	//font:{fontSize:21,fontFamily:'Helvetica Neue'},
});


/*var autoLoginCB = Titanium.UI.createSwitch({
	//style : Titanium.UI.Android.SWITCH_STYLE_CHECKBOX,
	value : false,
	height: 50,
	top : 5,
	left : -deviceWidth / 80
});*/

var autoLoginCB = Titanium.UI.createImageView({
	image : '/images/btn_check_off.png',
	value : false,
	height : buttonHeightForAll,
	width :'auto',
	top : textFieldTop,
	left : checkBoxButtonLeft
});

autoLoginCB.addEventListener('click',function(e){
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


autoLoginHorizontalView.add(autoLoginLabel);
autoLoginHorizontalView.add(autoLoginCB);

var loginButton = Titanium.UI.createButton({
	//	top : 320,
	top : 10,
	height : buttonHeightForAll,
	width : deviceWidth / 4,
	title : 'Login'
});

loginButton.addEventListener('click', function(e) {
	var params = new Array();
	params[0] = companyCodeTF.value;
	params[1] = userNameTF.value;
	params[2] = passwordTF.value;


	if(validateLogin(params[0],params[1],params[2])){
		
		Ti.App.Properties.setString("CompanyCode",params[0]);
		Ti.App.Properties.setString("UserName",params[1]);
		Ti.App.Properties.setString("Password",params[2]);
		Ti.App.Properties.setBool("AutoLogin",autoLoginCB.value);
		doAction(ACTION_LOGIN, params);
	}
});

var companyCodeLocalStorage = Ti.App.Properties.getString("CompanyCode");
if (companyCodeLocalStorage != '') {
	companyCodeTF.value = companyCodeLocalStorage;
};
var userNameLocalStorage = Ti.App.Properties.getString("UserName");
if (userNameLocalStorage != '') {
	userNameTF.value = userNameLocalStorage;
};
/*var passwordLocalStorage = Ti.App.Properties.getString("Password");
if (passwordLocalStorage != '') {
	passwordTF.value = passwordLocalStorage;
};
var autoLoginStatus = Ti.App.Properties.getBool("AutoLogin");
if(autoLoginStatus){
	autoLoginCB.value = true;
}*/


win.add(logo);
win.add(companyCodeHorizontalView);
win.add(userNameHorizontalView);
win.add(passwordHorizontalView);
win.add(autoLoginHorizontalView);
win.add(loginButton);



function validateLogin(companyCode, userName, password)
{
	if(companyCode != null && companyCode.trim().length > 0){
		if(userName != null && userName.trim().length > 0){
			if(password != null && password.trim().length > 0){
				return true;
			}else {
				alert('Please enter Password.'); 
			}
		}else{
			alert('Please enter User Name.'); 
		}
	}else{
			alert('Please enter Company Code.'); 
		}
		return false;
}




