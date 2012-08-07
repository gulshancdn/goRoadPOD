
function getJSONString(opcode, array, module, params)
{
//	alert(params[0]+' '+params[1]+' '+params[2]);
//	return;
	var mataData="";
	for (key in array) {
		// alert("a["+key+"]="+ array[key]);
		mataData=mataData+"\""+key+"\":"+"\""+array[key]+"\",";
	}
	mataData =mataData.substr(0,mataData.length-1);

	var jsonString = "{ ";
	jsonString += '"msg" : { ';
	jsonString += '"module" : "'+module+'",'
	jsonString += '"opcode" : "'+opcode+'",';
	jsonString += '"status" : null,'
	jsonString += '"messageData" : { ';
	jsonString += mataData;
//	jsonString += '"InParam1" : "'+arrayForParam1+'" },';
	jsonString += ' },';
	jsonString += '"authToken" : {';
	jsonString += '"UserName" : "'+params[1]+'",';
	jsonString += '"Password" : "'+params[2]+'",';
	jsonString += '"CompanyCode" : "'+params[0]+'",';
	jsonString += '"CryptoKey" : null,';
	jsonString += '"OrgRefId" : "00000000-0000-0000-0000-000000000000",';
	jsonString += '"UserRefId" : "00000000-0000-0000-0000-000000000000" },';
	
	var date = new Date();
	
	var d = date.getDate();
	var mm = date.getMonth()+1;
	var y = date.getFullYear();
	var hh = date.getHours();
	var Min = date.getMinutes();
	var sec = date.getSeconds();
	var str = "AM";
	if(hh>12)
	{
		hh = hh -12;
		str = "PM";
	}
	var dd = mm+'/'+d+'/'+y+' '+hh+":"+Min+":"+sec+" "+str;
	
	jsonString += '"clockTimeInUTC" : "'+dd+'" } }';
	
	//alert(jsonString);
	return jsonString;
}
