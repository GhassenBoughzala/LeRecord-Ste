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

  return (

    <ul className='font-bold flex-wrap flex md:mr-5 flex-col md:flex-row text-center'>
      <NavItem 
        link='/home' 
        name='Home' 
        listStyle={isActive(history, '/')} />
      {isAuth && (
        <>
          <Button
            isButton={true}
            moreStyle='fas fa-sign-out-alt fa hover:text-blue-500'
            action={ () => {
              toast.info(`User logged out !`);
              logout();}}
            href='/home'/>
          <Button
            isButton={false}
            href='/dashboard/user'
            moreStyle='fas fa-user-circle fa hover:text-blue-500'
          />
        </>
      )}
      {!isAuth && (
        <>
          <Button
            title='Connect'
            moreStyle='hover:text-blue-500'
            isButton={false}
            href='/login'
            listStyle={isActive(history, '/login')}
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
