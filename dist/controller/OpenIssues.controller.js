sap.ui.define([
		'jquery.sap.global',
		'sap/ui/core/mvc/Controller',
		'sap/ui/model/json/JSONModel'
	], function(jQuery, Controller, JSONModel) {
	"use strict";
 
	var OpenIssuesController = Controller.extend("jam.controller.OpenIssues", {
 
		onInit: function () {
			// set explored app's demo model on this sample
			var oModel = new JSONModel(jQuery.sap.getModulePath("sap.ui.demo.mock", "/issues.json"));
			this.getView().setModel(oModel);
		},
		getRouter : function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
		onNavToHome : function (oEvent){
			this.getRouter().navTo("/");
		}
	});
	return OpenIssuesController;
});