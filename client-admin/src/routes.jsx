import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/navbar/navbar.component';
import Home from './screens/Home';
import AuthHome from './screens/AuthHome';
import Login from './screens/Login';
import Register from './screens/Register';
import AdminHome from './screens/pages/home/Home';


const Routes = () => {
  return (
    <BrowserRouter>
      <Navbar/>
      <ToastContainer />
      <Switch>
        <Route exact path='/home' component={Home} />
        <Route exact path='/auth' component={AuthHome} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/dashboard/admin' component={AdminHome} />

      </Switch>
    </BrowserRouter>
  );
};

export default Routes;