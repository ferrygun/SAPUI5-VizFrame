sap.ui.define([
    "sap/ui/core/mvc/Controller"

], function(Controller) {
    "use strict";
    return Controller.extend("VizFrame.controller.VizChart", {


        onInit: function() {
            //                1.Get the id of the VizFrame
            var oVizFrame = this.getView().byId("idcolumn");

            //                2.Create a JSON Model and set the data
			var oData = {
				data: [{
					"Active_Memory": "7618560",
					"DATA_CENTER": "DRM",
					"Default_Pool_CPUs": "92",
					"FRAME": "DRMH complex",
					"Frame_SN": "21BE3E7",
					"HW_MODEL": "E880DRM",
					"Installed_CPUs": "192",
					"Installed_RAM": "16777216",
					"Non-Prod_Part_CPUs": "5",
					"Non-Prod_Unpart_CPUs": "12",
					"Prod_Part_CPUs": "10",
					"Prod_Unpart_CPUs": "10",
					"Server_Model": "IBM 9119-MHE"
				  },
				  {
					"Active_Memory": "11407360",
					"DATA_CENTER": "SOM",
					"Default_Pool_CPUs": "129",
					"FRAME": "SOMH complex",
					"Frame_SN": "21BE3B7",
					"HW_MODEL": "E880SOM",
					"Installed_CPUs": "192",
					"Installed_RAM": "16777216",
					"Non-Prod_Part_CPUs": "9",
					"Non-Prod_Unpart_CPUs": "6",
					"Prod_Part_CPUs": "7",
					"Prod_Unpart_CPUs": "27",
					"Server_Model": "IBM 9119-MHE"
				  },
				  {
					"Active_Memory": "12738560",
					"DATA_CENTER": "DRM",
					"Default_Pool_CPUs": "192",
					"FRAME": "DRMF complex",
					"Frame_SN": "21BE3D7",
					"HW_MODEL": "E880DRM",
					"Installed_CPUs": "192",
					"Installed_RAM": "16777216",
					"Non-Prod_Part_CPUs": "10",
					"Non-Prod_Unpart_CPUs": "12",
					"Prod_Part_CPUs": "10",
					"Prod_Unpart_CPUs": "12",
					"Server_Model": "IBM 9119-MHE"
				  },
				  {
					"Active_Memory": "13250560",
					"DATA_CENTER": "SOM",
					"Default_Pool_CPUs": "192",
					"FRAME": "SOMF complex",
					"Frame_SN": "21BE3C7",
					"HW_MODEL": "E880SOM",
					"Installed_CPUs": "192",
					"Installed_RAM": "16777216",
					"Non-Prod_Part_CPUs": "8",
					"Non-Prod_Unpart_CPUs": "14",
					"Prod_Part_CPUs": "19",
					"Prod_Unpart_CPUs": "15",
					"Server_Model": "IBM 9119-MHE"
				  },
				  {
					"Active_Memory": "13713408",
					"DATA_CENTER": "SOM",
					"Default_Pool_CPUs": "156",
					"FRAME": "SOMG complex",
					"Frame_SN": "21BE3A7",
					"HW_MODEL": "E880SOM",
					"Installed_CPUs": "192",
					"Installed_RAM": "16777216",
					"Non-Prod_Part_CPUs": "6",
					"Non-Prod_Unpart_CPUs": "6",
					"Prod_Part_CPUs": "0",
					"Prod_Unpart_CPUs": "0",
					"Server_Model": "IBM 9119-MHE"
				  },
				  {
					"Active_Memory": "15028224",
					"DATA_CENTER": "DRM",
					"Default_Pool_CPUs": "168",
					"FRAME": "DRMG complex",
					"Frame_SN": "21BE3F7",
					"HW_MODEL": "E880DRM",
					"Installed_CPUs": "192",
					"Installed_RAM": "16777216",
					"Non-Prod_Part_CPUs": "0",
					"Non-Prod_Unpart_CPUs": "0",
					"Prod_Part_CPUs": "8",
					"Prod_Unpart_CPUs": "6",
					"Server_Model": "IBM 9119-MHE"
			  }]
			};

			var oModel = new sap.ui.model.json.JSONModel(oData);
			console.log(oModel);


            //                3. Create Viz dataset to feed to the data to the graph
            var oDataset = new sap.viz.ui5.data.FlattenedDataset({
                dimensions: [{
                    name: 'FRAME',
                    value: "{FRAME}"
                }],

                measures: [{
                    name: 'Non-Prod_Part_CPUs',
                    value: '{Non-Prod_Part_CPUs}'
				},{
					name: 'Non-Prod_Unpart_CPUs',
					value: '{Non-Prod_Unpart_CPUs}'
				}],
                data: {
                    path: "/data"
                }
            });
            oVizFrame.setDataset(oDataset);
            oVizFrame.setModel(oModel);
           

            var feedPrimaryValues = new sap.viz.ui5.controls.common.feeds.FeedItem({
                    'uid': "valueAxis",
                    'type': "Measure",
                    'values': ["Non-Prod_Part_CPUs", "Non-Prod_Unpart_CPUs"]
                }),
                feedAxisLabels = new sap.viz.ui5.controls.common.feeds.FeedItem({
                    'uid': "categoryAxis",
                    'type': "Dimension",
                    'values': ["FRAME"]
                });
            oVizFrame.addFeed(feedPrimaryValues);
            oVizFrame.addFeed(feedAxisLabels);
        },
    });
});