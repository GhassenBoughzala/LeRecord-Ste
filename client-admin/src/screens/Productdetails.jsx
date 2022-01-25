import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector, connect } from 'react-redux';
import Container from '../components/container/container.component'
import Footer from '../components/home/Footer'
import { Link } from "react-router-dom";
import { detailsProduct } from "../redux/reducers/productReducer";
//import { getAllCat } from "../redux/reducers/catReducer";


const ProductDetails = ({ match, history }) => {

    const {productId} = match.params;

    const dispatch = useDispatch();
   

    useEffect(() => {  
       dispatch(detailsProduct(productId) );
      }, [dispatch, productId]);

    const product = useSelector(state => state.products);

    


    return (
		<>
		<Container>	

        <section className="w-full bg-white pt-7 pb-7 md:pt-20 md:pb-24">

            <div className="box-border flex flex-col items-center content-center px-8 mx-auto leading-6 text-black border-0 border-gray-300 border-solid md:flex-row max-w-7xl lg:px-16">
                <div className="box-border relative w-full max-w-md px-4 mt-5 mb-4 -ml-5 text-center bg-no-repeat bg-contain border-solid md:ml-0 md:mt-0 md:max-w-none lg:mb-0 md:w-1/2 xl:pl-10">
                   
                </div>
                <div className="box-border order-first w-full text-black border-solid md:w-1/2 md:pl-10 md:order-none">
                    <h2 className="m-0 text-xl font-semibold leading-tight border-0 border-gray-300 text-blue-700 lg:text-3xl md:text-2xl">
                     
                    </h2>
                    <p className="pt-4 pb-8 m-0 leading-7 text-gray-700 border-0 border-gray-300 sm:pr-12 xl:pr-32 lg:text-lg">
                        
                    </p>
                    <Link to='/magasin'>
                        <button
                            type='submit'
                            className='mt-5 tracking-wide font-semibold bg-blue-500 text-gray-100 w-full py-4 rounded-lg hover:bg-blue-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                        >
                            <span className='ml-3'>Retour</span>
                        </button>
                    </Link>
                   
                </div>
            </div>

        </section>

			
		</Container>
		<Footer/>
		</>

    )
};

export default ProductDetails;
