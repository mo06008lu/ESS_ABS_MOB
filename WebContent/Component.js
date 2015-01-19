//jQuery.sap.declare("sap.ui.demo.myFiori.Component");
jQuery.sap.declare("myess.Component");

sap.ui.core.UIComponent.extend("myess.Component", {
	metadata : {
		routing : {
			config : {
				viewType : "JS",
				viewPath : "view",
				targetControl : "splitApp",
				clearTarget : false,
				transition: "slide"
			},
			routes : [
			          {
			        	  	pattern : "",
			        	  	name : "EmployeeSelect",
			        	  	viewType : "XML", 
			        	  	viewPath : "myess.views",
			        	  	view : "EmployeeSelect",
//			        	  	viewLevel : 1,
			        	  	preservePageInSplitContainer : true,
			        	  	targetAggregation : "masterPages"
			        	  	
			          },
				{
					pattern : ":id:",
					name : "Master",
					view : "Master",
					viewType : "XML", 
					viewPath : "myess.views",
//					viewLevel : 0,
					targetAggregation : "masterPages",
					subroutes : [
									{
										pattern : "detail/{id}",
										name : "Detail",
										view : "Detail",
										viewType : "XML", 
										viewPath : "myess.views",
										viewLevel : 2,
										targetAggregation : "detailPages"	
									},
									{
										pattern : "newleave/:id:",
										name : "NewLeave",
										view : "NewLeave",
										viewType : "XML", 
										viewPath : "myess.views",
										viewLevel : 2,
										targetAggregation : "detailPages"
									},
									{
										pattern : "empty",
										name : "Empty",
										view : "Empty",
										viewType : "XML", 
										viewPath : "myess.views",
										viewLevel : 2,
										targetAggregation : "detailPages"
									}
								]
					
				},
			]
		}
	},

	/**
	 * !!! The steps in here are sequence dependent !!!
	 */
	init : function () {

		// 1. some very generic requires
		jQuery.sap.require("sap.m.routing.RouteMatchedHandler");
		jQuery.sap.require("myess.MyRouter");

		// 2. call overridden init (calls createContent)
		sap.ui.core.UIComponent.prototype.init.apply(this, arguments);

		// 3a. monkey patch the router
		var router = this.getRouter();
		router.myNavBack = myess.MyRouter.myNavBack;
		router.myNavToWithoutHash = myess.MyRouter.myNavToWithoutHash;

		if (!sap.ui.Device.system.phone) {
			router.myNavToWithoutHash("myess.views.Empty", "XML", false);
		}

		// 4. initialize the router
		this.routeHandler = new sap.m.routing.RouteMatchedHandler(router);
		router.initialize();
	},

	destroy : function () {
		if (this.routeHandler) {
			this.routeHandler.destroy();
		}

		// call overridden destroy
		sap.ui.core.UIComponent.prototype.destroy.apply(this, arguments);
	},
	createContent : function() {
			
		// create root view
		var oView = sap.ui.view({
			id : "app",
			viewName : "myess.views.app",
			type : "JS",
//			type : "XML",
			viewData : { component : this }
		});

//		// Using OData model to connect against a real service
//		var url = "/proxy/http/<server>:<port>/sap/opu/odata/sap/ZGWSAMPLE_SRV/";
//		var oModel = new sap.ui.model.odata.ODataModel(url, true, "<user>", "<password>");
//		oView.setModel(oModel);

		// set res model 
		 var resModel = new sap.ui.model.resource.ResourceModel({ 
			 bundleUrl : "res/messageBundle.properties" 
		 }); 
		 oView.setModel(resModel, "res"); 

		 
		// Using a local model for offline development
//		var oModel = new sap.ui.model.json.JSONModel("model/mock.json");
//		sap.ui.getCore().setModel(oModel);
//		oView.setModel(oModel);
		
		 var empTypeModel = new sap.ui.model.json.JSONModel({
			 isManager: true,
			 noManager: false,
			 init: true
		 });
		 empTypeModel.setDefaultBindingMode("OneWay"); 
		 oView.setModel(empTypeModel, "empType");
		 
		 bundle = resModel.getResourceBundle(); 
		 
		 
		 var leaveTypes = new sap.ui.model.json.JSONModel(
		   {
			   "LeaveTypes":[{
			 type_id: 1,
			 type_text: bundle.getText("VacationType"),
		   },
		   
		    { 
				 type_id: 2,
				 type_text: bundle.getText("SicknessType"),
			} ]}
		  );
		 leaveTypes.setDefaultBindingMode("OneWay"); 
		 oView.setModel(leaveTypes, "leaveTypes");
		 
		// set device model 
		 var deviceModel = new sap.ui.model.json.JSONModel({ 
//		 isPhone : jQuery.device.is.phone, 
//		 isNoPhone : ! jQuery.device.is.phone, 
//		 listMode : (jQuery.device.is.phone) ? "None" : "SingleSelectMaster", 
//		 listItemType : (jQuery.device.is.phone) ? "Active" : "Inactive" 
		 isTouch : sap.ui.Device.support.touch,
	     isNoTouch : !sap.ui.Device.support.touch,
	     isPhone : sap.ui.Device.system.phone,
	     isNoPhone : !sap.ui.Device.system.phone,
	     listMode : sap.ui.Device.system.phone ? "None" : "SingleSelectMaster",
	     listItemType : sap.ui.Device.system.phone ? "Active" : "Inactive"
		 }); 
		 deviceModel.setDefaultBindingMode("TwoWay"); 
		 oView.setModel(deviceModel, "device"); 


		// done
		return oView;
	}
});