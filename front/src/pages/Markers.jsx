import React, { useState, useEffect } from "react";

import Card from "../components/Card";

import stations from "../data/station.json";
import MarkersTable from "./../components/Markers";
import { markerApi } from "../utils/api";

const Markers = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!data) {
      markerApi.getAll().then(({ data }) => {
        console.log(data);
        setData(
          data.map((item) => {
            return {
              key: item._id,
              creator: item.creator.username,
              lat: item.position.lat,
              lng: item.position.lng,
              system: item.system,
              systemType: item.systemType,
              region_iso: item.region_iso,
            };
          })
        );
      });
    }
  });

  return (
    // <div className="raw-container">
    <MarkersTable data={data} />
    // </div>
  );
};

export default Markers;
