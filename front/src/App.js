import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import Header from "./components/Header";

import Map from "./pages/Map";
import Stations from "./pages/Stations";
import Panels from "./pages/Panels";
import Regions from "./pages/Regions";
import Angles from "./pages/Angles";
import Auth from "./pages/Auth/index";
import Markers from "./pages/Markers";

// import "./App.css";

function App() {
  useEffect(() => {
    console.log("qwertyuiop");
  });

  return (
    <>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/map" component={Map} />
          <Route exact path={["/", "/signin", "/signup"]} component={Auth} />
          <Route path="/stations" component={Stations} />
          <Route path="/sun-panel" component={Panels} />
          <Route path="/regions" component={Regions} />
          <Route path="/angles" component={Angles} />
          <Route path="/markers" component={Markers} />
        </Switch>
      </div>
    </>
  );
}

export default App;
