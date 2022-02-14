/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, Fragment } from "react";
import "./productList.css";
import Sidebar from "../../../components/sidebar/Sidebar";
import { connect } from "react-redux";
import { getAll, deleteProduct } from "../../../redux/reducers/productReducer";
import NewProduct from "../newProduct/NewProduct";
import { Link } from "react-router-dom";



const ProductList = (props) => {

  const [currentId, setCurrentId] = useState(0);

  useEffect(() => {
    props.AllProducts();
  }, []);

  const onDLP = (id) => {
    const onSuccess = () => {
      window.location.reload();
    };
    if(window.confirm("Êtes-vous sûr de vouloir supprimer ?"))

      props.DeleteProducts(id, onSuccess);
      
  };


  return (
<>
<div className="containerr">
        <Sidebar />
  <div className="productList">
    <div className="card">
      <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-gray-800 text-xl font-bold">
              List des produits 
            </h6>
            <Link to="/dashboard/admin/addproduct" className="link">
              <i className='fas fa-plus' />
            </Link>
          </div>
        </div>
      <br></br>
      
      <table className="widgetLgTable">
        <thead className="border-b border-gray-60">
          <tr className="border-b border-gray-600  ">
            <th className="widgetLgTh ">Nom</th>
            <th className="widgetLgTh ">Description</th>
            <th className="widgetLgTh ">Quantité</th>
            <th className="widgetLgTh ">Prix</th>
            <th className="widgetLgTh ">Status</th>
            <th className="widgetLgTh ">Image</th>
            <th className="widgetLgTh ">Categorie</th>
            <th className="widgetLgTh ">Fournisseur</th>
            <th className="widgetLgTh "></th>
            <th className="widgetLgTh "></th>
          </tr>
        </thead>
        <tbody>
          {props.List.map((product, index) => {
                    return (
          <Fragment key={index}>           
              <tr className="border-b border-gray-200 hover:bg-gray-100" key={product._id}>
                <td className="widgetLgDate ">{product.name}</td>
                <td className="widgetLgDate ">{product.description}</td>
                <td className="widgetLgDate ">{product.quantity}</td>
                <td className="widgetLgDate ">{product.price}</td>           
                <td className="widgetLgAmount ">{product.shipping}</td>
                <td className="widgetLgAmount ">
                    <div className="productListItem">
                      <img className="productListImg" src={product.photo}  alt="" /> 
                    </div>
                </td>
                <td className="widgetLgAmount">{product.category.name}</td>
                <td className="widgetLgAmount item-center">{product.fournisseur.title}</td>
                <td className="py-3 px-6 text-center">
                                    <div className="flex item-center justify-center">  
                                        <div onClick={() => setCurrentId(product._id)}
                                             className="w-6 mr-2 transform hover:text-blue-500 hover:scale-110">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                            </svg>
                                        </div>
                                        <div onClick={() => onDLP(product._id)}
                                             className="w-6 mr-2 transform hover:text-red-500 hover:scale-110">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </div>
                                    </div>
                </td>

              </tr>
            </Fragment>
            );
          })}
        </tbody>

      </table>
     

    <br /> 
    <label className="block uppercase text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
      Cliquer sur + pour ajouter un nouveau produit
    </label>

    </div>
    
    { currentId !== 0 && (
        <div>
          <NewProduct {...{ currentId, setCurrentId }} />
        </div>   
      )
    }



  
</div>




   
  </div>

</>


  );
};


const mapStateToProps = (state) => ({
  List: state.productsReducer.products,
  isAuth: state.auth.isAuthenticated,
});

const mapActionToProps = {
  AllProducts: getAll,
  DeleteProducts: deleteProduct,
};


export default connect ( mapStateToProps, mapActionToProps )(ProductList);

/*
    <div>
    <LineCharts
      data={proStats}
      title="Produits Statistiques"
      grid
      dataKey="Quantity"
    />
    </div>


                    <td className="widgetLgAmount">
                    <div className="productListItem">
                      <img className="productListImg" src={product.photo} alt={product.photo} /> 
                    </div>
                </td>
*/
