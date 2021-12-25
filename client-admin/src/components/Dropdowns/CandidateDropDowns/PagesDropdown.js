import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPopper } from "@popperjs/core";
import crudservice from "service/HRservice/crudservice";
import BellIcon from "react-bell-icon";

const PagesDropdown = () => {
  const candidate = JSON.parse(localStorage.getItem("candidate"));
  //  console.log(candidate.HR_viewed);
  const [result, setResult] = useState([]);
  const [closenotif, setClosenotif] = useState(true);

  const closenotiffunct = (e) => {
    e.preventDefault();
    dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
    setClosenotif(false);
  };

  //crudservice.get(candidate.HR_viewed);
  /*useEffect(() => {
    candidate.HR_viewed.map((i) =>
      crudservice.get(i._id).then((response) => {
        setResult(response.data.hr);
      })
    );
  }, []); // second param [] is a list of dependency to watch and run useEffect*/
  console.log("resss", result);
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  return (
    <>
      {closenotif ? (
        <a
          className="lg:text-white lg:hover:text-gray-300 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
          href="#pablo"
          ref={btnDropdownRef}
          onClick={closenotiffunct}
        >
          <BellIcon color="#ffff00" width="20" active={true} animate={true} />
        </a>
      ) : (
        <a
          className="lg:text-white lg:hover:text-gray-300 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
          href="#pablo"
          ref={btnDropdownRef}
          onClick={closenotiffunct}
        >
          <BellIcon color="#fff" width="20" active={false} animate={false} />
        </a>
      )}

      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <div
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
          }
        >
          {[result].map((res) => (
            <div>
              <img
                className="my-2  w-12 h-12 text-sm text-white bg-gray-300 inline-flex items-center justify-center rounded-full"
                src={`http://localhost:8082/file/${res.profilePhoto}`}
                alt="hr"
              />{" "}
              {res.fullName} viewd your profile
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PagesDropdown;
