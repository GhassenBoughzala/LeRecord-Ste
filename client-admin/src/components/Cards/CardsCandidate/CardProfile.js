import React, { useState } from "react";

export default function CardProfile() {
  

  return (
    <>
      <div className="mt-16 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg">
        <div className="px-6">
          <div className="text-center mt-12">
            <h3 className="text-xl font-semibold leading-normal mb-2 text-gray-800 mb-2">
              Name
            </h3>
            <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase">
              <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-500"></i>{" "}
              Reg
            </div>
            <div className="mb-2 text-gray-700 mt-10">
              <i className="fas fa-briefcase mr-2 text-lg text-gray-500"></i>
              Skills
            </div>
            <div className="mb-2 text-gray-700">
              <i className="fas fa-university mr-2 text-lg text-gray-500"></i>
              Edu
            </div>
            <span className="mb-2 text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-700 bg-blue-300 uppercase last:mr-0 mr-1">
              Skk
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
