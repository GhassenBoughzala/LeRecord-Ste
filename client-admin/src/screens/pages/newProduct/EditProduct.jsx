/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import "./newProduct.css";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import useForm from "../useForm";
import {
  addProduct,
  updateProduct,
} from "../../../redux/reducers/productReducer";
import { getAllCat } from "../../../redux/reducers/catReducer";
import { getAllFou } from "../../../redux/reducers/forReducer";

const initialFieldValues = {
  name: "",
  description: "",
  price: "",
  quantity: "",
  category: "",
  fournisseur: "",
  shipping: "",
  photo: "",
};

const EditProduct = ({ ...props }) => {
  var { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFieldValues, props.setCurrentId);

  //const [product, setProduct] = useState(initialFieldValues);

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
    let temp = { ...errors };
    temp.name = values.name ? "" : "This field is required.";
    temp.description = values.description ? "" : "This field is required.";
    temp.price = values.price ? "" : "This field is required.";
    temp.quantity = values.quantity ? "" : "This field is required.";
    temp.category = values.category ? "" : "This field is required.";
    temp.fournisseur = values.fournisseur ? "" : "This field is required.";
    temp.shipping = values.shipping ? "" : "This field is required.";
    temp.photo = values.photo ? "" : "This field is required.";

    setErrors({ ...temp });
    return Object.values(temp).every((p) => p === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const onSuccess = () => {
      resetForm();
    };

    if (validate()) {
      if (props.currentId !== 0) {
        props.updateP(props.currentId, values, onSuccess);
        props.setShoEditwModal(false);
      } else {
        toast.error("Erreur");
      }
    } else {
      toast.error("Warning ! ");
    }
  };
  /*
  const handlePhoto = (e) => {
    setProduct({...product, photo: e.target.files[0]});
  }
*/
  const reset = (e) => {
    resetForm();
  };

  return (
    <>
      <div className="items-center">
        <div className=" rounded-lg bg-gray-200 border-0 ">
          <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
              <h6 className="text-gray-800 text-xl font-bold">Editer</h6>
              <div className=" text-right">
                <span
                  onClick={() => {
                    props.setShoEditwModal(false);
                  }}
                  className=" text-red-500 onClick"
                > <i className="fas fa-times" /></span>
              </div>
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

                    <select
                      name="shipping"
                      value={values.shipping}
                      onChange={handleInputChange}
                      className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                    >
                      <option value={values.shipping}>{values.shipping}</option>
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
                      value={values.description}
                      onChange={handleInputChange}
                      className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap">
                <div className="w-full px-4">
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

export default connect(mapStateToProps, mapActionToProps)(EditProduct);

/*

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
                          value={values.category.name}
                          className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"> 
                          <option value="">{values.category.name}</option>

                      {props.ListCat.map((cat,index) => {
                        return ( 
                          <Fragment key={index}>  
                            <option value={cat._id}>{cat.name}</option>
                          </Fragment>
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
                          value={values.fournisseur.title}
                          className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150">
                      <option value="">{values.fournisseur.title}</option>
                      {props.ListFou.map((f, index) => {
                        return ( 
                          <Fragment key={index}>  
                            <option value={f._id}>{f.title}</option>
                          </Fragment>
                        );
                      })}
                  </select>  
                  
                </div>
              </div>
            </div>
*/
