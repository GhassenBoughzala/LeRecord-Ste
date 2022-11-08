/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, Fragment } from "react";
import Sidebar from "../../../components/sidebar/Sidebar";
import { connect } from "react-redux";
import { getAllCat, deleteCat } from "../../../redux/reducers/catReducer";
import AddCat from "./newCategory";
import "./category.css";
import Topbar from "../../../components/topbar/Topbar";

const CatList = (props) => {
  const [currentId, setCurrentId] = useState(0);

  useEffect(() => {
    props.All();
  }, []);

  const onDLP = (id) => {
    const onSuccess = () => {
      window.location.reload();
    };
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ?"))
      props.Delete(id, onSuccess);
  };

  return (
    <>
      <div className="containerr">
        <Sidebar />
        <div className="productList">
        <Topbar />
          <div className="homeWidgets">
            <div className="widgetLg">
              <div className="rounded-t bg-white mb-0 px-6 py-6">
                <div className="text-center flex justify-between">
                  <h6 className="text-gray-800 text-xl font-bold">
                    List des categories
                  </h6>
                </div>
              </div>
              <br></br>
              <table className="widgetLgTable">
                <thead>
                  <tr className="widgetLgTr">
                    <th className="widgetLgTh">Titre</th>
                    <th className="widgetLgTh text-center"></th>
                    <th className="widgetLgTh text-center"></th>
                  </tr>
                </thead>
                <tbody>
                  {props.List.map((cat, index) => {
                    return (
                      <Fragment key={index}>
                        <tr className="widgetLgTr " key={cat._id}>
                          <td className="widgetLgDate">{cat.name}</td>
                          <td className="py-3 px-6 text-center">
                            <div className="flex item-center justify-center">
                              <div
                                onClick={() => setCurrentId(cat._id)}
                                className="w-6 mr-2 transform hover:text-blue-500 hover:scale-110"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                  />
                                </svg>
                              </div>
                              <div
                                onClick={() => onDLP(cat._id)}
                                className="w-6 mr-2 transform hover:text-red-500 hover:scale-110"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="widgetLg">
              <AddCat {...{ currentId, setCurrentId }} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  List: state.catReducer.categories,
  isAuth: state.auth.isAuthenticated,
});

const mapActionToProps = {
  All: getAllCat,
  Delete: deleteCat,
};

export default connect(mapStateToProps, mapActionToProps)(CatList);
