sap.ui.controller("myess.views.EmployeeSelect", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf views.EmployeeSelect
*/
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf views.EmployeeSelect
*/
//	onBeforeRendering: function() {
//
//	},
	onInit : function () {
		this.router = sap.ui.core.UIComponent.getRouterFor(this);
	},
	

	handleManager : function (evt) {
		this.getView().getModel("empType").getData().isManager = true;
		this.getView().getModel("empType").getData().noManager = false;
		this.getView().getModel("empType").refresh(true); 
		this.router.navTo("Master", {id: "man"});
	},
	
	handleEmployee : function (evt) {
		this.getView().getModel("empType").getData().isManager = false;
		this.getView().getModel("empType").getData().noManager = true;
		this.getView().getModel("empType").refresh(true); 
		this.router.navTo("Master", {id: "emp"});
	}
/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf views.EmployeeSelect
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf views.EmployeeSelect
*/
//	onExit: function() {
//
//	}

});