jQuery.sap.declare("myess.util.Grouper");

myess.util.Grouper = {

	bundle : null, // somebody has to set this

	type : function (oContext) {
		var status = oContext.getProperty("type");
		var text = myess.util.Grouper.bundle.getText("TypeText" + status, "?");
		return {
			key: status,
			text: text
		};
	},

	status : function (oContext) {
		var status = oContext.getProperty("status");
		var text = myess.util.Grouper.bundle.getText("StatusText" + status, "?");
		return {
			key: status,
			text: text
		};
	},
	
	GrossAmount : function (oContext) {
		var price = oContext.getProperty("GrossAmount");
		var currency = oContext.getProperty("CurrencyCode");
		var key = null,
			text = null;
		if (price <= 5000) {
			key = "LE10";
			text = "< 5000 " + currency;
		} else if (price > 5000 && price <= 10000) {
			key = "LE100";
			text = "< 10.000  " + currency;
		} else if (price > 10000) {
			key = "GT100";
			text = "> 10.000 " + currency;
		}
		return {
			key: key,
			text: text
		};
	}
};