import "./sidebar.css";
import React, { useState } from "react";
import {
  PermIdentity,
  Storefront,
  LocalShipping,
  Loyalty
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import Rimg from "../../assests/r.png";
import NavbarToggle from "../navbar/navbar.toggle";
import { logout } from "../../redux/reducers/authReducer";
import { connect } from "react-redux";

const Sidebar = ({ history, logout, isAuth, user }) => {
  // implent toggle state
  const [active, setActive] = useState(false);
  // toggle Controller
  const menuState = () => {
    setActive(!active);
  };

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="flex justify-between w-full md:w-48 items-center text-center">
          <Link to="/home" className="logo w-40 ">
            <img src={Rimg} alt="" />
          </Link>
          <NavbarToggle active={active} menuState={menuState} />
        </div>
        <div className="sidebarMenu">
          <ul className="sidebarList">
            <Link to="/dashboard/admin/users" className="link">
              <li className="sidebarListItem text-blue-900">
                <PermIdentity className="sidebarIcon" />
                Utilisateurs
              </li>
            </Link>
            <Link to="/dashboard/admin/products" className="link">
              <li className="sidebarListItem text-blue-900">
                <Storefront className="sidebarIcon" />
                Produits
              </li>
            </Link>
            <Link to="/dashboard/admin/categories" className="link">
              <li className="sidebarListItem text-blue-900">
                <Loyalty className="sidebarIcon" />
                Categories
              </li>
            </Link>
            <Link to="/dashboard/admin/fournisseurs" className="link">
              <li className="sidebarListItem text-blue-900">
                <LocalShipping className="sidebarIcon" />
                Fournisseurs
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

//const mapActionToProps = {};
const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, { logout })(Sidebar);
