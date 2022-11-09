import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";


import useForm from "./pages/useForm";
const initialFieldValues = {};

const ProductDetails = ({ ...props }) => {
  var { values, setValues, errors, setErrors, resetForm } = useForm(
    initialFieldValues,
    props.setCurrentId
  );

  useEffect(() => {
    if (props.currentObj !== {}) {
      setValues(props.currentObj);
      setErrors({});
    }
  }, [props.currentObj]);

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

          <div className="px-4 lg:px-10 py-10 pt-0">
            <div className="grid grid-cols-2 ">
              <div className=" border-r-2 border-red-800">Hello</div>
              <div className="flex text-black">Hello</div>
             
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapToStateProps = (state) => ({
  product: state.productsReducer.product,
  isAuth: state.auth.isAuthenticated,
});

export default connect(mapToStateProps)(ProductDetails);
