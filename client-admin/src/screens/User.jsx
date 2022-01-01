import React from 'react'
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { Redirect } from 'react-router-dom';

const User = (user, isAuth) => {
    return (
        <div>
            <h1>HELLO {user.name}</h1>
        </div>
    )
}

const mapToStateProps = (state) => ({
    isAuth: state.auth.isAuthenticated,
    user: state.auth.user,
  });

export default connect(mapToStateProps)(User);