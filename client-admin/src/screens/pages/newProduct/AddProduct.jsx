import React, { useEffect, useState } from "react";
import axios from 'axios';
import Sidebar from "../../../components/sidebar/Sidebar";
import "./newProduct.css";
import { toast } from 'react-toastify';
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {addProduct, updateProduct} from "../../../redux/reducers/productReducer";
import { getAllCat } from "../../../redux/reducers/catReducer";
import { getAllFou  } from "../../../redux/reducers/forReducer";
import { URLDevelopment } from '../../../helpers/url';

const initialFieldValues = {
  name:"",
  description: "",
  price : "",
  quantity: "",
  category: "",
  fournisseur: "",
  shipping: "",
  photo: null,
  success: false,
  error: false
}

const Add = ({ ...props }) => {

  const [product, setProduct] = useState(initialFieldValues);
  const history = useHistory()
  
  useEffect(() => {
    props.All();
    props.AllF();
  });


  const handleSubmit = async (e) => {

      e.preventDefault();
      const formData = new FormData();
      formData.append('photo', product.photo);
      formData.append('name', product.name);
      formData.append("description", product.description);
      formData.append("price", product.price);
      formData.append("quantity", product.quantity);
      formData.append("category", product.category);
      formData.append("fournisseur", product.fournisseur);
      formData.append("shipping", product.shipping);

    if (!product.photo) {
      setProduct({ ...product, error: "Please upload an image" });
      toast.warn('Photo est requise !');
      setTimeout(() => {
        setProduct({ ...product, error: false });
      }, 2000);
    }

    try {

      //props.createP(product);
      axios.post(`${URLDevelopment}/api/products`, formData)
      .then(res => {
         console.log(res);
         toast.success('Ajouté avec succès');
      })
      .catch(err => {
         console.log(err);
         toast.error('Erreur');
      });
        console.log(product);
        
        setTimeout(() => {
          history.push('/dashboard/admin/products');
        }, 2000);
       
    } catch (error) {
      console.log(error);
      toast.error('Erreur !');
      
    }
  };

  const handleChange = (e) => {
    setProduct({...product, [e.target.name]: e.target.value});
  }

  const handlePhoto = (e) => {
    setProduct({...product, photo: e.target.files[0]});
  }



  return (
    <>
<div className="containerr">
        <Sidebar />
    <div className="productList">
    <div className="widgetLg">
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-gray-800 text-xl font-bold">
              Ajouter un Produit 
            </h6>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <br></br>
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Nom
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                  />
                </div>
                
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <br></br>
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Quantité
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    value={product.quantity}
                    onChange={handleChange}
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">

                  <br></br>
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password">
                    Catégorie
                  </label>

                  <select name="category" 
                          value={product.category}
                          onChange={handleChange}
                          className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150">
                      <option value="">Choisis une option</option>
                      {props.ListCat.map((cat,index) => {
                        return ( 
                          
                            <option key={index} value={cat._id}>{cat.name}</option>
                          
                        );
                      })}
                  </select>  

                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <br></br>
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password">
                    Fournisseur
                  </label>
                    
                  <select name="fournisseur" 
                          value={product.fournisseur}
                          onChange={handleChange}
                          className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150">
                      <option value="">Choisis une option</option>
                      {props.ListFou.map((f, index) => {
                        return ( 
                          <option key={index} value={f._id}>{f.title}</option>
                        );
                      })}
                  </select>  
                  
                </div>
              </div>
            </div>

            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <br></br>
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Prix
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <br></br>
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Status
                  </label>
                  <select name="shipping" 
                          value={product.shipping}
                          onChange={handleChange}
                          className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150">
                      <option value="">Choisis une option</option>
                      <option value="En stock">En Stock</option>
                      <option value="Hors stock">Hors Stock</option>
                      
                  </select>  
                </div>
              </div>
            </div>

            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Description
                  </label>
                  <textarea
                    type="text"
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Photo
                  </label>
                  <input 
                       type="file" 
                       multiple
                       accept=".png, .jpg, .jpeg"
                       name="photo"
                       onChange={handlePhoto}
                      className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                  />
                 
                  
                </div>
              </div>
            </div>

            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <button
                    type="submit"
                    className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-1 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  >
                    Confirmer
                  </button>
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                <Link to="/dashboard/admin/products" className="link">
                  <button
                    type="submit"
                    className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-1 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  >
                    Retour
                  </button>
                </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
</div>
    </>

  );
};



const mapStateToProps = (state) => ({
    List: state.productsReducer.products,
    ListCat: state.catReducer.categories,
    ListFou: state.forReducer.fournisseurs,
});

const mapActionToProps = {
  All: getAllCat,
  AllF: getAllFou,
  createP: addProduct,
  updateP: updateProduct,
};

export default connect(mapStateToProps, mapActionToProps)(Add);
