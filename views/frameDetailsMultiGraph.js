sap.ui.jsview("views.frameDetailsMultiGraph", {
    /** Specifies the Controller belonging to this View.
     * In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
     * @memberOf views.customerMultiGraph
     */
    getControllerName: function() {
        return null;
    },
    /** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed.
     * Since the Controller is given to this method, its event handlers can be attached right away.
     * @memberOf views.customerMultiGraph
     */
    createContent: function(oController) {
        var oData = {
            data: [{
                Region: "North",
                ProductID: "00112",
                Revenue: 400,
                Sales: 33
            }, {
                Region: "North",
                ProductID: "00223",
                Revenue: 300,
                Sales: 35
            }, {
                Region: "North",
                ProductID: "00124",
                Revenue: 213,
                Sales: 23
            }, {
                Region: "North",
                ProductID: "00225",
                Revenue: 500,
                Sales: 33
            }, {
                Region: "East",
                ProductID: "00113",
                Revenue: 600,
                Sales: 67
            }, {
                Region: "East",
                ProductID: "00452",
                Revenue: 700,
                Sales: 90
            }]
        };

        var oModel = new sap.ui.model.json.JSONModel(oData);
        //oModel.loadData("services/frameDetailsService.xsjs");

        // A Dataset defines how the model data is mapped to the chart
        var oDataset = new sap.viz.ui5.data.FlattenedDataset({
            // a Bar Chart requires exactly one dimension (x-axis)
            dimensions: [{
                axis: 1, // must be one for the x-axis, 2 for y-axis
                name: 'Server_Model',
                value: "{Server_Model}"
            }],
            // it can show multiple measures, each results in a new set of bars in a new color
            measures: [
                // measure 1
                {
                    name: 'Non_Prod_Part_CPUs', // 'name' is used as label in the Legend
                    value: '{Non_Prod_Part_CPUs}' // 'value' defines the binding for the displayed value 
                }, {
                    name: 'Non_Prod_Unpart_CPUs', // 'name' is used as label in the Legend
                    value: '{Non_Prod_Unpart_CPUs}' // 'value' defines the binding for the displayed value 
                }, {
                    name: 'Prod_Part_CPUs', // 'name' is used as label in the Legend
                    value: '{Prod_Part_CPUs}' // 'value' defines the binding for the displayed value 
                }
            ],
            // 'data' is used to bind the whole data collection that is to be displayed in the chart
            data: {
                path: "/"
            }
        });

        // create a VizContainer
        var oVizContainer = new sap.viz.ui5.VizContainer({
            'uiConfig': {
                'layout': 'vertical',
                'enableMorphing': true
            },
            'width': '100%',
            'height': '100%'
        });

        // attach the model to the chart and display it
        oVizContainer.setVizData(oDataset);
        oVizContainer.setModel(oModel);

        // set feeds
        var aobjServer_Model = new sap.viz.ui5.controls.common.feeds.AnalysisObject({
                uid: "Server_Model_id",
                name: "Server_Model",
                type: "Dimension"
            }),
            aobjANon_Prod_Part_CPUs = new sap.viz.ui5.controls.common.feeds.AnalysisObject({
                uid: "Non_Prod_Part_CPUs_id",
                name: "Non_Prod_Part_CPUs",
                type: "Measure"
            });
        var feedPrimaryValues = new sap.viz.ui5.controls.common.feeds.FeedItem({
                uid: "primaryValues",
                type: "Measure",
                values: [aobjANon_Prod_Part_CPUs]
            }),
            feedAxisLabels = new sap.viz.ui5.controls.common.feeds.FeedItem({
                uid: "axisLabels",
                type: "Dimension",
                values: [aobjServer_Model]
            });

        oVizContainer.addFeed(feedPrimaryValues);
        oVizContainer.addFeed(feedAxisLabels);

        oVizContainer.addAnalysisObjectsForPicker(aobjServer_Model);
        oVizContainer.addAnalysisObjectsForPicker(aobjANon_Prod_Part_CPUs);
        oVizContainer.addAnalysisObjectsForPicker(new sap.viz.ui5.controls.common.feeds.AnalysisObject({
            uid: "Default_Pool_CPUs_id",
            name: "Default_Pool_CPUs",
            type: "Measure"
        }));
        oVizContainer.addAnalysisObjectsForPicker(new sap.viz.ui5.controls.common.feeds.AnalysisObject({
            uid: "Population_id",
            name: "Population",
            type: "Measure"
        }));


        // attach event listener for feedschange
        oVizContainer.attachEvent('feedsChanged', function(e) {
            // You could add your own logic to handle feedsChanged to set new dataset to vizContainer.
            // Reset current data for demo purpose.
            oVizContainer.setVizData(new sap.viz.ui5.data.FlattenedDataset({
                dimensions: [{
                    axis: 1,
                    name: 'Server_Model',
                    value: "{Server_Model}"
                }],
                measures: [{
                    name: 'Non_Prod_Part_CPUs',
                    value: '{Non_Prod_Part_CPUs}'
                }, {
                    name: 'Non_Prod_Unpart_CPUs',
                    value: '{Non_Prod_Unpart_CPUs}'
                }, {
                    name: 'Prod_Part_CPUs',
                    value: '{Prod_Part_CPUs}'
                }],
                data: {
                    path: "/"
                }
            }));
            oVizContainer.setModel(oModel);
        });

        return oVizContainer;
    }
});