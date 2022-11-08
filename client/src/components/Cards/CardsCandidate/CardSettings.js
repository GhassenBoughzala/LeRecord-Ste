import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ButterToast, { Cinnamon } from "butter-toast";
import { Link } from "react-router-dom";
import { ToastProvider, useToasts } from "react-toast-notifications";

import { updateCandidate } from "../../../Redux/actions/candidate/candidate";
import axios from "axios";
// components

export default function CardSettings(props) {
  const { addToast } = useToasts();
  const checkBtn = useRef();
  const candidate = JSON.parse(localStorage.getItem("candidate"));
  const user = JSON.parse(localStorage.getItem("user"));

  const dispatch = useDispatch();
  const [data, setData] = useState({
    name: "",
    email: "",
    summary: "",
    phone: "",
    skills: "",
    education: "",
  });

  const [successful, setSuccessful] = useState(false);
  const [fullName, setFullName] = useState(candidate.fullName);
  const [location, setLocation] = useState(candidate.location);
  const [phoneNumber, setPhoneNumber] = useState(candidate.phoneNumber);
  const [education, setEducation] = useState(candidate.education);
  const [region, setRegion] = useState(candidate.region);
  const [aboutMe, setAboutme] = useState(candidate.aboutMe);
  const [background, setBackground] = useState(candidate.background);
  const [jobtitle, setJobtitle] = useState();

  const [company, setCompany] = useState();
  const [starting_date, setStartingDate] = useState();
  const [ending_date, setEndingDate] = useState();
  const [description, setDescription] = useState();

  const onChangejobtitle = (e) => {
    const jobtitle = e.target.value;
    setJobtitle(jobtitle);
  };
  const onChangeCompany = (e) => {
    const company = e.target.value;
    setCompany(company);
  };
  const onChangeStartingDate = (e) => {
    const date = e.target.value;
    console.log(e.target.value);
    console.log(e);

    setStartingDate(date);
  };
  const onChangeEndingDate = (e) => {
    const date = e.target.value;
    console.log(e.target.value);
    console.log(e);

    setEndingDate(date);
  };
  const onChangeDescription = (e) => {
    const description = e.target.value;
    setDescription(description);
  };
  const onChangeRegion = (e) => {
    const Region = e.target.value;
    setRegion(Region);
  };
  const onChangeBackground = (e) => {
    const Background = e.target.value;
    setBackground(Background);
  };

  const onChangeAboutme = (e) => {
    const AboutMe = e.target.value;
    setAboutme(AboutMe);
  };
  const onChangeEducation = (e) => {
    const Education = e.target.value;

    setEducation(Education);
  };

  const onChangephoneNumber = (e) => {
    const PhoneNumber = e.target.value;
    setPhoneNumber(PhoneNumber);
  };
  const onChangeLocation = (e) => {
    const Location = e.target.value;
    setLocation(Location);
  };

  const onChangefullName = (e) => {
    const FullName = e.target.value;
    setFullName(FullName);
  };
  const experience = {
    jobtitle,
    company,
    starting_date,
    ending_date,
    description,
  };
  const updateContent = () => {
    console.log(fullName);
    dispatch(
      updateCandidate(candidate._id, {
        fullName,
        phoneNumber,
        location,
        experience,
        region,
        education,
        background,
        aboutMe,
      })
    )
      .then((response) => {
        console.log("lennan", response);
        addToast("Saved Successfully", { appearance: "success" });
      })
      .catch((e) => {
        console.log(e);
        addToast(e.message, { appearance: "error" });
      });
  };
  const save = () => {
    axios.get("http://localhost:8082/cv/index/data").then((response) => {
      var score = response.data;

      console.log(score.name);
      setData({
        name: score.name,
        email: score.email,
        summary: score.summary,
        phone: score.phone,
        education: score.education,
        skills: score.skills,
      });
    });
  };
  return (
    <>
      <main>
        <div className="rounded-t  py-6"></div>
        <div className="flex-auto  px-2 lg:px-2 py-10 pt-0">
          <button
            className="bg-blue-500  text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
            onClick={updateContent}
          >
            Update
          </button>
          <button
            type="button"
            className="bg-green-500  text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
            onClick={save}
          >
            save
          </button>
          <form>
            {" "}
            {!successful && (
              <div>
                <h6 className="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase">
                  User Information
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Username
                      </label>
                      <input
                        type="text"
                        className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                        defaultValue={data.name}
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Email address
                      </label>
                      <input
                        type="email"
                        disabled={true}
                        className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                        defaultValue={data.email}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-12/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                      onChange={onChangefullName}
                      defaultValue={data.name}
                    />
                  </div>
                </div>

                <hr className="mt-6 border-b-1 border-gray-400" />
                <h6 className="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase">
                  Contact Information
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-12/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Phone Number
                      </label>
                      <input
                        type="text"
                        className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                        onChange={onChangephoneNumber}
                        defaultValue={data.phone}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        City
                      </label>
                      <input
                        type="email"
                        className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                        onChange={onChangeRegion}
                        value={region}
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Country
                      </label>
                      <input
                        type="text"
                        className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                        onChange={onChangeLocation}
                        value={location}
                      />
                    </div>
                  </div>
                </div>
                <hr className="mt-6 border-b-1 border-gray-400" />
                <h6 className="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase">
                  Education
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        University
                      </label>
                      <input
                        type="email"
                        className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                        onChange={onChangeEducation}
                        defaultValue={data.education}
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Skills
                      </label>
                      <input
                        type="text"
                        className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                        onChange={onChangeBackground}
                        defaultValue={data.skills}
                      />
                    </div>
                  </div>
                </div>
                <hr className="mt-6 border-b-1 border-gray-400" />
                <h6 className="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase">
                  Experience
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        JOB TITLE
                      </label>
                      <input
                        type="text"
                        className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                        onChange={onChangejobtitle}
                        value={jobtitle}
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        COMPANY
                      </label>
                      <input
                        type="text"
                        className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                        onChange={onChangeCompany}
                        value={company}
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Strating Date
                      </label>
                      <input
                        type="date"
                        className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                        onChange={onChangeStartingDate}
                        value={starting_date}
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Ending Date
                      </label>
                      <input
                        type="date"
                        className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                        onChange={onChangeEndingDate}
                        value={ending_date}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-12/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      DESCRIPTION
                    </label>
                    <textarea
                      type="text"
                      className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                      onChange={onChangeDescription}
                      value={description}
                    />
                  </div>
                </div>
                <hr className="mt-6 border-b-1 border-gray-400" />
                <h6 className="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase">
                  About Me
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-12/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        About me
                      </label>
                      <textarea
                        type="text"
                        className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                        defaultValue={data.summary}
                        rows="4"
                        onChange={onChangeAboutme}
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </main>
    </>
  );
}
