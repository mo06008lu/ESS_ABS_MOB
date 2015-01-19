sap.ui.controller("myess.views.NewLeave", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf ess_abs_mob.Empty
*/
	
	initializeNewLeaveData : function(leave, id) {
	
		if(leave){
			this.getView().getModel("newLeave").setData({
				Detail: { 	start: 		new Date(leave.start),
							end:   		new Date(leave.end),	
							type:  		leave.type,
					  		type_text:	leave.type_text,
					  		number:		leave.number,	
					  		createdby:	leave.createdby,
					  		approver:   leave.approver,
					  		annual:   	leave.annual == "X",
					  		paid:   	leave.paid == "X",
					  		id:     	id
					}
		});
		}else{
			this.getView().getModel("newLeave").setData({
				Detail: {}});
		}
	},

	onCalSwitch: function(){
		var oCalendar = this.getView().byId('calendar_new');
		var end = this.getView().byId('end');
		var endLbl = this.getView().byId('end_lbl');
		
		var startLbl = this.getView().byId('start');
		var start = this.getView().byId('start_lbl');
		
		var swCal = this.getView().byId("swCal").getState();
		oCalendar.setVisible(swCal);
		start.setVisible(!swCal);
		startLbl.setVisible(!swCal);
		end.setVisible(!swCal);
		endLbl.setVisible(!swCal);
		
	},	
	
	_handleRouteMatched : function (evt) {
		this.getView().setModel(new sap.ui.model.json.JSONModel(), "newLeave");
		
		var param = evt.getParameter("arguments").id;
		if (param){
			var leave = sap.ui.getCore().getModel().getObject("/data/abscences/" + param);
			this.initializeNewLeaveData(leave, param);
		}else{
		
		}
		
	},

	handleNavButtonPress : function () {
		if(this.getView().getModel("device").getData().isNoPhone){
			this.router.myNavBack("Empty");
		}else{
			this.router.myNavBack("Master");;
		}
//		this.router.navTo("mail", {viewId: sViewId});
	},
	
	onInit: function() {
		this.router = sap.ui.core.UIComponent.getRouterFor(this);
		this.router.attachRoutePatternMatched(this._handleRouteMatched, this);
		
		var oCalendar = this.getView().byId('calendar_new');
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
	
	onSave: function(evt){
		
		var swCal = this.getView().byId("swCal").getState();
		
		if (swCal){
			var oCalendar = this.getView().byId('calendar_new');
			var aSelected = oCalendar.getSelectedDates();
		}
		var mNewLeave = this.getView().getModel("newLeave").getData().Detail;
		var data = sap.ui.getCore().getModel().getData();
		var dates = data.data.abscences;
		var new_abs = {
				start: 		mNewLeave.start,
				end:   		mNewLeave.end,
				type:  		mNewLeave.type,
				type_text:	mNewLeave.type_text,
				number:		mNewLeave.number,	
				createdby:	mNewLeave.createdby,
				approver:   mNewLeave.approver,
				annual:   	mNewLeave.annual,
				paid:   	mNewLeave.paid,
				status:     "0"
		};
		
		if (mNewLeave.id){
			data.data.abscences[mNewLeave.id] = new_abs;
		}else{
			dates.push(new_abs);
		}
//		data.abscences = dates;
		sap.ui.getCore().getModel().setData(data)
		var bundle = this.getView().getModel("res").getResourceBundle(); 
	    var successMsg = bundle.getText("SaveSuccessMsg"); 
	    sap.m.MessageToast.show(successMsg + " " + mNewLeave.type_text); 
	}
	
	
//	handleNavButtonPress : function (evt) {
//		if(this.getView().getModel("device").getData().isNoPhone){
//			this.nav.back("Empty");
//		}else{
//			this.nav.back("Master");
//		}
//	}

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf ess_abs_mob.Empty
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf ess_abs_mob.Empty
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf ess_abs_mob.Empty
*/
//	onExit: function() {
//
//	}
	
	

});