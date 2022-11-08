/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect } from "react";
import "./newProduct.css";
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
  photo: [],
};

const DetailsProduct = ({ ...props }) => {
  var { values, setValues, errors, setErrors, resetForm } = useForm(
    initialFieldValues,
    props.setCurrentId
  );

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
                      Prix: {values.price} Dt
                    </label>
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Quantité: {values.quantity}
                    </label>
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
                      Categorie: {values.category.name}
                    </label>
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Fournisseur: {values.fournisseur.title}
                    </label>
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
                      Status:
                      {values.shipping === "Hors stock" && (
                        <p className="text-red-600">Hors stock</p>
                      )}
                      {values.shipping === "En stock" && (
                        <p className="text-green-600">En stock</p>
                      )}
                    </label>
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

                    <p className="block text-gray-500 text-xs font-bold mb-2">
                      {values.description}
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-12/12 px-4 ">
                <div className="relative w-full mb-3 mt--6 ">
                  <div className="px-3 py-3 placeholder-gray-400 text-gray-700 rounded text-sm focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150">
                    <div className="grid grid-cols-4 gap-4">
                      {values.photo?.map((img, index) => {
                        return (
                          <Fragment key={index}>
                            <div className="transform transition duration-500 hover:scale-150">
                              <img
                                className="img-fluid rounded shadow"
                                src={img}
                                alt=""
                              />
                            </div>
                          </Fragment>
                        );
                      })}
                    </div>
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
