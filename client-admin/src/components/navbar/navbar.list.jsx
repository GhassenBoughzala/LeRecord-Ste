import React from 'react';
import { withRouter } from 'react-router-dom';
import Button from '../buttons/button.component';
import NavItem from './navbar.item';
import { connect } from 'react-redux';
import { logout } from '../../redux/reducers/authReducer';

const NavbarList = ({ history, logout, isAuth }) => {
  // make active nav item with text primary
  const isActive = (history, path) => {
    if (history.location.pathname === path) {
      return 'text-blue-500';
    } else {
      return '';
    }
  };
  return (
    <ul className='font-bold flex-wrap flex md:mr-5 flex-col md:flex-row text-center'>
      <NavItem link='/' name='Home' listStyle={isActive(history, '/')} />
      <NavItem
        link='/shop'
        name='Shop'
        listStyle={isActive(history, '/shop')}
      />
      <NavItem
        link='/dashboard'
        name='Dashboard'
        listStyle={isActive(history, '/dashboard')}
      />
      {isAuth && (
        <Button
          title='Logout'
          moreStyle='hover:text-blue-500'
          action={ () => {
            logout();
          }}
        />
      )}
      {!isAuth && (
        <>
          <Button
            title='Connect'
            moreStyle='hover:text-blue-500'
            isButton={false}
            href='/login'
          />
        </>
      )}
      <Button
        isButton={false}
        href='/cart'
        moreStyle='fas fa-shopping-cart fa hover:text-blue-500'
      />
    </ul>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { logout })(withRouter(NavbarList));
