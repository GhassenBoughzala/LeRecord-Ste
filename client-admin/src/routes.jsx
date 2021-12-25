import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/navbar/navbar.component';
import Home from './screens/Home';
import AuthHome from './screens/AuthHome';
import Login from './screens/Login';
import Register from './screens/Register';
import AdminHome from './screens/pages/home/Home';
import ProductsAdmin from './screens/pages/productList/ProductList';


const Routes = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Navbar/>
      <Switch>

        <Route exact path='/home' component={Home} />
        <Route exact path='/auth' component={AuthHome} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/dashboard/admin' component={AdminHome} />
        <Route exact path='/dashboard/admin/products' component={ProductsAdmin} />

      </Switch>
    </BrowserRouter>
  );
};

export default Routes;