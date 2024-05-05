/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({
  component: Component,
  isAuthenticated,
  user,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated === true && user.role === 1 ? (
        <Component {...props} />
      ) : (
        <Redirect to="/dashboard/admin" />
      )
    }
  />
);

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, null)(PrivateRoute);
