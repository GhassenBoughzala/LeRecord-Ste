import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '../container/container.component';
import NavbarList from './navbar.list';
import NavbarToggle from './navbar.toggle';
import Rimg from '../../assests/r.png'

const Navbar = () => {
  // implent toggle state
  const [active, setActive] = useState(false);
  // toggle Controller
  const menuState = () => {
    setActive(!active);
  };
  return (
    <Container>
      <nav className='navbar'>
        {/* Left Side */}
        <div className='flex justify-between w-full md:w-32 items-center'>
          <Link to='/home' className='logo w-40 animate'>
            <img src={Rimg}/>
          </Link>
          <NavbarToggle active={active} menuState={menuState} />
        </div>

        {/* Right Side */}
        <div className={`${active ? 'flex' : 'hidden'} md:flex`}>
          <NavbarList />
        </div>
      </nav>
    </Container>
  );
};

export default Navbar;
