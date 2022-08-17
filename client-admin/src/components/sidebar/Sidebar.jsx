import "./sidebar.css";
import React, { useState } from "react";
import {
  PermIdentity,
  Storefront,
  LocalShipping,
  Loyalty,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import Rimg from "../../assests/r.png";
import NavbarToggle from "../navbar/navbar.toggle";
import Button from "../buttons/button.component";
import { logout } from "../../redux/reducers/authReducer";
import { connect, useDispatch } from "react-redux";

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
        <div className="sidebarMenu">
          <div className="flex justify-between w-full md:w-48 items-center">
            <Link to="/home" className="logo w-40 ">
              <img src={Rimg} alt="" />
            </Link>
            <NavbarToggle active={active} menuState={menuState} />
          </div>
          <h3 className="sidebarTitle">Tableau de bord Administrateur</h3>
          <ul className="sidebarList">
            <Link to="/dashboard/admin/users" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Utilisateurs
              </li>
            </Link>
            <Link to="/dashboard/admin/products" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Produits
              </li>
            </Link>
            <Link to="/dashboard/admin/categories" className="link">
              <li className="sidebarListItem">
                <Loyalty className="sidebarIcon" />
                Categories
              </li>
            </Link>
            <Link to="/dashboard/admin/fournisseurs" className="link">
              <li className="sidebarListItem">
                <LocalShipping className="sidebarIcon" />
                Fournisseurs
              </li>
            </Link>

            <Button
              isButton={true}
              title="Déconnecter"
              moreStyle="text-red-500"
              action={() => {
                logout();
              }}
              href="/home"
            />
          </ul>
        </div>
      </div>
    </div>
  );
};

//const mapActionToProps = {};
const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, { logout })(Sidebar);
