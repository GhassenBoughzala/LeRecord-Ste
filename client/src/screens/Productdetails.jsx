import React, { Fragment, useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { connect } from "react-redux";
//import { Carousel } from "react-responsive-carousel";
import Magnifier from "react-magnifier";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper";

const ProductDetails = ({ ...props }) => {
  const [values, setvalues] = useState({});
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
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
        <div className="rounded-lg bg-gray-200 border-0 ">
          <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
              <h1 className="font-bold text-xl text-blue-900">Détails</h1>

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

          <div className="md:flex -mx-5 py-5 px-6">
            <div className="w-full md:w-1/2 px-5 mb-10 md:mb-0">
              <div className="relative m-3 rounded-lg">
                <Swiper
                  style={{
                    "--swiper-navigation-color": "#fff",
                    "--swiper-pagination-color": "#fff",
                  }}
                  spaceBetween={10}
                  navigation={true}
                  thumbs={{ swiper: thumbsSwiper }}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="mySwiper2 rounded-lg"
                >
                  {values.photo?.map((img, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <Magnifier
                          src={img}
                          alt=""
                          className="w-full relative rounded-lg"
                        />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
                <Swiper
                  onSwiper={setThumbsSwiper}
                  spaceBetween={10}
                  slidesPerView={4}
                  freeMode={true}
                  watchSlidesProgress={true}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="mySwiper"
                >
                  {values.photo?.map((img, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <img
                          src={img}
                          alt=""
                          className="w-full relative onClick"
                        />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            </div>
            <div className="w-full md:w-1/2 px-2 py-5">
              <h1 className="flex mx-5 font-bold uppercase text-xl text-blue-900">
                {values.name}
              </h1>
              <div className="mb-2">
                {values.shipping === "Hors stock" && (
                  <p className="flex font-bold text-red-600 mx-5">Hors stock</p>
                )}
                {values.shipping === "En stock" && (
                  <p className="flex font-bold text-green-600 mx-5">En stock</p>
                )}
              </div>
              <div>
                <p className="flex mx-5 align-bottom">Description:</p>
                <p className="flex mx-5 text-justify font-semibold">
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
