import React from "react";
import { withRouter } from "react-router-dom";
import Button from "../buttons/button.component";
import "./topbar.css";
import { connect } from "react-redux";
import { logout } from "../../redux/reducers/authReducer";
import { Link } from "react-router-dom";
import { ExitToApp, Home } from "@material-ui/icons";

const Topbar = ({ history, logout, isAuth, user }) => {
  const isActive = (history, path) => {
    if (history.location.pathname === path) {
      return "text-blue-500";
    } else {
      return "";
    }
  };

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft"></div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <ul className="font-bold flex-wrap flex md:mr-5 flex-col md:flex-row text-center">
              {isAuth && (
                <>
                  <Link to="/" className="link navbar-fixed-bottom">
                    <li className=" text-blue-900">
                      <Home className="sidebarIcon" />
                      Acceuil
                    </li>
                  </Link>
                  <Link
                    to="/home"
                    className="link navbar-fixed-bottom mx-2"
                    onClick={() => {
                      logout();
                    }}
                  >
                    <li className=" text-red-600">
                      <ExitToApp className="sidebarIcon" />
                      Se déconnecter
                    </li>
                  </Link>
                </>
              )}
              {!isAuth && (
                <>
                  <Button
                    title="Connect"
                    moreStyle="hover:text-blue-500"
                    isButton={false}
                    href="/login"
                    listStyle={isActive(history, "/login")}
                  />
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(withRouter(Topbar));
