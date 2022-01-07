import React, { useEffect, useState, Fragment } from "react";
import "./productList.css";
import Sidebar from "../../../components/sidebar/Sidebar";
import { toast } from 'react-toastify';
import { connect } from "react-redux";
import axios from 'axios';
import { URLDevelopment } from '../../../helpers/url';
import { getAll, deleteProduct } from "../../../redux/reducers/productReducer";
import NewProduct from "../newProduct/NewProduct";
import LineCharts from "../../../components/chart/LineChart";

const ProductList = (props) => {

  const [currentId, setCurrentId] = useState(0);
  const [proStats, setProStats] = useState([]);
  useEffect(() => {
    props.AllProducts();
    
    const getStats = async () => {
      try {
        const res = axios.get(`${URLDevelopment}/api/products/search`);
        res.data.map((item) =>
          setProStats((prev) => [
            ...prev,
            { name: item.name , "Quantité": item.quantity },
          ]),
          console.log(res)
        );
      } catch {}
    };
    getStats();

  }, []);

  const onDLP = (id) => {
    const onSuccess = () => {
      window.location.reload();
    };
    if(window.confirm("Are you sure to delete ?"))
      toast.info(`Deleted successfully !`);
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
          </div>
        </div>
      <br></br>
      <table className="widgetLgTable">
        <thead>
          <tr className="widgetLgTr">
            <th className="widgetLgTh">Nom</th>
            <th className="widgetLgTh">Description</th>
            <th className="widgetLgTh">Quantité</th>
            <th className="widgetLgTh">Prix</th>
            <th className="widgetLgTh">Status</th>
            <th className="widgetLgTh">Photo</th>
            <th className="widgetLgTh text-center"><i className='fas fa-edit w-6 -ml-2' /></th>
            <th className="widgetLgTh text-center"><i className='mt-1 fas fa-trash-alt' /></th>
          </tr>
        </thead>
        <tbody>
          {props.List.map((product, index) => {
                    return (
          <Fragment key={index}>           
              <tr className="widgetLgTr" key={product._id}>
                <td className="widgetLgDate">{product.name}</td>
                <td className="widgetLgDate">{product.description}</td>
                <td className="widgetLgDate">{product.quantity}</td>
                <td className="widgetLgDate">{product.price}</td>           
                <td className="widgetLgAmount">{product.shipping}</td>
                <td className="widgetLgAmount">
                    <div className="productListItem">
                      <img className="productListImg" src={product.photo} alt="" /> {product.photo}
                    </div>
                </td>

                <td className="widgetLgStatus">
                  <button
                    type='submit'
                    onClick={() => setCurrentId(product._id)}
                    className='mt-1 tracking-wide font-semibold bg-blue-500 text-gray-100 w-full py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                  > Editer </button>                                       
                </td>
                <td className="widgetLgStatus">
                <button
                    type='submit'
                    onClick={() => onDLP(product._id)}
                    className='mt-1 tracking-wide font-semibold bg-red-500 text-gray-100 w-full py-2 rounded-lg hover:bg-red-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                  > Supprimer </button>
                </td>
              </tr>
            </Fragment>
            );
          })}
        </tbody>

      </table>
    </div>



  </div>




    <div className="w-full lg:w-4/12 px-4">
          <NewProduct {...{ currentId, setCurrentId }} />
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
*/
