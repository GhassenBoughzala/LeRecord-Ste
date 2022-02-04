import React, {} from 'react'
import { connect } from 'react-redux';
import UserSvg from '../assests/userprofil.svg';

const User = ({user, isAuth}) => {


   
    return (     
      <div className='min-h-screen bg-white-100 text-gray-900 flex justify-center'>
        
        <div className='max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
          <div className='flex-1 bg-indigo-100 text-center hidden lg:flex'>
            <div
              className='m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat'
              style={{ backgroundImage: `url(${UserSvg})` }}
            ></div>
          </div>
          <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
            <div className='mt-12 flex flex-col items-center'>
            <i className='fas fa-user text-3xl'></i>
              <h1 className='text-2xl xl:text-3xl font-extrabold'>
                Détails de l'utilisateur
              </h1>
              <div className='w-full flex-1 mt-8 text-black'>
                            <div className='my-12 border-b text-center'>
                              <div className='leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2'>
                                ID-{user._id}
                              </div>
                            </div>
            <form className='mx-auto max-w-xs relative '>
                <h4 className='text-2xl xl:text-xl font-normal'>Nom : 
                    <span className='text-2xl xl:text-xl font-semibold'> {user.name}</span>
                </h4>
                <h4 className='text-2xl xl:text-xl font-normal'>Email : 
                    <span className='text-2xl xl:text-xl font-semibold'> {user.email}</span>
                </h4>
                <h4 className='text-2xl xl:text-xl font-normal'>Compte depuis : 
                    <span className='text-2xl xl:text-xl font-semibold'> {user.createdAt.substring(0, 10)}</span>
                </h4>

            </form>
                           
                        </div>
            </div>
          </div>

        </div>
        
      </div> 
    )
}

const mapToStateProps = (state) => ({
    isAuth: state.auth.isAuthenticated,
    user: state.auth.user,
  });


export default connect(mapToStateProps)(User);