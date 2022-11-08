import React from 'react';
import { Link } from 'react-router-dom';
const NavItem = ({ link, listStyle, name, icon }) => {
  return (
    <li
      className={`hover:text-blue-900 animate px-3 py-2 rounded-md ${listStyle}`}
    >
      <Link to={link}>
        <i className={icon}></i>
        <span>{name}</span>
      </Link>
    </li>
  );
};

export default NavItem;
