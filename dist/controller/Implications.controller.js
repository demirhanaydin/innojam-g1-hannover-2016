sap.ui.define(['jquery.sap.global','sap/ui/core/mvc/Controller','sap/ui/model/json/JSONModel', 'sap/ui/core/Fragment', 'sap/m/Dialog', 'sap/m/Button'],
	function(jQuery, Controller, JSONModel, Fragment, Dialog, Button) {
   "use strict";

   return Controller.extend("jam.controller.Implications", {
   		_oShareDialogComponentObject: null,
		getRouter : function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
		onNavToHome : function (oEvent){
			this.getRouter().navTo("/");
		},
		onInit: function(oEvent) {
			// create and set JSON Model
			this.oModel = new JSONModel(jQuery.sap.getModulePath("sap.ui.demo.mock", "/machines.json"));
			this.getView().setModel(this.oModel);
		},
 
		onExit : function() {
			// destroy the model
			this.oModel.destroy();
		},
		// handleClose: function() {
		// 	this._oDialog.close();
		// },
		handleDialog: function(oEvent) {
			var oDialog = new sap.m.Dialog({
				title: oEvent.oSource.mProperties.text,
				content: new sap.m.Image({
					src: oEvent.getSource().getTarget()
				}),
				beginButton: new sap.m.Button({
					text: 'Close',
					press: function () {
						oDialog.close();
					}
				}),
				afterClose: function() {
					oDialog.destroy();
				}
			});
			oDialog.open();
		},
 		handleViewSettingsDialogPress: function (oEvent) {
			if (! this._oDialog) {
				console.log(this);
				this._oDialog = sap.ui.xmlfragment("jam.fragments.Dialog", this);
				// Set initial and reset value for Slider in custom control
			}

			this._oDialog.setModel(this.getView().getModel());
			// toggle compact style
			jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oDialog);
			this._oDialog.open();
		},
 
		handlePress: function (evt) {
			var sSrc = evt.getSource().getTarget();
			var oDialog = new sap.m.Dialog({
				content: new sap.m.Image({
					src: sSrc
				}),
				beginButton: new sap.m.Button({
					text: 'Close',
					press: function () {
						oDialog.close();
					}
				}),
				afterClose: function() {
					oDialog.destroy();
				}
			});
			oDialog.open();
		}
   });

});