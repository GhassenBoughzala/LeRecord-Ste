/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, Fragment, useMemo } from "react";
import Container from "../components/container/container.component";
import Footer from "../components/home/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { connect } from "react-redux";
import { getAll } from "../redux/reducers/productReducer";
import Navbar from "../components/navbar/navbar.component";
import PaginationComponent from "../helpers/pagination";
import { getAllCat } from "../redux/reducers/catReducer";
import Productdetails from "./Productdetails";
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

const Magazin = (props) => {
  useEffect(() => {
    props.AllProducts();
    props.AllCategories();
  }, []);
  const [Search, setSearch] = useState("");
  const [SearchCat, setSearchCat] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [checked, setchecked] = useState([]);
  const offresPerPage = 9;
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [currentObj, setCurrentObj] = useState({});

  const data = props.List;
  const productsData = useMemo(() => {
    let computed = data;
    if (Search) {
      computed = computed.filter((i) =>
        i.name.toLowerCase().includes(Search.toLowerCase())
      );
    }
    if (SearchCat) {
      computed = computed.filter((i) =>
        i.category.name.toLowerCase().includes(SearchCat.toLowerCase())
      );
    }
    setPageNumber(computed.length);
    return computed.slice(
      (currentPage - 1) * offresPerPage,
      (currentPage - 1) * offresPerPage + offresPerPage
    );
  }, [data, currentPage, Search, SearchCat]);

  const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      setSearchCat(event.target.value);
      setchecked(true);
      setCurrentPage(1);
      updatedList = [...checked, event.target.value];
    } else {
      setSearchCat("");
      setCurrentPage(1);
      setchecked(false);
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setchecked(updatedList);
  };

  return (
    <>
      <Container>
        <Navbar />
        <br />
        <section className="w-full py-12 bg-white lg:py-6">
          <div className="max-w-6xl px-12 mx-auto text-center">
            <div className="space-y-12">
              <div className="max-w-3xl mb-20 space-y-2 sm:mx-auto sm:space-y-4">
                <h2 className="relative text-4xl font-extrabold tracking-tight sm:text-5xl">
                  Catalogue
                </h2>
                <p className="text-xl text-blue-900">
                  {" "}
                  Notre gamme comprends une large ligne de produits de
                  confection ,dont vous trouverez les détails dans ce catalogue,
                  étignettes de lancements, les étigueteuses, fer à repasser,
                  une diversité des ciseaux, l’huile blanche, détacher...
                </p>
                <div className="flex bg-gray-100 p-4 w-72 space-x-4 rounded-lg">
                  <i className="fas fa-search my-2" />
                  <input
                    className="bg-gray-100 outline-none"
                    type="text"
                    placeholder="Cherchez un produit..."
                    onChange={(event) => {
                      setSearch(event.target.value);
                      setCurrentPage(1);
                    }}
                  />
                </div>
              </div>
            </div>
            {props.isLoading ? (
              <div className="text-center my-3 px-40 py-40">
                <div id="loading"></div>
              </div>
            ) : (
              <div className="grid grid-cols-12 ">
                <div className=" col-span-3 border-r-2 border-blue-800 border-x-2 mb-3 mr-5">
                  <h3 className=" font-semibold text-blue-900 ">Categories</h3>

                  {props.ListCat.map((c, index) => {
                    return (
                      <Fragment key={index}>
                        <div class=" flex items-center mt-3 ">
                          <input
                            id="default-checkbox"
                            type="checkbox"
                            value={c.name}
                            onChange={handleCheck}
                            className="mx-2 w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          ></input>
                          <label
                            for="default-checkbox"
                            className="text-sm font-medium text-gray-900 dark:text-gray-300 "
                          >
                            {c.name}
                          </label>
                        </div>
                      </Fragment>
                    );
                  })}
                </div>
                <div className="col-span-9">
                  <div
                    posts={productsData}
                    className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                  >
                    {productsData.map((product, index) => {
                      return (
                        <Fragment key={index}>
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                            className=" border border-gray-300 rounded-lg shadow-md"
                          >
                            <div
                              className="flex flex-col items-center justify-center p-10"
                              key={product._id}
                            >
                              <img
                                className="w-50 h-50 rounded-lg mb-6 min-w-45 min-h-45"
                                src={product.photo[0]}
                                alt=""
                              />
                              <h2 className="text-lg font-medium">
                                {product.name}
                              </h2>
                              {product.shipping === "Hors stock" && (
                                <p className="text-red-600">Hors stock</p>
                              )}
                              {product.shipping === "En stock" && (
                                <p className="text-green-600">En stock</p>
                              )}
                              
                              <p className="font-medium text-gray-500">
                                {product.category.name}
                              </p>
                            </div>
                          </motion.div>
                        </Fragment>
                      );
                    })}
                  </div>
                  <div className="my-10">
                    {!Search && (
                      <PaginationComponent
                        total={pageNumber}
                        itemsPerPage={offresPerPage}
                        currentPage={currentPage}
                        onPageChange={(page) => setCurrentPage(page)}
                      />
                    )}
                  </div>
                </div>
              </div>
            )}
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
                  <Productdetails
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
          </div>
        </section>
      </Container>
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => ({
  List: state.productsReducer.products,
  ListCat: state.catReducer.categories,
  isAuth: state.auth.isAuthenticated,
  isLoading: state.productsReducer.ploader,
});

const mapActionToProps = {
  AllProducts: getAll,
  AllCategories: getAllCat,
};

export default connect(mapStateToProps, mapActionToProps)(Magazin);
