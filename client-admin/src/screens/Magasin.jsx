/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, Fragment } from "react";
import Container from '../components/container/container.component'
import Footer from '../components/home/Footer'
//import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getAll } from "../redux/reducers/productReducer";
import Pagination from "../components/home/Pagination"; 
//import { getAllCat } from "../redux/reducers/catReducer";


const Magazin = (props) => {

    const [Search, setSearch] = useState('');

    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(3);

    useEffect(() => {
        setPosts(props.AllProducts()) 
      }, []);

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.toString().slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
		<>
		<Container>	
            

        <section className="w-full py-12 bg-white lg:py-24">
        <div className="max-w-6xl px-12 mx-auto text-center">
            <div className="space-y-12 md:text-center">
                <div className="max-w-3xl mb-20 space-y-5 sm:mx-auto sm:space-y-4">
                    <h2 className="relative text-4xl font-extrabold tracking-tight sm:text-5xl">Catalogue</h2>
                    <p className="text-xl text-gray-500"> Notre gamme comprends une large ligne de produits de confection ,dont vous trouverez les détails dans ce catalogue, étignettes de lancements, les étigueteuses, fer à repasser, une diversité des ciseaux, l’huile blanche, détacher...       
                        </p>
                
                    <div className="flex bg-gray-100 p-4 w-72 space-x-4 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input  className="bg-gray-100 outline-none" 
                                type="text" 
                                placeholder="Cherchez un produit..."
                                onChange={(event) => { setSearch(event.target.value); }} />
                    </div>
                </div>

            </div>

            <div posts={currentPosts} className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
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
                                <p className="font-medium text-gray-400">{product.category.name}</p>
                            </div>

                          

                        </div>
                        </Fragment>
                        );
                    })
                }
            </div>
            <Pagination
                postsPerPage={postsPerPage}
                totalPosts={posts.length}
                paginate={paginate}
            />
        </div>
        </section>

			
		</Container>
		<Footer/>
		</>

    )
};

const mapStateToProps = (state) => ({
    List: state.productsReducer.products,
    Cat: state.catReducer.categories,
    isAuth: state.auth.isAuthenticated,
  });
  
  const mapActionToProps = {
    AllProducts: getAll,
    //AllC: getAllCat,
  };
  

export default connect (mapStateToProps, mapActionToProps) (Magazin)



/*//Product Details 

  <div className="flex border-t border-gray-200 divide-x divide-gray-200">                     
                                
                                    <Link to={`/produit/${product._id}`} className="flex-1 block p-3 text-center text-gray-300 transition duration-200 ease-out hover:bg-blue-100 hover:text-blue-500">
                                        <i className="far fa-eye text-xl"></i>
                                    </Link>  
                                     
                                <a href="#_" className="flex-1 block p-3 text-center text-gray-300 transition duration-200 ease-out hover:bg-blue-100 hover:text-blue-500">
                                    <i className="fas fa-cart-plus text-xl "></i>
                                </a>

                            </div>

*/