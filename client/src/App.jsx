import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";
import setAuthToken from "./helpers/authToken";
import store from "./redux/store";
import { loadUser } from "./redux/reducers/authReducer";
import Routes from "./routes";

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
        <Routes />
      </HelmetProvider>
      
    </Provider>
  );
}

export default App;
