import React, { useState } from "react";

import Card from "../components/Card";

import stations from "../data/station.json";

const Stations = () => {
  return (
    <div className="raw-container">
      {stations.map((item, index) => {
        return <Card key={index} data={item} />;
      })}
    </div>
  );
};

export default Stations;
