sap.ui.controller("myController", {
  onInit: function() {

    this.oPage = this.byId("p");
    var oVizFrame = new sap.viz.ui5.controls.VizFrame({
      'width': '100%',
      'height': '600px',
      'vizType': 'column'
    });

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

    var oJsonModel = new sap.ui.model.json.JSONModel(oData);
    // some dummy data:

    // set complete model 

    // now make dual chart on /data for Sales and Revenue:
    var dataset = new sap.viz.ui5.data.FlattenedDataset({
      dimensions: [{
        name: 'Region',
        value: "{ProductID}",
        displayValue: "{Region}"
      }],
      measures: [{
          name: 'Sales',
          value: '{Sales}'
        },
        {
          name: 'Revenue',
          value: '{Revenue}'
        }
      ],
      data: {
        path: "/data"
      }
    });
    oVizFrame.setDataset(dataset);
    oVizFrame.setModel(oJsonModel);
    var feedPrimaryValues = new sap.viz.ui5.controls.common.feeds.FeedItem({
        'uid': "valueAxis",
        'type': "Measure",
        'values': ["Sales", "Revenue"]
      }),
      feedAxisLabels = new sap.viz.ui5.controls.common.feeds.FeedItem({
        'uid': "categoryAxis",
        'type': "Dimension",
        'values': ["Region"]
      });

    oVizFrame.addFeed(feedPrimaryValues);
    oVizFrame.addFeed(feedAxisLabels);

    this.oPage.addContent(oVizFrame);

  },
  doSomething: function() {
    alert("Hello World!");
  }
});
sap.ui.view({
  viewContent: jQuery('#myXml').html(),
  type: sap.ui.core.mvc.ViewType.XML
}).placeAt("content")
