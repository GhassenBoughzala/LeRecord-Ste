/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, Fragment } from "react";
import "./productList.css";
import "../../../components/loading.css";
import "../../../components/modal.css";
import Sidebar from "../../../components/sidebar/Sidebar";
import { connect } from "react-redux";
import { getAll, deleteProduct } from "../../../redux/reducers/productReducer";
import { Link } from "react-router-dom";
import Topbar from "../../../components/topbar/Topbar";
import { motion, AnimatePresence } from "framer-motion";
import AddProduct from "../newProduct/AddProduct";
import EditProduct from "../newProduct/EditProduct";
import usePrevious from "../../../helpers/usePrevios";
import { toast } from "react-toastify";
const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};
const modal = {
  hidden: { y: "-100vh", opacity: 0 },
  visible: {
    y: "50px",
    opacity: 1,
    transition: { delay: 0.5 },
  },
};

const ProductList = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShoEditwModal] = useState(false);
  const [currentId, setCurrentId] = useState(0);
  const [currentObj, setCurrentObj] = useState({});

  useEffect(() => {
    props.AllProducts();
  }, []);

  const onDLP = (id) => {
    const onSuccess = () => {
      window.location.reload();
    };
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ?"))
      props.DeleteProducts(id, onSuccess);
  };

  const prev_loading = usePrevious(props.isLoadingCreate);
  useEffect(() => {
    if (prev_loading && !props.isLoadingCreate) {
      if (props.CodeMsg === 1) {
        props.AllProducts();
        setShoEditwModal(false)
        toast.info("Mis à jour avec succés");
      }
      if (props.CodeMsg === 0) {
        toast.error("Problème lors de l'ajout !");
      }
    }
  }, [props.isLoadingCreate, props.List]);

  return (
    <>
      <div className="containerr">
        <Sidebar />
        <div className="productList">
          <Topbar />

          <div className="card">
            {props.isLoading || props.isLoadingCreate ? (
              <div className="text-center my-3">
                <div id="loading"></div>
              </div>
            ) : (
              <>
                <div className="rounded-t bg-white mb-0 ">
                  <div className="text-center flex justify-between">
                    <h6 className="text-gray-800 text-xl font-bold">
                      List des produits
                    </h6>
                    <Link
                      to="#"
                      onClick={() => setShowModal(true)}
                      className="link"
                    >
                      <i className="fas fa-plus" />
                    </Link>
                  </div>
                </div>
                <br></br>

                <table className="widgetLgTable">
                  <thead className="border-b border-gray-60">
                    <tr className="border-b border-gray-600 text-left ">
                      <th>Nom</th>
                      <th>Description</th>
                      <th>Quantité</th>
                      <th>Prix</th>
                      <th>Status</th>
                      <th>Image</th>
                      <th>Categorie</th>
                      <th>Fournisseur</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.List.map((product, index) => {
                      return (
                        <Fragment key={index}>
                          <tr
                            className="border-b border-gray-200 hover:bg-gray-100"
                            key={product._id}
                          >
                            <td className="widgetLgDate ">{product.name}</td>
                            <td className="widgetLgDate ">
                              {product.description}
                            </td>
                            <td className="widgetLgDate ">
                              {product.quantity}
                            </td>
                            <td className="widgetLgDate ">{product.price}</td>
                            <td className="widgetLgAmount ">
                              {product.shipping}
                            </td>
                            <td className="widgetLgAmount ">
                              <div className="productListItem">
                                <img
                                  className="productListImg"
                                  src={product.photo}
                                  alt=""
                                />
                              </div>
                            </td>
                            <td className="widgetLgAmount">
                              {product.category.name}
                            </td>
                            <td className="widgetLgAmount item-center">
                              {product.fournisseur.title}
                            </td>
                            <td className="py-3 px-6 text-center">
                              <div className="flex item-center justify-center">
                                <div
                                  onClick={() => {
                                    setCurrentObj(product);
                                    setShoEditwModal(true);
                                  }}
                                  className="w-6 mr-2 transform hover:text-blue-500 hover:scale-110 onClick"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                    />
                                  </svg>
                                </div>
                                <div
                                  onClick={() => onDLP(product._id)}
                                  className="w-6 mr-2 transform hover:text-red-500 hover:scale-110 onClick"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
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
                <label
                  className="block uppercase text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Cliquer sur + pour ajouter un nouveau produit
                </label>
              </>
            )}
          </div>

          <AnimatePresence
            exitBeforeEnter
            showModal={showEditModal}
            setShowModal={setShoEditwModal}
          >
            {showEditModal && (
              <motion.div
                className="backdrop"
                variants={backdrop}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <motion.div className="lg:w-1/3 center" variants={modal}>
                  <EditProduct
                    {...{
                      currentObj,
                      setCurrentObj,
                      setShoEditwModal,
                      showEditModal,
                    }}
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <AnimatePresence
          exitBeforeEnter
          showModal={showModal}
          setShowModal={setShowModal}
        >
          {showModal && (
            <motion.div
              className="backdrop"
              variants={backdrop}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <motion.div className="lg:w-1/3 center" variants={modal}>
                <AddProduct
                  {...{ currentId, setCurrentId, showModal, setShowModal }}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  List: state.productsReducer.products,
  isAuth: state.auth.isAuthenticated,
  isLoading: state.productsReducer.ploader,
  isLoadingCreate: state.productsReducer.updateLoader,
  CodeMsg: state.productsReducer.codemsg
});

const mapActionToProps = {
  AllProducts: getAll,
  DeleteProducts: deleteProduct,
};

export default connect(mapStateToProps, mapActionToProps)(ProductList);

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
