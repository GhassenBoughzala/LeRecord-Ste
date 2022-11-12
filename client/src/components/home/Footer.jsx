import React from "react";

function Footer() {
  return (
    <>
      <section className="bg-blue-900">
        <div className="max-w-screen-xl px-4 py-12 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8 text-center">
          <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-4 text-center">
            <p className="text-base leading-6 text-white ">
              <i className="fas fa-phone-alt mx-1"></i>
              +216 72 286 319
            </p>
            <p className="text-base leading-6 text-center text-white">
              <i className="far fa-paper-plane mx-1"></i>
              le.record@planet.tn
            </p>
            <p className="text-base leading-6 text-white ">
              <i className="fas fa-fax mx-1"></i>
              +216 72 285 373
            </p>
          </div>
          <div className="">
            <p className="mt-8 text-base leading-6 text-center text-white">
              <i className="fas fa-map-marker-alt mx-1"></i>
              Avenue Habib Bourguiba, BP: 109 - Nabeul 8000
            </p>
          </div>

          {/*  <p className="mt-8 text-base leading-6 text-center text-gray-400">
            © 2021 Le Record, Inc. All rights reserved.
          </p> */}
        </div>
      </section>
    </>
  );
}

export default Footer;
