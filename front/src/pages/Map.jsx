import React, { useState } from "react";

import SolarMap from "../components/solarMap";
import MarkerInfo from "../components/MarkerInfo";

const Map = () => {
  const [curMarker, setCurMarker] = useState(null);
  const myCallback = (userMarker) => {
    // setUserMarker(userMarker);
    setCurMarker(userMarker);
    // console.log(userMarker);
    // console.log(cherkasyJson.type);
    // this.setState({ userMarker })
  };
  const [userMarker, setUserMarker] = useState({
    id: null,
    region: "",
    coordinates: {
      lat: null,
      lng: null,
    },
    area: null,
    systemStationId: null,
    isNew: true,
    solarStations: [],
    helioStations: [],
  });
  return (
    <div className="raw-container">
      <SolarMap locationCallBack={myCallback} userMarker={userMarker} />
      <MarkerInfo marker={curMarker} />
    </div>
  );
};

export default Map;
