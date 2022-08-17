import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
//import Navbar from "./components/navbar/navbar.component";
import Home from "./screens/Home";
import AuthHome from "./screens/AuthHome";
import Login from "./screens/Login";
import Register from "./screens/Register";
import AdminHome from "./screens/pages/productList/ProductList";
import ProductsAdmin from "./screens/pages/productList/ProductList";
import AddProduct from "./screens/pages/newProduct/AddProduct";
import EditerProduct from "./screens/pages/newProduct/EditProduct";
import PrivateRoute from "./routes/PrivateRoute";
import UserRoute from "./routes/UserRoute";
import UserProfile from "./screens/User";
import UsersList from "./screens/pages/userList/UserList";
import CategoriesList from "./screens/pages/category/categoryList";
import FournisseursList from "./screens/pages/fournisseur/fournisseurList";
import Magasin from "./screens/Magasin";
//import Details from './screens/Productdetails';
//import Cart from './screens/Cart';

const Routes = () => {
  return (
    <BrowserRouter>
      <ToastContainer position="bottom-right" />
      <Switch>
        <Route exact path="/" component={Home} />

        <Route exact path="/home" component={Home} />
        <Route exact path="/auth" component={AuthHome} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/magasin" component={Magasin} />

        <UserRoute exact path="/dashboard/user" component={UserProfile} />

        <PrivateRoute exact path="/dashboard/admin" component={AdminHome} />

        <PrivateRoute
          exact
          path="/dashboard/admin/products"
          component={ProductsAdmin}
        />
        <PrivateRoute
          exact
          path="/dashboard/admin/addproduct"
          component={AddProduct}
        />
        <PrivateRoute
          exact
          path="/dashboard/admin/editerproduct"
          component={EditerProduct}
        />
        <PrivateRoute
          exact
          path="/dashboard/admin/users"
          component={UsersList}
        />
        <PrivateRoute
          exact
          path="/dashboard/admin/categories"
          component={CategoriesList}
        />
        <PrivateRoute
          exact
          path="/dashboard/admin/fournisseurs"
          component={FournisseursList}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;

/*
        <Route exact path='/produit/:productId' component={Details}/>
        <Route exact path='/cart/:productId?' component={Cart}/>
*/
