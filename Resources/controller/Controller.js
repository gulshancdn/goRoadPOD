Titanium.include('/Screens/Constants.js');
Titanium.include('Communicator.js');

var ACTION_LOGIN = 1;
var LIST_TRIPS = 2;
var START_TRIP = 3;
var VERIFY_LOGIN = 4;

var returnback;

function doAction(action, params, callbck) {
	returnback = callbck;
	switch(action) {
		case ACTION_LOGIN:
			doLogin(params);
			break;
		case LIST_TRIPS:
			getListOfTrips(params);
			break;
		case START_TRIP:
			startTrip(params);
			break;
		case VERIFY_LOGIN:
			verifyLogin(params);
			break;
	}
}

function loginCallback(response, statusCode, showInd) {
	if ((response != null && response.trim().length > 0) || statusCode == '200') {
		//alert(response + ' ' + statusCode);
		if (showInd) {
			activityInd.hide();
		}
		var parsedData = JSON.parse(response);
		if (parsedData != null) {
			try {
				if (parsedData.d.status == 'OK') {
					var win = Titanium.UI.createWindow({
						backgroundColor : 'white',
						width : deviceWidth,
						url : '/Screens/MainScreen.js',
						exitOnClose : true,
						orientationModes : [1]
					});

					win.open();
				} else {
					alert(parsedData.d.messageData.Error);
				}

			} catch(err) {
				alert(err);
			}
		}
	}
}

function listTripsCallback(response, statusCode, showInd) {
	//	alert(response + ' ' + statusCode);
	//	return;
	if ((response != null && response.trim().length > 0) || statusCode == '200') {
		if (showInd) {
			activityInd.hide();
		}
		var parsedData = JSON.parse(response);
		if (parsedData != null) {
			try {
				if (parsedData.d.status == 'OK') {
					var array = parsedData.d.messageData.trips;
					returnback(array);
					/*for(var i = 0;i<array.length;i++){
					 //	alert(array[i].trip.tripRefId);
					 //	alert(array[i].trip.tripCode);
					 }*/
				} else {
					alert(parsedData.d.messageData.Error);
				}

			} catch(err) {
				alert(err);
			}
		}
	}
}

