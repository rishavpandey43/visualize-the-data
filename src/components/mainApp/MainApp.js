import React, { Component } from "react";
import "./mainapp.css";

import Papa from "papaparse";
import Chart from "chart.js";
import Highcharts from "highcharts";
import * as d3 from "d3";
import L from "leaflet";

import myData from "../../Data.csv";

class MainApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileData: "",
      fileName: "",
      parsedData: null,
      d3ParsedData: [],
      source: false,
      destination: false,
      pointType: null,
      pointData: null,
      mapInstance: null,
      bookingMediumData: [],
      travelTypeData: [],
      displayChartDiv: false
    };
  }

  uploadAndParse = e => {
    const _this = this;
    e.preventDefault();
    // Papa.parse(this.state.fileData, {
    //   complete: function(results) {
    //     _this.setState({ parsedData: results.data });
    //   }
    // });
    d3.csv(myData).then(function(data) {
      _this.setState({ d3ParsedData: data });
    });
  };

  handleInputChange = (type, trueTarget, falseTarget, e) => {
    if (type === "file") {
      this.setState({
        fileData: e.target.files[0],
        fileName: e.target.value.split("\\")[2]
      });
    }
    if (type === "radio") {
      this.setState({
        [trueTarget]: true,
        [falseTarget]: false,
        pointType: trueTarget
      });
      this.destroyMap();
      this.createMap();
    }
  };

  generateMap = e => {
    let pointData = [];
    e.preventDefault();
    if (this.state.d3ParsedData.length > 0) {
      pointData = this.state.d3ParsedData.map((item, i) =>
        this.state.source
          ? ["Source point " + i, item.from_lat, item.from_long]
          : this.state.destination
          ? ["Destination point " + i, item.to_lat, item.to_long]
          : []
      );
    }
    if (pointData.length > 0) {
      this.state.mapInstance.setView([pointData[0][1], pointData[0][2]], 10);
      let mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
      L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; " + mapLink + " Contributors",
        maxZoom: 18
      }).addTo(this.state.mapInstance);
      for (let i = 0; i < 1000; i++) {
        if (pointData[i][1] !== "NULL" || pointData[i][2] !== "NULL") {
          new L.marker([pointData[i][1], pointData[i][2]])
            .bindPopup(pointData[i][0])
            .addTo(this.state.mapInstance);
        }
      }
    }
    this.visualizeBookingMedium();
    this.visualizeTravelType();
  };

  createMap = () => {
    this.setState({ mapInstance: L.map("mapDiv") });
  };

  destroyMap = () => {
    if (this.state.mapInstance) {
      this.state.mapInstance.remove();
    }
  };

  visualizeBookingMedium = () => {
    if (this.state.d3ParsedData.length > 0) {
      let tempData = [
        { month: "Jan", mobileBookingCount: 0, onlineBookingCount: 0 },
        { month: "Feb", mobileBookingCount: 0, onlineBookingCount: 0 },
        { month: "March", mobileBookingCount: 0, onlineBookingCount: 0 },
        { month: "April", mobileBookingCount: 0, onlineBookingCount: 0 },
        { month: "May", mobileBookingCount: 0, onlineBookingCount: 0 },
        { month: "June", mobileBookingCount: 0, onlineBookingCount: 0 },
        { month: "July", mobileBookingCount: 0, onlineBookingCount: 0 },
        { month: "Aug", mobileBookingCount: 0, onlineBookingCount: 0 },
        { month: "Sept", mobileBookingCount: 0, onlineBookingCount: 0 },
        { month: "Oct", mobileBookingCount: 0, onlineBookingCount: 0 },
        { month: "Nov", mobileBookingCount: 0, onlineBookingCount: 0 },
        { month: "Dev", mobileBookingCount: 0, onlineBookingCount: 0 }
      ];
      this.state.d3ParsedData.forEach(function(data) {
        switch (data.booking_created.split("/")[0]) {
          case "1":
            tempData[0].mobileBookingCount += parseInt(
              data.mobile_site_booking
            );
            tempData[0].onlineBookingCount += parseInt(data.online_booking);
            break;
          case "2":
            tempData[1].mobileBookingCount += parseInt(
              data.mobile_site_booking
            );
            tempData[1].onlineBookingCount += parseInt(data.online_booking);
            break;
          case "3":
            tempData[2].mobileBookingCount += parseInt(
              data.mobile_site_booking
            );
            tempData[2].onlineBookingCount += parseInt(data.online_booking);
            break;
          case "4":
            tempData[3].mobileBookingCount += parseInt(
              data.mobile_site_booking
            );
            tempData[3].onlineBookingCount += parseInt(data.online_booking);
            break;
          case "5":
            tempData[4].mobileBookingCount += parseInt(
              data.mobile_site_booking
            );
            tempData[4].onlineBookingCount += parseInt(data.online_booking);
            break;
          case "6":
            tempData[5].mobileBookingCount += parseInt(
              data.mobile_site_booking
            );
            tempData[5].onlineBookingCount += parseInt(data.online_booking);
            break;
          case "7":
            tempData[6].mobileBookingCount += parseInt(
              data.mobile_site_booking
            );
            tempData[6].onlineBookingCount += parseInt(data.online_booking);
            break;
          case "8":
            tempData[7].mobileBookingCount += parseInt(
              data.mobile_site_booking
            );
            tempData[7].onlineBookingCount += parseInt(data.online_booking);
            break;
          case "9":
            tempData[8].mobileBookingCount += parseInt(
              data.mobile_site_booking
            );
            tempData[8].onlineBookingCount += parseInt(data.online_booking);
            break;
          case "10":
            tempData[9].mobileBookingCount += parseInt(
              data.mobile_site_booking
            );
            tempData[9].onlineBookingCount += parseInt(data.online_booking);
            break;
          case "11":
            tempData[10].mobileBookingCount += parseInt(
              data.mobile_site_booking
            );
            tempData[10].onlineBookingCount += parseInt(data.online_booking);
            break;
          case "12":
            tempData[11].mobileBookingCount += parseInt(
              data.mobile_site_booking
            );
            tempData[11].onlineBookingCount += parseInt(data.online_booking);
            break;
          default:
            break;
        }
      });
      let visualizedData = [[], []];
      tempData.forEach(function(item) {
        visualizedData[0].push(item.mobileBookingCount);
        visualizedData[1].push(item.onlineBookingCount);
      });
      this.setState({ bookingMediumData: { tempData, visualizedData } });
      console.log(visualizedData);
    }
  };

  visualizeTravelType = () => {
    if (this.state.d3ParsedData.length > 0) {
      let tempData = [
        { travelTypeValue: "1", travelTypeName: "Long Distance", count: 0 },
        { travelTypeValue: "2", travelTypeName: "Point to Point", count: 0 },
        { travelTypeValue: "3", travelTypeName: "Hourly Rental", count: 0 }
      ];
      this.state.d3ParsedData.forEach(function(data) {
        switch (data.travel_type_id) {
          case "1":
            tempData[0].count += 1;
            break;
          case "2":
            tempData[1].count += 1;
            break;
          case "3":
            tempData[2].count += 1;
            break;
          default:
            break;
        }
      });
      let visualizedData = [];
      tempData.forEach(function(item) {
        visualizedData.push(item.count);
      });
      this.setState({ travelTypeData: { tempData, visualizedData } });
    }
  };

  visualizedData = () => {
    this.setState({ displayChartDiv : true});
    Highcharts.chart("booking-medium-map", {
      chart: {
        type: "line"
      },
      title: {
        text: "Medium of Booking in 2013"
      },
      xAxis: {
        categories: [
          "Jan",
          "Feb",
          "March",
          "April",
          "May",
          "June",
          "July",
          "Aug",
          "Sept",
          "Oct",
          "Nov",
          "Dev"
        ]
      },
      yAxis: {
        title: {
          text: "Range"
        }
      },
      series: [
        {
          name: "Total Mobile Site Booking",
          data: this.state.bookingMediumData.visualizedData[0]
        },
        {
          name: "Total Online Booking",
          data: this.state.bookingMediumData.visualizedData[1]
        }
      ]
    });
    Highcharts.chart("travel-type-map", {
      chart: {
        type: "bar"
      },
      title: {
        text: "Type of Travel booked in 2013"
      },
      xAxis: {
        categories: ["Long Distance", "Point to Point", "Hourly Rental"]
      },
      yAxis: {
        title: {
          text: "Range"
        }
      },
      series: [
        {
          name: "Total Travel Type",
          data: this.state.travelTypeData.visualizedData
        }
      ]
    });
  };
  render() {
    return (
      <main>
        <div className="container-fluid">
          <div className="mt-4 mb-4">
            <div className="main-div mb-4">
              <div className="row">
                <div className="col-12 col-sm-6">
                  <div className="form-div">
                    <form onSubmit={this.uploadAndParse.bind(null)}>
                      <div className="form-group">
                        <div className="head-div">
                          <h3>
                            Choose the relevant .csv file to visualize the data
                          </h3>
                        </div>
                        <div className="custom-file">
                          <input
                            type="file"
                            className="custom-file-input"
                            id="customFile"
                            onChange={this.handleInputChange.bind(
                              null,
                              "file",
                              null,
                              null
                            )}
                          />
                          <label
                            className="custom-file-label"
                            htmlFor="customFile"
                          >
                            {this.state.fileName
                              ? this.state.fileName
                              : "Choose file"}
                          </label>
                        </div>
                        <div>
                          <button
                            className="btn btn-primary mt-3"
                            type="submit"
                          >
                            Upload the file(Click here for now to initiate)
                          </button>
                        </div>
                      </div>
                    </form>
                    <div className="main-filter">
                      <h5>
                        Choose the option below to display points on the map:
                      </h5>
                      <form onSubmit={this.generateMap.bind(null)}>
                        <div className="custom-control custom-radio custom-control-inline">
                          <label>
                            <input
                              type="radio"
                              name="filter-radio-btn"
                              checked={this.state.source}
                              className="radio-btn"
                              onChange={this.handleInputChange.bind(
                                null,
                                "radio",
                                "source",
                                "destination"
                              )}
                              required
                            />
                            All the source point of the taxi
                          </label>
                        </div>
                        <div className="custom-control custom-radio custom-control-inline">
                          <label>
                            <input
                              type="radio"
                              name="filter-radio-btn"
                              className="radio-btn"
                              onChange={this.handleInputChange.bind(
                                null,
                                "radio",
                                "destination",
                                "source"
                              )}
                              checked={this.state.destination}
                              required
                            />
                            All the destination point of the taxi
                          </label>
                        </div>
                        <div>
                          <button
                            className="btn btn-primary mt-3"
                            type="submit"
                          >
                            Generate Map
                          </button>
                        </div>
                      </form>
                      <div>
                        <button
                          className="btn btn-primary mt-3"
                          onClick={this.visualizedData.bind(null)}
                        >
                          Click here for more visualization
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="map-container">
                    <div className="map" id="mapDiv"></div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={
                this.state.displayChartDiv
                  ? "sec-visualize-div d-block"
                  : "sec-visualize-div d-none"
              }
            >
              <div className="head-div text-center">
                <h3>More data can be Visualized here:- </h3>
              </div>
              <div className="row mt-3">
                <div className="col-12 col-sm-6">
                  <div className="chart-div">
                    <div className="chart-head-div text-center">
                      <h5>Chart 1</h5>
                    </div>
                    <div className="filter-div"></div>
                    <div className="chart-container">
                      <div id="booking-medium-map"></div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="chart-div">
                    <div className="chart-head-div text-center">
                      <h5>Chart 2</h5>
                    </div>
                    <div className="filter-div"></div>
                    <div className="chart-container">
                      <div id="travel-type-map"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default MainApp;
