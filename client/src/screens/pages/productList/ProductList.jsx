/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, Fragment, useMemo } from "react";
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
import DetailsProduct from "../newProduct/DetailsProduct";
import PaginationComponent from "../../../helpers/pagination";
import { getAllCat } from "../../../redux/reducers/catReducer";
const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};
const modal = {
  hidden: { y: "-100vh", opacity: 0 },
  visible: {
    y: "0px",
    opacity: 1,
    transition: { delay: 0.5 },
  },
};

const ProductList = (props) => {
  useEffect(() => {
    props.AllProducts();
    props.AllCategories();
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [showEditModal, setShoEditwModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [currentId, setCurrentId] = useState(0);
  const [currentObj, setCurrentObj] = useState({});
  const [currentImg, setCurrentImg] = useState([]);
  const [Search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [SearchCat, setSearchCat] = useState("");
  const offresPerPage = 10;

  const data = props.List;
  const productsData = useMemo(() => {
    let computed = data;
    if (Search) {
      computed = computed.filter((i) =>
        i.name.toLowerCase().includes(Search?.toLowerCase())
      );
    }
    if (SearchCat) {
      computed = computed.filter((i) =>
        i.category.name.includes(SearchCat)
      );
    }
    setPageNumber(computed.length);
    return computed.slice(
      (currentPage - 1) * offresPerPage,
      (currentPage - 1) * offresPerPage + offresPerPage
    );
  }, [data, currentPage, Search, SearchCat]);

  const onDLP = (id) => {
    const onSuccess = () => {
      window.location.reload();
    };
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ?"))
      props.DeleteProducts(id, onSuccess);
  };

  const prev_loadingCreate = usePrevious(props.isLoadingCreate);
  const prev_loadingUpdate = usePrevious(props.isLoadingUpdate);

  useEffect(() => {
    if (prev_loadingCreate && !props.isLoadingCreate) {
      if (props.CodeMsg === 1) {
        props.AllProducts();
        setShowModal(false);
        toast.success("Ajout avec Succés");
      }
      if (props.CodeMsg === 0) {
        toast.error("Problème lors de l'ajout !");
      }
    }
  }, [props.isLoadingCreate, props.List]);

  useEffect(() => {
    if (prev_loadingUpdate && !props.isLoadingUpdate) {
      if (props.CodeMsg === 1) {
        props.AllProducts();
        setShoEditwModal(false);
        toast.success("Modification avec Succés");
      }
      if (props.CodeMsg === 0) {
        toast.error("Problème lors de la modification !");
      }
    }
  }, [props.isLoadingUpdate, props.List]);

  return (
    <>
      <div className="containerr">
        <Sidebar />
        <div className="productList">
          <Topbar />

          <div className="card">
            {props.isLoading || props.isLoadingCreate || props.isLoadingUpdate ? (
              <div className="text-center my-3 px-32 py-32">
                <div id="loading"></div>
              </div>
            ) : (
              <>
                <div className="rounded-t bg-white mb-0 ">
                  <div className="text-center flex justify-between">
                    <h6 className="text-gray-800 bg-transparent text-xl font-bold">
                      List des produits:
                    </h6>
                    <Link
                      to="#"
                      onClick={() => setShowModal(true)}
                      className="link"
                    >
                      <i className="fas fa-plus" />
                    </Link>
                  </div>
                  <div className="grid grid-cols-6 gap-4 mt-4 mb-2">
                    <div className="felx rounded-lg col-start-1 col-end-3">
                      <i className="fas fa-search my-2 mx-2" />
                      <input
                        className="outline-none"
                        type="text"
                        placeholder="Cherchez un produit..."
                        onChange={(event) => {
                          setSearch(event.target.value);
                          setCurrentPage(1);
                        }}
                      />
                    </div>

                    <div className="flex bg-gray-100 w-12 rounded-lg col-end-7 col-span-2">
                      <i className="fas fa-filter my-2 mx-2"></i>
                      <select
                        className="flex bg-gray-100 rounded-lg"
                        value={SearchCat}
                        onChange={(event) => {
                          setSearchCat(event.target.value);
                          setCurrentPage(1);
                        }}
                      >
                        <option value={""} >Catégories</option>
                        {props.ListCat.map((c, index) => {
                          return (
                            <Fragment key={index}>
                              <option value={c.name}>{c.name}</option>
                            </Fragment>
                          );
                        })}
                      </select>
                      <button
                        className="my-2 mx-2 flex rounded-lg w-6 mr-2 transform hover:text-blue-500 hover:scale-120 ease-in duration-100 onClick"
                        onClick={() => {
                          setSearchCat("");
                        }}
                      >
                        <i className="fas fa-redo"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <br></br>

                <table className="widgetLgTable">
                  <thead className="border-b border-gray-60">
                    <tr className="border-b border-gray-600 text-left ">
                      <th>Nom</th>
                      <th>Status</th>
                      <th>Image</th>
                      <th>Categorie</th>
                      <th>Fournisseur</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {productsData.map((product, index) => {
                      return (
                        <Fragment key={index}>
                          <tr
                            className="border-b border-gray-200 hover:bg-gray-100"
                            key={product._id}
                          >
                            <td className="widgetLgDate"> {product.name}</td>

                            <td className="widgetLgAmount">
                              {product.shipping === "Hors stock" && (
                                <p className="text-red-600">Hors stock</p>
                              )}
                              {product.shipping === "En stock" && (
                                <p className="text-green-600">En stock</p>
                              )}
                            </td>
                            <td className="widgetLgAmount ">
                              <div
                                className="productListItem onClick"
                                onClick={() => {
                                  setShowImage(true);
                                  setCurrentImg(product.photo);
                                }}
                              >
                                {product.photo.map((img, index) => {
                                  return (
                                    <Fragment key={index}>
                                      <img
                                        className="productListImg hover:scale-150"
                                        src={img}
                                        alt=""
                                      />
                                    </Fragment>
                                  );
                                })}
                              </div>
                            </td>
                            <td className="widgetLgAmount">
                              {product.category?.name}
                            </td>
                            <td className="widgetLgAmount item-center">
                              {product.fournisseur?.title}
                            </td>
                            <td className="py-3 px-6 text-center">
                              <div className="flex item-center justify-center">
                                <div
                                  onClick={() => {
                                    setCurrentObj(product);
                                    setShowDetailsModal(true);
                                  }}
                                  className="w-6 mr-2 transform hover:text-green-500 hover:scale-150 ease-in duration-100 onClick border-0"
                                >
                                  <i className="far fa-eye"></i>
                                </div>
                                <div
                                  onClick={() => {
                                    setCurrentObj(product);
                                    setShoEditwModal(true);
                                  }}
                                  className="w-6 mr-2 transform hover:text-blue-500 hover:scale-150 ease-in duration-100 onClick"
                                >
                                  <i className="far fa-edit"></i>
                                </div>

                                <div
                                  onClick={() => onDLP(product._id)}
                                  className="w-6 mr-2 transform hover:text-red-500 hover:scale-150 ease-in duration-100 onClick border-0"
                                >
                                  <i className="fas fa-trash text-sm"></i>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </Fragment>
                      );
                    })}
                  </tbody>
                </table>

                <div className="my-6 text-center">
                  <PaginationComponent
                    total={pageNumber}
                    itemsPerPage={offresPerPage}
                    currentPage={currentPage}
                    onPageChange={(page) => setCurrentPage(page)}
                  />
                </div>
              </>
            )}
          </div>
          {/* Edit Interface */}
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
                <motion.div
                  className="lg:w-1/3 lg:h-full center overflow-y-auto"
                  variants={modal}
                >
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
          {/* Show Details Interface */}
          <AnimatePresence
            exitBeforeEnter
            showModal={showDetailsModal}
            setShowModal={setShowDetailsModal}
          >
            {showDetailsModal && (
              <motion.div
                className="backdrop"
                variants={backdrop}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <motion.div
                  className="lg:w-1/3 lg:h-full center overflow-y-auto"
                  variants={modal}
                >
                  <DetailsProduct
                    {...{
                      currentObj,
                      setCurrentObj,
                      setShowDetailsModal,
                      showDetailsModal,
                    }}
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          {/* Show Image Interface */}
          <AnimatePresence
            exitBeforeEnter
            showModal={showImage}
            setShowModal={setShowImage}
          >
            {showImage && (
              <motion.div
                className="backdrop"
                variants={backdrop}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <motion.div
                  className="lg:w-1/3 lg:h-full center overflow-y-auto"
                  variants={modal}
                >
                  <div className="items-center">
                    <div className=" rounded-lg bg-white border-0">
                      <div className="rounded-t bg-white mb-0 px-3 py-3">
                        <div className="text-center flex justify-between">
                          <h6 className="text-gray-800 text-xl font-bold">
                            Image
                          </h6>
                          <div className=" text-right">
                            <span
                              onClick={() => {
                                setShowImage(false);
                              }}
                              className=" text-red-500 onClick"
                            >
                              <i className="fas fa-times" />
                            </span>
                          </div>
                        </div>
                      </div>
                      {currentImg.map((img, index) => {
                        return (
                          <Fragment key={index}>
                            <img src={img} alt="" />
                          </Fragment>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {/* Add Interface */}
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
              <motion.div
                className="lg:w-1/3 lg:h-full center overflow-y-auto"
                variants={modal}
              >
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
  ListCat: state.catReducer.categories,
  isAuth: state.auth.isAuthenticated,
  isLoading: state.productsReducer.ploader,
  isLoadingCreate: state.productsReducer.addLoader,
  isLoadingUpdate: state.productsReducer.updateLoader,
  CodeMsg: state.productsReducer.codemsg,
});

const mapActionToProps = {
  AllProducts: getAll,
  AllCategories: getAllCat,
  DeleteProducts: deleteProduct,
};

export default connect(mapStateToProps, mapActionToProps)(ProductList);
