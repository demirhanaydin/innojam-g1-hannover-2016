sap.ui.define([
  "sap/ui/core/mvc/Controller"
], function(Controller) {
  "use strict";

  return Controller.extend("jam.controller.View1", {
    onInit: function() {
      this.initializeSalesByProduct();
      // Initially show the content for sales by product
      this.showSalesByProduct();
    },
	getRouter : function () {
		return sap.ui.core.UIComponent.getRouterFor(this);
	},
	onNavToHome : function (oEvent){
		this.getRouter().navTo("/");
	},
    /**
     * The charts or table belonging to the "sales by product" view are added
     * to the ChartContainer.
     */
    showSalesByProduct: function() {
      var oChartContainer,
        oContent1,
        oContent2;

      oChartContainer = this.getView().byId("idChartContainer");
      oContent1 = new sap.suite.ui.commons.ChartContainerContent({
        icon: "sap-icon://bubble-chart",
        title: "Bubble Chart"
      });
      oContent1.setContent(this._oVizFrameProduct);
      oContent2 = new sap.suite.ui.commons.ChartContainerContent({
        icon: "sap-icon://table-view",
        title: "Table"
      });
      oContent2.setContent(this._oTable);
      oChartContainer.removeAllContent();
      oChartContainer.addContent(oContent1);
      oChartContainer.addContent(oContent2);
      oChartContainer.updateChartContainer();
    },
    /**
     * The "sales by product" vizframes are created.
     */
    initializeSalesByProduct: function() {
      var oVizFrameProduct,
        oVizFrameProductPath,
        oVizFrameProductModel,
        oDataset,
        oFeedPrimaryValues,
        oFeedSecondaryValues,
        oFeedBubbleWidth,
        oFeedBubbleHeight,
        oFeedRegionColor,
        oFeedRegionShape,
        oTable;

      // Bubble chart vizframe
      oVizFrameProduct = new sap.viz.ui5.controls.VizFrame({
        // id: "idVizFrameProduct",
        height: "500px",
        width: "90%",
        uiConfig: { applicationSet: "fiori" }
      });
      jQuery.sap.registerModulePath('data', 'controller');
      oVizFrameProductPath = jQuery.sap.getModulePath("data", "/ChartContainerData1.json");
      oVizFrameProductModel = new sap.ui.model.json.JSONModel(oVizFrameProductPath);

      oDataset = new sap.viz.ui5.data.FlattenedDataset({
        dimensions: [{
          name: "Assigned Worker",
          value: "{Assigned Worker}"
        }, {
          name: "ID",
          value: "{ID}"
        }],
        measures: [{
          name: "Urgency",
          value: "{Urgency}"
        }, {
          name: "Importance",
          value: "{Importance}"
        }, {
          name: "Gross Profit",
          value: "{Gross Profit}"
        }, {
          name: "Sales Revenue2",
          value: "{Sales Revenue}"
        }],
        data: {
          path: "/businessData"
        }
      });
      oVizFrameProduct.setDataset(oDataset);
      oVizFrameProduct.setModel(oVizFrameProductModel);

      oFeedPrimaryValues = new sap.viz.ui5.controls.common.feeds.FeedItem({
        uid: "primaryValues",
        type: "Measure",
        values: ["Urgency"]
      });
      oFeedSecondaryValues = new sap.viz.ui5.controls.common.feeds.FeedItem({
        uid: "secondaryValues",
        type: "Measure",
        values: ["Importance"]
      });
      oFeedBubbleWidth = new sap.viz.ui5.controls.common.feeds.FeedItem({
        uid: "bubbleWidth",
        type: "Measure",
        values: ["Gross Profit"]
      });
      oFeedBubbleHeight = new sap.viz.ui5.controls.common.feeds.FeedItem({
        uid: "bubbleHeight",
        type: "Measure",
        values: ["Sales Revenue"]
      });
      oFeedRegionColor = new sap.viz.ui5.controls.common.feeds.FeedItem({
        uid: "regionColor",
        type: "Dimension",
        values: ["ID", "Assigned Worker"]
      });

      oVizFrameProduct.addFeed(oFeedPrimaryValues);
      oVizFrameProduct.addFeed(oFeedSecondaryValues);
      oVizFrameProduct.addFeed(oFeedBubbleWidth);
      oVizFrameProduct.addFeed(oFeedBubbleHeight);
      oVizFrameProduct.addFeed(oFeedRegionColor);
      oVizFrameProduct.addFeed(oFeedRegionShape);
      oVizFrameProduct.setVizType("bubble");

      // Table example
      oTable = new sap.m.Table({
        // id: "idTable"
      });
      oTable.addColumn(new sap.m.Column({
        header: new sap.m.Label({
          text: "ID"
        })
      }));
      oTable.addColumn(new sap.m.Column({
        header: new sap.m.Label({
          text: "Assigned Worker"
        })
      }));
      oTable.addColumn(new sap.m.Column({
        header: new sap.m.Label({
          text: "Urgency"
        })
      }));
      oTable.addColumn(new sap.m.Column({
        header: new sap.m.Label({
          text: "Importance"
        })
      }));
      oTable.addColumn(new sap.m.Column({
        header: new sap.m.Label({
          text: "Opened At"
        })
      }));
      oTable.addColumn(new sap.m.Column({
        header: new sap.m.Label({
          text: "Duration"
        })
      }));

      var oTableTemplate = new sap.m.ColumnListItem({
        type: sap.m.ListType.Active,
        cells: [
          new sap.m.Label({ text: "{ID}" }),
          new sap.m.Label({ text: "{Assigned Worker}" }),
          new sap.m.Label({ text: "{Urgency}" }),
          new sap.m.Label({ text: "{Importance}" }),
          new sap.m.Label({ text: "{Opened At}" }),
          new sap.m.Label({ text: "{Duration}" })
        ]
      });

      oTable.bindItems("/businessData", oTableTemplate, null, null);
      oTable.setModel(oVizFrameProductModel);

      this._oVizFrameProduct = oVizFrameProduct;
      this._oTable = oTable;
    },
    onAfterRendering: function() {
    }
  });

});