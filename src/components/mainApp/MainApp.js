import React, { Component } from "react";
import "./mainapp.css";

import Papa from "papaparse";
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
      mapInstance: null
    };
  }

  onMapClick = () => {};

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
  };

  createMap = () => {
    this.setState({ mapInstance: L.map("mapDiv") });
  };

  destroyMap = () => {
    if (this.state.mapInstance) {
      this.state.mapInstance.remove();
    }
  };

  render() {
    return (
      <main>
        <div className="container-fluid">
          <div className="main-div mt-4 mb-4">
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
                        <button className="btn btn-primary mt-3" type="submit">
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
                        <button className="btn btn-primary mt-3" type="submit">
                          Generate Map
                        </button>
                      </div>
                    </form>
                    <div>
                      <button className="btn btn-primary mt-3" type="submit">
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
          <div className="sec-div">

          </div>
        </div>
      </main>
    );
  }
}

export default MainApp;
