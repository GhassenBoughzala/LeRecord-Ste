import React from 'react';
import { withRouter } from 'react-router-dom';
import Button from '../buttons/button.component';
import NavItem from './navbar.item';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { logout } from '../../redux/reducers/authReducer';

const NavbarAdminList = ({ history, logout, isAuth, user }) => {

  const isActive = (history, path) => {
    if (history.location.pathname === path) {
      return 'text-blue-900';
    } else {
      return '';
    }
  };

  return (
    <>
    <ul className='font-bold flex-wrap flex md:mr-5 flex-col md:flex-row text-center'>
      <NavItem 
        link='/accueil' 
        name='Accueil' 
        listStyle={isActive(history, '/')} />
      <Button 
        isButton={false}
        moreStyle='hover:text-blue-900'
        href='/magasin' 
        title='Magasin'/>
      {isAuth && (
        <>
          <Button
            isButton={true}
            title='Déconnecter'
            moreStyle='hover:text-blue-900'
            action={ () => {
              toast.info(`Utilisateur déconnecté !`);
              logout();}}
            href='/accueil'/>
          
          <Button
            isButton={false}
            href='/dashboard/admin'
            moreStyle='fas fa-user-circle fa hover:text-blue-500'
          />
         
        </>
      )}
      
      {!isAuth && (
        <>
          <Button
            title='Connecter'
            moreStyle='hover:text-blue-900'
            isButton={false}
            href='/login'
            listStyle={isActive(history, '/login')}
          />
        </>
      )}
          
    </ul>
    </>
    
 
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuthenticated,
  user: state.auth.user
});
export default connect(mapStateToProps, { logout })(withRouter(NavbarAdminList));
