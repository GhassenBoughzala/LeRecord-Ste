import React from "react";
import { withRouter } from 'react-router-dom';
import Button from '../buttons/button.component';
import "./topbar.css";
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { logout } from '../../redux/reducers/authReducer';
import { Redirect } from 'react-router-dom';

const Topbar = ({history, logout, isAuth, user}) => {

  const isActive = (history, path) => {
    if (history.location.pathname === path) {
      return 'text-blue-500';
    } else {
      return '';
    }
  };


  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Le Record </span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">

           <ul className='font-bold flex-wrap flex md:mr-5 flex-col md:flex-row text-center'>
                <Button
                  isButton={true}
                  moreStyle='fas fa-home fa hover:text-blue-500'
                  href='/dashboard/admin'/>
            {isAuth && (
              <>
                <Button
                  isButton={true}
                  moreStyle='fas fa-sign-out-alt fa hover:text-blue-500'
                  action={ () => {
                    toast.info(`User logged out !`);
                    logout();}}
                  href='/home'/>
                
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
                
                </ul>

          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {logout})(withRouter(Topbar));
