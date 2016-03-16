sap.ui.define(['jquery.sap.global', 'sap/ui/core/mvc/Controller'],
	function(jQuery, Controller) {
	"use strict";

	var PageController = Controller.extend("jam.controller.Home", {
		getRouter : function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
		goToIssues: function() {
			this.getRouter().navTo("open-issues");
		},
		goToSchedule: function() {
			this.getRouter().navTo("schedule");
		},
		gotoReports: function() {
			this.getRouter().navTo("reports");
		},
		goToImplications: function() {
			this.getRouter().navTo("implications");
		}
	});

	return PageController;
});