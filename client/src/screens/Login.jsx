import React, { useState } from "react";
import authSvg from "../assests/login.svg";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";
import { login } from "../redux/reducers/authReducer";
import { connect } from "react-redux";
import Container from "../components/container/container.component";
import Navbar from "../components/navbar/navbar.component";

const Login = ({ login, isAuth, isLoading, user }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = data;

  const handleChange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    login({ email, password });
  };

  if (isAuth && user) {
    const { role } = user;
    toast.success(`Bienvenue `);
    if (role === 0) return <Redirect to="/dashboard/user" />;
    if (role === 1) return <Redirect to="/dashboard/admin" />;
  }
  return (
    <Container>
      <Navbar />
      <br />
      <div className="min-h-screen bg-white text-gray-900 flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div className="mt-12 flex flex-col items-center">
              <h1 className="text-2xl xl:text-3xl font-extrabold">
                Bienvenue à Le Record
              </h1>
              <div className="w-full flex-1 mt-8 text-black">
                <div className="flex flex-col items-center">
                  <a
                    className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3
           bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5"
                    href="/register"
                    target="_self"
                  >
                    <i className="fas fa-user-plus fa 1x w-6  -ml-2 text-" />
                    <span className="ml-4">S'inscrire</span>
                  </a>
                </div>
                <div className="my-12 border-b text-center">
                  <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                    Ou connectez-vous par e-mail
                  </div>
                </div>
                <form
                  className="mx-auto max-w-xs relative "
                  onSubmit={onSubmit}
                >
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="email"
                    placeholder="Email"
                    onChange={handleChange("email")}
                    value={email}
                  />
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    type="password"
                    placeholder="Mot de passe"
                    onChange={handleChange("password")}
                    value={password}
                  />
                  <button
                    type="submit"
                    className="mt-5 tracking-wide font-semibold bg-blue-500 text-gray-100 w-full py-4 rounded-lg hover:bg-blue-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  >
                    <i className="fas fa-sign-in-alt  w-6  -ml-2" />
                    <span className="ml-3">S'identifier</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
            <div
              className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${authSvg})` }}
            ></div>
          </div>
        </div>
      </div>
    </Container>
  );
};

const mapToStateProps = (state) => ({
  isAuth: state.auth.isAuthenticated,
  isLoading: state.auth.loading,
  user: state.auth.user,
});
export default connect(mapToStateProps, { login })(Login);
