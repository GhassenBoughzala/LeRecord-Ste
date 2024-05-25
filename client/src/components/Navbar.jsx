/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import Rimg from "../assests/r.png";
import Theme from "./Theme";

export const Navbar = () => {
  return (
    <>
      <div className="drawer">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="w-full navbar bg-base-300">
            <div className="flex-none lg:hidden">
              <label
                htmlFor="my-drawer-3"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-6 h-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="flex-1 px-2 mx-2">
              <Link to="/accueil" className="logo w-40 ">
                <img src={Rimg} alt="" />
              </Link>
            </div>
            <div className="flex-none hidden lg:block">
              <ul className="menu menu-horizontal">
                {/* Navbar menu content here */}
                <li>
                  <Link to="/acceuil">
                    <b className=" text-blue-900">Acceuil</b>
                  </Link>
                </li>
                <li>
                  <Link to="/catalogue">
                    <b className=" text-blue-900">Catalogue</b>
                  </Link>
                </li>
                <li>
                  <Theme />
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-3"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200">
            {/* Sidebar content here */}
            <li>
              <Link to="/acceuil">
                <b className=" text-blue-900">Acceuil</b>
              </Link>
            </li>
            <li>
              <Link to="/catalogue">
                <b className=" text-blue-900">Catalogue</b>
              </Link>
            </li>
            <li>
              <Theme />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
