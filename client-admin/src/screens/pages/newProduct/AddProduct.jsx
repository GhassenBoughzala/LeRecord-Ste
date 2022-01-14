import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { toast } from 'react-toastify';
import { connect } from "react-redux";
import useForm from "../useForm";
import {addProductV2, updateProduct} from "../../../redux/reducers/productReducer";
import { getAllCat } from "../../../redux/reducers/catReducer";
import { getAllFou  } from "../../../redux/reducers/forReducer";
import { async } from "@firebase/util";


const initialFieldValues = {
  name:"",
  description: "",
  price : "",
  quantity: "",
  category: "",
  fournisseur: "",
  shipping: "",
  photo: "",
  success: false,
  error: false
}


const Add = ({ ...props }) => {

  const [product, setProduct] = useState(initialFieldValues);

  useEffect(() => {
    props.All();
    props.AllF();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();   
    e.target.reset();
    
    if (!product.photo) {
      setProduct({ ...product, error: "Please upload an image" });
      setTimeout(() => {
        setProduct({ ...product, error: false });
      }, 2000);
    }

    try {
      let responseData = props.createP(product);
      if (responseData.success) {
        setProduct({
          ...setProduct,
          name:"",
          description: "",
          price : "",
          quantity: "",
          category: "",
          fournisseur: "",
          shipping: "",
          photo: "",
          success: responseData.success,
          error: false,
        })
        console.log(props)
        toast.success('Ajouté avec succès');
      }  
    } catch (error) {
      console.log(error);
      
    }
  };

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-gray-800 text-xl font-bold">
              Ajouter Produit 
            </h6>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form onSubmit={(e) => handleSubmit(e)} >
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
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        error: false,
                        success: false,
                        name: e.target.value,
                      })
                    }
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
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        error: false,
                        success: false,
                        quantity: e.target.value,
                      })
                    }
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
                          onChange={(e) =>
                            setProduct({
                              ...product,
                              error: false,
                              success: false,
                              category: e.target.value,
                            })
                          }
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
                          onChange={(e) =>
                            setProduct({
                              ...product,
                              error: false,
                              success: false,
                              fournisseur: e.target.value,
                            })
                          }
                          className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150">
                      <option value="">Choisis une option</option>
                      {props.ListFou.map((f) => {
                        return ( 
                          <option value={f._id}>{f.title}</option>
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
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        error: false,
                        success: false,
                        price: e.target.value,
                      })
                    }
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

                  <input
                    type="text"
                    placeholder="En Stock"
                    name="shipping"
                    value={product.shipping}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        error: false,
                        success: false,
                        shipping: e.target.value,
                      })
                    }
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                  />
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
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        error: false,
                        success: false,
                        description: e.target.value,
                      })
                    }
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
                      name="photo"
                      accept=".jpg, .jpeg, .png"
                      value={product.photo}
                      onChange={(e) =>
                        setProduct({
                          ...product,
                          error: false,
                          success: false,
                          photo: [...e.target.files],
                        })
                      }
                      className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                  />
                 
                  
                </div>
              </div>
            </div>

            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <button
                    type="submit"
                    className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-1 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  >
                    Confirmer
                  </button>
                </div>
              </div>
            </div>
          </form>
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
  createP: addProductV2,
  updateP: updateProduct,
};

export default connect(mapStateToProps, mapActionToProps)(Add);
