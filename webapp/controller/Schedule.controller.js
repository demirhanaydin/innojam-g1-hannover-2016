// sap.ui.define(['jquery.sap.global', 'sap/ui/core/mvc/Controller'],
// 	function(jQuery, Controller) {
// 	"use strict";

// 	var PageController = Controller.extend("jam.controller.Schedule", {
// 		getRouter : function () {
// 			return sap.ui.core.UIComponent.getRouterFor(this);
// 		},
// 		onNavToHome : function (oEvent){
// 			this.getRouter().navTo("/");
// 		}
// 	});

// 	return PageController;
// });

sap.ui.define([
        'sap/ui/core/mvc/Controller',
        'sap/ui/model/json/JSONModel',
        'sap/viz/ui5/controls/common/feeds/FeedItem',
        'sap/viz/ui5/data/FlattenedDataset',
        'sap/viz/ui5/format/ChartFormatter',
        './ControllerOverall'
    ], function(Controller, JSONModel, FeedItem, FlattenedDataset, ChartFormatter, ControllerOverall) {
    "use strict";
 
    var WaterfallController = Controller.extend("jam.controller.Schedule", {
		getRouter : function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
		onNavToHome : function (oEvent){
			this.getRouter().navTo("/");
		},
        onInit: function(oEvent) {
            var oVizFrame = this.getView().byId("idVizFrameWaterfall");
            var oFixFlex = this.getView().byId("idFixFlex");
            ControllerOverall.customFormat(); // set customized format
            ControllerOverall.loadLibrary(oVizFrame, oFixFlex); // load "sap.suite.ui.commons"
 
            // var dataPath = "test-resources/sap/viz/demokit/dataset/milk_production_testing_data/revenue_cost_consume";
            var dataPath = "mockdata";
            oVizFrame.setVizType('horizontal_waterfall');
            oVizFrame.setUiConfig({
                "applicationSet": "fiori"
            });
            // Use UI5 formatter
            var FIORI_LABEL_SHORTFORMAT_10 = "__UI5__ShortIntegerMaxFraction10";
            var FIORI_LABEL_FORMAT_2 = "__UI5__FloatMaxFraction2";
            var FIORI_LABEL_SHORTFORMAT_2 = "__UI5__ShortIntegerMaxFraction2";
            var chartFormatter = ChartFormatter.getInstance();
            chartFormatter.registerCustomFormatter(FIORI_LABEL_SHORTFORMAT_10, function(value) {
                var fixedInteger = sap.ui.core.format.NumberFormat.getIntegerInstance({style: "short",
                    maxFractionDigits: 10});
                return fixedInteger.format(value);
            });
            chartFormatter.registerCustomFormatter(FIORI_LABEL_FORMAT_2, function(value) {
                var fixedFloat = sap.ui.core.format.NumberFormat.getFloatInstance({style: 'Standard',
                    maxFractionDigits: 2});
                return fixedFloat.format(value);
            });
            chartFormatter.registerCustomFormatter(FIORI_LABEL_SHORTFORMAT_2, function(value) {
                var fixedInteger = sap.ui.core.format.NumberFormat.getIntegerInstance({style: "short",
                    maxFractionDigits: 2});
                return fixedInteger.format(value);
            });
            sap.viz.api.env.Format.numericFormatter(chartFormatter);
            
            var oPopOver = this.getView().byId("idPopOver");
            oPopOver.connect(oVizFrame.getVizUid());
            oPopOver.setFormatString(FIORI_LABEL_FORMAT_2);
 
            var oModel = new JSONModel(dataPath + "/waterfallMedium.json");
            var oModelS = new JSONModel(dataPath + "/waterfallSmall.json");            
            var oDataset = new FlattenedDataset({
                dimensions: [{
                    name: 'Type',
                    value: '{Type}'
                },{
                    name: "CategoryAxis",
                    value: "{CategoryAxis}"
                }],
                measures: [{
                    name: 'Amount',
                    value: '{Workload}'
                }],
                data: {
                    path: "/milk"
                }
            });
            oVizFrame.setDataset(oDataset);
            oVizFrame.setModel(oModel);
 
            var feedValueAxis = new FeedItem({
                    'uid': "valueAxis",
                    'type': "Measure",
                    'values': ["Amount"]
                }),
                feedCategoryAxis = new FeedItem({
                    'uid': "categoryAxis",
                    'type': "Dimension",
                    'values': ["CategoryAxis"]
                }),
                waterfallType = new FeedItem({
                    'uid': "waterfallType",
                    'type': "Dimension",
                    'values': ["Type"]
                });
            oVizFrame.addFeed(feedValueAxis);
            oVizFrame.addFeed(feedCategoryAxis);
            oVizFrame.addFeed(waterfallType);
 
            oVizFrame.setVizProperties({
                general: {
                    layout: {
                        padding: 0.04
                    }
                },
                valueAxis: {
                    label: {
                        formatString:FIORI_LABEL_SHORTFORMAT_10
                    },
                    title: {
                        visible: false
                    }
                },
                categoryAxis: {
                    title: {
                        visible: false
                    }
                },
                plotArea: {
                    dataLabel: {
                        formatString:FIORI_LABEL_SHORTFORMAT_2,
                        visible: true,                       
                        style: {
                            color: null
                        }
                    }
                },
                legend: {
                    title: {
                        visible: false
                    },
                    label: {
                        text: {
                            negativeValue: "Cost",
                            positiveValue: "Workload"
                        }
                    }
                },
                title: {
                    visible: false
                }
            });
 
            var oPanel1 = this.getView().byId("PN-1");
            var oContainer = this.getView().byId("idContainer");
            var oRadio1 = this.getView().byId("RB1-1");
            var oRadio2 = this.getView().byId("RB1-2");
            var oSwitch1 = this.getView().byId("SW-1");
            var oSwitch2 = this.getView().byId("SW-2");
            var oBox1 = this.getView().byId("BX-1");
            var oBox2 = this.getView().byId("BX-2");
            var oBox3 = this.getView().byId("BX-3");
            var oHBox = this.getView().byId("HB-1");
 
            ControllerOverall.adjustStyle(oRadio1,oRadio2,null,null,null,
                null,null,null,null,null,oBox1,oBox2,oBox3,null,null,oHBox); // adjust style class to RTL mode
            ControllerOverall.setExpanding(oPanel1); // set automatic expanding of setting panel
 
            // buttons control
            oRadio1.attachSelect(function(oEvent) {
                if(oEvent.getParameters().selected) {
                    oVizFrame.setModel(oModelS);
                }                
            });
            oRadio2.attachSelect(function(oEvent) {
                if(oEvent.getParameters().selected) {
                    oVizFrame.setModel(oModel);
                }                
            });
            oSwitch1.attachChange(function() {
                if(this.getState()) {
                    oVizFrame.setVizProperties({
                        plotArea: {
                            dataLabel: {
                                visible: true
                            }
                        }
                    });
                }
                if(!this.getState()) {
                    oVizFrame.setVizProperties({
                        plotArea: {
                            dataLabel: {
                                visible: false
                            }
                        }
                    });
                }
            });            
        }
    });
    return WaterfallController;
 
});