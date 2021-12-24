import React from 'react';
import { withRouter } from 'react-router-dom';
import Button from '../buttons/button.component';
import NavItem from './navbar.item';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { logout } from '../../redux/reducers/authReducer';
import { Redirect } from 'react-router-dom';

const NavbarList = ({ history, logout, isAuth, user }) => {

  const isActive = (history, path) => {
    if (history.location.pathname === path) {
      return 'text-blue-500';
    } else {
      return '';
    }
  };

  if (isAuth && user) {
    const { name, role } = user;
    if (role === 0) return <Redirect to='/login' />;
    if (role === 1) return <Redirect to='/dashboard/admin' />;
  }

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
            toast.info(`User logged out !`);
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
