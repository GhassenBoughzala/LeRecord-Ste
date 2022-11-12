import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import Button from "../buttons/button.component";
import NavItem from "./navbar.item";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { logout } from "../../redux/reducers/authReducer";

const NavbarList = ({ history, logout, isAuth, user }) => {

  const isActive = (history, path) => {
    if (history.location.pathname === path) {
      return "text-blue-900";
    } else {
      return "";
    }
  };

  const [userLocal] = useState(() => {
    const saved = localStorage.getItem("user");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });

  return (
    <>
      <ul className="font-bold flex-wrap flex md:mr-5 flex-col md:flex-row text-center">
        <NavItem
          link="/"
          //icon="fas fa-home mx-1"
          name="Accueil"
          listStyle={isActive(history, "/")}
        />
        <Button
          isButton={false}
          moreStyle="hover:text-blue-900"
          href="/catalogue"
          //icon="fas fa-store mx-1"
          title="Catalogue"
        >
        </Button>

        {isAuth && (
          <>
            <Button
              isButton={true}
              //icon={"fas fa-sign-out-alt mx-1"}
              title="Déconnecter"
              moreStyle="hover:text-blue-900"
              action={() => {
                toast.info(`Utilisateur déconnecté !`);
                logout();
              }}
              href="/accueil"
            />

            {userLocal.role === 1 ? (
              <Button
                isButton={false}
                href="/dashboard/admin"
                title={"Admin"}
                icon={"fas fa-tools mx-1"}
                moreStyle="hover:text-blue-900"
              />
            ) : (
              <Button
                isButton={false}
                icon={"fas fa-user-circle mx-1"}
                title={userLocal.nom}
                href="/dashboard/user"
                moreStyle=" text-green-500 hover:text-black"
              />
            )}
          </>
        )}

{/*         {!isAuth && (
          <>
            <Button
              icon={"fas fa-sign-in-alt mx-1"}
              title="Connecter"
              moreStyle="hover:text-blue-900"
              isButton={false}
              href="/login"
            />
          </>
        )} */}
      </ul>
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuthenticated,
  user: state.auth.user,
});
export default connect(mapStateToProps, { logout })(withRouter(NavbarList));
