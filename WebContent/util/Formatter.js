jQuery.sap.declare("myess.util.Formatter");

jQuery.sap.require("sap.ui.core.format.DateFormat");

myess.util.Formatter = {
	
	_statusStateMap : {
		"2" : "Success",
		"0" : "Warning"
	},

	statusText :  function (value) {
		var bundle = this.getModel("res").getResourceBundle();
		return bundle.getText("StatusText" + value, "?");
	},
	
	statusState :  function (value) {
		var map = myess.util.Formatter._statusStateMap;
		return (value && map[value]) ? map[value] : "None";
	},
	
	date : function (value) {
		if (value) {
			var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern: "dd-MM-yyyy"}); 
			return oDateFormat.format(new Date(value));
		} else {
			return value;
		}
	},
	
	quantity :  function (value) {
		try {
			return (value) ? parseFloat(value).toFixed(0) : value;
		} catch (err) {
			return "Not-A-Number";
		}
	}
};