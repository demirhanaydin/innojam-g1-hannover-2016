sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"jam/model/models"
], function(UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("jam.Component", {

		metadata: {
			manifest: "json",
			// dependencies: {
			// 	libs: [
			// 		"sap.m",
			// 		"sap.suite.ui.microchart"
			// 	]
			// }
		config : {
			sample : { 
				files : [
				         "webapp/controller/ChartContainerData1.json"
				        ] 
			}
		}
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
			// create the views based on the url/hash
            this.getRouter().initialize();
		}
	});

});