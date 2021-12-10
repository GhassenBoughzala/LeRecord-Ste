import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { Button } from "@material-ui/core";
import { logout } from "../../redux/apiCalls";
import { useState } from "react";
import { useDispatch } from "react-redux";





export default function Topbar() {

const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const dispatch = useDispatch();

const handleClick = (e) => {
  e.preventDefault();
  logout(dispatch, { username, password });
};

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Le Record </span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">

          <button onClick={handleClick}  className="widgetSmButton"> Logout </button>
          </div>
        </div>
      </div>
    </div>
  );
}
