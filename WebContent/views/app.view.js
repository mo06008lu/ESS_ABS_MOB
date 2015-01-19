sap.ui.jsview("myess.views.app", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf ess_abs_mob.app
	*/ 
	getControllerName : function() {
		return "myess.views.app";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf ess_abs_mob.app
	*/ 
	createContent : function(oController) {
			      	// to avoid scroll bars on desktop the root view must be set to block display
					this.setDisplayBlock(true);
					 this.app = new sap.m.SplitApp("splitApp", {
							//The master area needs to be closed when navigation in detail area is done.
							afterDetailNavigate: function(){
								this.hideMaster();
							}});
 
					// create app
//					 this.app = new sap.m.App();
					// load login screen 
//					 var login = sap.ui.xmlview("Login", "sap.ui.flights3.view.Login");
//					 login.getController().nav = this.getController();
//					 this.app.addPage(login, true);
					 
					 // load the master page
//					var master = sap.ui.xmlview("Master", "myess.views.Master");
//					master.getController().nav = this.getController();
//					this.app.addPage(master, true);
//					
//					
//					// load the empty page 
//					 var empty = sap.ui.xmlview("Empty", "myess.views.Empty"); 
//					 this.app.addPage(empty, false); 
					 
					 return this.app;
	}

});