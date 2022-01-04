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
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/dashboard/admin" className="link">
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Home
            </li>
            </Link>
            <Link to="/dashboard/admin/users" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link to="/dashboard/admin/products" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Products
              </li>
            </Link>
            <li className="sidebarListItem">
              <Loyalty className="sidebarIcon" />
              Categories
            </li>
            <li className="sidebarListItem">
              <LocalShipping className="sidebarIcon" />
              Fournisseurs
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
