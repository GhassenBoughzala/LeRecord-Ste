import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Carousel } from "react-responsive-carousel";


const ProductDetails = ({ ...props }) => {
  const [values, setvalues] = useState({});
  useEffect(() => {
    if (props.currentObj !== {}) {
      setvalues(props.currentObj);
    } else {
      setvalues({});
    }
  }, [props.currentObj]);

  return (
    <>
      <div className="">
        <div className=" rounded-lg bg-gray-200 border-0 ">
          <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
              <h1 class="font-bold text-xl text-blue-900">Détails</h1>

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

          <div class="md:flex items-center -mx-5 py-12 px-6">
            <div class="w-full md:w-1/2 px-5 mb-10 md:mb-0">
              <div class="relative m-3 rounded-lg">
              <Carousel
              autoPlay={true}
              showThumbs={false}
              showIndicators={true}
              showStatus={false}
              showArrows={false}
              infiniteLoop={true}
            >
              {values.photo?.map((img, index) => {
                  return (
                    <Fragment key={index}>
                      <div>
                        <img
                        src={img}
                        alt=""
                        className="w-full relative"
                      />
                      </div>
                      
                    </Fragment>
                  );
                })}
            </Carousel>
                
              </div>
            </div>
            <div class="w-full md:w-1/2 ">
              <h1 class="flex mx-5 font-bold uppercase text-xl text-blue-900">
                {values.name}
              </h1>
              <div class="mb-2">
                {values.shipping === "Hors stock" && (
                  <p className="felx font-semibold text-red-600">Hors stock</p>
                )}
                {values.shipping === "En stock" && (
                  <p className="flex font-bold text-green-600 mx-5">
                    En stock
                  </p>
                )}
              </div>
              <div>
                <p className="flex mx-5 align-bottom">Description:</p>
                <p className="flex mx-5 align-bottom font-semibold">
                  {values.description}
                </p>
                <p className="flex mx-5 align-bottom">Catégorie:</p>
                <p className="flex mx-5 align-bottom font-semibold">
                  {values.category?.name}
                </p>
              </div>
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
