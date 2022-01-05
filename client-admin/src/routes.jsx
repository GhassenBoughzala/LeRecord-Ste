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
import PrivateRoute from './routes/PrivateRoute';
import UserRoute from './routes/UserRoute';
import UserProfile from './screens/User';
import UsersList from './screens/pages/userList/UserList';


const Routes = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Navbar/>
      <Switch>
        <Route exact path='/' component={Home}/>
        
        <Route exact path='/home' component={Home}/>
        <Route exact path='/auth' component={AuthHome}/>
        <Route exact path='/register' component={Register}/>
        <Route exact path='/login' component={Login}/>
        <UserRoute exact path='/dashboard/user' component={UserProfile}/>

        <PrivateRoute exact path='/dashboard/admin' component={AdminHome}/>
        <PrivateRoute exact path='/dashboard/admin/products' component={ProductsAdmin}/>
        <PrivateRoute exact path='/dashboard/admin/users' component={UsersList}/>

      </Switch>
    </BrowserRouter>
  );
};

export default Routes;