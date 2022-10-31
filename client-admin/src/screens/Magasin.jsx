/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, Fragment, useMemo } from "react";
import Container from "../components/container/container.component";
import Footer from "../components/home/Footer";
import { connect } from "react-redux";
import { getAll } from "../redux/reducers/productReducer";
import Pagination from "../components/home/Pagination";
import Navbar from "../components/navbar/navbar.component";
import { motion } from "framer-motion";
import PaginationComponent from "../helpers/pagination";
import { getAllCat } from "../redux/reducers/catReducer";

const Magazin = (props) => {
  useEffect(() => {
    props.AllProducts();
    props.AllCategories();
  }, []);
  const [Search, setSearch] = useState("");
  const [SearchCat, setSearchCat] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const offresPerPage = 9;

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

  return (
    <Container>
      <Navbar />
      <br />

      <section className="w-full py-12 bg-white lg:py-6">
        <div className="max-w-6xl px-12 mx-auto text-center">
          <div className="space-y-12 md:text-center">
            <div className="max-w-3xl mb-20 space-y-5 sm:mx-auto sm:space-y-4">
              <h2 className="relative text-4xl font-extrabold tracking-tight sm:text-5xl">
                Catalogue
              </h2>
              <p className="text-xl text-gray-500">
                {" "}
                Notre gamme comprends une large ligne de produits de confection
                ,dont vous trouverez les détails dans ce catalogue, étignettes
                de lancements, les étigueteuses, fer à repasser, une diversité
                des ciseaux, l’huile blanche, détacher...
              </p>
              <div class="grid grid-cols-2 gap-4">
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
                <div className="flex bg-gray-100 p-4 w-72 space-x-4 rounded-lg">
                  <i className="fas fa-filter my-2"></i>
                  <select
                    className="flex bg-gray-100 space-x-4 rounded-lg"
                    onChange={(event) => {
                      setSearchCat(event.target.value);
                      setCurrentPage(1);
                    }}
                  >
                    <option value={SearchCat}>Catégories</option>
                    {props.ListCat.map((c, index) => {
                      return (
                        <Fragment key={index}>
                          <option value={c.name}>{c.name}</option>
                        </Fragment>
                      );
                    })}
                  </select>
                  <button
                    className="w-6 mr-2 transform hover:text-blue-500 hover:scale-120 ease-in duration-100 onClick"
                    onClick={() => {
                      setSearchCat("");
                    }}
                  >
                    <i className="fas fa-redo"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          {props.isLoading ? (
            <div className="text-center my-3">
              <div id="loading"></div>
            </div>
          ) : (
            <>
              <div
                posts={props.List}
                className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3"
              >
                {productsData.map((product, index) => {
                  return (
                    <Fragment key={index}>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="w-full border border-gray-200 rounded-lg shadow-sm"
                      >
                        <div
                          className="flex flex-col items-center justify-center p-10"
                          key={product._id}
                        >
                          <img
                            className="rounded-lg w-40 h-40 mb-6"
                            src={product.photo}
                            alt=""
                          ></img>
                          <h2 className="text-lg font-medium">
                            {product.name}
                          </h2>
                          <p className="font-medium text-blue-500">
                            {product.shipping}
                          </p>
                          <p className="font-medium text-gray-400">
                            {product.category.name}
                          </p>
                        </div>
                      </motion.div>
                    </Fragment>
                  );
                })}
              </div>
              <PaginationComponent
                total={pageNumber}
                itemsPerPage={offresPerPage}
                currentPage={currentPage}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </>
          )}
        </div>
      </section>

      <Footer />
    </Container>
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
