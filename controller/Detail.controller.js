sap.ui.define([
        'sap/ui/demo/chartdemo/controller/BaseController',
        'sap/ui/demo/chartdemo/model/Formatter'
    ], function(Controller, Formatter) {
    "use strict";

    return Controller.extend("sap.ui.demo.chartdemo.controller.Detail", {
      //test
      onRouteMatched: function(oEvent) {
        var args = oEvent.getParameter('arguments');
        if(args.chartIndex) { // translate url parameters by type
            var parameters = args.chartIndex;
            var index = [0], temp = [];
            for(var i = 0; i < parameters.length; ++i) {
              if(parameters[i] == "&") {
                index.push(i);
              }
            }
            temp.push(parameters.substring(index[0]+10, index[1]));// chartType
            temp.push(parameters.substring(index[1]+7, index[2])); // color
            temp.push(parameters.substring(index[2]+9, index[3])); // popover
            temp.push(parameters.substring(index[3]+14));          // measure
        }

        var chartIndex = temp[0];
        var colorIndex = temp[1];
        var popoverIndex = temp[2];
        var measureIndex = temp[3];

        if (chartIndex) {
          this.switchChartByIndex(chartIndex);
        };
        if (colorIndex) {
          this.switchColorByColorIndex(colorIndex);
        };
        if (popoverIndex) {
          this.switchPopoverByIndex(popoverIndex);
        };
        if (measureIndex) {
          var parameters = measureIndex;
          var index = [], temp = [];
          for(var j = 0; j < parameters.length; ++j) {
              if(parameters[j].toLowerCase() != parameters[j]) {
                  index.push(j);
              }
          }
          for(var k = 0; k < index.length; ++k) {
              temp.push(parameters.substring(index[k], index[k+1]));
          }
    
          this.switchMeasuresByIndex(temp);
        };

      },
      switchChartByIndex: function(chartIndex) {

        if (chartIndex == "Bar") {

          this.oVizFrame.setVizType('bar');
        };
        if (chartIndex == "Line") {
          this.oVizFrame.setVizType('line');
        };
        if (chartIndex == "Column") {
          this.oVizFrame.setVizType("column")
        };
        if (chartIndex == "Stacked_Column") {
          this.oVizFrame.setVizType("stacked_column")
        };
      },
      switchColorByColorIndex: function(colorIndex) {
        if (colorIndex == "Default_Color") {
          this.oVizFrame.setVizProperties({
            plotArea: {
              colorPalette: this.colorPalette
            }
          });
        };
        if (colorIndex == "Semantic_Color") {
          this.oVizFrame.setVizProperties({
            plotArea: {
              colorPalette: ['#d32030', '#e17b24', '#61a656', '#848f94']
            }
          });
        };

      },
      switchPopoverByIndex: function(popoverIndex) {
        if (popoverIndex == "Customer_Popover") {
          var popoverProps = {};
          this.chartPopover = new sap.viz.ui5.controls.Popover(popoverProps);

          this.chartPopover.setActionItems([{
            type: 'navigation',
            text: 'Action Item 2',
            children: [{
              text: 'subActionItem 2 - 1',
              press: function() {
                console.log('Action Item 2 - 1');
              }
            }]
          }, {
            type: 'navigation',
            text: 'Action Item 3',
            children: [{
              text: 'subActionItem 3-1',
              press: function() {
                console.log('Action Item 3 - 1');
              }
            }, {
              text: 'subActionItem 3-2',
              press: function() {
                console.log('Action Item 3 - 2');
              }
            }]
          }]);
          this.oVizFrame.attachSelectData(this.fnSwitchPop, this);
        }

        if (popoverIndex == "Default") {
          var popoverProps = {};
          this.chartPopover = new sap.viz.ui5.controls.Popover(popoverProps);

          this.chartPopover.setActionItems();
          this.oVizFrame.attachSelectData(this.fnSwitchPop, this);
        }
      },
      fnSwitchPop: function() {
        this.chartPopover.connect(this.oVizFrame.getVizUid());
      },
      switchMeasuresByIndex: function(measureIndex) {
        this.oVizFrame.destroyDataset();
        this.oVizFrame.destroyFeeds();
        var feedPrimaryValues, oDataset;
        var title;
        if (measureIndex.length == 1) {
          switch (measureIndex[0]) {
            case "Non-Prod_Part_CPUs":
              feedPrimaryValues = new sap.viz.ui5.controls.common.feeds.FeedItem({
                'uid': "primaryValues",
                'type': "Measure",
                'values': ["Non-Prod_Part_CPUs"]
              });
              oDataset = new sap.viz.ui5.data.FlattenedDataset({
                dimensions: [{
                  name: 'FRAME',
                  value: "{FRAME}"
                }],
                measures: [{
                  name: 'Non-Prod_Part_CPUs',
                  value: '{Non-Prod_Part_CPUs}'
                }],
                data: {
                  path: "/book"
                }
              });
              title='Non-Prod_Part_CPUs by FRAME';
              break;
            case "Prod_Part_CPUs":
              feedPrimaryValues = new sap.viz.ui5.controls.common.feeds.FeedItem({
                'uid': "primaryValues",
                'type': "Measure",
                'values': ["Prod_Part_CPUs"]
              });
              oDataset = new sap.viz.ui5.data.FlattenedDataset({
                dimensions: [{
                  name: 'FRAME',
                  value: "{FRAME}"
                }],
                measures: [{
                  name: "Prod_Part_CPUs",
                  value: '{Prod_Part_CPUs}'
                }],
                data: {
                  path: "/book"
                }
              });
              title='Prod_Part_CPUs by FRAME';
              break;
            case "Non-Prod_Unpart_CPUs":
              feedPrimaryValues = new sap.viz.ui5.controls.common.feeds.FeedItem({
                'uid': "primaryValues",
                'type': "Measure",
                'values': ["Non-Prod_Unpart_CPUs"]
              });
              oDataset = new sap.viz.ui5.data.FlattenedDataset({
                dimensions: [{
                  name: 'FRAME',
                  value: "{FRAME}"
                }],
                measures: [{
                  name: "Non-Prod_Unpart_CPUs",
                  value: "{Non-Prod_Unpart_CPUs}"
                }],
                data: {
                  path: "/book"
                }
              });
              title='Non-Prod_Unpart_CPUs by FRAME';
              break;
          }
        };


        if (measureIndex.length == 2) {
          if ((jQuery.inArray("Non-Prod_Part_CPUs", measureIndex) + 1) && (jQuery.inArray("Prod_Part_CPUs", measureIndex) + 1)) {
            feedPrimaryValues = new sap.viz.ui5.controls.common.feeds.FeedItem({
              'uid': "primaryValues",
              'type': "Measure",
              'values': ["Non-Prod_Part_CPUs", "Prod_Part_CPUs"]
            });
            oDataset = new sap.viz.ui5.data.FlattenedDataset({
              dimensions: [{
                name: 'FRAME',
                value: "{FRAME}"
              }],
              measures: [{
                name: 'Non-Prod_Part_CPUs',
                value: '{Non-Prod_Part_CPUs}'
              }, {
                name: "Prod_Part_CPUs",
                value: '{Prod_Part_CPUs}'
              }],
              data: {
                path: "/book"
              }
            });
             title='Non-Prod_Part_CPUs and Prod_Part_CPUs by FRAME';
          };
          if ((jQuery.inArray("Non-Prod_Part_CPUs", measureIndex) + 1) && (jQuery.inArray("Non-Prod_Unpart_CPUs", measureIndex) + 1)) {
            feedPrimaryValues = new sap.viz.ui5.controls.common.feeds.FeedItem({
              'uid': "primaryValues",
              'type': "Measure",
              'values': ["Non-Prod_Part_CPUs", "Non-Prod_Unpart_CPUs"]
            });
            oDataset = new sap.viz.ui5.data.FlattenedDataset({
              dimensions: [{
                name: 'FRAME',
                value: "{FRAME}"
              }],
              measures: [{
                  name: 'Non-Prod_Part_CPUs',
                  value: '{Non-Prod_Part_CPUs}'
                },

                {
                  name: "Non-Prod_Unpart_CPUs",
                  value: "{Non-Prod_Unpart_CPUs}"
                }
              ],
              data: {
                path: "/book"
              }
            });
           title='Non-Prod_Part_CPUs and Non-Prod_Unpart_CPUs by FRAME';
          };
          if ((jQuery.inArray("Prod_Part_CPUs", measureIndex) + 1) && (jQuery.inArray("Non-Prod_Unpart_CPUs", measureIndex) + 1)) {
            feedPrimaryValues = new sap.viz.ui5.controls.common.feeds.FeedItem({
              'uid': "primaryValues",
              'type': "Measure",
              'values': ["Prod_Part_CPUs", "Non-Prod_Unpart_CPUs"]
            });
            oDataset = new sap.viz.ui5.data.FlattenedDataset({
              dimensions: [{
                name: 'FRAME',
                value: "{FRAME}"
              }],
              measures: [{
                name: "Non-Prod_Unpart_CPUs",
                value: "{Non-Prod_Unpart_CPUs}"
              }, {
                name: "Prod_Part_CPUs",
                value: '{Prod_Part_CPUs}'
              }],
              data: {
                path: "/book"
              }
            });
            title='Non-Prod_Unpart_CPUs and Prod_Part_CPUs by FRAME';
          };
        };

        if (measureIndex.length == 3) {
          feedPrimaryValues = new sap.viz.ui5.controls.common.feeds.FeedItem({
            'uid': "primaryValues",
            'type': "Measure",
            'values': ["Non-Prod_Part_CPUs", "Non-Prod_Unpart", 'Prod_Part_CPUs']
          });
          oDataset = new sap.viz.ui5.data.FlattenedDataset({
            dimensions: [{
              name: 'FRAME',
              value: "{FRAME}"
            }],
            measures: [{
                name: 'Non-Prod_Part_CPUs',
                value: '{Non-Prod_Part_CPUs}'
              },

              {
                name: "Non-Prod_Unpart",
                value: "{Non-Prod_Unpart}"
              }, {
                name: "Prod_Part_CPUs",
                value: '{Prod_Part_CPUs}'
              }
            ],
            data: {
              path: "/book"
            }
          });
          title='Non-Prod_Part_CPUs and Non-Prod_Unpart and Prod_Part_CPUs by FRAME';
        };
        var feedAxisLabels = new sap.viz.ui5.controls.common.feeds.FeedItem({
          'uid': "axisLabels",
          'type': "Dimension",
          'values': ["FRAME"]
        });
         this.oVizFrame.setVizProperties({
                 title:{
                  visible:true,
                   text:title
                       }
                   });
        this.oVizFrame.setDataset(oDataset);
        this.oVizFrame.addFeed(feedPrimaryValues);
        this.oVizFrame.addFeed(feedAxisLabels);
      },
      navButtonPress: function() {
        // This is only relevant when running on phone devices
        this.getRouter().myNavBack("main");
      },
  

      onInit: function() {
        //way 1: use the route
        this.getRouter().attachRoutePatternMatched(this.onRouteMatched, this);
        this.colorPalette = ["#5cbae6", "#b6d957", "#fac364"];
        var chartContainer = this.getView().byId("idChartContainer");
        chartContainer.detachContentChange();
        var amModel = new sap.ui.model.json.JSONModel("ByItemCity_sum.json");
        var oDataset = new sap.viz.ui5.data.FlattenedDataset({
          dimensions: [{
            name: 'FRAME',
            value: "{FRAME}"
          }],
          measures: [{
              name: 'Non-Prod_Part_CPUs',
              value: '{Non-Prod_Part_CPUs}'
            },
            {
              name: "Non-Prod_Unpart_CPUs",
              value: "{Non-Prod_Unpart_CPUs}"
            }, {
              name: "Prod_Part_CPUs",
              value: '{Prod_Part_CPUs}'
            }
          ],
          data: {
            path: "/book"
          }
        });
        var feedPrimaryValues = new sap.viz.ui5.controls.common.feeds.FeedItem({
            'uid': "primaryValues",
            'type': "Measure",
            'values': ["Non-Prod_Part_CPUs", "Non-Prod_Unpart_CPUs", "Prod_Part_CPUs"]
          }),
          feedAxisLabels = new sap.viz.ui5.controls.common.feeds.FeedItem({
            'uid': "axisLabels",
            'type': "Dimension",
            'values': ["FRAME"]
          });

        // -------- VizFrame ----------------
        this.chartPopover = this.getView().byId("idPopOver");
        this.oVizFrame = this.getView().byId("idoVizFrame");
        this.oVizFrame.setDataset(oDataset);
        this.oVizFrame.setModel(amModel);
        this.oVizFrame.addFeed(feedPrimaryValues);
        this.oVizFrame.addFeed(feedAxisLabels);
        this.oVizFrame.setVizType('bar');
        this.oVizFrame.setVizProperties({
          plotArea: {
            dataLabel: {
              visible: true
            },
            colorPalette: this.colorPalette
          },
          legend: {
            title: {
              visible: false
            }
          },
          title: {
            visible: true,
            text: 'Non-Prod_Part_CPUs and Non-Prod_Unpart_CPUs and Prod_Part_CPUs by FRAME'
          }
        });
   
        var popoverProps = {};
        this.chartPopover = new sap.viz.ui5.controls.Popover(popoverProps);

        this.chartPopover.setActionItems();
        this.chartPopover.connect(this.oVizFrame.getVizUid());

      },
      attachContentChange: function(evt) {
        var itemId = evt.getParameter("selectedItemId");
        sap.m.MessageToast.show("ContentChange event was fired. Selected Item was changed to:" + itemId);
      }
    });

}, /* bExport= */ true);
