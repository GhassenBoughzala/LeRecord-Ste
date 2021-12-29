import React from "react";
import { createPopper } from "@popperjs/core";
import { logout } from "../../../Redux/actions/user/auth";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { useHistory } from "react-router-dom";
const UserDropdown = () => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  let history = useHistory();
  const candidate = JSON.parse(localStorage.getItem("candidate"));

  const dispatch = useDispatch();

  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  const logOut = () => {
    dispatch(logout());
    history.push("/auth/login");
  };
  return (
    <>
      <a
        className="text-gray-600 block"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className="items-center flex">
          <img
            alt="logged user"
            className="my-2  w-12 h-12 text-sm text-white bg-gray-300 inline-flex items-center justify-center rounded-full"
            //            src={candidate.profilePhoto}
          />
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <Link
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
          }
          to="/candidate/settings"
        >
          Profile
        </Link>
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
          }
          onClick={logOut}
        >
          Logout
        </a>

        <div className="h-0 my-2 border border-solid border-gray-200" />
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
          }
          onClick={(e) => e.preventDefault()}
        >
          HR HUB POLICY
        </a>
      </div>
    </>
  );
};

export default UserDropdown;
