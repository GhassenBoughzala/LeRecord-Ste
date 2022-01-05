import React, { useState } from 'react';
import { connect } from 'react-redux';
import Container from '../components/container/container.component';
import { register } from '../redux/reducers/authReducer';
import authSvg from '../assests/auth.svg';
import { ToastContainer, toast } from 'react-toastify';
import { Redirect } from 'react-router-dom';
import Navbar from '../components/navbar/navbar.component';
import './loading.css';

const Register = ({ register, isAuth, isLoading, user }) => {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPasswrod: '',
  });

  const { name, email, password, confirmPasswrod } = data;

  const handleChange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log('submit');
    if (password !== confirmPasswrod) {
      toast.error('Passwords do not match');
    } else {
      register({ name, email, password });
    }
  };

  if (isAuth && user) {
    const { role } = user
    if(role === 0) return <Redirect to='/'/>
    if(role === 1) return <Redirect to=''/>
  }

  return (
    <Container>
       
    <div className='min-h-screen bg-gray-100 text-gray-900 flex justify-center'>
      <ToastContainer />
      <div className='max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
        <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
          <div className='mt-12 flex flex-col items-center'>
            <h1 className='text-2xl xl:text-3xl font-extrabold'>
              Register
            </h1>

            <form
              className='w-full flex-1 mt-8 text-black'
              onSubmit={onSubmit}
            >
              <div className='mx-auto max-w-xs relative '>
                <input
                  className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
                  type='text'
                  placeholder='Name'
                  onChange={handleChange('name')}
                  value={name}
                />
                <input
                  className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                  type='email'
                  placeholder='Email'
                  onChange={handleChange('email')}
                  value={email}
                />
                <input
                  className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                  type='password'
                  placeholder='Password'
                  onChange={handleChange('password')}
                  value={password}
                />
                <input
                  className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                  type='password'
                  placeholder='Confirm Password'
                  onChange={handleChange('confirmPasswrod')}
                  value={confirmPasswrod}
                />
              <div className='flex flex-col items-center'>
              {isLoading && <div id='loading' className='my-12 border-b text-center' />}
                {!isLoading && (
                  <button className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5'
                  target='_self' >
                   <i className='fas fa-user-plus fa 1x w-6  -ml-2 text-blue-500' />
                   <span className='ml-4'>Sign Up</span>
                  </button>
                )}
               
              </div>
               
              </div>
              <div className='my-12 border-b text-center'>
                <div className='leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2'>
                  Or sign with email
                </div>
              </div>

              
              <div className='flex flex-col items-center'>
                <a
                  className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3
           bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5'
                  href='/login'
                  target='_self'
                >
                  <i className='fas fa-sign-in-alt fa 1x w-6  -ml-2 text-blue-500' />
                  <span className='ml-4'>Sign In</span>
                </a>
              </div>
            </form>
          </div>
        </div>
        <div className='flex-1 bg-indigo-100 text-center hidden lg:flex'>
          <div
            className='m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat'
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
export default connect(mapToStateProps, { register })(Register);