function startTripCallback(response, statusCode, showInd) {
	Ti.API.info(response);

	//	alert(response + ' ' + statusCode);
	//	return;
	if ((response != null && response.trim().length > 0) || statusCode == '200') {
		if (showInd) {
			activityInd.hide();
		}

		var parsedData = JSON.parse(response);
		if (parsedData != null) {
			try {
				if (parsedData.d.status == 'OK') {
					var db = Ti.Database.install('/database/GoRoamPODDB.sqlite', 'GoRoamPODDB');
					var trip_ref_id = parsedData.d.messageData.trip.tripRefId;
					var trip_code = parsedData.d.messageData.trip.tripCode;
					var description = parsedData.d.messageData.trip.desc;
					var user_ref_id = parsedData.d.messageData.trip.userRefId;
					var first_name = parsedData.d.messageData.trip.firstName;
					var last_name = parsedData.d.messageData.trip.lastName;
					var start_time = parsedData.d.messageData.trip.startTime;
					//var tripArray = ["'" + trip_ref_id + "'", "'" + trip_code + "'", "'" + description + "'", "'" + user_ref_id + "'", "'" + first_name + "'", "'" + last_name + "'", "'" + start_time + "'"];
					var tripArray = [trip_ref_id, trip_code, description, user_ref_id, first_name, last_name, start_time];
					var rows = db.execute('SELECT * FROM Trip_Table');
					var count = rows.rowCount;
					if (count < 0) {
						db.execute('INSERT INTO Trip_Table (tripRefId, tripCode, desc, userRefId, fName, lName, startTime) VALUES(?, ?, ?, ?, ?, ?, ?)', tripArray);
						//		db.execute('INSERT INTO Trip_Table (tripRefId, tripCode, desc, userRefId, fName, lName, startTime) VALUES(?, ?, ?, ?, ?, ?, ?)', tripArray);
						//db.execute('DELETE FROM  Trip_Table');
						var rows = db.execute('SELECT * FROM Trip_Table');
						alert('rowscount ' + rows.rowCount);
						while (rows.isValidRow()) {
							alert("TripTable " + rows.field(0) + ' ' + rows.field(1) + ' ' + rows.field(2) + ' ' + rows.field(3) + ' ' + rows.field(4) + ' ' + rows.field(5) + ' ' + rows.field(6));
							//alert(rows.fieldByName('tripRefId') + ', ' +rows.fieldByName('tripCode')+', ' +rows.fieldByName('desc')+', ' +rows.fieldByName('userRefId')+', ' +rows.fieldByName('fName')+','+rows.field('startTime')+', '+rows.fieldByName('lName'))
							rows.next();
						}
						rows.close();

						var orderArray = parsedData.d.messageData.trip.order;
						var arrayLength = orderArray.length;
						for (var i = 0; i < arrayLength; i++) {
							var order_ref_id = orderArray[i].orderRefId;
							// trip_ref_id
							var status_ref_id = orderArray[i].statusRefId;
							var order_no = orderArray[i].orderNo;
							var order_date = orderArray[i].orderDate;
							var cust_ref_id = orderArray[i].custRefId;
							var cust_name = orderArray[i].custName;
							var addr_1 = orderArray[i].addr1;
							var addr_2 = orderArray[i].addr2;
							var city_of_array = orderArray[i].city;
							var state = orderArray[i].state;
							var zip_code = orderArray[i].zip;
							var user_ref_id_of_array = orderArray[i].userRefId;
							var firstName_of_array = orderArray[i].firstName;
							var lastName_of_array = orderArray[i].lastName;
							var eta = orderArray[i].eta;
							var etd = orderArray[i].etd;
							var instructions = orderArray[i].instructions;

							//var orderArrayForTable = ["'" + order_ref_id + "'", "'" + trip_ref_id + "'", "'" + status_ref_id + "'", "'" + order_no + "'", "'" + order_date + "'", "'" + cust_ref_id + "'", "'" + cust_name + "'", "'" + addr_1 + "'", "'" + addr_2 + "'", "'" + city_of_array + "'", "'" + state + "'", "'" + zip_code + "'", "'" + user_ref_id_of_array + "'", "'" + firstName_of_array + "'", "'" + lastName_of_array + "'", "'" + eta + "'", "'" + etd + "'", "'" + instructions + "'"];
							var orderArrayForTable = [order_ref_id, trip_ref_id, status_ref_id, order_no, order_date, cust_ref_id, cust_name, addr_1, addr_2, city_of_array, state, zip_code, user_ref_id_of_array, firstName_of_array, lastName_of_array, eta, etd, instructions];
							db.execute('INSERT INTO Order_Table (orderRefId, tripRefId, statusRefId, orderNo, orderDate, custRefId, custName, addr1, addr2, city, state, zipcode, userRefId, fName, lName, eta, etd, instructions) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', orderArrayForTable)
							//db.execute('DELETE FROM  Order_Table');
							var orderTableRow = db.execute('SELECT * FROM Order_Table');
							alert('orderTableRow ' + orderTableRow.rowCount);
							while (orderTableRow.isValidRow()) {
								alert("OrderTable " + orderTableRow.field(0) + ' ' + orderTableRow.field(1) + ' ' + orderTableRow.field(2) + ' ' + orderTableRow.field(3) + ' ' + orderTableRow.field(4) + ' ' + orderTableRow.field(5) + ' ' + orderTableRow.field(6) + ' ' + orderTableRow.field(7) + ' ' + orderTableRow.field(8) + ' ' + orderTableRow.field(9) + ' ' + orderTableRow.field(10) + ' ' + orderTableRow.field(11) + ' ' + orderTableRow.field(12) + ' ' + orderTableRow.field(13) + ' ' + orderTableRow.field(14) + ' ' + orderTableRow.field(15) + ' ' + orderTableRow.field(16) + ' ' + orderTableRow.field(17));
								//		alert(orderTableRow.field(0) + ' ' + orderTableRow.field(1) + ' ' + orderTableRow.field(2) + ' ' + orderTableRow.field(3) + ' ' + orderTableRow.field(4) + ' ' + orderTableRow.field(5) + ' ' + orderTableRow.field(6)+ ' ' + orderTableRow.field(7)+ ' ' + orderTableRow.field(8)+ ' ' + orderTableRow.field(9)+ ' ' + orderTableRow.field(10)+ ' ' + orderTableRow.field(11)+ ' ' + orderTableRow.field(12)+ ' ' + orderTableRow.field(13)+ ' ' + orderTableRow.field(14)+ ' ' + orderTableRow.field(15)+ ' ' + orderTableRow.field(16)+ ' ' + orderTableRow.field(17));
								//alert(rows.fieldByName('tripRefId') + ', ' +rows.fieldByName('tripCode')+', ' +rows.fieldByName('desc')+', ' +rows.fieldByName('userRefId')+', ' +rows.fieldByName('fName')+','+rows.field('startTime')+', '+rows.fieldByName('lName'))
								orderTableRow.next();
							}
							orderTableRow.close();

							var detailArray = orderArray[i].detail;
							var detailArrayLength = detailArray.length;
							for (var j = 0; j < detailArrayLength; j++) {
								var detail_ref_id = detailArray[j].detailRefId;
								// order_ref_id
								var item_ref_id = detailArray[j].itemRefId;
								var item_id = detailArray[j].itemId;
								var item_desc = detailArray[j].itemDesc;
								var line_number = detailArray[j].lineNum;
								var order_qty = detailArray[j].orderQty;
								var uom = detailArray[j].uom;
								var item_price = detailArray[j].itemPrice;

								//var OrderDetailArrayForTable = ["'" + detail_ref_id + "'", "'" + order_ref_id + "'", "'" + item_ref_id + "'", "'" + item_id + "'", "'" + item_desc + "'", line_number, order_qty, "'" + uom + "'", item_price];
								var OrderDetailArrayForTable = [detail_ref_id, order_ref_id, item_ref_id, item_id, item_desc, line_number, order_qty, uom, item_price];
								db.execute('INSERT INTO Order_Detail_Table(detailRefId, orderRefId, itemRefId, itemId, itemDesc, lineNumber, orderQty, uom, itemPrice) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', OrderDetailArrayForTable);
								//db.execute('DELETE FROM  Order_Detail_Table');
								var orderDetailTableRow = db.execute('SELECT * FROM Order_Detail_Table');
								alert('orderDetailTableRow ' + orderDetailTableRow.rowCount);

								while (orderDetailTableRow.isValidRow()) {
									alert("orderDetailTableRow " + orderDetailTableRow.field(0) + ' ' + orderDetailTableRow.field(1) + ' ' + orderDetailTableRow.field(2) + ' ' + orderDetailTableRow.field(3) + ' ' + orderDetailTableRow.field(4) + ' ' + orderDetailTableRow.field(5) + ' ' + orderDetailTableRow.field(6) + ' ' + orderDetailTableRow.field(7) + ' ' + orderDetailTableRow.field(8));
									orderDetailTableRow.next();
								}
								orderDetailTableRow.close();
							}
						}
					}
					db.close();
					var tripDetailWindow = Titanium.UI.createWindow({
						backgroundColor : 'white',
						width : deviceWidth,
						url : 'TripDetailScreen.js',
						orientationModes : [1],
					//	data : parsedData
					});
					tripDetailWindow.open();
					
				} else {
					alert(parsedData.d.messageData.Error);
				}

			} catch(err) {
				alert(err);
			}
		}
	}
}

function verifyLoginCallback(response, statusCode, showInd) {
	if ((response != null && response.trim().length > 0) || statusCode == '200') {
		//	alert(response + ' ' + statusCode);
		if (showInd) {
			activityInd.hide();
		}
		//	return;
		var parsedData = JSON.parse(response);
		if (parsedData != null) {
			try {
				if (parsedData.d.status == 'OK') {
					alert("Valid User");
				} else {
					alert("Invalid User");
				}

			} catch(err) {
				alert(err);
			}
		}
	}
}
