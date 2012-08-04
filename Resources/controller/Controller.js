Titanium.include('/Screens/Constants.js');
Titanium.include('Communicator.js');

var ACTION_LOGIN = 1;

function doAction(action,params){
	switch(action){
		case ACTION_LOGIN:
			doLogin();
		//	loginCallback();
			break;
	}
}

function loginCallback() {
	var win = Titanium.UI.createWindow({
		backgroundColor : 'white',
		width : deviceWidth,
		url : '/Screens/MainScreen.js',
		exitOnClose : true,
		orientationModes : [1]
	});

	win.open();
}
