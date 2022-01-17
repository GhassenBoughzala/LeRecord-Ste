import React, { useEffect, useState, Fragment } from "react";
import Container from '../components/container/container.component'
import Footer from '../components/home/Footer'
//import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getAll } from "../redux/reducers/productReducer";
//import { getAllCat } from "../redux/reducers/catReducer";


const Magasin = (props) => {

    const [Search, setSearch] = useState('');

    useEffect(() => {
        props.AllProducts();
      });


    return (
		<>
		<Container>	
            

        <section className="w-full py-12 bg-white lg:py-24">
        <div className="max-w-6xl px-12 mx-auto text-center">
            <div className="space-y-12 md:text-center">
                <div className="max-w-3xl mb-20 space-y-5 sm:mx-auto sm:space-y-4">
                    <h2 className="relative text-4xl font-extrabold tracking-tight sm:text-5xl">Our Awesome Team</h2>
                    <p className="text-xl text-gray-500">We take pride in the people we work with. This is because we all collectively help each other become more awesome every day.</p>
                
                    <div class="flex bg-gray-100 p-4 w-72 space-x-4 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input  class="bg-gray-100 outline-none" 
                                type="text" 
                                placeholder="Cherchez un produit..."
                                onChange={(event) => { setSearch(event.target.value); }} />
                    </div>
                </div>

            </div>

            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
                {props.List.filter((product) => {
                    if(Search === ""){
                        return product
                    }else if(product.name.toLowerCase().includes(Search.toLocaleLowerCase())){
                        return product
                    }
                }).map((product, index) => {

                        return(
                        <Fragment key={index}>    
                        <div className="w-full border border-gray-200 rounded-lg shadow-sm">

                            <div className="flex flex-col items-center justify-center p-10" key={product._id}>
                                <img className="w-40 h-40 mb-6" src={`/uploads/${product.photo}`} alt={product.photo}></img>
                                <h2 className="text-lg font-medium">{product.name}</h2>
                                <p className="font-medium text-blue-500">{product.shipping}</p>
                            </div>

                            <div className="flex border-t border-gray-200 divide-x divide-gray-200">
                                <a href="#_" className="flex-1 block p-3 text-center text-gray-300 transition duration-200 ease-out hover:bg-blue-100 hover:text-blue-500">
                                    <i className="far fa-eye text-xl"></i>
                                </a>
                            
                                <a href="#_" className="flex-1 block p-3 text-center text-gray-300 transition duration-200 ease-out hover:bg-blue-100 hover:text-blue-500">
                                    <i class="fas fa-cart-plus text-xl "></i>
                                </a>
                            </div>
                        </div>
                        </Fragment>
                        );
                    })
                }
            </div>
        </div>
        </section>

			
		</Container>
		<Footer/>
		</>

    )
};

const mapStateToProps = (state) => ({
    List: state.productsReducer.products,
    //ListCat: state.catReducer.categories,
    isAuth: state.auth.isAuthenticated,
  });
  
  const mapActionToProps = {
    AllProducts: getAll,
    //AllC: getAllCat,
  };
  

export default connect (mapStateToProps, mapActionToProps) (Magasin)