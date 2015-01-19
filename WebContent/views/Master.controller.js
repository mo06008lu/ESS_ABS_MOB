jQuery.sap.require("myess.util.Formatter"); //ess_abs_mob
jQuery.sap.require("sap.m.MessageBox"); 
jQuery.sap.require("sap.m.MessageToast"); 
jQuery.sap.require("myess.util.Grouper"); 

sap.ui.controller("myess.views.Master", {
	

	_handleRouteMatched : function (evt) {
		
		if(sap.ui.getCore().getModel()){
			sap.ui.getCore().getModel().refresh();
		}else{
			var param = evt.getParameter("arguments").id;
			var app = this.getView("splitApp");
			
			if(param == "man"){
				var oModel = new sap.ui.model.json.JSONModel("model/mock2.json");
				sap.ui.getCore().setModel(oModel);
				app.setModel(oModel);
			}else if(param == "emp"){
				var oModel = new sap.ui.model.json.JSONModel("model/mock.json");
				sap.ui.getCore().setModel(oModel);
				app.setModel(oModel);
			}
		}	
		
	},

	onInit: function() {
		this.router = sap.ui.core.UIComponent.getRouterFor(this);
		this.router.attachRoutePatternMatched(this._handleRouteMatched, this);
//		var oModel = new sap.ui.model.json.JSONModel("model/mock.json");
//		sap.ui.getCore().setModel(oModel);
//		app.setModel(oModel);
		var view = this.getView();
//		var oList = view.byId("list");
//		oList.setModel(sap.ui.getCore().getModel());
		var dispBtn = view.byId("display");
		dispBtn.setVisible(false);
//		 var oHeaderSelect = this.getView().byId("select");
//		 var fnOnPress = function (oEvt) {
//		      sap.m.MessageToast.show("Executed " + oEvt.getSource().getText());
//		      oHeaderSelect.close();
//		    };
//		    oHeaderSelect.addButton(
//		      new sap.m.Button({
//		        text: "Action 1",
//		        press: fnOnPress
//		      })
//		    );
//		    oHeaderSelect.addButton(
//		      new sap.m.Button({
//		        text: "Action 2",
//		        press: fnOnPress
//		      })
//		  );		  
//		oList.bindItems(oModel, oItemTemplateItem, null, null);
	},
	
	handleListItemPress: function (evt){
		 var context = evt.getSource().getBindingContext().getPath();
		 this.router.navTo("Detail", {id: context.charAt(context.length - 1)});
	}, 
	 
	 handleSearch : function (oEvt) { 
		 // add filter for search
		 var aFilters = [];
		 var sQuery = oEvt.getSource().getValue();
		 if (sQuery && sQuery.length > 0) {
		 var filter = new sap.ui.model.Filter("type_text", sap.ui.model.FilterOperator.Contains, sQuery);
		      aFilters.push(filter);
		 }

		    // update list binding
		    var list = this.getView().byId("list");
		    var binding = list.getBinding("items");
		    binding.filter(aFilters);
	 }, 
	 
	 handleListSelect : function (evt) { 
		 var context = evt.getParameter("listItem").getBindingContext().getPath(); 
		this.router.navTo("Detail", {id: context.charAt(context.length - 1)});
	 }, 
	 
	 onListItemPress: function (evt) {
		 var context = evt.getSource().getBindingContext().getPath();
		 this.router.navTo("Detail", {id: context.charAt(context.length - 1)});
     },
	 
     
     handleDelete: function(evt) {
    	    evt.getSource().removeItem(evt.getParameter("listItem"));
    	    var bundle = this.getView().getModel("res").getResourceBundle(); 
    	    var successMsg = bundle.getText("DeleteSuccessMsg"); 
    	    sap.m.MessageToast.show(successMsg); 
     },
     
     handleDeleteTap: function(evt) {
    	 var oList = evt.getSource().getParent();
    	 oList.removeAggregation("items", oList.getSwipedItem());
    	 oList.swipeOut();
 	    var bundle = this.getView().getModel("res").getResourceBundle(); 
	    var successMsg = bundle.getText("DeleteSuccessMsg"); 
	    sap.m.MessageToast.show(successMsg); 
     },
  
     handleAccept: function(evt) {
    	 var oList = evt.getSource().getParent();
//    	 oList.removeAggregation("items", oList.getSwipedItem());
    	 oList.swipeOut();
     },
     
	 onDelete : function (evt) {
	
		var view = this.getView();
		 var oList = view.byId("list");
		 if (oList.getMode() != sap.m.ListMode.Delete ){
			oList.setMode(sap.m.ListMode.Delete);
		 	var btn = view.byId("edit");
		 	btn.setVisible(false);
		 	btn = view.byId("add");
		 	btn.setVisible(false);
		 	btn =  view.byId("display");
		 	btn.setVisible(true);
		 	
		 
		 }else{
			 oList.setMode(sap.m.ListMode.None);
			 	var btn = view.byId("edit");
			 	btn.setVisible(true);
			 	btn = view.byId("add");
			 	btn.setVisible(true);
			 	btn =  view.byId("display");
			 	btn.setVisible(false);
		 }
	 },
	 
	 handleReject: function (evt) {
		    var oList = evt.getSource().getParent();
		    oList.removeAggregation("items", oList.getSwipedItem());
		    oList.swipeOut();
	 },
	 
	 handleRefresh: function (oEvent) {
		    
//		      setTimeout(jQuery.proxy(function () {
//		      this.getView().byId("pullToRefresh").hide();
//		      // Deal with any actual search query
//		      var oList = this.getView().byId("list");
////		      oList.setModel(oModel);
//		      var oSearchField = this.getView().byId("searchField");
//		      var sQuery = oSearchField.getValue();
//		      var aFilters = [];
//		      if (sQuery && sQuery.length) {
//		        aFilters.push(new sap.ui.model.Filter("Name", sap.ui.model.FilterOperator.Contains, sQuery));
//		      }
//		      oList.getBinding("items").filter(aFilters);
//		    }, this), 1000);
	 },
	 
	 onCreateLeave: function(evt){
//		var context = evt.getSource().getBindingContext();
//		this.nav.to("NewLeave", {});
		this.router.navTo("NewLeave", {});
	 },
	 
	 handleGroup : function (evt) { 
	 // compute sorters 
		 var sorters = []; 
		 var item = evt.getParameter("selectedItem"); 
		 var key = (item) ? item.getKey() : null; 
		 if ("type" === key || "status" === key) { 
			 	myess.util.Grouper.bundle = 
			 	this.getView().getModel("res").getResourceBundle(); 
			 	var grouper = myess.util.Grouper[key]; 
			 	sorters.push(new sap.ui.model.Sorter(key, true, grouper)); 
		 } 
	 
	 // update binding 
		 var list = this.getView().byId("list"); 
		 var oBinding = list.getBinding("items"); 
		 oBinding.sort(sorters); 
	 },
	 
	 handleExport: function(){
 	    var bundle = this.getView().getModel("res").getResourceBundle(); 
	    var successMsg = bundle.getText("ExportSuccessMsg"); 
	    sap.m.MessageToast.show( this.getView().byId("list").getItems().length + " " +successMsg); 
	 },
	 
	 handleNavButtonPress: function () {
			if(this.getView().getModel("device").getData().isNoPhone){
				this.router.myNavBack("Empty", {});
			}
			this.router.myNavBack("EmployeeSelect", {});
//			this.router.navTo("mail", {viewId: sViewId});
	}

});