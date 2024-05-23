/* eslint-disable react/jsx-no-undef */
import React, { useEffect, Suspense } from "react";
import { Provider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";
import setAuthToken from "./helpers/authToken";
import store from "./redux/store";
import { loadUser } from "./redux/reducers/authReducer";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Home from "./screens/Home";
import Magasin from "./screens/Magasin";
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
import AuthHome from "./screens/AuthHome";

function App() {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  useEffect(() => {
    if (localStorage.token) {
      store.dispatch(loadUser());
    }
  }, []);

  return (
    <Provider store={store}>
      <HelmetProvider>
        <BrowserRouter>
          <ToastContainer position="bottom-right" />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="*" element={<PageNotFound />} />
            <Route exact path="/accueil" element={<Home />} />
            <Route exact path="/catalogue" element={<Magasin />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/auth" element={<AuthHome />} />
            <Route exact path="/register" element={<Register />} />

            <Route exact path="/dashboard/user" element={<UserRoute />}>
              <Route
                exact
                path="/dashboard/user"
                element={
                  <Suspense fallback={<></>}>
                    <UserProfile />
                  </Suspense>
                }
              />
            </Route>

            {/*             <PrivateRoute exact path="/dashboard/admin" component={AdminHome} />

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
            /> */}
          </Routes>
        </BrowserRouter>
      </HelmetProvider>
    </Provider>
  );
}

export default App;
