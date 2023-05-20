import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./screens/Home";
import Magasin from "./screens/Magasin";
import PageNotFound from "./screens/PageNotFound";

const Routes = () => {
  return (
    <Router>
      <ToastContainer position="bottom-right" />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/accueil" component={Home} />
        <Route exact path="/catalogue" component={Magasin} />
        
        <Route exact path="/page-not-found" component={PageNotFound} />
        <Redirect from="/" to="/page-not-found" />
      </Switch>
    </Router>
  );
};

export default Routes;
