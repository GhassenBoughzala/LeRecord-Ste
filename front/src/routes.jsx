/* eslint-disable no-unused-vars */
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./screens/home";
/* import Magasin from "./screens/Magasin";
import PageNotFound from "./screens/PageNotFound";
import UserRoute from "./routes/UserRoute";
import PrivateRoute from "./routes/PrivateRoute";
import UserProfile from "./screens/User";
import AdminHome from "./screens/pages/productList/ProductList";
import ProductsAdmin from "./screens/pages/productList/ProductList";
import AddProduct from "./screens/pages/newProduct/AddProduct";
import EditerProduct from "./screens/pages/newProduct/EditProduct";
import UsersList from "./screens/pages/userList/UserList";
import CategoriesList from "./screens/pages/category/categoryList";
import FournisseursList from "./screens/pages/fournisseur/fournisseurList";
import Login from "./screens/Login";
import Register from "./screens/Register";
import AuthHome from "./screens/AuthHome"; */


const Routes = () => {
  return (
    <Router>
      <ToastContainer position="bottom-right" />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/accueil" component={Home} />
{/*         <Route exact path="/catalogue" component={Magasin} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/auth" component={AuthHome} />
        <Route exact path="/register" component={Register} />

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

        <Route exact path="/page-not-found" component={PageNotFound} />
        <Redirect from="/" to="/page-not-found" /> */}
      </Switch>
    </Router>
  );
};

export default Routes;
