import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./screens/Home";
import Magasin from "./screens/Magasin";

const Routes = () => {
  return (
    <Router>
      <ToastContainer position="bottom-right" />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/accueil" component={Home} />
        <Route exact path="/catalogue" component={Magasin} />
      </Switch>
    </Router>
  );
};

export default Routes;
