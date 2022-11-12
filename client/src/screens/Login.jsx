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
                <form
                  className="mx-auto max-w-xs relative "
                  onSubmit={onSubmit}
                >
                  <input
                    className="w-full px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="email"
                    placeholder="Email"
                    onChange={handleChange("email")}
                    value={email}
                  />
                  <input
                    className="w-full px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
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
