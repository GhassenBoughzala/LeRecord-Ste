import React, { useEffect, useState } from "react";
import { useDispatch, connect } from 'react-redux';
import Container from '../components/container/container.component'
import Footer from '../components/home/Footer'
import { detailsProduct } from "../redux/reducers/productReducer";
import { Link } from "react-router-dom";
import './loading.css';

const ProductDetails = ({props, product, match, isLoading, isAuth}) => {

    
    const {productId} = match.params;
    const dispatch = useDispatch();
    const [Qty, setQt] = useState(1);
   
    useEffect(() => {  
        dispatch(detailsProduct(productId)) ;
      }, [ dispatch,productId ]);

      /*
    const addToCartHandler = () => {
        props.history.push(`/cart/${productId}?qty=${Qty}`);
      };
      */

    return (
		<>
		<Container>	

        <section className="w-full bg-white pt-7 pb-7 md:pt-20 md:pb-24">

        <div className="flex flex-col items-center sm:px-5 md:flex-row bg-white lg:mx-8 lg:flex lg:max-w2xl lg:rounded-lg lg:shadow-lg">
            {isLoading && <div id='loading' className='my-12 border-b text-center' />}
                {!isLoading && (
                 
                <div className="bg-cover lg:rounded-lg  md:w-1/2">
                   <div className="box-border relative w-full max-w-md px-4 mt-5 mb-4 -ml-5 item-center bg-no-repeat bg-contain border-solid md:ml-0 md:mt-0 md:max-w-none lg:mb-0 lg:max-w-1/2 xl:pl-10">
                       <img className="w-40 h-40 mb-6 animate" src={`/uploads/${product.photo}`} alt={product.photo} ></img>
                   </div>
                </div>

                )}
           
            <div className="flex flex-col items-start justify-center w-full h-full py-6 mb-6 md:mb-0 md:w-1/2">
                <div className="flex flex-col items-start justify-center h-full space-y-3 transform md:pl-10 lg:pl-16 md:space-y-5">
                    <div className="bg-green-500 flex items-center pl-3 pr-3 py-3 leading-none rounded-lg text-xs font-medium uppercase text-white inline-block">
                        <span>{product.shipping}</span>
                    </div>
                    <h1 className="text-4xl font-bold leading-none lg:text-5xl xl:text-6xl"><a href="#_">{product.name}</a></h1>
                    <p className="text-sm text-gray-700">Quantité : {product.quantity} </p>
                    <p className="text-sm text-gray-700">Description: {product.description} </p>                   
              
                    <div className="flex flex-wrap">
                        {product.quantity > 0 &&  isAuth && (
                          <div className="flex border-blue-200">                     
                            <select className="flex-1 border pl-3 pr-3 py-3 lg:rounded-lg block p-3 text-center text-blue-500 transition duration-200 ease-out hover:bg-blue-100 hover:text-blue-500"
                                    value={Qty} 
                                    onChange= {e => setQt( e.target.value )}>
                                    {
                                        [...Array(product.quantity).keys()].map( x => (
                                            <option key={x+1} value={x + 1}>{x+1}</option>
                                        ))
                                    }
                            </select>           
                          </div>
                            )}
                        <div className="flex pl-3 border-blue-200"> 
                            { isAuth && (
                                
                                <Link to={`/cart/${product._id}?qty=${Qty}`} >   
                                    <button type='submit'
                                        //onClick={addToCartHandler}
                                        className="flex-1 border pl-3 pr-3 py-3 lg:rounded-lg block p-3 text-center text-blue-500 transition duration-200 ease-out hover:bg-blue-100 hover:text-blue-500"
                                        > Ajouter au Panier
                                    </button>
                                </Link>  

                            )}                           
                        </div>
                    </div>

                    <div className="flex border-blue-200">                     
                                <a href='/magasin'>
                                    <button type='submit'
                                        className="flex-1 border pl-3 pr-3 py-3 lg:rounded-lg block p-3 text-center text-blue-500 transition duration-200 ease-out hover:bg-blue-100 hover:text-blue-500"
                                        > Retour
                                    </button>
                                </a>   
                    </div>
                    
                    
                </div>
            </div>

        </div>

        </section>

			
		</Container>
		<Footer/>
		</>

    )
};

const mapToStateProps = (state) => ({
    product: state.productsReducer.product,
    isAuth: state.auth.isAuthenticated,
  });

export default connect(mapToStateProps)(ProductDetails);
