import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";

// components

export default function CardProfile() {
  const candidate = JSON.parse(localStorage.getItem("candidate"));
  console.log(candidate);

  return (
    <>
      <div className="mt-16 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg">
        <div className="px-6">
          <div className="flex flex-wrap justify-center">
            <div className="w-full px-4 flex justify-center">
              <img
                alt="..."
                className="pt-4 w-32 h-32 p-1  mt-8 bg-white  rounded-full"
                //                src={candidate.profilePhoto}
              />
            </div>
          </div>
          <div className="text-center mt-12">
            <h3 className="text-xl font-semibold leading-normal mb-2 text-gray-800 mb-2">
              {candidate.fullName}
            </h3>
            <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase">
              <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-500"></i>{" "}
              {candidate.region}, {candidate.location}
            </div>
            <div className="mb-2 text-gray-700 mt-10">
              <i className="fas fa-briefcase mr-2 text-lg text-gray-500"></i>
              {candidate.skills}
            </div>
            <div className="mb-2 text-gray-700">
              <i className="fas fa-university mr-2 text-lg text-gray-500"></i>
              {candidate.education}
            </div>
            <span className="mb-2 text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-700 bg-blue-300 uppercase last:mr-0 mr-1">
              {candidate.skills}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
