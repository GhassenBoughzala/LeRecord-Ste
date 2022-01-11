import "./sidebar.css";
import React from 'react';
import {
  Timeline,
  PermIdentity,
  Storefront,
  LocalShipping,
  BarChart,
  Loyalty,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">
          Tableau de bord Administrateur</h3>
          <ul className="sidebarList">
            <Link to="/dashboard/admin" className="link">
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Acceuil
            </li>
            </Link>
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
          </ul>
        </div>
      </div>
    </div>
  );
}
