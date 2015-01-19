jQuery.sap.require("myess.util.Formatter");
jQuery.sap.require("sap.m.MessageBox"); 
jQuery.sap.require("sap.m.MessageToast"); 
sap.ui.controller("myess.views.Detail", {	
/**
	* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
	* (NOT before the first rendering! onInit() is used for that one!).
	* @memberOf ess_abs_mob.app
	*/
	/**
	* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
	* This hook is the same one that SAPUI5 controls get after being rendered.
	* @memberOf ess_abs_mob.app
	*/
	_handleRouteMatched : function (evt) {
		this.getView().setModel(sap.ui.getCore().getModel());
		var param = evt.getParameter("arguments").id;
		this.getView().bindElement("/data/abscences/" + param);
	},

	handleNavButtonPress : function () {
		this.router.myNavBack("Master", {});
//		this.router.navTo("mail", {viewId: sViewId});
	},
	
	onInit: function() {
		this.router = sap.ui.core.UIComponent.getRouterFor(this);
		this.router.attachRoutePatternMatched(this._handleRouteMatched, this);
		var oCalendar = this.getView().byId('calendar');
		var data = sap.ui.getCore().getModel().getData();
		var dates = data.data.abscences;
		
		var aSelected;
		var oType = {};
		for( var i = 0; i < dates.length; i++ ){
			oCalendar.toggleDatesRangeSelection( dates[i].start , dates[i].end , true );
			aSelected = oCalendar.getSelectedDates();
			switch(dates[i].type){
				case "01": oType  = sap.me.CalendarEventType.Type01; break;
				case "02": oType  = sap.me.CalendarEventType.Type04; break;
				case "03": oType  = sap.me.CalendarEventType.Type06; break;
				default: oType  = sap.me.CalendarEventType.Type07; break;
				oCalendar.toggleDatesType( aSelected, oType, true);		
				oCalendar.unselectAllDates();		
			}
		}	
	},

	handleApproveReject:function (evt) { 
		// show confirmation dialog 
		var that = this;
		var button = evt.getSource().getProperty("type")
		var successMsg;
		var title;
		var isReject = false;	
		var bundle = this.getView().getModel("res").getResourceBundle(); 
 		if(button == "Reject"){
 			successMsg = bundle.getText("RejectDialogSuccessMsg");
 			messageText = bundle.getText("RejectDialogMsg");
 			title =  bundle.getText("RejectDialogTitle"); 
 			isReject = true;
 		}else{ 
 			successMsg = bundle.getText("ApproveDialogSuccessMsg");
 			messageText = bundle.getText("ApproveDialogMsg");
 			title =  bundle.getText("ApproveDialogTitle"); 
 		}	
		sap.m.MessageBox.confirm( 
		messageText, 
		 function (oAction) { 
			 	if (sap.m.MessageBox.Action.OK === oAction) { 
			 		var data = sap.ui.getCore().getModel().getData();
					var context = that.getView().getBindingContext().getPath();
			 		var leave = data.data.abscences[context.charAt(context.length - 1)];
			 		if(button == "Reject"){
			 			leave.status = 1;
			 		}else{
			 			leave.status = 2;
			 		}
			 		// notify user 
			 		sap.m.MessageToast.show(successMsg); 
			 		if(that.getView().getModel("device").getData().isNoPhone){
						that.router.myNavBack("Empty", {});
					}
					that.router.myNavBack("Master", {id: "man"});
					
			 	} 
		 },
		 title
		 );
		
	 },
	 
	 onPress: function(evt){
			var context = evt.getSource().getBindingContext().getPath();
//			this.nav.to("NewLeave", context);
//			this.router.navTo("NewLeave", {id: 1});
			this.router.navTo("NewLeave", {id: context.charAt(context.length - 1)});
	 },
	 
//	handleNavButtonPress : function (evt) {
//			this.nav.back("Master");
//	},

	
	


});