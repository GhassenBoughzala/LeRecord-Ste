import React, { useEffect, useState } from "react";
import "./newProduct.css";
import { toast } from 'react-toastify';
import { connect } from "react-redux";
import useForm from "../useForm";
import { Publish } from "@material-ui/icons";
import {addProduct, updateProduct} from "../../../redux/reducers/productReducer";
import { getAllCat } from "../../../redux/reducers/catReducer";
import { getAllFou  } from "../../../redux/reducers/forReducer";
import FileBase64 from 'react-file-base64';

const initialFieldValues = {
    name:"",
    description: "",
    price : "",
    quantity: "",
    category: "",
    fournisseur: "",
    shipping: "",
    photo: "",
}

const Add = ({ ...props }) => {

  var {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  } = useForm(initialFieldValues, props.setCurrentId);

  useEffect(() => {
    props.All();
    props.AllF();
  }, []);

  useEffect(() => {
    if (props.currentId !== 0) {
      setValues({
        ...props.List.find((p) => p._id === props.currentId),
      });
      setErrors({});
    }

  }, [props.currentId]);

  const validate = () => {
    let temp = {...errors};
    temp.name = values.name ? "" : "This field is required.";
    temp.description = values.description ? "" : "This field is required.";
    temp.price = values.price ? "" : "This field is required.";
    temp.quantity = values.quantity ? "" : "This field is required.";
    temp.category = values.category ? "" : "This field is required.";
    temp.fournisseur = values.fournisseur ? "" : "This field is required.";
    temp.shipping = values.shipping ? "" : "This field is required.";
    temp.photo = values.photo ? "" : "This field is required.";
   
    setErrors({...temp,});
    return Object.values(temp).every((p) => p === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();    
    const onSuccess = () => {
      window.location.reload();
      resetForm();
    };

    if (validate()) {
      if (props.currentId === 0){

          props.createP(values, onSuccess);
          console.log(props)
          toast.success('Ajouté avec succès');
          resetForm();
          window.location.reload();
       
      } else {

          toast.info('Mis à jour avec succés');
          props.updateP(props.currentId, values, onSuccess);
        
      }   

    }else { toast.error('Warning ! '); }
  };


  const reset = (e) => { resetForm(); }

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-gray-800 text-xl font-bold">
              Ajouter ou Editer  
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
                    value={values.name}
                    onChange={handleInputChange}
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
                    value={values.quantity}
                    onChange={handleInputChange}
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
                          onChange={handleInputChange}
                          value={values.category}
                          className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150">
                      <option value="">Choisis une option</option>
                      {props.ListCat.map((cat) => {
                        return ( 
                          <option value={cat._id}>{cat.name}</option>
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
                          onChange={handleInputChange}
                          value={values.fournisseur}
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
                    value={values.price}
                    onChange={handleInputChange}
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
                    value={values.shipping}
                    onChange={handleInputChange}
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
                    value={values.description}
                    onChange={handleInputChange}
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
                      type="text"
                      name="photo"
                      value={values.photo}
                      onChange={handleInputChange}
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
                  <button
                    type="submit"
                    onClick={() => reset()}
                    className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-1 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  >
                    Réinitialiser
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
  createP: addProduct,
  updateP: updateProduct,
};

export default connect(mapStateToProps, mapActionToProps)(Add);
