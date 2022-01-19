import React, { useEffect, useState, Fragment } from "react";
import "./productList.css";
import Sidebar from "../../../components/sidebar/Sidebar";
import { toast } from 'react-toastify';
import { connect } from "react-redux";
import { getAll, deleteProduct } from "../../../redux/reducers/productReducer";
import ProductDetails from "../product/Product"
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
    <div className="widgetLg">
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
              <tr className="border-b border-gray-600 " key={product._id}>
                <td className="widgetLgDate ">{product.name}</td>
                <td className="widgetLgDate ">{product.description}</td>
                <td className="widgetLgDate ">{product.quantity}</td>
                <td className="widgetLgDate ">{product.price}</td>           
                <td className="widgetLgAmount ">{product.shipping}</td>
                <td className="widgetLgAmount ">
                    <div className="productListItem">
                      <img className="productListImg" src={`/uploads/${product.photo}`} alt={product.photo} /> 
                    </div>
                </td>
                <td className="widgetLgAmount">{product.category.name}</td>
                <td className="widgetLgAmount">{product.fournisseur.title}</td>
                <td className="">
                  <i onClick={() => setCurrentId(product._id)}
                     className='fas fa-edit fa hover:text-blue-500' />                  
                </td>
                <td className="">
                  <i onClick={() => onDLP(product._id)}
                     className='fas fa-trash-alt fa hover:text-red-500' /> 
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
        <div className="widgetLg">
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
