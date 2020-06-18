import React, { Component } from "react";
import ReactDOM from "react-dom";
import Control from "react-leaflet-control";
import { Map, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import getLocation from "../services/geolocation.js";
import L from "leaflet";
import ukraineGeo from "../geoJson/Ukraine.json";
import otherCountriesGeo from "../geoJson/countriesArroundUkraine.json";
import "../assets/map.css";

import { markerApi, regionApi } from "../utils/api";

export default class SolarMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userMarker: props.userMarker,
      markers: undefined,
      regions: [],
      angles: [],
      solarStations: [],
      helioStations: [],
      colorStep: 0,
      lat: 48.55,
      lng: 31,
      zoom: 6,
      components: null,
      displayPreloader: false,
    };
    console.log(props);
    this.setUkraineStyle = this.setUkraineStyle.bind(this);
    this.onEachFeature = this.onEachFeature.bind(this);
  }

  componentDidMount() {
    const { withLeaflet } = require("react-leaflet");
    const { ReactLeafletSearch } = require("react-leaflet-search");
    this.setState({
      components: { ReactLeafletSearch: withLeaflet(ReactLeafletSearch) },
    });

    if (!this.state.markers) {
      markerApi.getAll().then(({ data }) => {
        this.setState({
          markers: data,
        });
      });
    }

    regionApi.getAll().then(({ data }) => {
      this.setState({
        regions: data,
        colorStep: 1.0 / (data.length + 1),
      });
    });

    // fetch("http://localhost:17725/marks/getAll")
    //   .then((data) => data.json())
    //   .then((map) => {
    //     console.log("map :>> ", map);
    //     console.log(map.regions);
    //     this.setState({
    //       // markers: map.markers,
    //       // regions: map.regions,
    //       // angles: map.angles,
    //       // solarStations: map.solarStations,
    //       // helioStations: map.helioStations,
    //       colorStep: 1.0 / (map.regions.length + 1),
    //     });
    //     console.log("map.regions :>> ", map.regions);

    // getLocation().then((location) => {
    //   this.setState({
    //     userMarker: {
    //       region: this.state.regions.find((el) => el.iso === "UA-32"),
    //       coordinates: location,
    //       isNew: true,
    //       systemStationId: this.state.solarStations[0].id,
    //       angles: map.angles,
    //       solarStations: map.solarStations,
    //       helioStations: map.helioStations,
    //     },
    //     displayPreloader: false,
    //   });
    //   this.props.locationCallBack(this.state.userMarker);
    // });
    // });
  }

  setUkraineStyle(feature) {
    return {
      color: "#FFA500",
      opacity: 0,
      fillOpacity:
        this.state.regions.findIndex(
          (el) => el.iso === feature.properties["iso3166-2"]
        ) * this.state.colorStep,
    };
  }

  onEachFeature(feature, layer) {
    var that = this;
    layer.on("click", function (e) {
      that.markerClick(e, feature);
    });
  }

  markerClick(e, feature) {
    if (e.target && e.target.options && e.target.options.position) {
      console.log("---------", e.target);
      var marker = this.state.markers.find((element) => {
        console.log("=========", element.position, e.target.options.position);
        return element.position === e.target.options.position;
      });
      var region = this.state.regions.find(
        (element) => element.iso === marker.region_iso
      );
      this.setState({
        userMarker: {
          id: marker.id,
          systemStationId: marker.systemStationId,
          area: marker.area,
          region: region,
          regionId: marker.regionId,
          coordinates: e.latlng,
          isNew: false,
          angles: this.state.angles,
          // solarStations: this.state.solarStations,
          // helioStations: this.state.helioStations,
        },
      });

      this.props.locationCallBack({
        marker: marker,
        region_iso: region.iso,
        coordinates: e.latlng,
      });
    } else {
      region = this.state.regions.find(
        (element) => element.iso === feature.properties["iso3166-2"]
      );
      this.setState({
        userMarker: {
          id: null,
          // systemStationId: this.state.solarStations[0].id,
          area: 0,
          // region: region,
          // regionId: region.id,
          coordinates: e.latlng,
          isNew: true,
          // angles: this.state.angles,
          // solarStations: this.state.solarStations,
          // helioStations: this.state.helioStations,
        },
      });

      this.props.locationCallBack({
        region_iso: region.iso,
        coordinates: e.latlng,
      });
      // fetch("http://localhost:17725/marks/addMark", {
      //   method: "POST",
      //   headers: {
      //     Accept: "application/json",
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     Lat: e.latlng.lat,
      //     Lng: e.latlng.lng,
      //     Text: "Created by user",
      //     RegionId: region.id,
      //     Area: 0,
      //   }),
      // }).then(() => {
      //   this.componentDidMount();
      // });
    }
    // this.props.locationCallBack(this.state.userMarker);

    // ReactDOM.unmountComponentAtNode(document.getElementById("results"));
  }

  render() {
    if (!this.state.components) {
      return null;
    }
    const { ReactLeafletSearch } = this.state.components;
    const yellowIcon = L.icon({
      iconUrl:
        "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    const blueIcon = L.icon({
      iconUrl:
        "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    const greenIcon = L.icon({
      iconUrl:
        "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    var corner1 = L.latLng(55, 13);
    var corner2 = L.latLng(40, 40);
    var bounds = L.latLngBounds(corner1, corner2);

    let newMark = null;
    if (
      this.state.userMarker.coordinates.lat &&
      this.state.userMarker.coordinates.lng
    ) {
      newMark = (
        <Marker
          position={[
            this.state.userMarker.coordinates.lat,
            this.state.userMarker.coordinates.lng,
          ]}
          icon={yellowIcon}
        />
      );
    }
    var grades = [1000, 1100, 1200, 1300, 1400];
    var legendColorStep = 1.0 / (grades.length + 1);

    console.log("geo", ukraineGeo);

    return (
      <div className="map-container">
        {this.state.displayPreloader ? (
          <div className="preloader-wr">
            <div className="lds-ring">
              <div />
              <div />
              <div />
              <div />
            </div>
          </div>
        ) : null}
        <Map
          className="simpleMap"
          center={[49.0384, 31.4513]}
          zoom={this.state.zoom}
          minZoom={this.state.zoom}
          maxBounds={bounds}
          maxBoundsViscosity="0"
        >
          <ReactLeafletSearch
            position="topleft"
            zoom={9}
            showMarker={false}
            showPopup={true}
            openSearchOnLoad={false}
            closeResultsOnClick={false}
            customProvider={false}
            provider="OpenStreetMap"
            providerOptions={{ region: "ua" }}
          />
          <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
          <GeoJSON
            data={ukraineGeo}
            style={this.setUkraineStyle}
            onEachFeature={this.onEachFeature}
          />
          <GeoJSON
            data={otherCountriesGeo}
            style={{
              fillColor: "grey",
              weight: 1,
              opacity: 0,
              color: "white",
              dashArray: "3",
              fillOpacity: 0.3,
            }}
          />
          {this.state.markers &&
            this.state.markers.map((item, idx) => {
              return (
                <Marker
                  key={item._id}
                  position={item.position}
                  icon={
                    // this.state.solarStations.find(
                    //   (x) => x.id === position.systemStationId
                    // )
                    //   ?
                    blueIcon
                    // : greenIcon
                  }
                  onClick={this.markerClick.bind(this)}
                >
                  {/* <Popup className="request-popup">
                    <p>{position.text}</p>
                    <img
                      width="200px"
                      alt="Pupup"
                      src={"data:image/png;base64," + position.imageBase64}
                    />
                  </Popup> */}
                </Marker>
              );
            })}

          {newMark}

          <Control position="bottomright" className="legend">
            <div className="legend-header">
              <span>кВт.год/м2</span>
            </div>
            {grades.map((item, i) => {
              return (
                <div key={i}>
                  <i
                    style={{
                      background: "#FFA500",
                      opacity: legendColorStep * (i + 1),
                    }}
                  />
                  <span className="legend-text">
                    {item + (grades[i + 1] ? " - " + grades[i + 1] : "+")}
                  </span>
                  <br />
                </div>
              );
            })}
          </Control>
        </Map>
      </div>
    );
  }
}
