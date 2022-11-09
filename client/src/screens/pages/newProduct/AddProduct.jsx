/* eslint-disable no-sequences */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { Publish } from "@material-ui/icons";
import { connect } from "react-redux";
import {
  addProduct,
  updateProduct,
} from "../../../redux/reducers/productReducer";
import { getAllCat } from "../../../redux/reducers/catReducer";
import { getAllFou } from "../../../redux/reducers/forReducer";

const initialFieldValues = {
  name: "",
  description: "",
  category: "",
  fournisseur: "",
  shipping: "",
  photo: [],
  success: false,
  error: false,
};

const AddProduct = ({ ...props }) => {
  const [product, setProduct] = useState(initialFieldValues);
  const [ShowImg, setShowImg] = useState(false);
  const ImgStyle = {
    width: "80px",
    height: "80px",
  };

  useEffect(() => {
    props.All();
    props.AllF();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    props.createP(product);
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleFileUpload = async (e) => {
    const files = [...e.target.files];
    files.forEach((file) => {
      convertToBase64(file).then((res) => {
        setProduct({ ...product, photo: [...product.photo, res] });
      });
    });
    setShowImg(true);
  };

  const onDelete = (e) => {
    const filtered = product.photo.filter((item, index) => index !== e);
    setProduct({ ...product, photo: filtered });
  };

  return (
    <>
      <div className="items-center">
        <div className=" rounded-lg bg-gray-200 border-0">
          <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
              <h6 className="text-gray-800 text-xl font-bold">
                Ajouter un produit
              </h6>
              <div className=" text-right">
                <span
                  onClick={() => {
                    props.setShowModal(false);
                  }}
                  className=" text-red-500 onClick"
                >
                  <i className="fas fa-times" />
                </span>
              </div>
            </div>
          </div>
          <div className="">
            <form onSubmit={handleSubmit} className="items-center">
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
                      Status
                    </label>
                    <select
                      name="shipping"
                      value={product.shipping}
                      onChange={handleChange}
                      className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                    >
                      <option value="">Choisis une option</option>
                      <option value="En stock">En Stock</option>
                      <option value="Hors stock">Hors Stock</option>
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
                      Catégorie
                    </label>

                    <select
                      name="category"
                      value={product.category}
                      onChange={handleChange}
                      className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                    >
                      <option value="">Choisis une option</option>
                      {props.ListCat.map((cat, index) => {
                        return (
                          <option key={index} value={cat._id}>
                            {cat.name}
                          </option>
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
                      htmlFor="grid-password"
                    >
                      Fournisseur
                    </label>

                    <select
                      name="fournisseur"
                      value={product.fournisseur}
                      onChange={handleChange}
                      className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                    >
                      <option value="">Choisis une option</option>
                      {props.ListFou.map((f, index) => {
                        return (
                          <option key={index} value={f._id}>
                            {f.title}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap"></div>

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
                  <div className="relative w-full mb-3 text-center">
                    <label
                      className="block uppercase text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Photo
                    </label>
                    <div className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150">
                      <label className="custom-file-upload form-control-label btn border-info text-info">
                        Choisir un fichier
                        <Publish />
                        <input
                          className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                          type="file"
                          multiple={true}
                          name="photo"
                          accept=".jpeg, .png, .jpg"
                          onChange={(e) => handleFileUpload(e)}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              {ShowImg && (
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-12/12 px-4 ">
                    <div className="relative w-full mb-3 mt--6 ">
                      <div className="px-3 py-3 placeholder-gray-400 text-gray-700 rounded text-sm focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150">
                        <div className="grid grid-cols-4 gap-4">
                          {product.photo.map((img, index) => {
                            return (
                              <Fragment key={index}>
                                <div className="text-center">
                                  <i
                                    className="btn btn-sm btn-danger shadow-none--hover shadow-none fas fa-times onClick text-red-700"
                                    onClick={() => onDelete(index)}
                                  ></i>
                                  <img
                                    style={ImgStyle}
                                    className="img-fluid rounded shadow avatar avatar-lg mr-2"
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
                </div>
              )}
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

export default connect(mapStateToProps, mapActionToProps)(AddProduct);
