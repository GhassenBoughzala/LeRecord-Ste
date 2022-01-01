import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';


const UserRoute = ({
    
    component: Component,
    isAuthenticated,
    user,
    ...rest
}) => (
    
        <Route
            {...rest}
            render={props =>
                isAuthenticated === true && user.role === 0 ? (
                    <Component {...props} />
                ) : (
                        <Redirect to="/dashboard/user" />
                    )
                
            }
        />
    );

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
});

export default connect(mapStateToProps, null)(UserRoute);