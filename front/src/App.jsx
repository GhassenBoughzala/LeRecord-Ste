import React, { useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { signout } from './helpers/auth';
import { ToastContainer, toast } from 'react-toastify';
import { Provider } from 'react-redux';
import setAuthToken from './helpers/authToken';
import store from './redux/store';
import { loadUser } from './redux/reducers/authReducer';
import Routes from './routes';

function App({ history }) {

  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  useEffect(() => {
    console.log('app')
    store.dispatch(loadUser()) 
  }, [])

  return (
    <Provider store={store}>
        <Routes/>
    </Provider>
  );
}

export default App;
