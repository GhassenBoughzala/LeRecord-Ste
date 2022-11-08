/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect } from "react";
import "./product.css";
import "../../../components/loading.css";
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

const DetailsProduct = ({ ...props }) => {
  var { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFieldValues, props.setCurrentId);

  useEffect(() => {
    props.All();
    props.AllF();
  }, []);

  useEffect(() => {
    if (props.currentObj !== {}) {
      setValues(props.currentObj);
      setErrors({});
    }
  }, [props.currentObj]);

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
        props.updateP(props.currentObj._id, values, onSuccess);
        //props.setShoEditwModal(false);
      } else {
        toast.error("Erreur");
      }
    } else {
      toast.error("Warning ! ");
    }
  };

  return (
    <>
      <div className="items-center">
        <div className=" rounded-lg bg-gray-200 border-0 ">
          <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
              <h6 className="text-gray-800 text-xl font-bold">Details</h6>
              <div className=" text-right">
                <span
                  onClick={() => {
                    props.setShowDetailsModal(false);
                  }}
                  className=" text-red-500 onClick"
                >
                  <i className="fas fa-times" />
                </span>
              </div>
            </div>
          </div>

          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-12/12 px-4">
                  <div className="relative w-full mb-3">
                    <br></br>
                    <label
                      className="block uppercase text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Nom: {values.name}
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
              </div>

              <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Prix -
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
                    <label
                      className="block uppercase text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Categorie
                    </label>
                    <select
                      name="category"
                      value={values.category._id}
                      onChange={handleInputChange}
                      className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                    >
                      {props.ListCat.map((cat, index) => {
                        return (
                          <Fragment key={index}>
                            <option value={cat._id}> {cat.name} </option>
                          </Fragment>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Fournisseur
                    </label>

                    <select
                      name="fournisseur"
                      value={values.fournisseur._id}
                      onChange={handleInputChange}
                      className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                    >
                      {props.ListFou.map((fo, index) => {
                        return (
                          <Fragment key={index}>
                            <option value={fo._id}> {fo.title} </option>
                          </Fragment>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Status
                    </label>
                    {values.shipping === "En stock" ? (
                      <button
                        disabled
                        className="bg-green-600 text-white active:bg-gray-700 text-sm font-bold px-1 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      >
                        En stock
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          setValues({ ...values, shipping: "En stock" })
                        }
                        className="bg-gray-600 text-white active:bg-gray-700 text-sm font-bold px-1 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      >
                        En stock
                      </button>
                    )}
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-700 text-xs font-bold mb-2 opacity-0"
                      htmlFor="grid-password"
                    >
                      Status
                    </label>
                    {values.shipping === "Hors stock" ? (
                      <button
                        disabled
                        className="bg-red-600 text-white active:bg-gray-700 text-sm font-bold px-1 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      >
                        Hors stock
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          setValues({ ...values, shipping: "Hors stock" })
                        }
                        className="bg-gray-600 text-white active:bg-gray-700 text-sm font-bold px-1 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      >
                        Hors stock
                      </button>
                    )}
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
                    {props.isLoadingCreate ? (
                      <button
                        disabled
                        className="bg-gray-700 text-white active:bg-gray-700 text-sm font-bold uppercase px-1 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      >
                        <div id="loadingbtn"></div>
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-1 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      >
                        Confirmer
                      </button>
                    )}
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
  isLoadingCreate: state.productsReducer.updateLoader,
});

const mapActionToProps = {
  All: getAllCat,
  AllF: getAllFou,
  createP: addProduct,
  updateP: updateProduct,
};

export default connect(mapStateToProps, mapActionToProps)(DetailsProduct);