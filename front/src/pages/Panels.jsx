import React from "react";

import Card from "../components/Card";

import panels from "../data/panels.json";

const Panels = () => {
  return (
    <div className="raw-container">
      {panels.map((item, index) => {
        return <Card key={index} data={item} />;
      })}
    </div>
  );
};

export default Panels;
